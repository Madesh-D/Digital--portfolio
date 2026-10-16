/* =============================================
   Typewriter Effect
   ============================================= */
const typewriterTexts = [
    'Java Full Stack Developer',
    'BCA Graduate',
    'Spring Boot Developer',
    'React Developer',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        delay = 500;
    }

    setTimeout(typewrite, delay);
}

typewrite();

/* =============================================
   Navbar Scroll Effect
   ============================================= */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

/* =============================================
   Active Nav Link
   ============================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* =============================================
   Mobile Nav Toggle
   ============================================= */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open');
});

// Close nav on link click
navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksEl.classList.remove('open');
    });
});

/* =============================================
   Scroll Animations
   ============================================= */
const animateElements = document.querySelectorAll(
    '.about-card, .skill-category, .project-card, .education-item, .contact-card'
);

animateElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => fadeObserver.observe(el));

/* =============================================
   Particle Background
   ============================================= */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    requestAnimationFrame(animateParticles);
}

animateParticles();

/* =============================================
   Smooth scroll for anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
