// Main JavaScript for Supply Station — Forecourt Supplies (formerly UAC Services)
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
        const open = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open);
    };
    const close = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', toggle);

    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            close();
            hamburger.focus();
        }
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
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 88;
            window.scrollTo({ top: offset, behavior: reduceMotion ? 'auto' : 'smooth' });
            // Keep the section in the address bar (shareable links) and move
            // keyboard focus there so Tab continues from the section.
            if (history.pushState) history.pushState(null, '', href);
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
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
            btns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            const category = btn.dataset.category;

            cards.forEach(card => {
                const match = category === 'all' || card.dataset.category === category;
                clearTimeout(card._hideTimer);
                card.style.transitionDelay = '';   // drop the entrance stagger delay
                if (match) {
                    card.classList.remove('hidden', 'fade-out');
                } else {
                    card.classList.add('fade-out');
                    card._hideTimer = setTimeout(() => card.classList.add('hidden'), 250);
                }
            });
        });
    });
});

// ========================================
// PRODUCT COLOUR PICKER
// Click a mini-swatch to swap the squeegee product photo to that colour.
// Progressive enhancement: without JS the photo just stays on its default.
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-colours[data-photo-target]').forEach(group => {
        const photo = document.getElementById(group.dataset.photoTarget);
        const swatches = group.querySelectorAll('.mini-swatch[data-photo]');
        if (!photo || !swatches.length) return;

        // Preload the alternates so switching is instant.
        swatches.forEach(s => { const img = new Image(); img.src = s.dataset.photo; });

        let latest = null; // the swatch the user picked last
        const select = (swatch) => {
            if (swatch.classList.contains('is-active')) return;
            latest = swatch;
            swatches.forEach(s => {
                const on = s === swatch;
                s.classList.toggle('is-active', on);
                s.setAttribute('aria-pressed', on);
            });
            photo.classList.add('is-swapping');
            const swap = () => {
                // A slower image finishing after a later click must not win.
                if (latest !== swatch) return;
                photo.src = swatch.dataset.photo;
                photo.alt = `Supply Station squeegee with handle — ${swatch.dataset.colour}, one of five available colours`;
                photo.classList.remove('is-swapping');
            };
            // Fade out, then swap once the image is ready (cached) and fade in.
            const ready = new Image();
            ready.src = swatch.dataset.photo;
            const loaded = ready.decode ? ready.decode().catch(() => {}) : new Promise(r => { ready.onload = ready.onerror = r; });
            Promise.all([loaded, new Promise(r => setTimeout(r, 150))]).then(swap);
        };

        swatches.forEach(swatch => swatch.addEventListener('click', () => select(swatch)));
    });
});

// ========================================
// ORDER BUILDER
// Pick quantities -> live list-price estimate -> prefilled WhatsApp.
// Prices mirror what's shown in the products list above and are EXCL. VAT.
// We deliberately do NOT quote bulk prices here: public bulk figures aren't
// advertised. When an order crosses the bulk threshold we nudge the customer
// that they may qualify for better pricing and confirm the number on WhatsApp.
// ========================================
const OB = {
    waNumber: '27828261003',
    // true  -> show Subtotal / VAT 15% / Total incl. VAT.
    // false -> hide the VAT line; total = subtotal (use only while not VAT registered).
    vatRegistered: true,
    vatRate: 0.15,
    bulkThreshold: 50,        // squeegee quantity that counts as bulk
    bulkValueThreshold: 2000, // rand total that counts as bulk regardless of mix
    // group 'sq' = squeegees (share one threshold for the bulk nudge). unit = label after qty.
    products: [
        { id: 'sq-red',    name: 'Red Squeegee',                group: 'sq', unit: 'each',     price: 35 },
        { id: 'sq-blue',   name: 'Blue Squeegee',               group: 'sq', unit: 'each',     price: 35 },
        { id: 'sq-black',  name: 'Black Squeegee',              group: 'sq', unit: 'each',     price: 35 },
        { id: 'sq-dgrey',  name: 'Dark Grey Squeegee',          group: 'sq', unit: 'each',     price: 35 },
        { id: 'sq-lgrey',  name: 'Light Grey Squeegee',         group: 'sq', unit: 'each',     price: 35 },
        { id: 'garage',    name: 'Garage Roll',                 group: null, unit: 'each',     price: 235 },
        { id: 'garage-r',  name: 'Reject Garage Roll',          group: null, unit: 'each',     price: 190 },
        { id: 'pinksoap',  name: 'Pink Multi Purpose Soap',     group: null, unit: 'each',     price: 450 },
        { id: 'rubber',    name: 'Replacement Squeegee Rubber 5-Pack',   group: null, unit: 'per pack', price: 40 },
        { id: 'sponge',    name: 'Replacement Squeegee Sponges 5-Pack',  group: null, unit: 'per pack', price: 40.50 },
        { id: 'ooo',       name: 'Out of Order Cover',          group: null, unit: 'each',     price: 120 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('obList');
    const summary = document.getElementById('obSummary');
    const linesEl = document.getElementById('obLines');
    const totalEl = document.getElementById('obTotal');
    const totalLabel = document.getElementById('obTotalLabel');
    const subtotalEl = document.getElementById('obSubtotal');
    const vatEl = document.getElementById('obVat');
    const vatRow = document.getElementById('obVatRow');
    const sendBtn = document.getElementById('obSend');
    const sendLabel = document.getElementById('obSendLabel');
    const bulkNote = document.getElementById('obBulkNote');
    if (!list || !sendBtn) return;

    const qty = {};                       // id -> quantity
    OB.products.forEach(p => { qty[p.id] = 0; });
    const fmt = n => 'R' + n.toFixed(2);

    // Build the picker rows
    list.innerHTML = '';
    OB.products.forEach(p => {
        const row = document.createElement('div');
        row.className = 'ob-row';
        row.innerHTML = `
            <div class="ob-info">
                <span class="ob-name">${p.name}</span>
                <span class="ob-price">${fmt(p.price)} <small>${p.unit} excl. VAT</small></span>
            </div>
            <div class="ob-stepper" data-id="${p.id}">
                <button type="button" class="ob-btn ob-minus" aria-label="Decrease ${p.name}">&minus;</button>
                <input class="ob-qty" type="number" inputmode="numeric" min="0" step="1" value="0" aria-label="${p.name} quantity">
                <button type="button" class="ob-btn ob-plus" aria-label="Increase ${p.name}">+</button>
            </div>`;
        list.appendChild(row);
    });

    // Compute per-line and total at list price. Bulk pricing is not quoted here;
    // bulkEligible just drives a "you may qualify" nudge and a note in the message.
    function compute() {
        const sqTotal = OB.products
            .filter(p => p.group === 'sq')
            .reduce((s, p) => s + qty[p.id], 0);

        const lines = [];
        let subtotal = 0;
        OB.products.forEach(p => {
            const q = qty[p.id];
            if (q <= 0) return;
            const lineTotal = p.price * q;
            subtotal += lineTotal;
            lines.push({ name: p.name, q, unit: p.price, lineTotal });
        });
        // Round VAT to the cent so subtotal + VAT always equals the total shown.
        const vat = OB.vatRegistered ? Math.round(subtotal * OB.vatRate * 100) / 100 : 0;
        const total = subtotal + vat;
        // Bulk nudge fires on squeegee volume OR overall order value (excl. VAT),
        // so big garage-roll / soap orders also hear about better pricing.
        const bulkEligible = sqTotal >= OB.bulkThreshold || subtotal >= OB.bulkValueThreshold;
        return { lines, subtotal, vat, total, bulkEligible };
    }

    function render() {
        const { lines, subtotal, vat, total, bulkEligible } = compute();
        if (!lines.length) {
            summary.hidden = true;
            if (bulkNote) bulkNote.hidden = true;
            sendLabel.textContent = 'Send order on WhatsApp';
            sendBtn.href = `https://wa.me/${OB.waNumber}?text=` +
                encodeURIComponent("Hi Supply Station, I'd like to order:\n- ");
            return;
        }
        summary.hidden = false;
        if (bulkNote) bulkNote.hidden = !bulkEligible;
        linesEl.innerHTML = lines.map(l =>
            `<div class="ob-line"><span>${l.q} &times; ${l.name} <small>@ ${fmt(l.unit)}</small></span>` +
            `<span>${fmt(l.lineTotal)}</span></div>`
        ).join('');
        subtotalEl.textContent = fmt(subtotal);
        vatRow.hidden = !OB.vatRegistered;
        vatEl.textContent = fmt(vat);
        totalLabel.textContent = OB.vatRegistered ? 'Estimated total (incl. VAT)' : 'Estimated total';
        totalEl.textContent = fmt(total);
        sendLabel.textContent = 'Send order on WhatsApp';
        sendBtn.href = `https://wa.me/${OB.waNumber}?text=${encodeURIComponent(buildMessage(lines, subtotal, vat, total, bulkEligible))}`;
    }

    function buildMessage(lines, subtotal, vat, total, bulkEligible) {
        let msg = "Hi Supply Station, I'd like to order:\n";
        lines.forEach(l => { msg += `- ${l.q} x ${l.name} @ ${fmt(l.unit)} = ${fmt(l.lineTotal)}\n`; });
        msg += `\nSubtotal: ${fmt(subtotal)} (excl. VAT)\n`;
        if (OB.vatRegistered) msg += `VAT 15%: ${fmt(vat)}\n`;
        msg += `Estimated total: ${fmt(total)}${OB.vatRegistered ? ' incl. VAT' : ''} (excl. delivery)\n`;
        if (bulkEligible) msg += "This looks like a bulk order — please quote me your best price.\n";
        msg += 'Please confirm price and delivery. Thanks!';
        return msg;
    }

    // `fromTyping`: leave the field as typed (e.g. empty while the user
    // replaces the number); it is tidied up on blur.
    function setQty(id, val, fromTyping) {
        const v = Math.max(0, Math.floor(Number(val) || 0));
        qty[id] = v;
        const stepper = list.querySelector(`.ob-stepper[data-id="${id}"] .ob-qty`);
        if (stepper && !fromTyping && String(v) !== stepper.value) stepper.value = v;
        render();
    }

    list.addEventListener('click', (e) => {
        const stepper = e.target.closest('.ob-stepper');
        if (!stepper) return;
        const id = stepper.dataset.id;
        if (e.target.classList.contains('ob-plus'))  setQty(id, qty[id] + 1);
        if (e.target.classList.contains('ob-minus')) setQty(id, qty[id] - 1);
    });
    list.addEventListener('input', (e) => {
        if (!e.target.classList.contains('ob-qty')) return;
        const stepper = e.target.closest('.ob-stepper');
        setQty(stepper.dataset.id, e.target.value, true);
    });
    list.addEventListener('focusout', (e) => {
        if (!e.target.classList.contains('ob-qty')) return;
        const stepper = e.target.closest('.ob-stepper');
        setQty(stepper.dataset.id, e.target.value);
    });

    render();
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

// ========================================
// REBRAND TOAST (temporary — remove with the #rebrandToast block in index.html)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('rebrandToast');
    const close = document.getElementById('rebrandToastClose');
    if (!toast || !close) return;

    const KEY = 'ss-rebrand-toast-dismissed';
    try {
        if (localStorage.getItem(KEY)) return;
    } catch (e) { /* storage blocked: just show it */ }

    const dismiss = () => {
        toast.classList.remove('show');
        setTimeout(() => { toast.hidden = true; }, 350);
        try { localStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
    };
    close.addEventListener('click', dismiss);
    toast.querySelector('a')?.addEventListener('click', dismiss);

    const show = () => {
        toast.hidden = false;
        void toast.offsetWidth; // flush styles so the slide-in transition runs
        toast.classList.add('show');
    };
    // Wait until the visitor has scrolled past most of the hero, so the notice
    // never lands on top of the "Build your order" / WhatsApp buttons.
    const hero = document.querySelector('.hero');
    if (hero && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            if (entries.some(en => en.intersectionRatio < 0.35 && en.boundingClientRect.top < 0)) {
                io.disconnect();
                setTimeout(show, 600);
            }
        }, { threshold: [0, 0.35, 0.7] });
        io.observe(hero);
    } else {
        setTimeout(show, 2000);
    }
});
