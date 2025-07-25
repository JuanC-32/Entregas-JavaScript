// Nivel de gasolina aleatorio entre 0 y 100
let nivelGasolina = Math.floor(Math.random() * 101);

console.log("Nivel de gasolina: " + nivelGasolina + "%");

if (nivelGasolina <= 15) {
    console.log("⚠️ ¡Gasolina baja! Ve a tanquear urgentemente.");
} else if (nivelGasolina <= 40) {
    console.log("⛽ Considera tanquear pronto.");
} else {
    console.log("✅ Suficiente gasolina. No necesitas tanquear.");
}
