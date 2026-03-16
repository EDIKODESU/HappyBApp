import { showScreen } from "./screenManager.js";
import { renderWishesCard, deleteRenderWishesCard } from "./wishCard.js";
import { menu, quizScreen, quizBtn, twfrBtn, cloudWrapper, cloudBtn  } from "./valueScreen.js";


export function initQuiz(){
    const quizBack = document.getElementById("quizBack");

    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const resultEl = document.getElementById("result");
    const nextBtn = document.getElementById("nextBtn");

    let currentQuestion = 0;

    const quizData = [
        {
            question:"Які квіти тобі не дуже подобаються (на цей раз точно зап'ятав)?",
            answers:[
                {text:"Хризантеми", correct:false},
                {text:"Бордові крупні троянди", correct:true},
                {text:"Елегантні орхідеї", correct:false}
            ]
        },

        {
            question:"Хто мене покусав при першій зустрічі?",
            answers:[
                {text:"Бостон", correct:false},
                {text:"Всі, хто тільки міг", correct:false}, 
                {text:"Лєрочка, ділова кавбаса", correct:true}
            ]
        },

        {
            question:"Хто перший вирішив познайомитись та проявив ініциативу?",
            answers:[
                {text:"Я, ділова кавбаса. Осл така доля", correct:true},
                {text:"Ти, бо Михасик наговорив багато про мене", correct:false},
                {text:"В усьому винен Михасик )", correct:false}
            ]
        },

        {
            question:"Хто перший написав 'люблю'",
            answers:[
                {text:"Я, у 2023, коли писав тобі привітання з ДН", correct:false},
                {text:"Ти, у 2023, коли написала про свої почуття", correct:false},
                {text:"Ти, у 2021 Марку, привласнюючи його собі і тільки", correct:true}
            ]
        },

        {
            question:"Хто найкраще Сонечко в світі? Сама класна - рідна",
            answers:[
                {text:"Ти", correct:true},
                {text:"Ти", correct:true},
                {text:"Ти", correct:true}
            ]
        }
    ];

    quizBtn.onclick = () => {
        showScreen(quizScreen);
        resetQuiz();
        loadQuestion();
    };

    quizBack.onclick = () => {
        showScreen(menu);
    };

    function resetQuiz(){

        currentQuestion = 0;
        nextBtn.textContent = "Далі";
        resultEl.textContent = "";

        deleteRenderWishesCard();
        
        const existingBtn = quizScreen.querySelector(".lastWishBtn");
        if (existingBtn) existingBtn.remove();

    }

    function loadQuestion() {

        nextBtn.classList.remove("hidden");
        nextBtn.disabled = true;
        nextBtn.style.width = "200px";

        resultEl.textContent = "";

        const q = quizData[currentQuestion];

        questionEl.textContent = q.question;

        answersEl.replaceChildren();

        q.answers.forEach(answer => {

            const btn = document.createElement("button");
            btn.textContent = answer.text;
            btn.onclick = () => {
                if(answer.correct){

                    resultEl.textContent="Хє-хє, Ти велика молодець :)";
                    nextBtn.disabled = false;
                    nextBtn.style.width = "90%";

                }else{

                    resultEl.textContent = "Ану, спробуй ще ❤️";
                    nextBtn.disabled=true;
                    nextBtn.style.width = "200px";
                }
            };

            answersEl.appendChild(btn);

        });

    }

    nextBtn.onclick = ()=>{
        currentQuestion++;
        

        if(currentQuestion < quizData.length){

            loadQuestion(); 

        }else{

            questionEl.textContent="";
            answersEl.innerHTML="";
            resultEl.textContent = "";
            nextBtn.classList.add("hidden");

            const wishtext = "Минуле. Не забувай про свій проденний шлях: ким ти була, які в тебе були друзі та мрії, яка ти є зараз ❤️";

            renderWishesCard(wishtext, answersEl);
            const lastbtn = document.createElement("button");
            lastbtn.className = "lastWishBtn";
            lastbtn.type = "button";
            lastbtn.textContent = "Повернутися та отримати хмарку";

            lastbtn.onclick = async () => {
                twfrBtn.disabled = false;
                cloudWrapper.disabled = false;
                cloudWrapper.style.opacity = 1;
                await showScreen(menu);
                resetQuiz();
                deleteRenderWishesCard();
                lastbtn.remove();
            };

            answersEl.appendChild(lastbtn);

        }

    };

}