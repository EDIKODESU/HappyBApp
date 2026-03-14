export function createRain(arrElements, rainContainer) {
    const rain = document.createElement("div");
    rain.className = "floating-rain";
    // const rainElements = ["❤️", "💖", "✨", "🌸"];
    const rainElements = arrElements;
    rain.innerHTML = rainElements[Math.floor(Math.random() * rainElements.length)];
    // heart.innerHTML = "❤️";
    rain.style.left = Math.random() * 100 + "vw";
    rain.style.animationDuration = Math.random() * 3 + 2 + "s";
    rain.style.opacity = Math.random();
    rainContainer.appendChild(rain);

    setTimeout(() => rain.remove(), 5000);
}