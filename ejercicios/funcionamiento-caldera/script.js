// script.js
function verificarCaldera() {
    const presionGas = parseFloat(document.getElementById("presionGas").value);
    const presionAgua = parseFloat(document.getElementById("presionAgua").value);
    const nivelAgua = parseFloat(document.getElementById("nivelAgua").value);
    const estado = document.getElementById("estadoCaldera");

    if (isNaN(presionGas) || isNaN(presionAgua) || isNaN(nivelAgua)) {
        estado.textContent = "⚠️ Por favor llena todos los campos numéricos.";
        estado.style.color = "orange";
        return;
    }

    if (presionGas <= 30) {
        estado.textContent = "🔥 Error: Presión de gas baja. Caldera apagada.";
        estado.style.color = "red";
    }else if (presionGas >= 70) {
        estado.textContent = "🔥 Error: Presión de gas alta. Caldera apagada.";
        estado.style.color = "red";
    } else if (presionAgua <= 30) {
        estado.textContent = "💧 Error: Presión de agua baja. Caldera apagada.";
        estado.style.color = "red";
    } else if (presionAgua >= 80) {
        estado.textContent = "💧 Error: Presión de agua alta. Caldera apagada.";
        estado.style.color = "red";
    } else if (nivelAgua < 30 || nivelAgua > 70) {
        estado.textContent = "🚨 Nivel de agua fuera de rango seguro. Caldera apagada.";
        estado.style.color = "red";
    } else {
        estado.textContent = "✅ Caldera operando normalmente.";
        estado.style.color = "green";
    }
}
