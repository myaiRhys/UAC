# Supply Station Website

Single-page marketing site for **Supply Station** (formerly UAC Services), a
Cape Town manufacturer of squeegees and supplier of forecourt cleaning
supplies to petrol stations and resellers.

Supply Station is a trading name of **True Motives 1130 CC**.

- **Phone / WhatsApp orders:** 082 826 1003
- **Address:** Unit 10, Celie Industrial Park, 4 Celie Road, Retreat, Cape Town, 7945
- **GPS:** factory (unit 10) -34.0731766, 18.4601875 · park entrance -34.0732030,18.4606152
- **Live:** https://thesupplystation.co.za (Cloudflare Pages; interim copy at https://myairhys.github.io/UAC/)

---

## File structure

```
UAC/
├── index.html          # The whole site (content, meta tags, JSON-LD)
├── 404.html            # Branded "page not found" (served by Cloudflare Pages)
├── robots.txt          # Crawl rules: all search engines + AI crawlers allowed
├── sitemap.xml         # For Google Search Console / Bing Webmaster Tools
├── llms.txt            # Plain-language summary for AI assistants (llmstxt.org)
├── _headers            # Cloudflare Pages: security, caching, noindex on *.pages.dev
├── _redirects          # Cloudflare Pages: /llm.txt -> /llms.txt
├── favicon.svg / .ico  # Interim four-hexagon mark (source for images/icons/)
├── site.webmanifest    # PWA / home-screen metadata
├── css/style.css       # All styles; brand colours are CSS variables in :root
├── js/main.js          # Nav, filters, colour picker, order builder
├── fonts/              # Self-hosted Poppins + Inter (woff2, OFL licences)
└── images/             # Product photos, icons, social share image (see images/README.md)
```

Vanilla HTML/CSS/JS, no build step and no npm dependencies. Cloudflare Pages
deploys `main` automatically. The old GitHub Pages copy redirects visitors to
the real domain (script at the top of `<head>`); turn GitHub Pages off in the
repo settings once nothing links to it any more.

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

All prices are **excluding VAT**. Keep these places in sync when a price
changes:

1. The product cards in `index.html` (`.product-price`)
2. The `Product` JSON-LD block in the `<head>` of `index.html` (only the
   products with a real photo are in it; see SEO below)
3. `OB.products` in `js/main.js` (order builder)
4. `llms.txt` (what AI assistants read), and bump its "Last updated" date
5. `<lastmod>` in `sitemap.xml`

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

## SEO and AI search

- **Structured data** (JSON-LD in `<head>`): `WholesaleStore` business
  (name, address, phone, hours), `WebSite` (site name in Google results),
  the product price list, and an `FAQPage` that mirrors the visible FAQ.
  Check with https://search.google.com/test/rich-results after changes.
- **Product markup needs a photo.** Google Search Console reports a `Product`
  without `image` as an error under *Merchant listings*, and a logo or
  stand-in picture breaks Google's rules. So only the squeegee and garage
  roll are marked up for now. When a product gets a real photo, add it back
  to the `ItemList` block with `"image"` set, then use *Validate fix* in
  Search Console. Warnings for `shippingDetails`, `hasMerchantReturnPolicy`,
  `review` and `aggregateRating` are optional; leave them until there's a
  written returns policy and genuine reviews.
- **FAQ**: the `#faq` section and the `FAQPage` JSON-LD hold the same text.
  Edit both together.
- **NAP**: name, address and phone must match the Google Business Profile
  exactly: Supply Station, Unit 10, Celie Industrial Park, 4 Celie Road,
  Retreat, Cape Town, 7945, 082 826 1003. The Business Profile map pin goes
  on the factory (unit 10 GPS above); the site's "Get directions" link goes
  to the park entrance, because the factory backs onto a road with no gate.
  Same premises as PSS, BRK and SecureSeal.
- **Cloudflare**: under *AI Crawl Control* / *Bots*, make sure AI crawlers
  are **not** blocked and "managed robots.txt" is **off**, or Cloudflare will
  override `robots.txt`. Turn on *Crawler Hints* (pings Bing via IndexNow).

## Before / after launch

- [x] Re-render `images/icons/*.png` from `favicon.svg`
- [x] New `og-image.jpg` with Supply Station branding
- [x] Absolute `og:image` / `og:url` / canonical and JSON-LD image URLs on https://thesupplystation.co.za
- [x] Cloudflare Pages project + DNS for thesupplystation.co.za
- [x] robots.txt, sitemap.xml, llms.txt, 404 page
- [ ] Final logo SVG from the designer, then re-render icons + og-image (see Brand)
- [ ] New business email: `uac@gmail.com` was removed (Gmail needs 6+ character usernames, so it could not have been ours). Add the new address to index.html (contact card, footer, JSON-LD `email`) and llms.txt
- [ ] CC registration number and VAT number in the footer (`.footer-legal`)
- [x] Google Search Console: verify domain, submit `sitemap.xml`
- [x] Bing Webmaster Tools: import from Search Console, submit `sitemap.xml`
- [ ] Google Business Profile under the new name, website link to the domain
- [ ] Turn off GitHub Pages once the domain is indexed
- [ ] Real photos for the products that still use drawings (soap, reject roll, parts, cover), then add them back to the `Product` JSON-LD

---

## Testing locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
