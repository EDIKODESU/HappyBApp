export function showScreen(screen) {

    return new Promise((resolve) => {

        document.querySelectorAll(".screen").forEach(el => {
            el.classList.add("hidden");
        });

        setTimeout(() => {
            screen.classList.remove("hidden");
            resolve();
        }, 300);

    });

}