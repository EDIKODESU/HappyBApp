import { initMenu } from "./menu.js";
import { initQuiz } from "./quiz.js";
import { initWishes24 } from "./wishes24.js";
import { initSheCards } from "./sheCard.js";
import { initGreeting } from "./greeting.js";
import { initStars } from "./stars.js";

document.addEventListener("DOMContentLoaded", () => {

    initMenu();
    initQuiz();
    initWishes24();
    initSheCards();
    initGreeting();
    initStars();

});