import { showScreen } from "./screenManager.js";
import { menu, starsScreen, moonBtn } from "./valueScreen.js";
import { createRain } from "./rain.js"

export function initStars() {
    const sunBack = document.getElementById("sunBtn");
    const rainBg = starsScreen.querySelector(".rain-bg");

    function renderStarScreen() {
        document.body.classList.add("night-mode");
        const rainElements = ["✨"];
        const rainInterval = setInterval(() => {
            createRain(rainElements, rainBg);
        }, 300);
        starsScreen.dataset.intervalId = rainInterval;
   
        showScreen(starsScreen);
    }

    moonBtn.onclick = renderStarScreen;

    const goBack = () => {
        clearInterval(starsScreen.dataset.intervalId);
        document.body.classList.remove("night-mode");
        showScreen(menu);
    };

    sunBack.onclick = goBack;
}
