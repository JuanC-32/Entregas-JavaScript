// Menú de productos
const menu = [
    { nombre: "Café Americano", precio: 5000 },
    { nombre: "Café Latte", precio: 6000 },
    { nombre: "Té Verde", precio: 4500 },
    { nombre: "Galleta", precio: 3000 },
    { nombre: "Pastel", precio: 7000 }
];

// Carrito de compras
let carrito = [];

// Mostrar el menú
function mostrarMenu() {
    console.log("☕ Bienvenido a la Cafetería ☕");
    console.log("Menú:");
    menu.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
}

// Mostrar carrito actual
function mostrarCarrito() {
    if (carrito.length === 0) {
        console.log("🛒 Tu carrito está vacío.");
    return;
    }

    console.log("🛒 Productos en tu carrito:");
    carrito.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
}

// Quitar producto del carrito
function quitarProductoDelCarrito() {
    mostrarCarrito();

    if (carrito.length === 0) return;

    const index = parseInt(prompt("¿Qué número de producto deseas quitar del carrito?")) - 1;

    if (index >= 0 && index < carrito.length) {
        const eliminado = carrito.splice(index, 1)[0];
        alert(`${eliminado.nombre} eliminado del carrito.`);
    } else {
        alert("❌ Número inválido.");
    }
}

// Hacer pedido
function pedirProducto() {
    let seguirPidiendo = true;

    while (seguirPidiendo) {
    // Mostrar el menú cada vez que se va a pedir algo
    mostrarMenu();

    let productoEncontrado = null;

    // Seguir preguntando hasta que el usuario escriba un nombre válido
    while (!productoEncontrado) {
        const nombreIngresado = prompt("✏️ Escribe el nombre del producto que deseas pedir:").toLowerCase();

      // Buscar el producto ignorando mayúsculas/tildes
        productoEncontrado = menu.find(producto => producto.nombre.toLowerCase() === nombreIngresado);

        if (!productoEncontrado) {
            alert("❌ Producto no encontrado. Vuelve a intentarlo. Escribe el nombre tal como aparece en el menú.");
            mostrarMenu(); // Volver a mostrar el menú por si necesita verlo otra vez
        }
    }

    // Pedir cantidad
    const cantidad = parseInt(prompt(`¿Cuántos ${productoEncontrado.nombre} deseas?`));

    if (!isNaN(cantidad) && cantidad > 0) {
        for (let i = 0; i < cantidad; i++) {
            carrito.push(productoEncontrado);
        }
        alert(`${cantidad} x ${productoEncontrado.nombre} agregado(s) al carrito.`);
    } else {
        alert("❌ Cantidad inválida. No se agregó al carrito.");
    }

    // Mostrar el carrito si desea
    const verCarrito = prompt("¿Deseas ver tu carrito? (sí/no)").toLowerCase();
    if (verCarrito === "sí") {
        mostrarCarrito();
    }

    // Opción para eliminar productos
    const eliminar = prompt("¿Deseas eliminar algo del carrito? (sí/no)").toLowerCase();
    if (eliminar === "sí") {
        quitarProductoDelCarrito();
    }

    // Preguntar si desea seguir pidiendo
    const continuar = prompt("¿Deseas pedir algo más? (sí/no)").toLowerCase();
    if (continuar !== "sí") {
        seguirPidiendo = false;
    }
    }
}

// Confirmar pedido
function confirmarPedido() {
    if (carrito.length === 0) {
        console.log("⚠️ No has pedido nada.");
        return;
    }

    console.log("🧾 Tu pedido final:");
    carrito.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });

    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });

    console.log(`💰 Total a pagar: $${total}`);
    alert(`Gracias por tu compra 🥳 Total pagado: $${total}`);
}

// Función principal
function iniciarSimulacion() {
    mostrarMenu();
    pedirProducto();
    confirmarPedido();
}

// Iniciar simulación
iniciarSimulacion();

