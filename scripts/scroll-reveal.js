document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        return;
    }


    /* ANIMATION GROUPS */

    const galleryColumns = window.matchMedia("(max-width: 48rem)").matches
        ? 1
        : window.matchMedia("(max-width: 64rem)").matches
            ? 2
            : 3;

    const animationGroups = [
        {
            selector: "#experience-section > *, #home-contact-section > *, #projects-cta-section > *, #contact-container > *",
            delayStep: 90,
            delayCycle: 2
        },
        {
            selector: ".services-title, #testimonials-section > h2",
            delayStep: 0,
            delayCycle: 1
        },
        {
            selector: ".services-list li, .projects-cards",
            delayStep: 0,
            delayCycle: 1
        },
        {
            selector: "#projects-section > h2, #projects-section > .title-description, .why-us-header, .why-us-context",
            delayStep: 80,
            delayCycle: 2
        },
        {
            selector: ".testimonials-cards",
            delayStep: 70,
            delayCycle: 3
        },
        {
            selector: ".project-image-container",
            delayStep: galleryColumns === 1 ? 0 : 45,
            delayCycle: galleryColumns,
            subtle: true
        },
        {
            selector: ".projects-footer",
            delayStep: 0,
            delayCycle: 1,
            subtle: true
        },
        {
            selector: "footer .footer-column",
            delayStep: 60,
            delayCycle: 3,
            subtle: true
        }
    ];
    /* ---------- */


    /* ELEMENT SETUP */

    const revealElements = new Set();

    animationGroups.forEach((group) => {
        const elements = document.querySelectorAll(group.selector);

        elements.forEach((element, index) => {
            if (revealElements.has(element)) {
                return;
            }

            const revealDelay = (index % group.delayCycle) * group.delayStep;
            const originalOpacity = window.getComputedStyle(element).opacity;

            element.classList.add("scroll-reveal");
            element.style.setProperty("--reveal-delay", `${revealDelay}ms`);
            element.style.setProperty("--reveal-opacity", originalOpacity);

            if (group.subtle) {
                element.classList.add("scroll-reveal-subtle");
            }

            revealElements.add(element);
        });
    });
    /* ---------- */


    /* SCROLL OBSERVER */

    const cleanupRevealElement = (element) => {
        element.classList.remove("scroll-reveal", "scroll-reveal-subtle", "is-visible");
        element.style.removeProperty("--reveal-delay");
        element.style.removeProperty("--reveal-opacity");
    };

    const revealElement = (element) => {
        if (element.classList.contains("is-visible")) {
            return;
        }

        element.classList.add("is-visible");
        revealObserver.unobserve(element);

        const handleTransitionEnd = (event) => {
            if (event.propertyName !== "transform") {
                return;
            }

            element.removeEventListener("transitionend", handleTransitionEnd);
            cleanupRevealElement(element);
        };

        element.addEventListener("transitionend", handleTransitionEnd);
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            revealElement(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    document.documentElement.classList.add("reveal-ready");

    document.addEventListener("focusin", (event) => {
        const focusedRevealElement = event.target.closest(".scroll-reveal");

        if (focusedRevealElement) {
            revealObserver.unobserve(focusedRevealElement);
            cleanupRevealElement(focusedRevealElement);
        }
    });
    /* ---------- */
});
