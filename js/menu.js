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
        const word = document.createElement('div');
        word.className = 'falling-word';
        
        word.innerText = phrases[wordIndex];
        wordIndex = (wordIndex + 1) % phrases.length; 

        // cloudBtn.parentElement.appendChild(word);
        cloudWrapper.after(word);

        setTimeout(() => {
            word.remove();
        }, 2000);
    });

}