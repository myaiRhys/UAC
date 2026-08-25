// Main JavaScript for UAC Services — Forecourt Supplies
// Vanilla, no dependencies. Nav, filter, scroll animations, ripple.

// ========================================
// SCROLL ANIMATIONS
// ========================================
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const animated = document.querySelectorAll(
        '.product-card, .reason-card, .audience-card, .order-card, .contact-info-container, .bulk-content'
    );
    animated.forEach((el, i) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${(i % 6) * 0.05}s`;
        animationObserver.observe(el);
    });
});

// ========================================
// NAVBAR SCROLL STATE
// ========================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) navbar.classList.toggle('scrolled', y > 50);
}, { passive: true });

// ========================================
// MOBILE NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    const toggle = () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    };
    const close = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    };

    hamburger.addEventListener('click', toggle);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) close();
    });
});

// ========================================
// SMOOTH SCROLL (anchor links, offset for sticky nav)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') { e.preventDefault(); return; }
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 88;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });
});

// ========================================
// CATEGORY FILTER
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.product-card');
    if (!btns.length || !cards.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;

            cards.forEach(card => {
                const match = category === 'all' || card.dataset.category === category;
                if (match) {
                    card.classList.remove('hidden', 'fade-out');
                } else {
                    card.classList.add('fade-out');
                    setTimeout(() => card.classList.add('hidden'), 250);
                }
            });
        });
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});
