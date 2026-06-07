/* ── Menu toggle ── */

const menuBtn = document.getElementById('menuBtn');
const menuBar = document.getElementById('menuBar');

function closeMenu() {
    menuBtn.classList.remove('open');
    menuBar.classList.remove('open');
}

function toggleMenu() {
    menuBtn.classList.toggle('open');
    menuBar.classList.toggle('open');
}

menuBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
document.querySelectorAll('.menu-bar .nav-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside (optional - remove if you want menu to stay open)
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuBar.contains(e.target)) {
        closeMenu();
    }
});

// Mark active page in menu
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu-bar .nav-list a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

/* ── Countdown ── */


const WEDDING = new Date('2027-04-03T00:00:00');

function pad(n) {
    return String(n).padStart(2, '0');
}

function updateCountdown() {
    const diff = WEDDING - new Date();

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<p style="font-family:\'Playfair Display\',serif;font-style:italic;font-size:1.3rem;color:#1e0d04">I dag er den store dag ♡</p>';
        return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = pad(days);
    document.getElementById('hours').textContent   = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
}

if (document.getElementById('days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ── Scroll animations ── */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay ?? '0', 10);
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
    });
}, { threshold: 0.1, rootMargin: '50px' });

// Observe all animate elements and immediately show those in viewport
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate').forEach(el => {
        observer.observe(el);
        // For elements already in viewport on load, show them immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const delay = parseInt(el.dataset.delay ?? '0', 10);
            setTimeout(() => el.classList.add('visible'), delay);
        }
    });
});
