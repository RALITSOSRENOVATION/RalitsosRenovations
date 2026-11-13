document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("#projects-collection-section .project-image-container");


    const loadMoreBtn = document.getElementById("loadMore");
    const counter = document.querySelector(".projects-counter");

    if (!images.length || !loadMoreBtn || !counter) {
        return;
    }


    /* RESPONSIVE SETTINGS */

    const getImagesPerClick = () => {
        if (window.matchMedia("(max-width: 48rem)").matches) {
            return 6;
        }

        if (window.matchMedia("(max-width: 64rem)").matches) {
            return 12;
        }

        return 18;
    };

    let visibleImages = getImagesPerClick();
    /* ---------- */


    /* PROJECT DISPLAY */

    function updateProjects(shouldManageFocus = false) {
        images.forEach((image, index) => {
            image.classList.toggle("is-hidden", index >= visibleImages);
        });

        const isComplete = visibleImages >= images.length;
        const shouldFocusCounter =
            shouldManageFocus &&
            isComplete &&
            document.activeElement === loadMoreBtn;

        if (shouldFocusCounter) {
            counter.setAttribute("aria-live", "off");
        }

        counter.textContent = `Εμφανίζονται ${Math.min(visibleImages, images.length)} από ${images.length} φωτογραφίες`;

        if (shouldFocusCounter) {
            counter.setAttribute("tabindex", "-1");
            counter.focus();

            counter.addEventListener("blur", () => {
                counter.removeAttribute("tabindex");
            }, { once: true });
        }

        loadMoreBtn.hidden = isComplete;

        if (shouldFocusCounter) {
            window.requestAnimationFrame(() => {
                counter.setAttribute("aria-live", "polite");
            });
        }
    }

    loadMoreBtn.addEventListener("click", () => {
        visibleImages += getImagesPerClick();
        updateProjects(true);
    });


    updateProjects();

    window.requestAnimationFrame(() => {
        counter.setAttribute("aria-live", "polite");
    });
    /* ---------- */
});




