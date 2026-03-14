import { showScreen } from "./screenManager.js";
import { heartExplosion } from "./hearts.js";
import { start, menu, cloudBtn, cloudWrapper } from "./valueScreen.js";

export function initMenu() {
    
    const heartBtn = document.getElementById("heartBtn");
    const backBtn = document.getElementById("backBtn");

    heartBtn.onclick = () => {

        const rect = heartBtn.getBoundingClientRect();

        const x = rect.left + rect.width/2;
        const y = rect.top + rect.height/2;

        heartExplosion(x,y);

        setTimeout(()=>{
            showScreen(menu);
        },500);

    };

    backBtn.onclick = () => {
        showScreen(start);
    };



    const phrases = ['чарівна', 'серденько', 'найтепліша', 'усміхнись', 'ціную тебе', 'зіронька', '✨', '❤️'];

    let wordIndex = 0;

    cloudWrapper.addEventListener('click', () => {
        // 1. Створюємо елемент слова
        const word = document.createElement('div');
        word.className = 'falling-word';
        
        // Беремо слово по черзі
        word.innerText = phrases[wordIndex];
        wordIndex = (wordIndex + 1) % phrases.length; // Повертаємося до початку після останнього слова

        // 2. Додаємо в контейнер
        // cloudBtn.parentElement.appendChild(word);
        cloudWrapper.after(word);

        // 4. Видаляємо слово після завершення анімації
        setTimeout(() => {
            word.remove();
        }, 2000);
    });

}