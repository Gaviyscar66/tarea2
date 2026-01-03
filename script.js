document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const resetButton = document.getElementById('resetButton');
    const resultDiv = document.getElementById('result');
    const coordinatesP = document.getElementById('coordinates');
    const messageP = document.getElementById('message');
    const mapsLink = document.getElementById('mapsLink');
    const mapDiv = document.getElementById('map');

    const messages = [
        "¡Felicidades! Has ganado 1 millón de dólares... ¡si sobrevives!",
        "¡Wow! Caíste en un lugar exótico. ¡Disfruta tu fortuna!",
        "¡Suerte! Esta ubicación podría ser tu nuevo hogar millonario.",
        "¡Increíble! Un lugar aleatorio para tu aventura millonaria.",
        "¡Éxito! Coordenadas generadas. ¡Ve por tu premio!",
        "¡Teletransportado! Ahora eres millonario en esta ubicación.",
        "¡Destino alcanzado! 1 millón de dólares te esperan.",
        "¡Aventura! Caíste en un punto misterioso del planeta."
    ];

    let map;
    let marker;

    playButton.addEventListener('click', function() {
        // Generar coordenadas aleatorias
        const lat = (Math.random() * 180 - 90).toFixed(6);
        const lng = (Math.random() * 360 - 180).toFixed(6);

        // Mostrar coordenadas
        coordinatesP.textContent = `Latitud: ${lat}, Longitud: ${lng}`;

        // Crear enlace a Google Maps
        const mapsUrl = `https://www.google.com/maps/@${lat},${lng},10z`;
        mapsLink.href = mapsUrl;

        // Mostrar el resultado primero
        resultDiv.classList.remove('hidden');

        // Inicializar el mapa si no existe
        if (!map) {
            map = L.map('map').setView([lat, lng], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
        } else {
            // Centrar el mapa en la ubicación
            map.setView([lat, lng], 10);
        }

        // Agregar marcador
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([lat, lng]).addTo(map);

        // Forzar redibujo del mapa después de la transición
        setTimeout(() => {
            map.invalidateSize();
        }, 600);
    });

    resetButton.addEventListener('click', function() {
        // Recargar la página para resetear
        location.reload();
    });
});