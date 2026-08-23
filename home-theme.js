(() => {
    "use strict";

    const STORAGE_KEY = "dk-theme";
    const buttons = document.querySelectorAll("#homeThemeToggle, .home-theme-toggle");

    const applyTheme = (mode) => {
        const light = mode === "light";
        document.body.classList.toggle("dk-light", light);
        // Keep the existing home-light class so the home design remains compatible.
        document.body.classList.toggle("home-light", light);

        buttons.forEach((button) => {
            button.setAttribute(
                "aria-label",
                light ? "Switch to dark mode" : "Switch to light mode"
            );
            button.setAttribute(
                "title",
                light ? "Switch to dark mode" : "Switch to light mode"
            );

            const sun = button.querySelector(".theme-sun");
            const moon = button.querySelector(".theme-moon");
            if (sun) sun.style.display = light ? "none" : "inline";
            if (moon) moon.style.display = light ? "inline" : "none";
        });
    };

    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("dk-home-theme");
    const initial = saved === "light" ? "light" : "dark";
    applyTheme(initial);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const next = document.body.classList.contains("dk-light") ? "dark" : "light";
            localStorage.setItem(STORAGE_KEY, next);
            applyTheme(next);
        });
    });
})();
