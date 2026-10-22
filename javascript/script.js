/* =========================================================
   ANS DIGITAL
   JAVASCRIPT
   VERSION 3.4.0
   PROFESSIONAL • CLEAN • RESPONSIVE
   ========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL CONFIG
   ========================================================= */

const ANS_CONFIG = {
    heroDelay: 200,
    heroItemDelay: 220,
    heroCardDelay: 400,
    counterDuration: 1800,
    backToTopOffset: 500
};


/* =========================================================
   02. PREVENT DOUBLE INITIALIZATION
   ========================================================= */

if (!window.__ANS_DIGITAL_JS_LOADED__) {

    window.__ANS_DIGITAL_JS_LOADED__ = true;


    /* =====================================================
       03. DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {

        initHeroAnimation();
        initScrollReveal();
        initHadrohMenu();
        initHadrohPopup();
        initProductDropdown();
        initSmoothScroll();
        initHadrohVideo();
        initMobileMenu();
        initBackToTop();
        initCounters();
        initImageErrorHandler();
        initAccessibility();

    });


    /* =====================================================
       04. REDUCED MOTION
       ===================================================== */

    function prefersReducedMotion() {

        return (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        );

    }


    /* =====================================================
       05. HERO ANIMATION
       ===================================================== */

    function initHeroAnimation() {

        const hero =
            document.querySelector(".hero");

        if (!hero) return;


        const items =
            hero.querySelectorAll(
                ".hero-animate"
            );

        const card =
            hero.querySelector(
                ".hero-card-animate"
            );


        if (prefersReducedMotion()) {

            items.forEach(item => {

                item.classList.add(
                    "hero-show"
                );

            });


            if (card) {

                card.classList.add(
                    "hero-card-show"
                );

            }

            return;
        }


        items.forEach((item, index) => {

            setTimeout(() => {

                item.classList.add(
                    "hero-show"
                );

            }, ANS_CONFIG.heroDelay +
                (index * ANS_CONFIG.heroItemDelay));

        });


        if (card) {

            setTimeout(() => {

                card.classList.add(
                    "hero-card-show"
                );

            }, ANS_CONFIG.heroCardDelay);

        }

    }


    /* =====================================================
       06. SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal, .scroll-reveal, .animate-on-scroll"
            );

        if (!elements.length) return;


        if (prefersReducedMotion()) {

            elements.forEach(element => {

                element.classList.add("active");
                element.classList.add("show");
                element.classList.add("revealed");

            });

            return;
        }


        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    (entries, obs) => {

                        entries.forEach(entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "active"
                            );

                            entry.target.classList.add(
                                "show"
                            );

                            entry.target.classList.add(
                                "revealed"
                            );


                            obs.unobserve(
                                entry.target
                            );

                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin:
                            "0px 0px -50px 0px"
                    }
                );


            elements.forEach(element => {

                observer.observe(element);

            });

        } else {

            elements.forEach(element => {

                element.classList.add(
                    "active"
                );

            });

        }

    }


    /* =====================================================
       07. HADROH MENU
       ===================================================== */

    function initHadrohMenu() {

        const menus =
            document.querySelectorAll(
                ".hadroh-menu"
            );

        if (!menus.length) return;


        menus.forEach(menu => {

            menu.setAttribute(
                "aria-hidden",
                "true"
            );

        });


        document.addEventListener(
            "click",
            event => {

                const clickedMenu =
                    event.target.closest(
                        ".hadroh-menu"
                    );

                const clickedCard =
                    event.target.closest(
                        ".hadroh-product-card"
                    );


                if (
                    clickedMenu ||
                    clickedCard
                ) {
                    return;
                }


                closeAllHadrohMenus();

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    closeAllHadrohMenus();

                }

            }
        );


        document
            .querySelectorAll(
                ".hadroh-product-card"
            )
            .forEach(card => {

                let hoverTimer;


                card.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            window.matchMedia(
                                "(hover: none)"
                            ).matches
                        ) {
                            return;
                        }


                        clearTimeout(
                            hoverTimer
                        );


                        const menu =
                            card.querySelector(
                                ".hadroh-menu"
                            );


                        if (!menu) return;


                        hoverTimer =
                            setTimeout(() => {

                                closeAllHadrohMenus(
                                    menu
                                );


                                menu.classList.add(
                                    "active"
                                );


                                menu.setAttribute(
                                    "aria-hidden",
                                    "false"
                                );

                            }, 80);

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        if (
                            window.matchMedia(
                                "(hover: none)"
                            ).matches
                        ) {
                            return;
                        }


                        clearTimeout(
                            hoverTimer
                        );

                    }
                );

            });

    }


    /* =====================================================
       08. TOGGLE HADROH MENU
       ===================================================== */

    window.toggleHadrohMenu =
        function(menuId) {

            const menu =
                document.getElementById(
                    menuId
                );


            if (!menu) return;


            const isOpen =
                menu.classList.contains(
                    "active"
                );


            closeAllHadrohMenus();


            if (!isOpen) {

                menu.classList.add(
                    "active"
                );

                menu.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }

        };


    /* =====================================================
       09. CLOSE ALL HADROH MENUS
       ===================================================== */

    function closeAllHadrohMenus(
        exceptMenu = null
    ) {

        document
            .querySelectorAll(
                ".hadroh-menu.active"
            )
            .forEach(menu => {

                if (
                    menu === exceptMenu
                ) {
                    return;
                }


                menu.classList.remove(
                    "active"
                );


                menu.setAttribute(
                    "aria-hidden",
                    "true"
                );

            });

    }


    /* =====================================================
       10. HADROH IMAGE POPUP
       ===================================================== */

    function initHadrohPopup() {

        const popup =
            document.getElementById(
                "hadrohImagePopup"
            );


        if (!popup) return;


        popup.addEventListener(
            "click",
            event => {

                if (
                    event.target === popup
                ) {

                    closeHadrohImage();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    popup.classList.contains(
                        "active"
                    )
                ) {

                    closeHadrohImage();

                }

            }
        );

    }


    /* =====================================================
       11. OPEN HADROH IMAGE
       ===================================================== */

    window.openHadrohImage =
        function(
            imageSrc,
            title = ""
        ) {

            const popup =
                document.getElementById(
                    "hadrohImagePopup"
                );

            const image =
                document.getElementById(
                    "hadrohPreviewImage"
                );

            const titleElement =
                document.getElementById(
                    "hadrohPreviewTitle"
                );


            if (!popup || !image) {
                return;
            }


            image.src = imageSrc;

            image.alt =
                title ||
                "Preview Produk ANS Hadroh";


            if (titleElement) {

                titleElement.textContent =
                    title;

            }


            popup.classList.add(
                "active"
            );


            popup.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "hadroh-popup-open"
            );


            const closeButton =
                popup.querySelector(
                    ".popup-close, .close-popup, [data-close-popup]"
                );


            if (closeButton) {

                setTimeout(() => {

                    closeButton.focus();

                }, 50);

            }

        };


    /* =====================================================
       12. CLOSE HADROH IMAGE
       ===================================================== */

    window.closeHadrohImage =
        function() {

            const popup =
                document.getElementById(
                    "hadrohImagePopup"
                );


            if (!popup) return;


            popup.classList.remove(
                "active"
            );


            popup.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "hadroh-popup-open"
            );


            const image =
                document.getElementById(
                    "hadrohPreviewImage"
                );


            if (image) {

                image.src = "";

            }

        };


    /* =====================================================
       13. DIGITAL PRODUCT DROPDOWN
       ===================================================== */

    function initProductDropdown() {

        const dropdowns =
            document.querySelectorAll(
                ".product-dropdown"
            );


        if (!dropdowns.length) {
            return;
        }


        dropdowns.forEach(dropdown => {

            const button =
                dropdown.querySelector(
                    ".dropdown-toggle"
                );

            const list =
                dropdown.querySelector(
                    ".product-list"
                );


            if (!button || !list) {
                return;
            }


            list.setAttribute(
                "aria-hidden",
                "true"
            );


            button.setAttribute(
                "aria-expanded",
                "false"
            );


            button.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        toggleProductList(
                            button
                        );

                    }

                }
            );

        });


        document.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".product-dropdown"
                    )
                ) {
                    return;
                }


                closeProductDropdowns();

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeProductDropdowns();

                }

            }
        );

    }


    /* =====================================================
       14. TOGGLE PRODUCT LIST
       ===================================================== */

    window.toggleProductList =
        function(button) {

            if (!button) return;


            const dropdown =
                button.closest(
                    ".product-dropdown"
                );


            if (!dropdown) return;


            const list =
                dropdown.querySelector(
                    ".product-list"
                );


            if (!list) return;


            const isOpen =
                dropdown.classList.contains(
                    "active"
                );


            closeProductDropdowns(
                dropdown
            );


            if (!isOpen) {

                dropdown.classList.add(
                    "active"
                );


                list.classList.add(
                    "active"
                );


                list.setAttribute(
                    "aria-hidden",
                    "false"
                );


                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        };


    /* =====================================================
       15. CLOSE PRODUCT DROPDOWNS
       ===================================================== */

    function closeProductDropdowns(
        exceptDropdown = null
    ) {

        document
            .querySelectorAll(
                ".product-dropdown"
            )
            .forEach(dropdown => {

                if (
                    dropdown === exceptDropdown
                ) {
                    return;
                }


                dropdown.classList.remove(
                    "active"
                );


                const list =
                    dropdown.querySelector(
                        ".product-list"
                    );


                if (list) {

                    list.classList.remove(
                        "active"
                    );


                    list.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }


                const button =
                    dropdown.querySelector(
                        ".dropdown-toggle"
                    );


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

    }


    /* =====================================================
       16. SMOOTH SCROLL
       ===================================================== */

    function initSmoothScroll() {

        document
            .querySelectorAll(
                'a[href^="#"], a[href*="#"]'
            )
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {
                            return;
                        }


                        const hashIndex =
                            href.indexOf("#");


                        if (hashIndex === -1) {
                            return;
                        }


                        const hash =
                            href.substring(
                                hashIndex
                            );


                        if (
                            !hash ||
                            hash === "#"
                        ) {
                            return;
                        }


                        let target;


                        try {

                            target =
                                document.querySelector(
                                    hash
                                );

                        } catch (error) {

                            return;

                        }


                        if (!target) {
                            return;
                        }


                        const linkPage =
                            href
                                .split("#")[0]
                                .split("/")
                                .pop();


                        const currentPage =
                            window.location.pathname
                                .split("/")
                                .pop();


                        const samePage =
                            linkPage === "" ||
                            linkPage === currentPage ||
                            (
                                linkPage ===
                                "index.html" &&
                                (
                                    currentPage === "" ||
                                    currentPage ===
                                    "index.html"
                                )
                            );


                        if (!samePage) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:
                                prefersReducedMotion()
                                    ? "auto"
                                    : "smooth",

                            block: "start"

                        });


                        closeMobileMenu();

                    }
                );

            });

    }


    /* =====================================================
       17. HADROH VIDEO
       ===================================================== */

    function initHadrohVideo() {

        const videos =
            document.querySelectorAll(
                ".hadroh-video-grid video"
            );


        if (!videos.length) {
            return;
        }


        videos.forEach(video => {

            video.addEventListener(
                "play",
                () => {

                    videos.forEach(
                        otherVideo => {

                            if (
                                otherVideo !==
                                video
                            ) {

                                otherVideo.pause();

                            }

                        }
                    );

                }
            );


            video.addEventListener(
                "ended",
                () => {

                    try {

                        video.currentTime = 0;

                    } catch (error) {

                        /* Ignore */

                    }

                }
            );

        });

    }


    /* =====================================================
       18. MOBILE MENU
       SESUAI DENGAN HTML + CSS ANS DIGITAL
       ===================================================== */

    function initMobileMenu() {

        const button =
            document.querySelector(
                ".menu-toggle"
            );


        const nav =
            document.querySelector(
                ".menu"
            );


        if (!button || !nav) {
            return;
        }


        const dropdown =
            nav.querySelector(
                ".menu-dropdown"
            );


        const dropdownButton =
            nav.querySelector(
                ".menu-dropdown-toggle"
            );


        /* INITIAL STATE */

        button.setAttribute(
            "aria-expanded",
            "false"
        );


        button.setAttribute(
            "aria-label",
            "Buka menu navigasi"
        );


        nav.classList.remove(
            "active"
        );


        /* LAYANAN */

        if (
            dropdown &&
            dropdownButton
        ) {

            dropdown.classList.remove(
                "active"
            );


            dropdownButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* HAMBURGER */

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    nav.classList.contains(
                        "active"
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        /* DROPDOWN LAYANAN */

        if (
            dropdown &&
            dropdownButton
        ) {

            dropdownButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        dropdown.classList.contains(
                            "active"
                        );


                    dropdown.classList.toggle(
                        "active",
                        !isOpen
                    );


                    dropdownButton.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );

                }
            );

        }


        /* LINK NAVIGASI */

        nav.querySelectorAll("a").forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            }
        );


        /* KLIK DI LUAR */

        document.addEventListener(
            "click",
            event => {

                if (
                    nav.contains(
                        event.target
                    ) ||
                    button.contains(
                        event.target
                    )
                ) {

                    return;

                }


                closeMobileMenu();

            }
        );


        /* ESCAPE */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* RESIZE */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 700
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       19. OPEN MOBILE MENU
       ===================================================== */

    function openMobileMenu() {

        const nav =
            document.querySelector(
                ".menu"
            );


        const button =
            document.querySelector(
                ".menu-toggle"
            );


        if (!nav || !button) {
            return;
        }


        nav.classList.add(
            "active"
        );


        button.classList.add(
            "active"
        );


        button.setAttribute(
            "aria-expanded",
            "true"
        );


        button.setAttribute(
            "aria-label",
            "Tutup menu navigasi"
        );

    }


    /* =====================================================
       20. CLOSE MOBILE MENU
       ===================================================== */

    function closeMobileMenu() {

        const nav =
            document.querySelector(
                ".menu"
            );


        const button =
            document.querySelector(
                ".menu-toggle"
            );


        if (nav) {

            nav.classList.remove(
                "active"
            );


            const dropdown =
                nav.querySelector(
                    ".menu-dropdown"
                );


            const dropdownButton =
                nav.querySelector(
                    ".menu-dropdown-toggle"
                );


            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );

            }


            if (dropdownButton) {

                dropdownButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }


        if (button) {

            button.classList.remove(
                "active"
            );


            button.setAttribute(
                "aria-expanded",
                "false"
            );


            button.setAttribute(
                "aria-label",
                "Buka menu navigasi"
            );

        }

    }


    /* =====================================================
       21. BACK TO TOP
       ===================================================== */

    function initBackToTop() {

        const button =
            document.querySelector(
                "#backToTop, .back-to-top"
            );


        if (!button) return;


        function updateBackToTop() {

            const show =
                window.scrollY >
                ANS_CONFIG.backToTopOffset;


            button.classList.toggle(
                "show",
                show
            );


            button.classList.toggle(
                "active",
                show
            );

        }


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        updateBackToTop();


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion()
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }


    /* =====================================================
       22. COUNTER
       ===================================================== */

    function initCounters() {

        const counters =
            document.querySelectorAll(
                "[data-counter]"
            );


        if (!counters.length) {
            return;
        }


        if (prefersReducedMotion()) {

            counters.forEach(counter => {

                const target =
                    parseInt(
                        counter.dataset.counter,
                        10
                    );


                if (
                    !Number.isNaN(target)
                ) {

                    counter.textContent =
                        target.toLocaleString(
                            "id-ID"
                        );

                }

            });

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            counters.forEach(
                animateCounter
            );

            return;

        }


        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            animateCounter(
                                entry.target
                            );


                            obs.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            observer.observe(
                counter
            );

        });

    }


    /* =====================================================
       23. ANIMATE COUNTER
       ===================================================== */

    function animateCounter(element) {

        const target =
            parseInt(
                element.dataset.counter,
                10
            );


        if (Number.isNaN(target)) {
            return;
        }


        const duration =
            ANS_CONFIG.counterDuration;


        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            element.textContent =
                value.toLocaleString(
                    "id-ID"
                );


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                element.textContent =
                    target.toLocaleString(
                        "id-ID"
                    );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    /* =====================================================
       24. IMAGE ERROR HANDLER
       ===================================================== */

    function initImageErrorHandler() {

        document.addEventListener(
            "error",
            event => {

                const image =
                    event.target;


                if (
                    image &&
                    image.tagName === "IMG"
                ) {

                    image.classList.add(
                        "image-error"
                    );

                }

            },
            true
        );

    }


    /* =====================================================
       25. ACCESSIBILITY
       ===================================================== */

    function initAccessibility() {

        document
            .querySelectorAll(
                ".hadroh-menu"
            )
            .forEach(menu => {

                if (
                    !menu.hasAttribute(
                        "aria-hidden"
                    )
                ) {

                    menu.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            });


        const popup =
            document.getElementById(
                "hadrohImagePopup"
            );


        if (popup) {

            popup.setAttribute(
                "aria-hidden",
                popup.classList.contains(
                    "active"
                )
                    ? "false"
                    : "true"
            );

        }


        document
            .querySelectorAll(
                ".product-dropdown"
            )
            .forEach(dropdown => {

                const button =
                    dropdown.querySelector(
                        ".dropdown-toggle"
                    );


                const list =
                    dropdown.querySelector(
                        ".product-list"
                    );


                if (
                    button &&
                    !button.hasAttribute(
                        "aria-expanded"
                    )
                ) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (
                    list &&
                    !list.hasAttribute(
                        "aria-hidden"
                    )
                ) {

                    list.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            });


        const menu =
            document.querySelector(
                ".menu"
            );


        const menuButton =
            document.querySelector(
                ".menu-toggle"
            );


        if (
            menu &&
            menuButton
        ) {

            menuButton.setAttribute(
                "aria-controls",
                "mainMenu"
            );

        }

    }


    /* =====================================================
       26. PUBLIC API
       ===================================================== */

    window.ANSDigital = {

        version: "3.4.0",

        closeProducts:
            closeProductDropdowns,

        closeHadrohMenus:
            closeAllHadrohMenus,

        closeMobileMenu:
            closeMobileMenu,

        openMobileMenu:
            openMobileMenu,

        closeHadrohImage:
            window.closeHadrohImage,

        animateCounters: () => {

            document
                .querySelectorAll(
                    "[data-counter]"
                )
                .forEach(counter => {

                    animateCounter(
                        counter
                    );

                });

        }

    };

}