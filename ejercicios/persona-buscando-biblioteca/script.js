// Lista de locales en el centro comercial
const locales = ["Zapatería", "Ropa", "Juguetería", "Comidas", "Biblioteca", "Cafetería", "Deportes"];

console.log("🚶‍♂️ Una persona entra al centro comercial buscando una biblioteca...");

for (let i = 0; i < locales.length; i++) {
    const local = locales[i];
    console.log("➡️ La persona ve una " + local);

    if (local === "Biblioteca") {
    console.log("📚 ¡Encontró la biblioteca! Entra y compra un libro.");
    break; // Se detiene porque encontró lo que buscaba
    } else {
    console.log("❌ No es una biblioteca. Sigue caminando...");
    }
}

console.log("✅ Fin del recorrido.");
