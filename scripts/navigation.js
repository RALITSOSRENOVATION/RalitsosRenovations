document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const navToggle = document.querySelector(".nav-toggle");
    const topNav = document.getElementById("top-nav");

    if (!header || !navToggle || !topNav) {
        return;
    }


    /* MENU STATE */

    const mobileMenuQuery = window.matchMedia("(max-width: 48rem)");

    const closeMenu = (returnFocus = false) => {
        const wasOpen = header.classList.contains("is-nav-open");

        header.classList.remove("is-nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Άνοιγμα μενού");

        if (returnFocus && wasOpen) {
            navToggle.focus();
        }
    };

    const openMenu = () => {
        header.classList.add("is-nav-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Κλείσιμο μενού");
    };

    document.documentElement.classList.add("nav-enhanced");
    /* ---------- */


    /* MENU EVENTS */

    navToggle.addEventListener("click", () => {
        if (header.classList.contains("is-nav-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    topNav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (mobileMenuQuery.matches && !header.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu(true);
        }
    });

    header.addEventListener("focusout", () => {
        window.requestAnimationFrame(() => {
            if (mobileMenuQuery.matches && !header.contains(document.activeElement)) {
                closeMenu();
            }
        });
    });

    const handleBreakpointChange = (event) => {
        if (!event.matches) {
            closeMenu();
        }
    };

    if (mobileMenuQuery.addEventListener) {
        mobileMenuQuery.addEventListener("change", handleBreakpointChange);
    } else {
        mobileMenuQuery.addListener(handleBreakpointChange);
    }
    /* ---------- */
});
