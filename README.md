# UAC Services Website

A complete e-commerce website for UAC Services, a car wash supplies company serving petrol stations in Cape Town.

## 🚀 Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Shopping Cart**: Full-featured cart with localStorage persistence
- **Bulk Discounts**: Automatic price reduction for orders of 50+ squeegees
- **Checkout System**: Complete checkout flow with customer information capture
- **Email Integration**: Order notifications via EmailJS
- **Payment Processing**: EFT payment with proof of upload
- **Contact Form**: Direct inquiry form for customer questions
- **Professional Design**: Clean, corporate look using Facebook blue (#1877F2)

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [EmailJS Configuration](#emailjs-configuration)
- [Replacing Product Images](#replacing-product-images)
- [Customization](#customization)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Testing Locally](#testing-locally)
- [File Structure](#file-structure)
- [Troubleshooting](#troubleshooting)

## 🏃 Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser to view the site locally
3. Configure EmailJS for order and contact form functionality (see below)
4. Customize content as needed
5. Deploy to GitHub Pages or your hosting provider

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

## 🎨 Customization

### Changing Colors

The primary color (Facebook blue) is defined in `css/style.css`:

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

## 📁 File Structure

```
UAC/
├── index.html              # Home page
├── shop.html               # Products/shop page
├── about.html              # About & contact page
├── README.md               # This file
├── css/
│   └── style.css           # All styles
├── js/
│   ├── main.js             # General functionality
│   ├── cart.js             # Shopping cart logic
│   └── checkout.js         # Checkout process
└── images/                 # Product images (placeholder folder)
```

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

### Issue: GitHub Pages shows 404

**Solution**:
1. Ensure `index.html` is in the root directory
2. Check that GitHub Pages is enabled for the main branch
3. Wait a few minutes for deployment to complete
4. Clear your browser cache

## 📞 Support

For technical support or questions:

- **Email**: uac@gmail.com
- **Phone**: 082 826 1003

## 📄 License

This website is proprietary software owned by UAC Services. All rights reserved.

## 🔄 Version History

- **v1.0.0** (2025) - Initial release
  - Full e-commerce functionality
  - Responsive design
  - Shopping cart with bulk discounts
  - EmailJS integration
  - Contact form
  - Checkout process with EFT payment

---

**Built with ❤️ for UAC Services**

*Keeping forecourts clean, one station at a time*
