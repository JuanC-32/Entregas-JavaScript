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

// Hacer pedido
function pedirProducto() {
    let seguirPidiendo = true;

    while (seguirPidiendo) {
        const opcion = parseInt(prompt("¿Qué deseas ordenar? (Número del 1 al " + menu.length + ")")) - 1;

    if (opcion >= 0 && opcion < menu.length) {
        carrito.push(menu[opcion]);
        alert(`${menu[opcion].nombre} agregado al carrito.`);
    } else {
        alert("Opción no válida.");
    }

    const continuar = prompt("¿Deseas pedir algo más? (sí/no)").toLowerCase();
    if (continuar !== "sí") {
        seguirPidiendo = false;
        }
    }
}

// Calcular total
function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => total += producto.precio);
    return total;
}

// Confirmar pedido
function confirmarPedido() {
    console.log("Tu pedido:");
    carrito.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });

    const total = calcularTotal();
    console.log(`Total a pagar: $${total}`);
    alert(`Gracias por tu compra. Total pagado: $${total}`);
}

// Ejecutar simulación
function iniciarSimulacion() {
    mostrarMenu();
    pedirProducto();
    confirmarPedido();
}

iniciarSimulacion();
