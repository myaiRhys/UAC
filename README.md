# UAC Services Website

A single-page marketing website for UAC Services, a supplier of car wash equipment and cleaning supplies to petrol stations in Cape Town. This is a reference site for repeat customers who place orders by phone.

## Overview

UAC Services supplies squeegees, soaps, garage rolls (paper towels), and other cleaning supplies for petrol station forecourts. Most customers are repeat buyers who call to place orders, so this site serves as a product catalog and contact reference.

**Phone Orders:** 082 826 1003

---

## File Structure

```
UAC/
├── index.html          # Single-page site with all content
├── README.md           # This documentation
├── css/
│   └── style.css       # All styles (1,800+ lines)
└── js/
    └── main.js         # Navigation, animations, contact form
```

### No Build Process

This is a **vanilla HTML/CSS/JavaScript** project:
- No webpack, bundlers, or transpilation
- No npm dependencies
- Deploy files directly to any static host

---

## Site Structure

The single-page site contains these sections:

1. **Navigation** - Sticky header with Products/Contact links and phone button
2. **Hero Section** - Main title and call-to-action buttons
3. **Products Section** - Price list of all 11 products
4. **Bulk Discount Banner** - Highlights squeegee bulk pricing
5. **Why Choose Us** - 4 feature cards
6. **Contact Section** - Enquiry form and contact information
7. **Footer** - Quick links and contact details

---

## Products

| Product | Price | Bulk Price |
|---------|-------|------------|
| Red Squeegee | R30 | R28 (50+) |
| Blue Squeegee | R30 | R28 (50+) |
| Black Squeegee | R30 | R28 (50+) |
| Dark Grey Squeegee | R30 | R28 (50+) |
| Light Grey Squeegee | R30 | R28 (50+) |
| Garage Roll | R240 | - |
| Reject Garage Roll | R180 | - |
| Replacement Rubber 5-Pack | R40 | - |
| Pink Soap | R400 | - |
| Replacement Sponges 5-Pack | R40.50 | - |
| Out of Order Cover | R120 | - |

---

## Features

- **Single-Page Design** - All content on one scrollable page
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Modern Visual Design** - Animated gradients, glassmorphism effects
- **Scroll Animations** - Elements fade in as you scroll
- **Contact Form** - EmailJS integration for enquiries
- **Click-to-Call** - Phone links work on mobile devices
- **Smooth Scrolling** - Navigation links scroll to sections

---

## EmailJS Configuration

The contact form uses EmailJS to send enquiries. To configure:

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

### Step 2: Add an Email Service

1. In the dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Note your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. Name it "Contact Form"

**Subject:** `UAC Enquiry: {{from_company}}`

**Body:**
```
New Enquiry from Website

Company: {{from_company}}
Contact: {{from_name}}
Phone: {{from_phone}}
Email: {{from_email}}

Message:
{{message}}
```

3. In Settings, set **To Email** to `uac@gmail.com`
4. Note the **Template ID**

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update the Code

Edit `js/main.js` and replace these values:

```javascript
// Line 9 - Replace with your public key
emailjs.init('YOUR_PUBLIC_KEY');

// Line 185 - Replace with your service and template IDs
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', {
```

---

## Customization

### Changing Colors

Edit CSS variables in `css/style.css` (lines 13-73):

```css
:root {
    --primary-color: #1877F2;  /* Main brand color */
    --primary-hover: #0e5fc2;  /* Hover state */
}
```

### Updating Contact Information

Search and replace in `index.html`:
- **Phone:** 082 826 1003
- **Email:** uac@gmail.com
- **Address:** 10 Celie Industrial Park, Celie Road, Retreat, Cape Town

### Updating Prices

Edit the product cards in `index.html` (lines 57-193). Update the price text in `.product-price` and `.product-bulk` elements.

### Adding/Removing Products

Copy an existing product card structure and update:

```html
<div class="product-card">
    <div class="product-image" style="background-color: #YOUR_COLOR;">
        <span class="product-image-text">Product Name</span>
    </div>
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="product-price">R100.00 each</p>
        <p class="product-note">Call to order: 082 826 1003</p>
    </div>
</div>
```

### Adding Product Images

Replace the colored background with an image:

```html
<!-- Before (color placeholder) -->
<div class="product-image" style="background-color: #dc3545;">
    <span class="product-image-text">Red Squeegee</span>
</div>

<!-- After (with image) -->
<div class="product-image" style="background-image: url('YOUR_IMAGE_URL'); background-size: cover; background-position: center;">
</div>
```

---

## Deployment

### GitHub Pages

1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select "main" branch as source
5. Site will be live at `https://username.github.io/repo-name/`

### Any Static Host

Simply upload all files to any static hosting provider (Netlify, Vercel, Cloudflare Pages, etc.)

---

## Testing Locally

**Using Python:**
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

**Using VS Code:**
Install "Live Server" extension, right-click `index.html`, select "Open with Live Server"

---

## Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Mobile, Samsung Internet
- Glassmorphism effects may not appear in older browsers

---

## Contact

- **Phone:** 082 826 1003
- **Email:** uac@gmail.com
- **Address:** 10 Celie Industrial Park, Celie Road, Retreat, Cape Town

---

**Built for UAC Services** - Professional car wash supplies for petrol stations
