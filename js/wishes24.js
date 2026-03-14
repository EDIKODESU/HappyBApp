import { showScreen } from "./screenManager.js";
import { renderWishesCard, deleteRenderWishesCard } from "./wishCard.js";
import { menu, wishes24Screen, twfrBtn, sheBtn, moonBtn  } from "./valueScreen.js";

export function initWishes24(){

    // const wishes24Screen = document.getElementById("wishes24Screen");
    const wishes24Title = wishes24Screen.querySelector(".wishes24-title"); // Беремо заголовок
    const wishes24Back = document.getElementById("wishes24Back");
    const wishNumberEl = document.getElementById("wishNumber");
    const wishTextEl = document.getElementById("wishText");
    const wishNextBtn = document.getElementById("wishNextBtn");
    // const wishCardContainer = document.getElementById("wishCardContainer");
    // const twfrBtn = document.getElementById("btn24");

    const wishes24 = [
        "Будь щасливою ❤️",
        "Посміхайся частіше 😊",
        "Ти кохана 🌟",
        "Ти неймовірна 😘",
        "В тебе завжди гарний мейк 🌸",
        "Завжди залишайся собою 💖",
        "Будь Вільною 🎉",
        "Тримай своє серденько теплим 🔥",
        "Будь сміливою та впевненою 💪",
        "Будь закусаною 🤗",
        "Будь зацілованою ❤️",
        "Радій маленьким речам 🌷",
        "Креатив! 🎨",
        "Живи, поки є момент 💼",
        "Будь терплячою 🦉",
        "Не хворій 💪",
        "Надихайся 🌍",
        "Не віддавай своє 🏖️",
        "Будь найкращою україночкою 🎶",
        "Не стримувася 💝",
        "Ти чарівна ✨",
        "Будь булочкою 🎂",
        "Приймай людей, які тобі віддають Все 🌞",
        "Будь у гармонії з собою 🕊️"
    ];

    twfrBtn.onclick = () => {
        showWishes24Screen();
    };

    wishes24Back.onclick = () => {
        showScreen(menu);
    };

    let currentWishIndex = 0;
    let wishStage = 0;

    function showWishes24Screen() {
        reserWish24Data();
        showScreen(wishes24Screen);
        renderWish();
    } 

    function renderWish() {

        if (currentWishIndex < wishes24.length) {

            wishNumberEl.textContent = `${currentWishIndex+1} побажання`;
            renderCards(wishes24[currentWishIndex]);

        } else if (wishStage === 0) {

            wishNumberEl.textContent = "";
            renderCards("Тепер, 24 причини, чому ти мені дуже подобаєшся");
            wishStage = 1;

        } else if (wishStage === 1) {

            renderCards("Жартую. Ти моя рідна, мій вибір. Не треба для цього причин");
            wishStage = 2;

        } else if (wishStage === 2) {

            wishTextEl.textContent = "";
            wishTextEl.classList.add("hidden");
            wishNextBtn.classList.add("hidden");

            const wishtext =
                "Маленьки кроки. Будь-які дії та бездіяльність має значення, а тим паче наслідки. Не забувай про це. Кожен маленький крок, як і кожне маленьке побажання, - твій крок, який, врешті, вибудує в тобі ТЕБЕ. І яким би він не був, я буду поруч  🤗";

            renderWishesCard(wishtext, wishes24Title);

            const lastbtn = document.createElement("button");
            lastbtn.className = "lastWishBtn";
            lastbtn.textContent = "Повернутись та отримати зоряне небо";

            lastbtn.onclick = async () => {
                sheBtn.disabled = false;
                moonBtn.disabled = false;
                moonBtn.style.opacity = 1;
                await showScreen(menu);

                deleteRenderWishesCard();
                lastbtn.remove();
            };

            wishes24Title.appendChild(lastbtn);
        }
    }

    function reserWish24Data() {
        currentWishIndex = 0;
        wishStage = 0;

        wishTextEl.classList.remove("hidden");
        wishNextBtn.classList.remove("hidden");

        // Видаляємо відрендерену картку побажань
        deleteRenderWishesCard();
        
        // Видаляємо кнопку "Повернутися", якщо вона існує
        const existingBtn = wishes24Screen.querySelector(".lastWishBtn");
        if (existingBtn) existingBtn.remove();

    }

    function renderCards(wishCardText) {
        wishTextEl.textContent = wishCardText;
        wishTextEl.classList.remove("show");
        setTimeout(()=> wishTextEl.classList.add("show"), 50);
    }

    // функція для звичайного переходу по побажаннях
    function handleNextWish() {
        currentWishIndex++;
        renderWish();
    }

    // кнопка Далі
    wishNextBtn.onclick = handleNextWish;

}