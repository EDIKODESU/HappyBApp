export function heartExplosion(x, y){

    const count = 12;

    for(let i=0;i<count;i++){

        const heart = document.createElement("div");

        heart.className = "flying-heart";
        heart.textContent = "❤️";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random()*40;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        heart.style.left = x + "px";
        heart.style.top = y + "px";

        heart.style.setProperty("--x", moveX + "px");
        heart.style.setProperty("--y", moveY + "px");

        document.body.appendChild(heart);

        setTimeout(()=>{
            heart.remove();
        },1000);

    }

}