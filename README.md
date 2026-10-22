# Peak & Pillar: one-page static site

Plain HTML + CSS, no JavaScript, no build step. Domain: **https://peakandpillar.ca/**

## Files
- `index.html`: the page (SEO, Open Graph and LocalBusiness JSON-LD in `<head>`)
- `styles.css`: all styles (Poppins via Google Fonts; brand colours charcoal `#474F56`, dark green `#18543B`)
- `assets/`: logo, favicons, `og-image.png` (1200x630)
- `CNAME`: `peakandpillar.ca` (GitHub Pages custom domain)
- `.nojekyll`: tells GitHub Pages to serve the files as-is (no Jekyll build)
- `robots.txt`, `sitemap.xml`: for https://peakandpillar.ca/

## Deploy: GitHub Pages (planned)
1. Put the contents of this folder at the root of the `main` branch of a **public** repo (e.g. `peakandpillar-site`).
2. Repo **Settings → Pages**: Source "Deploy from a branch", `main`, `/ (root)`. Custom domain `peakandpillar.ca`. Tick **Enforce HTTPS** once it's available.
3. DNS at Porkbun: 4 × A and 4 × AAAA on the root, CNAME `www` → `<username>.github.io`, GitHub verification TXT. Keep the email-forwarding MX/TXT records.
See `../go-live-steps.md` for the full plain-language checklist.

## Alternative: Cloudflare Pages
Framework preset "None", build command empty, output directory `/`. The `CNAME` and `.nojekyll` files are harmless there.

## Editing
Contact details are in the hero, contact section, footer and JSON-LD (phone 647-885-9183, info@peakandpillar.ca, Oakville, Ontario).
