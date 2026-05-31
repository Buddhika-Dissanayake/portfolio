// Typewriter Effect
const typedTextSpan = document.querySelector("#typewriter");
const textArray = ["Statistician", "Data Scientist", "Researcher", "Physicist"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Background Music
const backgroundMusic = document.querySelector("#background-music");
const musicToggle = document.querySelector("#music-toggle");

if (backgroundMusic && musicToggle) {
    backgroundMusic.volume = 0.25;
    let userPausedMusic = false;

    const updateMusicToggle = () => {
        const isPlaying = !backgroundMusic.paused;
        musicToggle.classList.toggle("is-playing", isPlaying);
        musicToggle.setAttribute("aria-pressed", String(isPlaying));
        musicToggle.setAttribute(
            "aria-label",
            isPlaying ? "Mute background music" : "Play background music"
        );
        musicToggle.innerHTML = isPlaying
            ? '<i class="fas fa-volume-high"></i>'
            : '<i class="fas fa-volume-xmark"></i>';
    };

    const removeMusicUnlockListeners = () => {
        document.removeEventListener("pointerdown", unlockBackgroundMusic);
        document.removeEventListener("mousedown", unlockBackgroundMusic);
        document.removeEventListener("click", unlockBackgroundMusic);
        window.removeEventListener("scroll", unlockBackgroundMusic);
        window.removeEventListener("wheel", unlockBackgroundMusic);
        window.removeEventListener("touchstart", unlockBackgroundMusic);
        window.removeEventListener("touchmove", unlockBackgroundMusic);
        window.removeEventListener("keydown", unlockBackgroundMusic);
    };

    const playBackgroundMusic = () => {
        if (userPausedMusic) return;

        backgroundMusic.play()
            .then(() => {
                removeMusicUnlockListeners();
                updateMusicToggle();
            })
            .catch(updateMusicToggle);
    };

    const unlockBackgroundMusic = (e) => {
        if (e.target instanceof Element && e.target.closest("#music-toggle")) return;
        userPausedMusic = false;
        playBackgroundMusic();
    };

    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (backgroundMusic.paused) {
            userPausedMusic = false;
            playBackgroundMusic();
        } else {
            userPausedMusic = true;
            backgroundMusic.pause();
            updateMusicToggle();
        }
    });

    playBackgroundMusic();
    document.addEventListener("pointerdown", unlockBackgroundMusic);
    document.addEventListener("mousedown", unlockBackgroundMusic);
    document.addEventListener("click", unlockBackgroundMusic);
    window.addEventListener("scroll", unlockBackgroundMusic, { passive: true });
    window.addEventListener("wheel", unlockBackgroundMusic, { passive: true });
    window.addEventListener("touchstart", unlockBackgroundMusic, { passive: true });
    window.addEventListener("touchmove", unlockBackgroundMusic, { passive: true });
    window.addEventListener("keydown", unlockBackgroundMusic);
    updateMusicToggle();
}

// Smooth Scrolling
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavLinks = document.querySelector(".nav-links");

if (menuToggle && mobileNavLinks) {
    menuToggle.addEventListener("click", () => {
        mobileNavLinks.classList.toggle("open");
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        mobileNavLinks?.classList.remove("open");

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Particles.js Configuration (Background Animation)
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fbbf24"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 0.2,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#fbbf24",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.3
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Counter Animation
const counters = document.querySelectorAll('.counter-number');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Trigger counter when in view
let counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 1.0 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".card, .skill-category, .timeline-item");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});
