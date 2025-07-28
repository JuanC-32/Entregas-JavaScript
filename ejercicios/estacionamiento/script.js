//EJERCICIO: Estacionamiento para vehiculos

function registrarEntrada() {
    const placa = document.getElementById("placaInput").value.toUpperCase();
    const tabla = document.getElementById("tablaEstacionamiento");

    if (!placa) {
        alert("Por favor ingrese una placa válida.");
        return;
    }

    const hora = new Date().toLocaleTimeString();

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${placa}</td>
        <td>${hora}</td>
        <td><button onclick="eliminarFila(this)">Salir</button></td>
    `;
    tabla.appendChild(fila);

    document.getElementById("placaInput").value = "";
}

function eliminarFila(boton) {
    const fila = boton.parentElement.parentElement;
    fila.remove();
}
