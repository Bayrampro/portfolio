const i18n = globalThis.BaDiI18n;
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;

const isMobile =
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(hover: none)').matches;

if (cursorDot && !isMobile) {
    cursorDot.classList.add('active');

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    document.querySelectorAll('a, button').forEach((element) => {
        element.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
        element.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
    });
}

const particleCanvas = document.getElementById('particleCanvas');

if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const connectionDist = 100;
    const maxSpeed = 2;
    let canvasVisible = true;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > particleCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particleCanvas.width;
            if (this.y > particleCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particleCanvas.height;
        }
    }

    for (let index = 0; index < particleCount; index += 1) {
        particles.push(new Particle());
    }

    const observer = new IntersectionObserver(([entry]) => {
        canvasVisible = entry.isIntersecting;
    }, { threshold: 0 });

    observer.observe(particleCanvas);

    let pMouseX = 0;
    let pMouseY = 0;

    document.addEventListener('mousemove', (event) => {
        pMouseX = event.clientX;
        pMouseY = event.clientY;
    });

    const animateParticles = () => {
        if (!canvasVisible) {
            requestAnimationFrame(animateParticles);
            return;
        }

        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        for (let i = 0; i < particleCount; i += 1) {
            const p = particles[i];
            p.update();

            const dx = pMouseX - p.x;
            const dy = pMouseY - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 150) {
                p.speedX += dx * 0.001;
                p.speedY += dy * 0.001;
            }

            p.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, p.speedX));
            p.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, p.speedY));

            ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particleCount; j += 1) {
                const q = particles[j];
                const cdx = p.x - q.x;
                const cdy = p.y - q.y;
                const distSq = cdx * cdx + cdy * cdy;

                if (distSq < connectionDist * connectionDist) {
                    const distance = Math.sqrt(distSq);
                    ctx.strokeStyle = `rgba(212,175,55,${0.2 * (1 - distance / connectionDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    };

    animateParticles();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;

            particles.forEach((particle) => {
                particle.x = Math.random() * particleCanvas.width;
                particle.y = Math.random() * particleCanvas.height;
            });
        }, 150);
    });
}

const defaultPhrases = [
    'Essays.',
    'Diploma theses.',
    'Lab reports.',
    'Coursework projects.',
    'And much more.'
];
let phrases = (i18n && i18n.getPhrases('students').length) ? i18n.getPhrases('students') : defaultPhrases;

let phraseIndex = 0;
let charIndex = 0;
const typewriterElement = document.querySelector('.typewriter-text');

const type = () => {
    if (!typewriterElement || phrases.length === 0) {
        return;
    }

    const currentPhrase = phrases[phraseIndex];

    if (charIndex < currentPhrase.length) {
        typewriterElement.textContent += currentPhrase[charIndex];
        charIndex += 1;
        setTimeout(type, 50);
    } else {
        setTimeout(() => {
            typewriterElement.textContent = '';
            charIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        }, 2400);
    }
};

type();

globalThis.addEventListener('badi:languagechange', () => {
    const nextPhrases = (i18n && i18n.getPhrases('students').length) ? i18n.getPhrases('students') : defaultPhrases;
    phrases = nextPhrases;
    phraseIndex = 0;
    charIndex = 0;
    if (typewriterElement) {
        typewriterElement.textContent = '';
    }
});

const mainLoop = () => {
    if (cursorDot && !isMobile) {
        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
    }

    requestAnimationFrame(mainLoop);
};

mainLoop();

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        preloader.classList.add('hidden');
        preloader.addEventListener('transitionend', () => preloader.remove());
    }
});

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.service-card'), {
        max: 25,
        scale: 1.05,
        speed: 400,
        glare: true,
        'max-glare': 0.3
    });
}

const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
    const formInputs = form.querySelectorAll('input, textarea');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let isValid = true;

        formInputs.forEach((input) => {
            const value = input.value.trim();
            let valid = false;

            if (input.id === 'name') {
                valid = value.length >= 2;
            } else if (input.id === 'email') {
                valid = validateEmail(value);
            } else if (input.id === 'message') {
                valid = value.length >= 10;
            }

            if (!valid) {
                isValid = false;
                input.classList.add('error', 'shake-error');
                setTimeout(() => input.classList.remove('shake-error'), 400);
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    };

    const openMailClient = (mailtoUrl) => {
        const fallbackFrame = document.createElement('iframe');
        fallbackFrame.style.display = 'none';
        fallbackFrame.src = mailtoUrl;
        document.body.appendChild(fallbackFrame);

        setTimeout(() => {
            fallbackFrame.remove();
            globalThis.location.href = mailtoUrl;
        }, 150);
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formInputs.forEach((input) => input.classList.remove('error'));

        if (!validateForm()) {
            return;
        }

        const name = document.getElementById('name').value.trim();
        const emailVal = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subjectPrefix = (i18n && i18n.t('common.mail.subjectPrefix')) || 'Portfolio Contact from';
        const mailNameLabel = (i18n && i18n.t('common.mail.name')) || 'Name';
        const mailEmailLabel = (i18n && i18n.t('common.mail.email')) || 'Email';
        const mailMessageLabel = (i18n && i18n.t('common.mail.message')) || 'Message';

        const subject = encodeURIComponent(`${subjectPrefix} ${name}`);
        const body = encodeURIComponent(
            `${mailNameLabel}: ${name}\n${mailEmailLabel}: ${emailVal}\n\n${mailMessageLabel}:\n${message}`
        );
        const mailtoUrl = `mailto:annakurbanov02@mail.ru?subject=${subject}&body=${body}`;

        openMailClient(mailtoUrl);

        form.style.display = 'none';
        if (formSuccess) {
            formSuccess.classList.add('active');
        }

        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            if (formSuccess) {
                formSuccess.classList.remove('active');
            }
        }, 4000);
    });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinksContainer.classList.toggle('active');
        const icon = navToggle.querySelector('i');

        if (icon) {
            icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        }

        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinksContainer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = navToggle.querySelector('i');

            if (icon) {
                icon.className = 'fas fa-bars';
            }

            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}
