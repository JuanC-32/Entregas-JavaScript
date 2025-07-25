// Datos iniciales
let tanqueVacio = true; // ¿El tanque está vacío?
let temperaturaActual = 25; // Temperatura inicial en °C
let tanqueDestinoLitros = 6000; // Litros del otro tanque

// Paso 1: Verificar si el tanque está vacío
if (tanqueVacio) {
    console.log("✅ El tanque está vacío. Iniciando acopio de agua caliente...");
} else {
    console.log("⚠️ El tanque no está vacío. Drenando...");
    tanqueVacio = true;
    console.log("✅ Tanque drenado. Iniciando acopio de agua caliente...");
}

// Paso 2: Simular acopio hasta llegar a 80°C
while (temperaturaActual < 80) {
  temperaturaActual += 5; // Se calienta progresivamente
    console.log(`🔥 Temperatura actual: ${temperaturaActual}°C`);
}

// Paso 3: Al alcanzar 80°C, iniciar conteo de 30 minutos
console.log("🕒 Se alcanzaron los 80°C. Iniciando sanitización por 30 minutos...");

// Simular conteo de 30 minutos (aquí lo haremos rápido con un bucle para representar el tiempo)
for (let minuto = 1; minuto <= 30; minuto++) {
    console.log(`⏱️ Minuto ${minuto}...`);
}

// Paso 4: Final del conteo
console.log("✅ Sanitización completada con éxito.");

// Paso 5: Verificar si se puede recuperar el agua caliente
if (tanqueDestinoLitros < 6500) {
    console.log("♻️ Recuperando agua caliente al otro tanque...");
} else {
    console.log("🚫 No se puede recuperar agua caliente. El otro tanque está lleno.");
}
