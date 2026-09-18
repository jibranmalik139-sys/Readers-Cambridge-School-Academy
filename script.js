/* =========================================================
   READERS CAMBRIDGE SCHOOL & ACADEMY
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. PRELOADER
       ========================================================= */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("hide");

                setTimeout(() => {
                    preloader.style.display = "none";
                }, 600);

            }, 500);
        });
    }


    /* =========================================================
       2. MOBILE MENU
       ========================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!expanded)
            );
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }


    /* =========================================================
       3. SMOOTH SCROLLING
       ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetID = this.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (target) {

                e.preventDefault();

                const header =
                    document.querySelector("header");

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }

        });

    });


    /* =========================================================
       4. HEADER SCROLL EFFECT
       ========================================================= */

    const header = document.querySelector("header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


  /* =========================================================
   5. SCROLL REVEAL ANIMATION - FIXED
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

function revealElement(element) {
    element.classList.add("show");
    element.classList.add("visible");

    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.transform = "translateY(0)";
}

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    revealElement(entry.target);

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -20px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for older browsers
    revealElements.forEach(element => {
        revealElement(element);
    });

}


/* =========================================================
   FORCE VISIBLE CONTENT WHEN SECTION IS REACHED
   ========================================================= */

const allSections = document.querySelectorAll("section");

function checkSections() {

    allSections.forEach(section => {

        const rect = section.getBoundingClientRect();

        if (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        ) {

            section
                .querySelectorAll(".reveal")
                .forEach(element => {
                    revealElement(element);
                });

        }

    });

}

window.addEventListener(
    "scroll",
    checkSections,
    { passive: true }
);

window.addEventListener(
    "load",
    checkSections
);

checkSections();
    /* =========================================================
       7. NUMBER COUNTERS
       ========================================================= */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;

                    const target =
                        parseInt(
                            counter.dataset.target ||
                            counter.textContent.replace(/\D/g, "")
                        );

                    if (isNaN(target)) return;

                    let current = 0;

                    const duration = 1800;

                    const startTime =
                        performance.now();

                    function updateCounter(currentTime) {

                        const progress =
                            Math.min(
                                (currentTime - startTime) /
                                duration,
                                1
                            );

                        // Smooth easing
                        const eased =
                            1 - Math.pow(1 - progress, 3);

                        current =
                            Math.floor(target * eased);

                        counter.textContent =
                            current.toLocaleString();

                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();
                        }
                    }

                    requestAnimationFrame(updateCounter);

                    observer.unobserve(counter);
                });

            },
            {
                threshold: 0.7
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================================================
       8. 3D TILT CARDS
       ========================================================= */

    const tiltCards =
        document.querySelectorAll(".tilt-card");

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -7;

            const rotateY =
                ((x - centerX) / centerX) * 7;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =========================================================
       9. MAGNETIC BUTTONS
       ========================================================= */

    const magneticButtons =
        document.querySelectorAll(".magnetic");

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left -
                rect.width / 2;

            const y =
                e.clientY - rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.15}px,
                           ${y * 0.15}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });


    /* =========================================================
       10. BUTTON RIPPLE EFFECT
       ========================================================= */

    const rippleButtons =
        document.querySelectorAll(".ripple");

    rippleButtons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple-effect");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${e.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 700);

        });

    });


    /* =========================================================
       11. PARALLAX EFFECT
       ========================================================= */

    const parallaxElements =
        document.querySelectorAll(".parallax");

    function updateParallax() {

        const scrollPosition =
            window.pageYOffset;

        parallaxElements.forEach(element => {

            const speed =
                parseFloat(
                    element.dataset.speed || "0.2"
                );

            const rect =
                element.getBoundingClientRect();

            if (
                rect.bottom > 0 &&
                rect.top < window.innerHeight
            ) {

                const offset =
                    (window.innerHeight / 2 - rect.top)
                    * speed;

                element.style.transform =
                    `translate3d(0, ${offset}px, 0)`;
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );


    /* =========================================================
       12. ACTIVE NAVIGATION LINK
       ========================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navAnchors =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        navAnchors.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================================================
       13. SCROLL-TO-TOP BUTTON
       ========================================================= */

    const scrollTopButton =
        document.getElementById("scrollTop");

    if (scrollTopButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                scrollTopButton.classList.add("show");

            } else {

                scrollTopButton.classList.remove("show");

            }

        });

        scrollTopButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================================
       14. FLOATING PARTICLES
       ========================================================= */

    const particleContainer =
        document.querySelector(".particles");

    if (particleContainer) {

        const particleCount = 25;

        for (let i = 0; i < particleCount; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add("particle");

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.animationDelay =
                `${Math.random() * 5}s`;

            particle.style.animationDuration =
                `${5 + Math.random() * 8}s`;

            const size =
                2 + Math.random() * 5;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particleContainer.appendChild(
                particle
            );
        }

    }


    /* =========================================================
       15. MOUSE GLOW EFFECT
       ========================================================= */

    const mouseGlow =
        document.querySelector(".mouse-glow");

    if (mouseGlow) {

        document.addEventListener("mousemove", e => {

            mouseGlow.style.left =
                `${e.clientX}px`;

            mouseGlow.style.top =
                `${e.clientY}px`;

        });

    }


    /* =========================================================
       16. IMAGE 3D HOVER
       ========================================================= */

    const floatingImages =
        document.querySelectorAll(
            ".floating-image"
        );

    floatingImages.forEach(image => {

        image.addEventListener("mousemove", e => {

            const rect =
                image.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width;

            const y =
                (e.clientY - rect.top) /
                rect.height;

            const rotateY =
                (x - 0.5) * 12;

            const rotateX =
                (y - 0.5) * -12;

            image.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.03)`;

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) scale(1)";

        });

    });


    /* =========================================================
       17. POP-OUT ELEMENTS
       ========================================================= */

    const popElements =
        document.querySelectorAll(".pop-out");

    const popObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "pop-active"
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );

    popElements.forEach(element => {
        popObserver.observe(element);
    });


    /* =========================================================
       18. SHAKE EFFECT
       ========================================================= */

    const shakeElements =
        document.querySelectorAll(".shake-on-hover");

    shakeElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            element.classList.add("shaking");

        });

        element.addEventListener("animationend", () => {

            element.classList.remove("shaking");

        });

    });


    /* =========================================================
       19. LAZY LOAD IMAGES
       ========================================================= */

    const lazyImages =
        document.querySelectorAll(
            "img[data-src]"
        );

    const imageObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const image =
                        entry.target;

                    image.src =
                        image.dataset.src;

                    image.removeAttribute(
                        "data-src"
                    );

                    image.classList.add(
                        "loaded"
                    );

                    observer.unobserve(image);

                });

            }
        );

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });


    /* =========================================================
       20. CURRENT YEAR
       ========================================================= */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================================================
       21. CONTACT FORM
       ========================================================= */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {

                    const originalText =
                        submitButton.textContent;

                    submitButton.textContent =
                        "Message Sent ✓";

                    submitButton.disabled = true;

                    setTimeout(() => {

                        submitButton.textContent =
                            originalText;

                        submitButton.disabled =
                            false;

                        contactForm.reset();

                    }, 2500);

                }

            }
        );

    }


    /* =========================================================
       22. SCROLL PROGRESS BAR
       ========================================================= */

    const progressBar =
        document.getElementById(
            "scrollProgress"
        );

    if (progressBar) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollTop =
                    document.documentElement
                        .scrollTop;

                const scrollHeight =
                    document.documentElement
                        .scrollHeight -
                    document.documentElement
                        .clientHeight;

                const progress =
                    scrollHeight > 0
                        ? (scrollTop / scrollHeight) * 100
                        : 0;

                progressBar.style.width =
                    `${progress}%`;

            },
            { passive: true }
        );

    }


    /* =========================================================
       23. REDUCED MOTION ACCESSIBILITY
       ========================================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

        document
            .querySelectorAll(".parallax")
            .forEach(element => {
                element.style.transform = "none";
            });

    }


    /* =========================================================
       24. CONSOLE BRANDING
       ========================================================= */

    console.log(
        "%c Readers Cambridge School & Academy ",
        "background:#111;color:#e00000;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "%c Website powered by creativity & code 🚀 ",
        "font-size:13px;"
    );

});