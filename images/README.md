# Images

Product and site photography for the UAC Services website.

## Squeegee range

Real product photos of the UAC squeegee, one per colour in the range. Each
shows the head (with blue bristle scrubber + black rubber blade) beside its
matching handle.

The site uses **background-removed PNG cut-outs** (transparent), so the
product floats on the card's soft studio backdrop rather than sitting in a
white box:

| File | Colour |
|------|--------|
| `squeegee-red.png` | Red |
| `squeegee-blue.png` | Blue |
| `squeegee-black.png` | Black |
| `squeegee-dark-grey.png` | Dark grey |
| `squeegee-light-grey.png` | Light grey |

`originals/` holds the untouched source JPGs (shot on a white background).
Keep them — they're the source for regenerating the cut-outs if needed.

## Garage roll

| File | Product |
|------|---------|
| `garage-roll.png` | Garage roll (jumbo wiper roll, 160mm × 1250m) |

Supplier product photo, background-removed to a transparent cut-out so it
sits on the same soft studio backdrop as the squeegees. Source shot on a
white background is in `originals/garage-roll.jpg`.

## Regenerating the cut-outs

The transparent PNGs were produced from the originals with `rembg`
(isnet-general-use model) to remove the background and shadow, cropped to
the product's bounding box, then quantised to a 256-colour palette to keep
file sizes small (~50–90 KB each). To redo one, remove the background of the
matching `originals/*.jpg` and save it here under the same PNG name.

## Site icons & social share

- `icons/` — favicons and app icons rendered from `favicon.svg`
  (`apple-touch-icon.png` 180px, `icon-192.png` / `icon-512.png` for
  Android/PWA on a solid navy square, `favicon-16/32.png` PNG fallbacks).
- `og-image.jpg` — 1200×630 social share card (WhatsApp/Facebook/Twitter
  preview). Referenced by the `og:image` / `twitter:image` tags in
  `index.html`. When the live domain is set, switch those tags to an
  absolute `https://DOMAIN/images/og-image.jpg` URL so scrapers pick it up.

## Conventions

- Filenames all-lowercase, words separated by hyphens, no spaces.
- Product cut-outs: transparent PNG, product cropped to frame, kept small
  (quantised palette, under ~100 KB where possible).
- Raw originals live in `originals/`, web-ready assets in the top level.
- Prefer `.svg` for logos/icons.
