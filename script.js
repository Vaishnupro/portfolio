// --- 1. THEME TOGGLE (Sombre / Clair) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// --- 2. LANGUAGE TOGGLE (FR / EN) ---
const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = 'fr';

langToggleBtn.addEventListener('click', () => {
    const frElements = document.querySelectorAll('.lang-fr');
    const enElements = document.querySelectorAll('.lang-en');

    if (currentLang === 'fr') {
        frElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = '');
        langToggleBtn.innerText = 'FR';
        currentLang = 'en';
    } else {
        enElements.forEach(el => el.style.display = 'none');
        frElements.forEach(el => el.style.display = '');
        langToggleBtn.innerText = 'EN';
        currentLang = 'fr';
    }
    resetTyping();
});

// --- 3. EFFET MACHINE À ÉCRIRE (Mise à jour Réseaux Informatiques / Sécurité Défensive) ---
const textsFr = ["Étudiant en Cybersécurité.", "Passionné par les réseaux informatiques.", "Intéressé par la sécurité défensive."];
const textsEn = ["Cybersecurity Student.", "Passionate about Computer Networks.", "Interested in Defensive Security."];

let typingDelay = 80;
let erasingDelay = 40;
let newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
const typedTextSpan = document.querySelector(".typed-text");
let typeTimeout;

function type() {
    const textArray = currentLang === 'fr' ? textsFr : textsEn;
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        typeTimeout = setTimeout(type, typingDelay);
    } else {
        typeTimeout = setTimeout(erase, newTextDelay);
    }
}

function erase() {
    const textArray = currentLang === 'fr' ? textsFr : textsEn;
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        typeTimeout = setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        typeTimeout = setTimeout(type, typingDelay + 500);
    }
}

function resetTyping() {
    clearTimeout(typeTimeout);
    typedTextSpan.textContent = "";
    charIndex = 0;
    textArrayIndex = 0;
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    if(typedTextSpan) { setTimeout(type, newTextDelay); }
});

// --- 4. HEADER BACKGROUND AU SCROLL ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 5. ANIMATIONS D'APPARITION ---
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });