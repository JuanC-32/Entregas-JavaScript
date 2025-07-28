let temperatura = 25;
let aguaAltura = 0;
let tanqueVacio = true;
let tanqueReceptorNivel = 6000; // litros
const tanqueReceptorCapacidad = 6500;

function actualizarInterfaz() {
    const agua = document.getElementById("agua");
    const temp = document.getElementById("temperatura");

    agua.style.height = `${aguaAltura}%`;
    temp.textContent = `Temperatura: ${temperatura}°C`;

    if (temperatura >= 80) {
    temp.style.color = "red";
    } else if (temperatura >= 60) {
    temp.style.color = "orange";
    } else {
    temp.style.color = "blue";
    }
}

function abrirValvula(id) {
    document.getElementById(id).classList.add("abierta");
}

function cerrarValvula(id) {
    document.getElementById(id).classList.remove("abierta");
}

function iniciarSanitizacion() {
    const estado = document.getElementById("estado");

    if (!tanqueVacio) {
        estado.textContent = "Drenando tanque...";
        abrirValvula("valvulaSalida");

    setTimeout(() => {
        cerrarValvula("valvulaSalida");
        tanqueVacio = true;
      iniciarSanitizacion(); // Reintenta
    }, 2000);
    return;
    }

    estado.textContent = "Llenando tanque con agua caliente...";
    abrirValvula("valvulaEntrada");

    let llenado = setInterval(() => {
        if (aguaAltura >= 100) {
            clearInterval(llenado);
            cerrarValvula("valvulaEntrada");
            aumentarTemperatura();
        } else {
        aguaAltura += 10;
        actualizarInterfaz();
        }
    }, 500);
}

function aumentarTemperatura() {
    const estado = document.getElementById("estado");
    estado.textContent = "Calentando agua...";

    let calentamiento = setInterval(() => {
        if (temperatura >= 80) {
            clearInterval(calentamiento);
            estado.textContent = "Temperatura óptima alcanzada. Iniciando conteo de 30 minutos (acelerado)...";
            iniciarConteo();
    } else {
        temperatura += 5;
        actualizarInterfaz();
        }
    }, 500);
}

function iniciarConteo() {
    const estado = document.getElementById("estado");
    let segundos = 10; // Simulamos 30 min como 10 seg

    let conteo = setInterval(() => {
        estado.textContent = `Sanitizando... ${segundos}s restantes`;
        segundos--;

    if (segundos < 0) {
        clearInterval(conteo);
        estado.textContent = "Sanitización completada con éxito.";
        recuperarAgua();
    }
    }, 1000);
}

function recuperarAgua() {
    const estado = document.getElementById("estado");

    if (tanqueReceptorNivel < tanqueReceptorCapacidad) {
        estado.textContent = "Recuperando agua caliente...";
        abrirValvula("valvulaSalida");

    setTimeout(() => {
        cerrarValvula("valvulaSalida");
        estado.textContent = "Proceso finalizado. Agua recuperada correctamente.";
    }, 2000);
    } else {
    estado.textContent = "Tanque receptor lleno. No se puede recuperar el agua.";
    }
}

