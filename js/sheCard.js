import { showScreen } from "./screenManager.js";
import { renderWishesCard, deleteRenderWishesCard } from "./wishCard.js";
import { menu, sheBtn, sheScreen, greetingBtn } from "./valueScreen.js";

export function initSheCards() {
    const sheBack = document.getElementById("sheBack");
    const sheCards = document.getElementById("sheCards");
    const sheTitle = sheScreen.querySelector(".she-title");
    const sheHint = sheScreen.querySelector(".she-hint");   
    const volumeSlider = document.getElementById("volumeSlider");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const restartMusicBtn = document.getElementById("restartMusicBtn");

    const music = new Audio("./music/ТЕПЛИХ ВЕЧОРІВ.m4a");
    music.volume = 0.3;
    music.loop = true;

    const images = [
        "./img/she1.jpg", "./img/she2.jpg", "./img/she3.jpg", "./img/she4.jpg", "./img/she5.jpg",
        "./img/she6.jpg", "./img/she7.jpg", "./img/she8.jpg", "./img/she9.jpg", "./img/she10.jpg",
        "./img/she11.png", "./img/she12.jpg", "./img/she13.jpg", "./img/she14.jpg", "./img/she15.jpg"
    ];

    let isFinalShowing = false; 
    let currentCardIndex = 0;

    function renderSheScreen() {

        clearSheScreenState();
        createCards();
        
        // Налаштовуємо музику
        music.currentTime = 0; 
        music.volume = parseFloat(volumeSlider.value) || 0.3;
        music.play();
        
        playPauseBtn.innerHTML = `<img src="./img/pause.svg" alt="pause">`;

        showScreen(sheScreen);
    }

    function clearSheScreenState() {
        isFinalShowing = false;
        deleteRenderWishesCard();
        
        const existingBtn = sheScreen.querySelector(".lastWishBtn");
        if (existingBtn) existingBtn.remove();
        
        sheCards.style.display = "block";
        sheHint.style.display = "block";
        sheCards.innerHTML = ""; 
        currentCardIndex = 0;
    }


    function createCards() {
        images.forEach((src, index) => {
            const card = document.createElement("div");
            card.className = "she-card";
            card.style.zIndex = images.length - index;

            const img = document.createElement("img");
            img.src = src;
            img.draggable = false;

            card.appendChild(img);
            card.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;

            addSwipe(card, index);
            sheCards.appendChild(card);
        });
    }

    function addSwipe(card, index) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        card.addEventListener("touchstart", e => {
            if (index !== currentCardIndex) return;
            startX = e.touches[0].clientX;
            isDragging = true;
            card.style.transition = "none";
        });

        card.addEventListener("touchmove", e => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX - startX;
            
            const rotate = currentX * 0.03; 
            card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
        });

        card.addEventListener("touchend", () => {
            if (!isDragging) return;
            isDragging = false;

            // Поріг свайпу 100 пікселів
            if (Math.abs(currentX) > 80) {
                const dir = currentX > 0 ? "right" : "left";
                removeCard(card, dir);
            } else {
                // Повернення картки
                card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                card.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
            }
            currentX = 0;
        });

        // Натискання тепер теж видаляє плавно
        card.onclick = () => {
            if (index === currentCardIndex && !isDragging) {
                removeCard(card, Math.random() > 0.5 ? "right" : "left");
            }
        };
    }

    function removeCard(card, dir) {
        // Уповільнили виліт картки до 0.8с
        card.style.transition = "transform 0.4s ease-in, opacity 0.6s ease"; 
        const moveOut = dir === "right" ? 1000 : -1000;
        card.style.transform = `translateX(${moveOut}px) rotate(${dir === "right" ? 35 : -35}deg)`;
        card.style.opacity = "0";

        currentCardIndex++;

        setTimeout(() => {
            card.remove();
            if (currentCardIndex === images.length && !isFinalShowing) {
                isFinalShowing = true; 
                showFinalMessage();
        }
        }, 800);
    }

    function showFinalMessage() {
        // Ховаємо все зайве
        sheCards.style.display = "none";
        sheHint.style.display = "none";

        const wishtext = "Лєр, яка ти гарнетка. Ти секс. Виглядає чудово. Твоя фігура, очі, руки, ноги, вуста, - я люблю кожну частинку тебе ❤️" +
            "Не уявляю, що хтось може перекрити таку Ланітову. Така дівчина не підлягає ніякому оцінюванню, занадто гарнюня. І такою будеш і надалі. Мій висновок: обої на телефон з тобою найкрасивіші";

        renderWishesCard(wishtext, sheTitle);

        const lastbtn = document.createElement("button");
        lastbtn.className = "lastWishBtn";
        lastbtn.textContent = "Повернутися";

        lastbtn.onclick = async () => {
            greetingBtn.disabled = false;
            await showScreen(menu);
            music.pause();
            deleteRenderWishesCard();
            lastbtn.remove();
        };

        sheTitle.appendChild(lastbtn);
    }

    // Керування музикою
    playPauseBtn.onclick = () => {
        if (music.paused) {
            music.play();
            playPauseBtn.innerHTML = `<img src="./img/pause.svg" alt="pause">`;
        } else {
            music.pause();
            playPauseBtn.innerHTML = `<img src="./img/start.svg" alt="pause">`;
        }
    };

    restartMusicBtn.onclick = () => {
        music.currentTime = 0;
        music.play();
        playPauseBtn.innerHTML = `<img src="./img/pause.svg" alt="pause">`;
    };

    volumeSlider.oninput = () => {
        music.volume = volumeSlider.value;
    };

    sheBtn.onclick = renderSheScreen;

    sheBack.onclick = () => {
        music.pause();
        showScreen(menu);
    };
}
