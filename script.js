/* ============================================================
DIPESH KUMAR SHRESTHA — PORTFOLIO
script.js
============================================================ */

'use strict';

/* ── Loader ── */
window.addEventListener('load', () => {
const loader = document.getElementById('loader');
setTimeout(() => { loader.classList.add('hidden'); }, 800);
});

/* ── Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
const current = root.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';
root.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
});

/* ── Navbar ── */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 30);
updateActiveNav();
toggleScrollTop();
});

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('open');
navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', () => {
hamburger.classList.remove('open');
navLinks.classList.remove('open');
});
});

/* Active nav link on scroll */
function updateActiveNav() {
const sections = document.querySelectorAll('section[id]');
const scrollPos = window.scrollY + 100;

sections.forEach(sec => {
const top = sec.offsetTop;
const bottom = top + sec.offsetHeight;
const id = sec.getAttribute('id');
const link = document.querySelector(`.nav-link[href="#${id}"]`);

if (link) {
link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
}
});
}

/* ── Scroll-to-Top ── */
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}

scrollTopBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Typing Animation ── */
const typedTexts = [
'Google Maps Specialist',
'Local SEO Expert',
'GBP Optimizer',
'Road Contributor',
'Business Growth Partner'
];

let tIdx = 0;
let cIdx = 0;
let deleting = false;

const typedEl = document.getElementById('typed-text');

function typeText() {
const current = typedTexts[tIdx];

if (!deleting) {
typedEl.textContent = current.substring(0, cIdx + 1);
cIdx++;

if (cIdx === current.length) {
deleting = true;
setTimeout(typeText, 1800);
return;
}

setTimeout(typeText, 70);

} else {

typedEl.textContent = current.substring(0, cIdx - 1);
cIdx--;

if (cIdx === 0) {
deleting = false;
tIdx = (tIdx + 1) % typedTexts.length;
setTimeout(typeText, 300);
return;
}

setTimeout(typeText, 40);
}
}

setTimeout(typeText, 1200);

/* ── Intersection Observer — Reveal Animations ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('revealed');
revealObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.12,
rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ── Animated Counters ── */
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
const target = parseInt(el.dataset.target, 10);
const duration = 1800;
const step = 30;
const increment = target / (duration / step);

let current = 0;

const timer = setInterval(() => {
current += increment;

if (current >= target) {
el.textContent = target.toLocaleString();
clearInterval(timer);
} else {
el.textContent = Math.floor(current).toLocaleString();
}

}, step);
}

const counterObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter(entry.target);
counterObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.5
});

counters.forEach(c => counterObserver.observe(c));

/* ── Contact Form ── */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
e.preventDefault();

const btn = form.querySelector('button[type="submit"]');
const originalText = btn.innerHTML;

btn.innerHTML = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" style="animation:spin 0.8s linear infinite">
<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
</svg>
Sending...
`;

btn.style.opacity = '0.7';
btn.disabled = true;

setTimeout(() => {
btn.innerHTML = originalText;
btn.style.opacity = '';
btn.disabled = false;

form.reset();

formSuccess.classList.add('show');

setTimeout(() => {
formSuccess.classList.remove('show');
}, 5000);

}, 1600);
});

/* ── Navbar shadow on scroll ── */
window.dispatchEvent(new Event('scroll'));