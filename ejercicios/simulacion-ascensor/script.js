// EJERCICIO: Simulación de ascensor

// Piso actual del ascensor
let pisoActual = 1;

// Función para mover el ascensor a un piso específico
function moverAscensor(pisoDestino) {
    console.log(`🚪 Ascensor en el piso ${pisoActual}`);
    console.log(`🔢 Solicitando ir al piso ${pisoDestino}...`);

    if (pisoDestino === pisoActual) {
    console.log("✅ Ya estás en el piso solicitado.");
    return;
    }

    if (pisoDestino < 1 || pisoDestino > 10) {
    console.log("❌ Piso inválido. Solo hay pisos del 1 al 10.");
    return;
    }

    if (pisoDestino > pisoActual) {
    // Subiendo
    while (pisoActual < pisoDestino) {
        pisoActual++;
        console.log(`⬆️ Subiendo... Piso actual: ${pisoActual}`);
    }
    } else {
    // Bajando
    while (pisoActual > pisoDestino) {
        pisoActual--;
        console.log(`⬇️ Bajando... Piso actual: ${pisoActual}`);
    }
    }

    console.log(`🎉 ¡Has llegado al piso ${pisoDestino}!`);
}

// Función principal para simular varios viajes
function simularViajes() {
  let pisosSolicitados = [5, 2, 10, 1]; // Puedes cambiar esto o usar prompt() en navegador

    for (let i = 0; i < pisosSolicitados.length; i++) {
    let destino = pisosSolicitados[i];
    moverAscensor(destino);
    console.log("-----------------------");
    }
}

// Ejecutar la simulación
simularViajes();
