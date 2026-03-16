import { showScreen } from "./screenManager.js";
import { menu, starsScreen, moonBtn } from "./valueScreen.js";
import { createRain } from "./rain.js";

export function initStars() {
    const sunBack = document.getElementById("sunBtn");
    const rainBg = starsScreen.querySelector(".rain-bg");

    function animationTap(btnEl) {
        if (!btnEl) return;
        btnEl.classList.add('active-tap');
        setTimeout(() => {
            btnEl.classList.remove('active-tap');
        }, 300);
    }

    function handleMoonClick() {
        document.body.classList.add("night-mode");
        
        const rainElements = ["✨"];
        const rainInterval = setInterval(() => {
            createRain(rainElements, rainBg);
        }, 300);
        starsScreen.dataset.intervalId = rainInterval;
   
        animationTap(moonBtn); 
        showScreen(starsScreen);
    }

    function handleSunClick() {
        const intervalId = starsScreen.dataset.intervalId;
        if (intervalId) clearInterval(intervalId);
        
        document.body.classList.remove("night-mode");
        
        animationTap(sunBack); 
        showScreen(menu);
    }

    moonBtn.onclick = handleMoonClick;
    sunBack.onclick = handleSunClick;
}
