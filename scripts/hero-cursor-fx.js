const heroBg = document.getElementById("hero-bg");
const supportsCursorEffect =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroBg && supportsCursorEffect) {
    let animationFrame;

    const updateCursorPosition = (event) => {
        cancelAnimationFrame(animationFrame);

        animationFrame = requestAnimationFrame(() => {
            const heroRect = heroBg.getBoundingClientRect();

            const cursorX = event.clientX - heroRect.left;
            const cursorY = event.clientY - heroRect.top;

            const isInsideHero =
                cursorX >= 0 &&
                cursorX <= heroRect.width &&
                cursorY >= 0 &&
                cursorY <= heroRect.height;

            if (!isInsideHero) {
                heroBg.classList.remove("is-active");
                return;
            }

            heroBg.classList.add("cursor-effect-enabled");
            heroBg.classList.add("is-active");

            heroBg.style.setProperty("--cursor-x", `${cursorX}px`);
            heroBg.style.setProperty("--cursor-y", `${cursorY}px`);
        });
    };

    window.addEventListener("pointermove", updateCursorPosition);
}
