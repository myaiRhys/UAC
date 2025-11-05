# UAC Services Website

A complete e-commerce website for UAC Services, a supplier of car wash equipment and cleaning supplies to petrol stations in Cape Town. We provide squeegees, soaps, garage rolls (paper towels), and other supplies for cleaning cars and windscreens at petrol station forecourts.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Technical Reference](#technical-reference)
  - [File Structure](#file-structure)
  - [Technology Stack](#technology-stack)
  - [Image System](#image-system)
  - [Color Palette](#color-palette)
  - [Overlays & Effects](#overlays--effects)
  - [Layout Patterns](#layout-patterns)
  - [Quick Reference Guide](#quick-reference-guide)
- [Features](#features)
- [EmailJS Configuration](#emailjs-configuration)
- [Replacing Product Images](#replacing-product-images)
- [Customization](#customization)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Testing Locally](#testing-locally)
- [Troubleshooting](#troubleshooting)

---

## 🏃 Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser to view the site locally
3. Configure EmailJS for order and contact form functionality (see below)
4. Customize content as needed
5. Deploy to GitHub Pages or your hosting provider

---

## 🔧 Technical Reference

### File Structure

```
UAC/
├── index.html              # Homepage with hero, featured products, CTA
├── shop.html               # Full product catalog with cart sidebar
├── about.html              # About & contact page with form
├── test-image.html         # Image testing page
├── README.md               # This documentation
│
├── css/
│   └── style.css           # Main stylesheet (1727 lines)
│                           # Contains all CSS variables, animations,
│                           # component styles, and responsive rules
│
├── js/
│   ├── main.js             # Navigation, animations, contact form
│   ├── cart.js             # Shopping cart logic & localStorage
│   └── checkout.js         # Checkout modal & order processing
│
└── images/                 # Empty - using Cloudinary CDN & colored backgrounds
```

#### Where Files Are Located

**HTML Pages:**
- `/index.html` - Homepage
- `/shop.html` - Product catalog
- `/about.html` - About & contact

**Stylesheets:**
- `/css/style.css` - All styles in one file (no CSS modules/preprocessors)

**Scripts:**
- `/js/main.js` - General functionality, scroll animations, contact form (EmailJS)
- `/js/cart.js` - Cart management, localStorage persistence, bulk discounts
- `/js/checkout.js` - Checkout flow, order submission (EmailJS)

**Images:**
- No local image files
- Using Cloudinary CDN for product images
- Most products use CSS `background-color` with colored divs

#### No Build Process

This is a **vanilla HTML/CSS/JavaScript** project:
- No webpack, Vite, or bundlers
- No npm dependencies
- No transpilation required
- Deploy files directly to any static host

---

### Technology Stack

| Technology | Version/Details | Purpose |
|------------|-----------------|---------|
| **HTML5** | Standard | Semantic markup |
| **CSS3** | Standard | Styling, animations, glassmorphism |
| **JavaScript** | ES6+ (Vanilla) | Interactivity, cart logic |
| **Google Fonts** | Poppins (weights: 300-800) | Typography |
| **EmailJS** | v3 (CDN) | Email order/contact forms |
| **Cloudinary** | Free tier | Image hosting CDN |

#### External Dependencies (CDN)

**Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**EmailJS (loaded on about.html and via main.js):**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

#### Browser Compatibility

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers:** iOS Safari 14+, Chrome Mobile, Samsung Internet
- **Fallbacks:** Graceful degradation for older browsers
- **Note:** `backdrop-filter` (glassmorphism) may not work in older browsers but cart still functions

---

### Image System

#### Current Implementation

**Method 1: Cloudinary CDN (Blue Squeegee)**
```html
<!-- index.html line 100, shop.html line 64 -->
<div class="product-image" style="background-image: url('https://res.cloudinary.com/dgol2ulhi/image/upload/v1762252933/9034b808-b793-4a42-989d-6ba88363d51a_onp8a2.jpg'); background-size: cover; background-position: center;">
</div>
```

**Method 2: Colored Background Placeholders**
```html
<!-- Most products use this method -->
<div class="product-image" style="background-color: #dc3545;">
    <span class="product-image-text">Red Squeegee</span>
</div>
```

#### Product Image Locations in Code

**Homepage (index.html):**
- Lines 89-107: Featured Products Grid
- Each `.product-card` contains a `.product-image` div

**Shop Page (shop.html):**
- Lines 51-175: Full Products Grid
- Same structure as homepage

#### Adding New Images

**Option A: Use Cloudinary CDN**

1. Upload image to Cloudinary (or your preferred CDN)
2. Get the URL
3. Replace the div:

```html
<!-- BEFORE (colored background) -->
<div class="product-image" style="background-color: #dc3545;">
    <span class="product-image-text">Red Squeegee</span>
</div>

<!-- AFTER (with image) -->
<div class="product-image" style="background-image: url('YOUR_CLOUDINARY_URL'); background-size: cover; background-position: center;">
</div>
```

**Option B: Use Local Images**

1. Create `/images` folder in root
2. Add your images: `images/red-squeegee.jpg`
3. Update HTML:

```html
<div class="product-image" style="background-image: url('images/red-squeegee.jpg'); background-size: cover; background-position: center;">
</div>
```

**Option C: Use IMG Tag**

```html
<div class="product-image">
    <img src="images/red-squeegee.jpg" alt="Red Squeegee" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

#### Image Specifications

- **Recommended Size:** 600x600px (square, 1:1 ratio)
- **Format:** JPG or PNG
- **File Size:** Keep under 200KB for fast loading
- **Optimization:** Use TinyPNG or ImageOptim
- **Background:** White or transparent recommended

#### CSS for Product Images

Images are styled via `.product-image` class in `css/style.css:640-676`:

```css
.product-image {
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-weight: 600;
    font-size: 1.3rem;
    position: relative;
    overflow: hidden;
    transition: all var(--transition-base);
}
```

---

### Color Palette

All colors are defined as CSS custom properties in `css/style.css:13-73`.

#### Primary Colors

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Primary | `#1877F2` | `--primary-color` | Main brand color (Facebook blue) |
| Primary Hover | `#0e5fc2` | `--primary-hover` | Button/link hover states |
| Primary Light | `#E3F2FD` | `--primary-light` | Backgrounds, highlights |
| Primary Dark | `#0a47a1` | `--primary-dark` | Deep accents |

#### Secondary Colors

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Secondary | `#f0f2f5` | `--secondary-color` | Page backgrounds |
| White | `#ffffff` | `--white` | Text on dark, card backgrounds |

#### Text Colors

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Text Dark | `#1c1e21` | `--text-dark` | Primary text, headings |
| Text Light | `#65676b` | `--text-light` | Secondary text, descriptions |
| Text Lighter | `#8a8d91` | `--text-lighter` | Tertiary text, captions |

#### Accent Colors

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Success | `#42b72a` | `--success` | Order confirmation, success messages |
| Success Light | `#d4edda` | `--success-light` | Success backgrounds |
| Error | `#f02849` | `--error` | Error messages, remove buttons |
| Error Light | `#f8d7da` | `--error-light` | Error backgrounds |
| Warning | `#ff9800` | `--warning` | Warnings, alerts |
| Warning Light | `#fff3e0` | `--warning-light` | Warning backgrounds |

#### Border & Shadow Colors

| Color | Hex/RGBA | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Border | `#dddfe2` | `--border-color` | Input borders, dividers |
| Shadow SM | `rgba(24, 119, 242, 0.08)` | `--shadow-sm` | Subtle shadows |
| Shadow MD | `rgba(24, 119, 242, 0.12)` | `--shadow-md` | Medium shadows |
| Shadow LG | `rgba(24, 119, 242, 0.16)` | `--shadow-lg` | Large card shadows |
| Shadow XL | `rgba(24, 119, 242, 0.20)` | `--shadow-xl` | Modal, hover shadows |

#### Gradients

Defined in `css/style.css:63-69`:

```css
/* Primary Gradient - Used on hero, CTA, buttons */
--gradient-primary: linear-gradient(135deg, #1877F2 0%, #4a90e2 50%, #0e5fc2 100%);

/* Primary Hover Gradient */
--gradient-primary-hover: linear-gradient(135deg, #0e5fc2 0%, #1877F2 50%, #4a90e2 100%);

/* Dark Gradient - Footer */
--gradient-dark: linear-gradient(135deg, #1c1e21 0%, #3a3d41 100%);

/* Light Gradient - Modal header */
--gradient-light: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);

/* Success Gradient - Order confirmation */
--gradient-success: linear-gradient(135deg, #42b72a 0%, #5cd63c 100%);
```

#### Glassmorphism Colors

Defined in `css/style.css:71-73`:

```css
/* Glass background - Cart sidebar, mobile menu */
--glass-bg: rgba(255, 255, 255, 0.25);

/* Glass border */
--glass-border: rgba(255, 255, 255, 0.18);
```

#### Product Color Examples

Used inline in HTML for product backgrounds:

| Product | Hex Code | Location |
|---------|----------|----------|
| Red Squeegee | `#dc3545` | shop.html:52 |
| Blue Squeegee | Cloudinary image | shop.html:64 |
| Black Squeegee | `#000` | shop.html:75 |
| Dark Grey Squeegee | `#555` | shop.html:87 |
| Light Grey Squeegee | `#999` | shop.html:99 |
| Garage Roll | `#666` | shop.html:112 |
| Reject Garage Roll | `#888` | shop.html:123 |
| Replacement Rubber | `#333` | shop.html:134 |
| Pink Soap | `#ff69b4` | shop.html:145 |
| Replacement Sponges | `#ffa500` | shop.html:156 |
| Out of Order Cover | `#ff4444` | shop.html:167 |

#### How to Change Colors

**Method 1: Update CSS Variables (Recommended)**

Edit `css/style.css:13-73`:

```css
:root {
    --primary-color: #1877F2; /* Change to your brand color */
    --primary-hover: #0e5fc2; /* Adjust hover state */
    /* ... */
}
```

This changes colors **site-wide** for all buttons, links, gradients.

**Method 2: Update Specific Elements**

Search for the color in CSS and replace:

```css
/* Example: Change all shadows from blue to purple */
/* Find: rgba(24, 119, 242, */
/* Replace with: rgba(138, 43, 226, */
```

**Method 3: Update Product Background Colors**

Edit inline styles in `index.html` and `shop.html`:

```html
<!-- Change Red Squeegee to Purple -->
<div class="product-image" style="background-color: #8a2be2;">
```

---

### Overlays & Effects

#### 1. Glassmorphism (Frosted Glass)

**Used On:**
- Navigation bar (`.navbar` - css/style.css:222-237)
- Cart sidebar (`.cart-sidebar` - css/style.css:844-863)
- Mobile menu (`.nav-menu` - css/style.css:1595-1605)
- Checkout modal backdrop (`.modal` - css/style.css:1076-1096)

**CSS Code:**

```css
/* Navigation glassmorphism */
.navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: var(--shadow-sm);
}

/* Cart sidebar glassmorphism */
.cart-sidebar {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
}
```

**How to Modify:**
- Change `rgba()` alpha value (0.7 → 0.9 for more opaque)
- Adjust `blur()` value (20px → 30px for more blur)

---

#### 2. Gradient Overlays

**Hero Section Radial Gradients** (`css/style.css:371-381`):

```css
.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
}
```

**Product Card Overlay** (`css/style.css:618-633`):

```css
.product-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(24, 119, 242, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity var(--transition-base);
    pointer-events: none;
}

.product-card:hover::after {
    opacity: 1;
}
```

**Product Image Dark Overlay** (`css/style.css:654-668`):

```css
.product-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.product-card:hover .product-image::before {
    opacity: 1;
}
```

**How to Modify Overlays:**

```css
/* Change overlay color from blue to green */
background: linear-gradient(135deg, rgba(34, 139, 34, 0.1) 0%, transparent 100%);

/* Make overlay darker on hover */
background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);

/* Remove overlay */
display: none; /* Or delete the ::before/::after rule */
```

---

#### 3. Shadows with Blue Tints

All shadows use the primary color with varying opacity:

```css
--shadow-sm: 0 2px 8px rgba(24, 119, 242, 0.08);
--shadow-md: 0 4px 16px rgba(24, 119, 242, 0.12);
--shadow-lg: 0 8px 32px rgba(24, 119, 242, 0.16);
--shadow-xl: 0 16px 48px rgba(24, 119, 242, 0.20);
```

**Usage:**
- Cards: `box-shadow: var(--shadow-sm);`
- Hover: `box-shadow: var(--shadow-lg);`
- Modals: `box-shadow: var(--shadow-xl);`

**Change to Grey Shadows:**

```css
:root {
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
    --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.20);
}
```

---

#### 4. Animated Gradients

**Rotating Gradient Animation** (`css/style.css:174-184`):

```css
@keyframes rotateGradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
```

**Applied To:**
- Hero section: `animation: rotateGradient 8s ease infinite;`
- CTA section: `animation: rotateGradient 8s ease infinite;`
- Navigation button: `animation: rotateGradient 3s ease infinite;`

**Usage Example:**

```css
.hero {
    background: var(--gradient-primary);
    background-size: 200% 200%; /* Required for animation */
    animation: rotateGradient 8s ease infinite;
}
```

**Adjust Speed:**
```css
animation: rotateGradient 5s ease infinite; /* Faster */
animation: rotateGradient 15s ease infinite; /* Slower */
```

---

#### 5. Ripple Effect (Button Click)

**Keyframe** (`css/style.css:195-204`):

```css
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
}
```

**Applied via Pseudo-element** (`css/style.css:437-453`):

```css
.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn:active::before {
    width: 300px;
    height: 300px;
}
```

**Customize Ripple Color:**
```css
background: rgba(0, 0, 0, 0.2); /* Dark ripple */
background: rgba(24, 119, 242, 0.3); /* Blue ripple */
```

---

#### 6. Scroll Animations (Fade In Up)

**Animation** (`css/style.css:100-109`):

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Utility Class** (`css/style.css:207-216`):

```css
.fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
}
```

**Applied via JavaScript** (Intersection Observer in `js/main.js`):

```javascript
// Elements with .fade-in-up class animate when scrolled into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
```

---

#### 7. Hover Transforms

**Card Lift on Hover:**

```css
.product-card {
    transition: all var(--transition-base);
}

.product-card:hover {
    transform: translateY(-12px); /* Lifts card up */
    box-shadow: var(--shadow-xl);
}
```

**Common Hover Effects:**

| Element | Effect | Code |
|---------|--------|------|
| Product Card | Lift up | `transform: translateY(-12px);` |
| Overview Card | Lift up | `transform: translateY(-10px);` |
| Reason Card | Slide right | `transform: translateX(10px);` |
| Button | Lift + scale | `transform: translateY(-3px) scale(1.02);` |
| Logo | Scale | `transform: scale(1.05);` |

**Modify Hover Distance:**

```css
/* More dramatic lift */
.product-card:hover {
    transform: translateY(-20px);
}

/* Subtle lift */
.product-card:hover {
    transform: translateY(-5px);
}
```

---

### Layout Patterns

#### 1. Hero Section

**Structure:**
```html
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Title</h1>
            <p class="hero-tagline">Tagline</p>
            <p class="hero-description">Description</p>
            <a href="#" class="btn btn-primary btn-large">CTA 1</a>
            <a href="#" class="btn btn-secondary btn-large">CTA 2</a>
        </div>
    </div>
</section>
```

**CSS:** `css/style.css:360-417`

**Features:**
- Animated gradient background
- Radial gradient overlays
- Centered content
- Large typography (4rem title)
- Dual CTA buttons

**Customization:**

```css
/* Change hero height */
.hero {
    padding: 10rem 0; /* Taller hero */
}

/* Change title size */
.hero-title {
    font-size: 5rem; /* Bigger */
}

/* Different gradient */
.hero {
    background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
}
```

**Responsive:** Title shrinks to 2rem on mobile (css/style.css:1619-1621)

---

#### 2. Product Card Grid

**Structure:**
```html
<section class="featured-products">
    <div class="container">
        <div class="section-header">
            <h2>Section Title</h2>
            <p>Section description</p>
        </div>
        <div class="products-grid">
            <!-- Product Card -->
            <div class="product-card" data-product='{"id":"product-id","name":"Product","price":30}'>
                <div class="product-image" style="background-color: #dc3545;">
                    <span class="product-image-text">Product Name</span>
                </div>
                <div class="product-info">
                    <h3>Product Name</h3>
                    <p class="product-price">R30.00 each</p>
                    <p class="product-bulk">R28.00 for 50+</p>
                    <button class="btn btn-primary btn-small add-to-cart">Add to Cart</button>
                </div>
            </div>
            <!-- Repeat card... -->
        </div>
    </div>
</section>
```

**CSS:**
- Grid: `css/style.css:603-607`
- Card: `css/style.css:609-676`

**Grid Behavior:**
```css
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}
```

**Responsive:**
- Desktop: 3-4 columns
- Tablet: 2-3 columns
- Mobile: 1 column

**Add New Product:**

```html
<div class="product-card" data-product='{"id":"new-product","name":"New Product","price":100,"category":"cleaning"}'>
    <div class="product-image" style="background-color: #28a745;">
        <span class="product-image-text">New Product</span>
    </div>
    <div class="product-info">
        <h3>New Product</h3>
        <p class="product-price">R100.00 each</p>
        <button class="btn btn-primary btn-small add-to-cart">Add to Cart</button>
    </div>
</div>
```

**Important:** Update `data-product` JSON with correct details for cart functionality.

---

#### 3. Overview/Feature Cards

**Structure:**
```html
<section class="overview">
    <div class="container">
        <div class="section-header">
            <h2>Section Title</h2>
            <p>Section description</p>
        </div>
        <div class="overview-grid">
            <div class="overview-card">
                <div class="overview-icon">🧽</div>
                <h3>Card Title</h3>
                <p>Card description text</p>
            </div>
            <!-- Repeat card... -->
        </div>
    </div>
</section>
```

**CSS:**
- Grid: `css/style.css:538-542`
- Card: `css/style.css:544-593`

**Features:**
- Auto-fit grid (2-4 columns)
- Emoji icons with bounce animation
- Top border appears on hover
- Lift effect on hover

**Customization:**

```css
/* Change grid columns */
.overview-grid {
    grid-template-columns: repeat(3, 1fr); /* Fixed 3 columns */
}

/* Change icon animation */
.overview-icon {
    animation: pulse 2s ease infinite; /* Different animation */
}
```

---

#### 4. Call-to-Action (CTA) Section

**Structure:**
```html
<section class="cta">
    <div class="container">
        <div class="cta-content">
            <h2>CTA Heading</h2>
            <p>CTA description text</p>
            <div class="cta-buttons">
                <a href="#" class="btn btn-primary btn-large">Primary CTA</a>
                <a href="#" class="btn btn-secondary btn-large">Secondary CTA</a>
            </div>
        </div>
    </div>
</section>
```

**CSS:** `css/style.css:752-798`

**Features:**
- Animated gradient background (same as hero)
- Radial gradient overlay
- Centered content
- Button group with flexbox

**Customization:**

```css
/* Vertical button stack */
.cta-buttons {
    flex-direction: column;
    align-items: center;
}

/* Different background */
.cta {
    background: var(--gradient-dark);
}
```

---

#### 5. Form with Validation

**Structure:**
```html
<form id="contactForm" class="contact-form">
    <div class="form-group">
        <label for="name">Name *</label>
        <input type="text" id="name" name="name" required>
    </div>

    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
    </div>

    <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="5" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary btn-block">Send Message</button>
</form>
<div id="formMessage" class="form-message"></div>
```

**CSS:** `css/style.css:1165-1203`

**Features:**
- Focus glow effect (blue ring)
- Lift on focus
- Hover border color change
- Success/error message styles

**JavaScript Handling:**
See `js/main.js` for EmailJS integration.

---

#### 6. Modal/Popup

**Structure:**
```html
<div class="modal" id="checkoutModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Modal Title</h2>
            <button class="close-modal" id="closeBtn">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Modal content -->
        </div>
    </div>
</div>
```

**CSS:** `css/style.css:1076-1147`

**Features:**
- Backdrop blur
- Centered on screen
- Scrollable content
- Close button with rotate animation

**JavaScript Toggle:**

```javascript
// Show modal
document.getElementById('checkoutModal').classList.add('active');

// Hide modal
document.getElementById('checkoutModal').classList.remove('active');
```

---

#### 7. Shopping Cart Sidebar (Glassmorphism)

**Structure:**
```html
<div class="cart-sidebar" id="cartSidebar">
    <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="close-cart" id="closeCart">&times;</button>
    </div>

    <div class="cart-items" id="cartItems">
        <!-- Cart items injected by JS -->
    </div>

    <div class="cart-footer">
        <div class="cart-subtotal">
            <span>Subtotal:</span>
            <span id="cartSubtotal">R0.00</span>
        </div>

        <div class="cart-total">
            <span><strong>Total:</strong></span>
            <span id="cartTotal"><strong>R0.00</strong></span>
        </div>

        <button class="btn btn-primary btn-block" id="checkoutBtn">Checkout</button>
    </div>
</div>
```

**CSS:** `css/style.css:844-1071`

**Features:**
- Glassmorphism (frosted glass)
- Sticky positioning
- Custom scrollbar
- Mobile: Full-screen slide-in drawer

**Desktop Behavior:**
- Sticky sidebar (stays visible while scrolling)
- Width: 380px

**Mobile Behavior (< 968px):**
- Fixed position, slides in from right
- Full height
- Toggle with cart button

---

#### 8. Responsive Navigation

**Structure:**
```html
<nav class="navbar">
    <div class="container">
        <div class="nav-wrapper">
            <div class="logo">
                <h1>UAC Services</h1>
            </div>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="shop.html">Shop</a></li>
                <li><a href="about.html">About & Contact</a></li>
                <li><a href="shop.html" class="btn-nav">View Products</a></li>
            </ul>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</nav>
```

**CSS:** `css/style.css:222-355`

**Features:**
- Glassmorphism background
- Sticky/fixed positioning
- Animated underline on hover
- Hamburger menu for mobile

**Desktop:**
- Horizontal menu
- Hover underline animation

**Mobile (<768px):**
- Hamburger menu
- Slide-in drawer from right
- Animated hamburger → X

**JavaScript Toggle:**
See `js/main.js` for hamburger menu functionality.

---

### Quick Reference Guide

#### Adding a New Image

**Step 1:** Choose your method:
- **CDN (Recommended):** Upload to Cloudinary, get URL
- **Local:** Create `/images` folder, add file

**Step 2:** Update HTML in `index.html` and/or `shop.html`:

```html
<!-- Find the product div -->
<div class="product-image" style="background-color: #dc3545;">
    <span class="product-image-text">Red Squeegee</span>
</div>

<!-- Replace with -->
<div class="product-image" style="background-image: url('YOUR_URL_HERE'); background-size: cover; background-position: center;">
</div>
```

**Step 3:** Remove the `<span>` if using real image.

---

#### Changing Colors

**Method 1: Site-Wide Color Change**

Edit `css/style.css` lines 13-73:

```css
:root {
    --primary-color: #YOUR_COLOR; /* Change main brand color */
}
```

Save. All buttons, links, gradients update automatically.

**Method 2: Change Specific Product Color**

Edit inline style in HTML:

```html
<div class="product-image" style="background-color: #YOUR_COLOR;">
```

---

#### Adding a New Section

**Step 1:** Copy existing section HTML:

```html
<section class="overview">
    <div class="container">
        <div class="section-header">
            <h2>Your Section Title</h2>
            <p>Your description</p>
        </div>
        <div class="overview-grid">
            <!-- Your content cards -->
        </div>
    </div>
</section>
```

**Step 2:** Insert into HTML file before footer

**Step 3:** Customize content within `.container`

**Step 4:** (Optional) Add custom CSS in `css/style.css`

---

#### Modifying Overlays

**Remove Product Card Overlay:**

Edit `css/style.css:618-633`, comment out:

```css
/*.product-card::after {
    display: none;
}*/
```

**Change Overlay Color:**

```css
.product-card::after {
    background: linear-gradient(135deg, rgba(YOUR_R, YOUR_G, YOUR_B, 0.1) 0%, transparent 100%);
}
```

**Adjust Overlay Darkness:**

```css
.product-image::before {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
    /* Higher values = darker */
}
```

---

#### Changing Animations

**Disable All Animations:**

Add to `css/style.css`:

```css
* {
    animation: none !important;
    transition: none !important;
}
```

**Disable Specific Animation:**

```css
.hero {
    animation: none; /* Removes gradient rotation */
}
```

**Change Animation Speed:**

```css
/* Faster gradient */
.hero {
    animation: rotateGradient 4s ease infinite; /* Was 8s */
}

/* Slower hover */
.product-card {
    transition: all 0.6s ease; /* Was 0.3s */
}
```

---

#### Adding a New Product

**Step 1:** Open `shop.html`

**Step 2:** Find `.products-grid` (around line 49)

**Step 3:** Copy an existing product card:

```html
<div class="product-card" data-product='{"id":"new-product","name":"New Product Name","price":100,"category":"cleaning"}'>
    <div class="product-image" style="background-color: #28a745;">
        <span class="product-image-text">New Product Name</span>
    </div>
    <div class="product-info">
        <h3>New Product Name</h3>
        <p class="product-price">R100.00 each</p>
        <button class="btn btn-primary btn-small add-to-cart">Add to Cart</button>
    </div>
</div>
```

**Step 4:** Update:
- `data-product` JSON (id, name, price, category)
- Background color or image URL
- Product name (in 3 places)
- Price

**Step 5:** (Optional) Add to `index.html` featured products

---

#### Changing Fonts

**Current Font:** Poppins (Google Fonts)

**Step 1:** Find new font at [Google Fonts](https://fonts.google.com/)

**Step 2:** Update `<link>` in all HTML files:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;600;700&display=swap" rel="stylesheet">
```

**Step 3:** Update CSS (`css/style.css:82`):

```css
body {
    font-family: 'YOUR_FONT', 'Inter', sans-serif;
}
```

---

#### Adjusting Responsive Breakpoints

**Current Breakpoints:**
- `@media (max-width: 968px)` - Tablet
- `@media (max-width: 768px)` - Mobile
- `@media (max-width: 480px)` - Small mobile

**Change Breakpoint:**

Edit `css/style.css:1553-1697`:

```css
@media (max-width: 1024px) { /* Was 968px */
    /* Tablet styles */
}
```

---

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Shopping Cart**: Full-featured cart with localStorage persistence
- **Bulk Discounts**: Automatic price reduction for orders of 50+ squeegees
- **Checkout System**: Complete checkout flow with customer information capture
- **Email Integration**: Order notifications via EmailJS
- **Payment Processing**: EFT payment with proof of upload
- **Contact Form**: Direct inquiry form for customer questions

### ✨ Modern Visual Design (v2.0)
- **Animated Gradients**: Beautiful rotating gradients on hero sections, CTAs, and footers
- **Glassmorphism Effects**: Frosted glass cart sidebar and navigation with backdrop-filter blur
- **Smooth Animations**: Fade-in-up animations on scroll using Intersection Observer API
- **Micro-interactions**: Button ripple effects, hover transforms, and smooth transitions
- **Enhanced Typography**: Clean Poppins font with improved spacing and hierarchy
- **Advanced Shadows**: Layered box-shadows with blue tints for depth
- **Button Animations**: Scale effects, gradient shifts, and click ripple animations
- **Form Enhancements**: Focus glow effects and validation shake animations
- **Cart Animations**: Slide-in notifications and quantity change effects
- **Smooth Scrolling**: Native smooth scroll behavior throughout the site

---

## 📧 EmailJS Configuration

The website uses EmailJS to send order confirmations and contact form submissions. Follow these steps to set it up:

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

You need to create two templates:

#### Template 1: Order Confirmation

1. Go to **Email Templates** → **Create New Template**
2. Name it "Order Confirmation"
3. Set the template content:

**Subject**: `New Order: {{order_id}}`

**Body**:
```
New Order Received!

Order ID: {{order_id}}

Customer Information:
- Company: {{customer_company}}
- Contact Person: {{customer_name}}
- Phone: {{customer_phone}}
- Email: {{customer_email}}
- Address: {{customer_address}}

Delivery Option: {{delivery_option}}

Items Ordered:
{{items}}

Financial Summary:
- Subtotal: {{subtotal}}
- Delivery Fee: {{delivery_fee}}
- Total: {{total}}

Proof of payment attached.

---
This is an automated message from UAC Services website.
```

4. In **Settings**, set:
   - **To Email**: `uac@gmail.com`
   - **From Name**: `UAC Services Website`
   - **Reply To**: `{{customer_email}}`
5. Note down the **Template ID** (e.g., `template_xyz789`)

#### Template 2: Contact Form

1. Create another template named "Contact Form Submission"
2. Set the template content:

**Subject**: `Website Contact: {{from_company}}`

**Body**:
```
New Contact Form Submission

From: {{from_name}}
Company: {{from_company}}
Email: {{from_email}}
Phone: {{from_phone}}

Message:
{{message}}

---
Reply directly to this email to respond to the customer.
```

3. In **Settings**, set:
   - **To Email**: `uac@gmail.com`
   - **From Name**: `{{from_name}}`
   - **Reply To**: `{{from_email}}`
4. Note down the **Template ID**

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `aBcDeFgHiJkLmNoPqR`)

### Step 5: Update the Website Code

#### Update `js/main.js`:

Find this line (around line 6):
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace with:
```javascript
emailjs.init('aBcDeFgHiJkLmNoPqR'); // Your actual public key
```

Find this section (around line 47):
```javascript
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', {
```

Replace with:
```javascript
await emailjs.send('service_abc123', 'template_contact123', { // Your actual IDs
```

#### Update `js/checkout.js`:

Find this line (around line 186):
```javascript
return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
```

Replace with:
```javascript
return emailjs.send('service_abc123', 'template_xyz789', data); // Your actual IDs
```

### Step 6: Test Email Functionality

1. Open the website
2. Go to the About & Contact page
3. Fill out the contact form and submit
4. Check if you receive an email at `uac@gmail.com`
5. Test an order through the shop to verify order emails work

---

## 🖼️ Replacing Product Images

Currently, the website uses colored placeholder divs for product images. To replace them with actual photos:

### Option 1: Replace Inline Styles

1. Take photos of your products
2. Save them in the `images/` folder with descriptive names:
   - `red-squeegee.jpg`
   - `blue-squeegee.jpg`
   - `garage-roll.jpg`
   - etc.

3. In `index.html` and `shop.html`, find the product image divs like:
```html
<div class="product-image" style="background-color: #dc3545;">
    <span class="product-image-text">Red Squeegee</span>
</div>
```

4. Replace with:
```html
<div class="product-image" style="background-image: url('images/red-squeegee.jpg'); background-size: cover; background-position: center;">
</div>
```

### Option 2: Use IMG Tags

Alternatively, replace the entire div with an img tag:

```html
<img src="images/red-squeegee.jpg" alt="Red Squeegee" style="width: 100%; height: 200px; object-fit: cover;">
```

### Image Specifications

- **Recommended size**: 600x600px (square)
- **Format**: JPG or PNG
- **File size**: Keep under 200KB for fast loading
- **Background**: White or transparent background recommended

### Batch Optimization

To optimize all images at once:
1. Use a tool like [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/)
2. Compress images to reduce file size
3. Ensure consistent dimensions for a uniform look

---

## 🎨 Customization

### Changing Colors

The primary color (Facebook blue) is defined in `css/style.css:13-73`:

```css
:root {
    --primary-color: #1877F2;
    --primary-hover: #0e5fc2;
    /* ... */
}
```

Change these values to use different colors throughout the site.

### Updating Company Information

Update contact details in all three HTML files:

- **Address**: 10 Celie Industrial Park, Celie Road, Retreat, Cape Town
- **Phone**: 082 826 1003
- **Email**: uac@gmail.com

Search for these values and replace as needed.

### Adding/Removing Products

In `shop.html`, find the products grid and add/remove product cards:

```html
<div class="product-card" data-product='{"id":"new-product","name":"New Product","price":50,"category":"cleaning"}'>
    <div class="product-image" style="background-color: #your-color;">
        <span class="product-image-text">New Product</span>
    </div>
    <div class="product-info">
        <h3>New Product</h3>
        <p class="product-price">R50.00 each</p>
        <button class="btn btn-primary btn-small add-to-cart">Add to Cart</button>
    </div>
</div>
```

**Important**: Update the `data-product` JSON with correct product details.

### Modifying Pricing

- **Delivery fee**: Edit in `js/cart.js` (line 10): `this.deliveryFee = 150;`
- **Free delivery threshold**: Edit in `js/cart.js` (line 11): `this.freeDeliveryThreshold = 2000;`
- **Product prices**: Edit in the HTML `data-product` attributes

---

## 🚀 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com/) and sign in
2. Click the **+** icon → **New repository**
3. Name it (e.g., `uac-services`)
4. Set to **Public**
5. Click **Create repository**

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface**
1. On your repository page, click **Add file** → **Upload files**
2. Drag all website files and folders
3. Click **Commit changes**

**Option B: Using Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit: UAC Services website"
git branch -M main
git remote add origin https://github.com/yourusername/uac-services.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Your site will be live at: `https://yourusername.github.io/uac-services/`

### Step 4: Update Google Maps Embed

Once you have your live URL, update the Google Maps iframe in `about.html`:

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for "10 Celie Industrial Park, Celie Road, Retreat, Cape Town"
3. Click **Share** → **Embed a map**
4. Copy the iframe code
5. Replace the placeholder iframe in `about.html`

### Custom Domain (Optional)

To use a custom domain like `www.uacservices.co.za`:

1. Purchase a domain from a registrar (e.g., Domain.com, GoDaddy)
2. In GitHub Settings → Pages, enter your custom domain
3. Configure DNS records with your registrar:
   - Add a CNAME record pointing to `yourusername.github.io`
4. Wait for DNS propagation (up to 48 hours)

---

## 🧪 Testing Locally

### Method 1: Simple HTTP Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

**Using Node.js:**
```bash
npx http-server
```

### Method 2: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select **Open with Live Server**

### Method 3: Browser File Protocol

Simply open `index.html` directly in your browser. Note: Some features (like localStorage) may have limitations.

---

## 🐛 Troubleshooting

### Issue: Cart items disappear on page refresh

**Solution**: This is usually a browser localStorage issue. Try:
1. Check browser console for errors
2. Ensure you're not in incognito/private mode
3. Clear browser cache and reload

### Issue: Emails not sending

**Solution**: Check that:
1. EmailJS credentials are correctly configured
2. You're not exceeding the free tier limit (200 emails/month)
3. Browser console doesn't show CORS errors
4. Email templates are published in EmailJS dashboard

### Issue: Mobile menu not working

**Solution**:
1. Ensure JavaScript is enabled in the browser
2. Check browser console for JavaScript errors
3. Clear cache and reload

### Issue: Images not loading

**Solution**:
1. Verify image paths are correct (case-sensitive)
2. Check that images are in the `images/` folder
3. Try using absolute paths: `/images/product.jpg`

### Issue: Glassmorphism not working

**Solution**:
1. Check browser support for `backdrop-filter`
2. Use Chrome 76+, Firefox 103+, Safari 14+
3. Fallback: Site still works, just without frosted glass effect

### Issue: GitHub Pages shows 404

**Solution**:
1. Ensure `index.html` is in the root directory
2. Check that GitHub Pages is enabled for the main branch
3. Wait a few minutes for deployment to complete
4. Clear your browser cache

---

## 🎯 Performance & Browser Compatibility

### Performance Features
- **CSS-only animations**: Using transform and opacity for 60fps performance
- **Intersection Observer**: Efficient scroll detection for animations
- **Debouncing & Throttling**: Optimized scroll and resize event handlers
- **Lazy Loading Ready**: Support for lazy loading images
- **Minimal Dependencies**: Only EmailJS for email functionality

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers
- **Backdrop Filter**: May not work in older browsers (cart will still function)

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Color Contrast**: WCAG AA compliant color combinations
- **Smooth Scrolling**: Respects prefers-reduced-motion

---

## 📞 Support

For technical support or questions:

- **Email**: uac@gmail.com
- **Phone**: 082 826 1003

---

## 📄 License

This website is proprietary software owned by UAC Services. All rights reserved.

---

## 🔄 Version History

- **v2.0.0** (2025) - Modern Visual Upgrade
  - Complete visual redesign with modern aesthetics
  - Animated gradients and glassmorphism effects
  - Scroll-triggered animations using Intersection Observer
  - Enhanced micro-interactions and button effects
  - Poppins typography system
  - Improved mobile responsiveness
  - Performance optimizations
  - Enhanced accessibility features

- **v1.0.0** (2025) - Initial release
  - Full e-commerce functionality
  - Responsive design
  - Shopping cart with bulk discounts
  - EmailJS integration
  - Contact form
  - Checkout process with EFT payment

---

**Built with ❤️ for UAC Services**

*Professional car wash supplies for petrol stations*
