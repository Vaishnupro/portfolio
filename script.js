// --- Langue FR / EN (mémorisée entre les visites) ---
const root = document.documentElement;
const langBtn = document.getElementById('lang-toggle');

function setLang(lang) {
    const en = lang === 'en';
    root.classList.toggle('en', en);
    root.lang = lang;
    langBtn.textContent = en ? 'FR' : 'EN';
    langBtn.setAttribute('aria-label', en ? 'Passer en français' : 'Switch to English');
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
setLang(saved || 'fr');

langBtn.addEventListener('click', () => {
    setLang(root.classList.contains('en') ? 'fr' : 'en');
});

// --- Menu mobile ---
const menuBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
}));

// --- Filet sous l'en-tête au défilement ---
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Année du pied de page ---
document.getElementById('year').textContent = new Date().getFullYear();