export function renderWishesCard(text, screenContainer){

    const card = document.createElement("div");
    card.id = "wishesCard";

    const cardText = document.createElement("div");
    cardText.className = "wishesText";
    cardText.textContent = text;

    card.appendChild(cardText);

    // додаємо картку перед кнопками
    screenContainer.appendChild(card);

}

export function deleteRenderWishesCard(){

    const card = document.getElementById("wishesCard");

    if(card){
        card.remove();
    }

}