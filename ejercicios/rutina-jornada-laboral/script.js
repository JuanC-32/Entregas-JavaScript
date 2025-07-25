// Obtener hora y minutos actuales
const ahora = new Date();
const hora = ahora.getHours();
const minutos = ahora.getMinutes();

// Convertir hora actual a minutos totales desde medianoche
const totalMinutos = hora * 60 + minutos;

// Definir eventos del día (en minutos desde medianoche)
const eventos = {
  levantarse: 4 * 60,         // 04:00
  salirTrabajo: 4 * 60 + 45,  // 04:45
  jornadaInicio: 5 * 60,      // 05:00
  jornadaFin: 14 * 60,        // 14:00
};

// Evaluar la actividad actual
if (totalMinutos >= eventos.levantarse && totalMinutos < eventos.salirTrabajo) {
    console.log("🚿 Estás duchándote.");
} else if (totalMinutos >= eventos.salirTrabajo && totalMinutos < eventos.jornadaInicio) {
    console.log("🏃 Vas camino al trabajo.");
} else if (totalMinutos >= eventos.jornadaInicio && totalMinutos < eventos.jornadaFin) {
    console.log("💼 Estás trabajando.");
} else if (totalMinutos >= eventos.jornadaFin && totalMinutos < eventos.jornadaFin + 60) {
    console.log("🏡 Vas camino a casa.");
} else {
    console.log("🛋️ Estás descansando o en casa.");
}
