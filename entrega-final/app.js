// ====== Estado global ======
const state = {
  games: [],           
  filtered: [],        
  cart: [],            
  coupon: null,        
  loading: false
};

// ====== Selectores ======
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const catalogGrid   = $('#catalogGrid');
const emptyState    = $('#emptyState');
const searchInput   = $('#searchInput');
const genreFilter   = $('#genreFilter');
const platformFilter= $('#platformFilter');
const sortSelect    = $('#sortSelect');
const clearFilters  = $('#clearFilters');

const cartList   = $('#cartList');
const cartCount  = $('#cartCount');
const cartTotal  = $('#cartTotal');
const clearCart  = $('#clearCart');
const checkoutBtn= $('#checkoutBtn');
const couponInput= $('#couponInput');
const applyCoupon= $('#applyCoupon');

// ====== Utilidades ======
const money = (n) => n.toLocaleString('es-CO', { style:'currency', currency:'COP' });

function saveCart() {
  localStorage.setItem('gs_cart', JSON.stringify(state.cart));
  localStorage.setItem('gs_coupon', JSON.stringify(state.coupon));
}
function loadCart() {
  try {
    state.cart = JSON.parse(localStorage.getItem('gs_cart')) ?? [];
    state.coupon = JSON.parse(localStorage.getItem('gs_coupon'));
  } catch (_) {
    state.cart = [];
    state.coupon = null;
  }
}

function debounce(fn, ms=300){
  let t;
  return (...args)=>{
    clearTimeout(t);
    t = setTimeout(()=>fn(...args), ms);
  };
}

// ====== Carga de datos ======
async function fetchGames() {
  state.loading = true;
  try {
    
    await new Promise(res => setTimeout(res, 400));

    const res = await fetch('./data/games.json');
    if (!res.ok) throw new Error('No se pudo cargar el catálogo.');

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('El archivo JSON es inválido.');

    
    state.games = data.filter(g => g && g.id && g.title && g.price);
  } catch (err) {
    console.error(err);
    
    state.games = [
      { id: 'FALLBACK-1', title: 'Space Rescue', price: 59000, genre: 'Acción', platform: 'PC', rating: 4.1, stock: 5, image: 'https://picsum.photos/seed/space/640/360' }
    ];
    Swal.fire({
      icon: 'error',
      title: 'Error cargando juegos',
      text: 'Ocurrió un problema al cargar el catálogo. Se mostró un juego de ejemplo.',
    });
  } finally {
    state.loading = false;
  }
}

// ====== Render ======
function renderFilters(){
  const genres = Array.from(new Set(state.games.map(g=>g.genre))).filter(Boolean).sort();
  const platforms = Array.from(new Set(state.games.map(g=>g.platform))).filter(Boolean).sort();
  genreFilter.innerHTML = '<option value="">Todos los géneros</option>' + genres.map(g=>`<option value="${g}">${g}</option>`).join('');
  platformFilter.innerHTML = '<option value="">Todas las plataformas</option>' + platforms.map(p=>`<option value="${p}">${p}</option>`).join('');
}

function renderCatalog(list = state.filtered){
  catalogGrid.innerHTML = '';
  if (!list.length){
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  const frag = document.createDocumentFragment();
  for (const g of list){ // bucle
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="thumb" src="${g.image}" alt="${g.title}" loading="lazy">
      <div class="content">
        <h3 title="${g.title}">${g.title}</h3>
        <div class="badges">
          <span class="badge">${g.genre}</span>
          <span class="badge">${g.platform}</span>
          <span class="badge">⭐ ${g.rating}</span>
        </div>
        <div class="muted">Stock: ${g.stock ?? 0}</div>
        <div class="price">${money(g.price)}</div>
        <button class="btn primary full add-btn" data-id="${g.id}">Agregar</button>
      </div>
    `;
    frag.appendChild(card);
  }
  catalogGrid.appendChild(frag);
}

function renderCart(){
  if (!state.cart.length){
    cartList.innerHTML = '<div class="muted">Tu carrito está vacío.</div>';
  } else {
    cartList.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <div><strong>${item.title}</strong></div>
          <div class="muted">${money(item.price)}</div>
          <div class="qty">
            <button class="dec">−</button>
            <span>${item.qty}</span>
            <button class="inc">+</button>
          </div>
        </div>
        <div style="display:grid; gap:6px; justify-items:end">
          <div>${money(item.price * item.qty)}</div>
          <button class="btn danger small remove">Quitar</button>
        </div>
      </div>
    `).join('');
  }

  const {count, total} = calcTotals();
  cartCount.textContent = count;
  const discounted = applyDiscount(total);
  cartTotal.textContent = money(discounted);
}

function calcTotals(){
  let count = 0;
  let total = 0;
  for (const i of state.cart){
    count += i.qty;
    total += i.price * i.qty;
  }
  return {count, total};
}

function applyDiscount(amount){
  if (!state.coupon) return amount;
  const { discount } = state.coupon;
  return Math.max(0, Math.round(amount * (1 - discount)));
}

// ====== Lógica de filtrado/orden ======
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const genre = genreFilter.value;
  const platform = platformFilter.value;
  const sort = sortSelect.value;

  let list = [...state.games];

  // búsqueda
  if (q){
    list = list.filter(g => g.title.toLowerCase().includes(q));
  }
  // filtro por género y plataforma
  if (genre) list = list.filter(g => g.genre === genre);
  if (platform) list = list.filter(g => g.platform === platform);

  // ordenar
  switch (sort){
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    case 'rating-desc': list.sort((a,b)=>b.rating-a.rating); break;
    case 'title-asc': list.sort((a,b)=>a.title.localeCompare(b.title)); break;
    default: /* featured: no-op */ break;
  }

  state.filtered = list;
  renderCatalog(list);
}

// ====== Carrito ======
function addToCart(id){
  const game = state.games.find(g=>g.id === id);
  if (!game) return;
  const inCart = state.cart.find(i=>i.id === id);

  // Condicionales de stock
  const currentQty = inCart ? inCart.qty : 0;
  if ((game.stock ?? 0) <= currentQty){
    Swal.fire({ icon:'warning', title:'Sin stock', text:'No hay más unidades disponibles.' });
    return;
  }

  if (inCart){
    inCart.qty++;
  } else {
    state.cart.push({ id: game.id, title: game.title, price: game.price, qty: 1, image: game.image });
  }
  saveCart();
  renderCart();
  Swal.fire({ icon:'success', title:'Agregado', text:`${game.title} fue agregado al carrito.` , timer: 1200, showConfirmButton:false});
}

function updateQty(id, delta){
  const item = state.cart.find(i=>i.id === id);
  if (!item) return;
  const game = state.games.find(g=>g.id === id);
  const newQty = item.qty + delta;

  if (newQty <= 0){
    state.cart = state.cart.filter(i=>i.id !== id);
  } else if (game && newQty > (game.stock ?? 0)){
    Swal.fire({ icon:'warning', title:'Sin stock', text:'No hay más unidades disponibles.' });
  } else {
    item.qty = newQty;
  }
  saveCart();
  renderCart();
}

function removeItem(id){
  state.cart = state.cart.filter(i=>i.id !== id);
  saveCart();
  renderCart();
}

// ====== Checkout ======
function processPayment(total){
  
  return new Promise((resolve, reject)=>{
    const t = 200 + Math.random()*700;
    setTimeout(()=>{
      const fails = Math.random() < 0.15;
      if (fails) reject(new Error('Pago rechazado por el proveedor.'));
      else resolve({ ok:true, ref: 'PAY-' + Math.random().toString(36).slice(2,8).toUpperCase() });
    }, t);
  });
}

async function checkout(){
  const { total } = calcTotals();
  if (!state.cart.length){
    Swal.fire({ icon:'info', title:'Carrito vacío', text:'Agrega algún juego antes de pagar.' });
    return;
  }
  const amount = applyDiscount(total);

  try {
    const confirm = await Swal.fire({
      title: 'Confirmar pago',
      html: `<div style="text-align:left">
              <p>Total a pagar: <strong>${money(amount)}</strong></p>
              <p>Método: Tarjeta simulada</p>
            </div>`,
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar'
    });
    if (!confirm.isConfirmed) return;

    Swal.fire({ title:'Procesando pago…', didOpen: ()=>Swal.showLoading(), allowOutsideClick:false });
    const res = await processPayment(amount); // Promesa
    Swal.close();

    Swal.fire({
      icon: 'success',
      title: '¡Pago exitoso!',
      html: `Referencia: <code>${res.ref}</code><br>Total: <strong>${money(amount)}</strong>`
    });

    // Reducir stock
    for (const item of state.cart){
      const g = state.games.find(x=>x.id === item.id);
      if (g) g.stock = Math.max(0, (g.stock ?? 0) - item.qty);
    }

    state.cart = [];
    state.coupon = null;
    saveCart();
    renderCart();
    applyFilters(); // para refrescar stock en tarjetas
  } catch (err) {
    console.error(err);
    Swal.fire({ icon:'error', title:'Error en el pago', text: err.message || 'Algo salió mal.' });
  }
}

// ====== Cupón ======
function applyCouponCode(){
  const code = couponInput.value.trim().toUpperCase();
  if (!code){ Swal.fire({icon:'info', title:'Ingresa un cupón' }); return; }

  // ejemplo simple: GAMER10 => 10% dto
  const map = { 'GAMER10': .10, 'PRO20': .20 };
  if (!(code in map)){
    Swal.fire({ icon:'warning', title:'Cupón inválido' });
    state.coupon = null;
  } else {
    state.coupon = { code, discount: map[code] };
    Swal.fire({ icon:'success', title:`Cupón aplicado (${code})` });
  }
  saveCart();
  renderCart();
}

// ====== Eventos ======
function bindEvents(){
  
  catalogGrid.addEventListener('click', (e)=>{
    const btn = e.target.closest('.add-btn');
    if (btn){
      addToCart(btn.dataset.id);
    }
  });

  // Carrito
  cartList.addEventListener('click', (e)=>{
    const itemEl = e.target.closest('.cart-item');
    if (!itemEl) return;
    const id = itemEl.dataset.id;
    if (e.target.matches('.inc')) updateQty(id, +1);
    if (e.target.matches('.dec')) updateQty(id, -1);
    if (e.target.matches('.remove')) removeItem(id);
  });

  // Filtros/orden
  searchInput.addEventListener('input', debounce(applyFilters, 250));
  genreFilter.addEventListener('change', applyFilters);
  platformFilter.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  clearFilters.addEventListener('click', ()=>{
    searchInput.value = '';
    genreFilter.value = '';
    platformFilter.value = '';
    sortSelect.value = 'featured';
    applyFilters();
  });

  // Carrito acciones
  clearCart.addEventListener('click', ()=>{
    if (!state.cart.length) return;
    Swal.fire({
      title:'Vaciar carrito',
      text:'¿Seguro que quieres eliminar todos los items?',
      icon:'warning', showCancelButton:true, confirmButtonText:'Vaciar'
    }).then(r=>{
      if (r.isConfirmed){
        state.cart = [];
        state.coupon = null;
        saveCart();
        renderCart();
      }
    });
  });

  checkoutBtn.addEventListener('click', checkout);
  applyCoupon.addEventListener('click', applyCouponCode);
}

// ====== Inicio ======
document.addEventListener('DOMContentLoaded', async ()=>{
  loadCart();
  await fetchGames();
  renderFilters();
  state.filtered = [...state.games];
  renderCatalog();
  renderCart();
  bindEvents();
});
