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

## Regenerating the cut-outs

The transparent PNGs were produced from the originals with `rembg`
(isnet-general-use model) to remove the background and shadow, cropped to
the product's bounding box, then quantised to a 256-colour palette to keep
file sizes small (~50–90 KB each). To redo one, remove the background of the
matching `originals/*.jpg` and save it here under the same PNG name.

## Conventions

- Filenames all-lowercase, words separated by hyphens, no spaces.
- Product cut-outs: transparent PNG, product cropped to frame, kept small
  (quantised palette, under ~100 KB where possible).
- Raw originals live in `originals/`, web-ready assets in the top level.
- Prefer `.svg` for logos/icons.
