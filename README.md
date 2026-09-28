# Supply Station Website

Single-page marketing site for **Supply Station** (formerly UAC Services), a
Cape Town manufacturer of squeegees and supplier of forecourt cleaning
supplies to petrol stations and resellers.

Supply Station is a trading name of **True Motives 1130 CC**.

- **Phone / WhatsApp orders:** 082 826 1003
- **Address:** 10 Celie Industrial Park, Celie Road, Retreat, Cape Town
- **Live (interim):** https://myairhys.github.io/UAC/

---

## File structure

```
UAC/
├── index.html          # The whole site (content, meta tags, JSON-LD)
├── favicon.svg         # Interim four-hexagon mark (source for images/icons/)
├── site.webmanifest    # PWA / home-screen metadata
├── css/style.css       # All styles; brand colours are CSS variables in :root
├── js/main.js          # Nav, filters, colour picker, order builder
└── images/             # Product photos, icons, social share image (see images/README.md)
```

Vanilla HTML/CSS/JS — no build step, no npm dependencies. Deploy the files
as-is to any static host (currently GitHub Pages from `main`).

---

## Brand

| Token | Value | Use |
|-------|-------|-----|
| `--brand` | `#143F66` | Logo navy — buttons, links, headings accents |
| `--navy` | `#0E2C48` | Deep navy — top bar, footer, dark panels |
| `--accent` | `#14A39A` | Logo teal — trade card, accents (sparingly) |
| `--accent-text` | `#0B6E68` | Teal text on pale teal backgrounds (AA contrast) |

The logo in the navbar and `favicon.svg` are an **interim** version of the
four-hexagon concept. When the designer delivers the final logo:

1. Replace the inline `<svg class="logo-svg">` in `index.html`.
2. Replace `favicon.svg` and re-render `images/icons/*.png` from it.
3. Regenerate `images/og-image.jpg` (1200×630) with the new branding.

---

## Sections

1. Top bar (delivery strip) and sticky navbar
2. Hero with squeegee colour range
3. Two ways to order (Buy Direct / Wholesale-Trade)
4. Products with category filter and squeegee colour picker
5. Bulk pricing banner
6. Why buy from Supply Station
7. Delivery zones
8. Order builder (WhatsApp) and contact details
9. Footer with trading-name line

---

## Products and prices

All prices are **excluding VAT**. Keep these three places in sync when a
price changes:

1. The product cards in `index.html` (`.product-price`)
2. The `Product` JSON-LD block in the `<head>` of `index.html`
3. `OB.products` in `js/main.js` (order builder)

| Product | Price (excl. VAT) |
|---------|-------------------|
| Squeegee (red, blue, black, dark grey, light grey) | R35.00 each |
| Garage Roll (160mm × 1250m) | R235.00 each |
| Reject Garage Roll | R190.00 each |
| Pink Multi Purpose Soap (25L) | R450.00 each |
| Replacement Squeegee Rubber 5-Pack | R40.00 per pack |
| Replacement Squeegee Sponges 5-Pack | R40.50 per pack |
| Out of Order Cover | R120.00 each |

The squeegee head is a **foam block wrapped in shade cloth** with a rubber
blade, on a handle. Bulk prices are not published; the order builder nudges
bulk-sized orders to ask for a quote.

---

## Order builder

`js/main.js` builds the product rows, totals the order and prefills a
WhatsApp message. It shows **Subtotal (excl. VAT)**, **VAT 15%** and
**Estimated total (incl. VAT)**.

```js
const OB = {
    vatRegistered: true,   // false hides the VAT line; total = subtotal
    vatRate: 0.15,
    ...
};
```

Only set `vatRegistered: false` if the site is live while the business is not
VAT registered.

---

## Delivery

| Zone | Areas | Delivery |
|------|-------|----------|
| Zone 1 (~15km) | Retreat, Tokai, Wynberg, Claremont, Constantia, etc. | Free |
| Zone 2 (~15–40km) | CBD, Bellville, Table View, Hout Bay, etc. | Fee confirmed on order |
| Zone 3 (40km+) | Rest of the Western Cape and South Africa | Customer's own courier collects from Retreat |

---

## Before launch

- [ ] Re-render `images/icons/*.png` from `favicon.svg` (they still show the old UAC mark)
- [ ] Final logo SVG from the designer, then re-render icons again (see Brand)
- [ ] New `og-image.jpg` with Supply Station branding
- [ ] New business email to replace `uac@gmail.com` (index.html, JSON-LD)
- [ ] CC registration number and VAT number in the footer (`.footer-legal`)
- [ ] Domain, then absolute `og:image` / `og:url` / canonical and JSON-LD image URLs
- [ ] Google Business Profile under the new name

---

## Testing locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
