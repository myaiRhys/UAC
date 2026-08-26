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
// ORDER BUILDER
// Pick quantities -> live list-price estimate -> prefilled WhatsApp.
// Prices mirror what's shown in the products list above. We deliberately do
// NOT quote bulk prices here: public bulk figures aren't advertised. When an
// order crosses the bulk threshold we nudge the customer that they may qualify
// for better pricing and let UAC confirm the actual number on WhatsApp.
// ========================================
const OB = {
    waNumber: '27828261003',
    bulkThreshold: 50,        // squeegee quantity that counts as bulk
    bulkValueThreshold: 2000, // rand total that counts as bulk regardless of mix
    // group 'sq' = squeegees (share one threshold for the bulk nudge). unit = label after qty.
    products: [
        { id: 'sq-red',    name: 'Red Squeegee',                group: 'sq', unit: 'each',     price: 30 },
        { id: 'sq-blue',   name: 'Blue Squeegee',               group: 'sq', unit: 'each',     price: 30 },
        { id: 'sq-black',  name: 'Black Squeegee',              group: 'sq', unit: 'each',     price: 30 },
        { id: 'sq-dgrey',  name: 'Dark Grey Squeegee',          group: 'sq', unit: 'each',     price: 30 },
        { id: 'sq-lgrey',  name: 'Light Grey Squeegee',         group: 'sq', unit: 'each',     price: 30 },
        { id: 'garage',    name: 'Garage Roll',                 group: null, unit: 'each',     price: 240 },
        { id: 'garage-r',  name: 'Reject Garage Roll',          group: null, unit: 'each',     price: 180 },
        { id: 'pinksoap',  name: 'Pink Soap',                   group: null, unit: 'each',     price: 400 },
        { id: 'rubber',    name: 'Replacement Rubber 5-Pack',   group: null, unit: 'per pack', price: 40 },
        { id: 'sponge',    name: 'Replacement Sponges 5-Pack',  group: null, unit: 'per pack', price: 40.50 },
        { id: 'ooo',       name: 'Out of Order Cover',          group: null, unit: 'each',     price: 120 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('obList');
    const summary = document.getElementById('obSummary');
    const linesEl = document.getElementById('obLines');
    const totalEl = document.getElementById('obTotal');
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
                <span class="ob-price">${fmt(p.price)} <small>${p.unit}</small></span>
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
        let total = 0;
        OB.products.forEach(p => {
            const q = qty[p.id];
            if (q <= 0) return;
            const lineTotal = p.price * q;
            total += lineTotal;
            lines.push({ name: p.name, q, unit: p.price, lineTotal });
        });
        // Bulk nudge fires on squeegee volume OR overall order value, so big
        // garage-roll / soap orders also hear about better pricing.
        const bulkEligible = sqTotal >= OB.bulkThreshold || total >= OB.bulkValueThreshold;
        return { lines, total, bulkEligible };
    }

    function render() {
        const { lines, total, bulkEligible } = compute();
        if (!lines.length) {
            summary.hidden = true;
            if (bulkNote) bulkNote.hidden = true;
            sendLabel.textContent = 'Send order on WhatsApp';
            sendBtn.href = `https://wa.me/${OB.waNumber}?text=` +
                encodeURIComponent("Hi UAC Services, I'd like to order:\n- ");
            return;
        }
        summary.hidden = false;
        if (bulkNote) bulkNote.hidden = !bulkEligible;
        linesEl.innerHTML = lines.map(l =>
            `<div class="ob-line"><span>${l.q} &times; ${l.name} <small>@ ${fmt(l.unit)}</small></span>` +
            `<span>${fmt(l.lineTotal)}</span></div>`
        ).join('');
        totalEl.textContent = fmt(total);
        sendLabel.textContent = 'Send order on WhatsApp';
        sendBtn.href = `https://wa.me/${OB.waNumber}?text=${encodeURIComponent(buildMessage(lines, total, bulkEligible))}`;
    }

    function buildMessage(lines, total, bulkEligible) {
        let msg = "Hi UAC Services, I'd like to order:\n";
        lines.forEach(l => { msg += `- ${l.q} x ${l.name} @ ${fmt(l.unit)} = ${fmt(l.lineTotal)}\n`; });
        msg += `\nEstimated total: ${fmt(total)} (excl. delivery)\n`;
        if (bulkEligible) msg += "This looks like a bulk order — please quote me your best price.\n";
        msg += 'Please confirm price and delivery. Thanks!';
        return msg;
    }

    function setQty(id, val) {
        const v = Math.max(0, Math.floor(Number(val) || 0));
        qty[id] = v;
        const stepper = list.querySelector(`.ob-stepper[data-id="${id}"] .ob-qty`);
        if (stepper && String(v) !== stepper.value) stepper.value = v;
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
