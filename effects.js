(() => {
    "use strict";

    const finePointer = window.matchMedia("(pointer:fine)").matches;


    /* =========================================================
       CURSOR
       ========================================================= */

    if (finePointer) {

        const cursor = document.createElement("div");
        const dot = document.createElement("div");

        cursor.className = "dk-cursor";
        dot.className = "dk-cursor-dot";

        document.body.append(cursor, dot);


        /* -----------------------------------------
           Direct mouse position
           No interpolation
           No lag
           ----------------------------------------- */

        window.addEventListener("mousemove", (event) => {

            const x = event.clientX;
            const y = event.clientY;


            document.documentElement.style.setProperty(
                "--mx",
                `${x}px`
            );

            document.documentElement.style.setProperty(
                "--my",
                `${y}px`
            );


            /* Exact mouse position */

            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;

            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;


            document.body.classList.add(
                "dk-cursor-ready"
            );

        }, {
            passive: true
        });


        /* -----------------------------------------
           Cursor hover
           ----------------------------------------- */

        document.addEventListener(
            "mouseover",
            (event) => {

                const target =
                    event.target.closest(
                        "a, button, " +
                        ".skill-card, " +
                        ".certificate-card, " +
                        ".project-image, " +
                        ".profile-image"
                    );


                if (target) {

                    document.body.classList.add(
                        "dk-hover"
                    );

                }

            }
        );


        document.addEventListener(
            "mouseout",
            (event) => {

                const target =
                    event.target.closest(
                        "a, button, " +
                        ".skill-card, " +
                        ".certificate-card, " +
                        ".project-image, " +
                        ".profile-image"
                    );


                if (
                    target &&
                    !target.contains(
                        event.relatedTarget
                    )
                ) {

                    document.body.classList.remove(
                        "dk-hover"
                    );

                }

            }
        );

    }



    /* =========================================================
       REVEAL ON SCROLL
       ========================================================= */

    const revealTargets =
        document.querySelectorAll(

            ".title, " +
            ".about_main, " +
            ".skills-container, " +
            ".skill-card, " +
            ".project, " +
            ".certificate-card, " +
            ".contact-title, " +
            ".contact-container, " +
            ".contact-info, " +
            ".contact-form-section, " +
            ".mainContent"

        );


    revealTargets.forEach(
        (element, index) => {

            element.classList.add(
                "dk-reveal"
            );


            element.style.transitionDelay =
                `${Math.min(index % 6, 5) * 70}ms`;

        }
    );


    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "dk-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealTargets.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =========================================================
       GENTLE CARD TILT
       ========================================================= */

    if (finePointer) {

        document
            .querySelectorAll(
                ".skill-card, " +
                ".certificate-card, " +
                ".project-image"
            )
            .forEach(
                (card) => {


                    card.addEventListener(
                        "mousemove",
                        (event) => {

                            const rect =
                                card.getBoundingClientRect();


                            const px =
                                (
                                    event.clientX -
                                    rect.left
                                ) / rect.width;


                            const py =
                                (
                                    event.clientY -
                                    rect.top
                                ) / rect.height;


                            const rotateY =
                                (px - 0.5) * 5;


                            const rotateX =
                                (0.5 - py) * 5;


                            card.style.transform =
                                `perspective(900px)
                                 rotateX(${rotateX}deg)
                                 rotateY(${rotateY}deg)
                                 translateY(-4px)`;

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        () => {

                            card.style.transform =
                                "";

                        }
                    );

                }
            );

    }



    /* =========================================================
       HOME PHOTO PARALLAX
       ========================================================= */

    if (finePointer) {

        const photo =
            document.querySelector(
                ".profile-design"
            );


        if (photo) {

            photo.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        photo.getBoundingClientRect();


                    const px =
                        (
                            event.clientX -
                            rect.left
                        ) / rect.width - 0.5;


                    const py =
                        (
                            event.clientY -
                            rect.top
                        ) / rect.height - 0.5;


                    photo.style.transform =
                        `perspective(1000px)
                         rotateY(${px * 7}deg)
                         rotateX(${-py * 7}deg)`;

                }
            );


            photo.addEventListener(
                "mouseleave",
                () => {

                    photo.style.transform =
                        "";

                }
            );

        }

    }



    /* =========================================================
       MISSING IMAGE FALLBACK
       ========================================================= */

    document
        .querySelectorAll("img")
        .forEach(
            (img) => {

                img.addEventListener(
                    "error",
                    () => {

                        if (
                            img.dataset.fallbackDone
                        ) {
                            return;
                        }


                        img.dataset.fallbackDone =
                            "true";


                        const box =
                            document.createElement(
                                "div"
                            );


                        box.className =
                            "dk-broken-image";


                        box.innerHTML =
                            `<div>
                                <strong>DK</strong>
                                ${img.alt || "Preview"}
                            </div>`;


                        img.replaceWith(
                            box
                        );

                    }
                );

            }
        );



    /* =========================================================
       ESCAPE → CLOSE CERTIFICATE MODAL
       ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const popup =
                document.getElementById(
                    "popup"
                );


            if (popup) {

                popup.style.display =
                    "none";

            }

        }
    );

})();



/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

(() => {

    const bar =
        document.querySelector(
            ".dk-scroll-progress"
        );


    if (!bar) {
        return;
    }


    const update = () => {

        const max =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            max > 0
                ? (
                    window.scrollY /
                    max
                ) * 100
                : 0;


        bar.style.width =
            `${progress}%`;

    };


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        update
    );


    update();

})();




/* =========================================================
   ACTIVE NAVIGATION
   Works for both:
   1. normal multi-page navigation
   2. single-page anchor navigation
========================================================= */

(() => {
    const links = [...document.querySelectorAll("nav a")];

    /* =========================================================
       NAVIGATION
       HOME is the single-page showcase. The other nav items
       intentionally open their own pages, just like the original
       multi-page portfolio.
    ========================================================= */

    const isHomePage = (() => {
        const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
        return file === "" || file === "index.html";
    })();

    if (isHomePage) {
        /* Keep HOME active while scrolling through all sections. */
        links.forEach((link) => {
            link.classList.toggle(
                "active",
                (link.getAttribute("href") || "").split("#")[0].endsWith("index.html")
                || (link.getAttribute("href") || "").trim() === "index.html"
            );
        });
    } else {
        /* Individual pages: only the current page is active. */
        const current =
            (location.pathname.split("/").pop() || "index.html").toLowerCase();

        links.forEach((link) => {
            const href = (link.getAttribute("href") || "").split("#")[0];
            if (!href) return;

            const file = href.split("/").pop().toLowerCase();
            link.classList.toggle("active", file === current);
        });
    }
})();
