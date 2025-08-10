// Elementos del DOM
const rojo = document.getElementById("rojo");
const amarillo = document.getElementById("amarillo");
const verde = document.getElementById("verde");
const estado = document.getElementById("estado");
const contador = document.getElementById("contador");
const cronometro = document.getElementById("cronometro");
const historial = document.getElementById("historial");

const btnPeaton = document.getElementById("btnPeaton");
const btnReset = document.getElementById("btnReset");
const btnLimpiarHistorial = document.getElementById("btnLimpiarHistorial");

// Variables
let ciclo = 0;
let tiempoRestante = 5;
let indiceLuz = 0;
let luces = ["verde", "amarillo", "rojo"];
let luzActual = "verde";
let intervaloCambio, intervaloCronometro;

// Cargar historial desde localStorage
let historialEventos = JSON.parse(localStorage.getItem("historial")) || [];
renderHistorial();

// Función para encender luces
function encenderLuz(color) {
  luzActual = color; // Guardamos la luz actual
  [rojo, amarillo, verde].forEach(l => l.classList.remove("encendido"));
  document.getElementById(color).classList.add("encendido");

  let mensaje = "";
  if (color === "verde") mensaje = "🚗 Verde / 🧍 Esperar";
  if (color === "amarillo") mensaje = "⚠ Amarillo / 🚶 Prepararse";
  if (color === "rojo") mensaje = "⛔ Rojo / 🚶 Cruzar";

  estado.textContent = "Estado actual: " + mensaje;
  agregarHistorial(mensaje);
}

// Función para agregar al historial
function agregarHistorial(evento) {
  const fecha = new Date().toLocaleTimeString();
  historialEventos.push(`[${fecha}] ${evento}`);
  // Mantener solo los últimos 6 eventos
  if (historialEventos.length >  6) historialEventos.shift();
  localStorage.setItem("historial", JSON.stringify(historialEventos));
  renderHistorial();
}

// Mostrar historial en pantalla
function renderHistorial() {
  historial.innerHTML = "";
  historialEventos.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e;
    historial.appendChild(li);
  });
}

// Cronómetro
function iniciarCronometro() {
  tiempoRestante = 5;
  cronometro.textContent = `⏳ Próximo cambio en: ${tiempoRestante}s`;
  clearInterval(intervaloCronometro);
  intervaloCronometro = setInterval(() => {
    tiempoRestante--;
    if (tiempoRestante >= 0) {
      cronometro.textContent = `⏳ Próximo cambio en: ${tiempoRestante}s`;
    }
  }, 1000);
}

// Cambio de luces automático
function iniciarSemaforo() {
  clearInterval(intervaloCambio);
  intervaloCambio = setInterval(() => {
    indiceLuz = (indiceLuz + 1) % luces.length;
    encenderLuz(luces[indiceLuz]);
    iniciarCronometro();
    if (luces[indiceLuz] === "verde") ciclo++;
    contador.textContent = `Ciclos: ${ciclo}`;
  }, 5000);
}

// Botón peatonal
btnPeaton.addEventListener("click", () => {
  if (luzActual === "rojo") {
    agregarHistorial("🚶 Paso peatonal permitido");
  } else {
    agregarHistorial("❌ No es seguro cruzar ahora");
  }
});

// Botón reset
btnReset.addEventListener("click", () => {
  ciclo = 0;
  contador.textContent = "Ciclos: 0";
  agregarHistorial("🔄 Contador reiniciado");
});

// Botón limpiar historial
btnLimpiarHistorial.addEventListener("click", () => {
  historialEventos = [];
  localStorage.removeItem("historial");
  renderHistorial();
  agregarHistorial("🧹 Historial borrado");
});

// Iniciar
encenderLuz("verde");
iniciarCronometro();
iniciarSemaforo();



