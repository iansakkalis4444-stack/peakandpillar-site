# Peak & Pillar: static website

Plain HTML + CSS with a little vanilla JavaScript (scroll fade-ins and `assets/forms.js` for Web3Forms). No build step. Domain: **https://peakandpillar.ca/**

## Pages
- `index.html`: home page (SEO, Open Graph and LocalBusiness JSON-LD in `<head>`)
- `contact/index.html`: contact details and inquiry form (https://peakandpillar.ca/contact/)
- `contact/thanks/index.html`: thank-you page shown after a form submission (noindex)
- `supplies/index.html`: facility consumables catalog + quote / restock / item-request forms

## Files
- `styles.css`: all styles (Poppins via Google Fonts; brand colours charcoal `#474F56`, dark green `#18543B`)
- `assets/`: logo, favicons, photos, `og-image.png` (1200x630), `forms.js` (Web3Forms submit helper)
- `CNAME`: `peakandpillar.ca` (GitHub Pages custom domain)
- `.nojekyll`: tells GitHub Pages to serve the files as-is (no Jekyll build)
- `robots.txt`, `sitemap.xml`: for https://peakandpillar.ca/

## Forms (Web3Forms)
All site forms (`contact/#inquiry`, `supplies/#supplies-quote-form`, `supplies/#request-item-form`) submit via `assets/forms.js` to `https://api.web3forms.com/submit` (JSON POST with `Accept: application/json`).
- Access key: `WEB3FORMS_ACCESS_KEY` in `assets/forms.js` (public client-side key). The script writes it into each form's hidden `access_key` field.
- Hidden fields: `access_key`, `subject`, `from_name` ("Peak & Pillar website"), `redirect` (thanks page, no-JS fallback), plus a hidden `botcheck` checkbox honeypot.
- Subjects: "New Peak & Pillar website inquiry", "New Peak & Pillar supplies quote / restock request", "New Peak & Pillar item request".
- On success (`success: true`), JS redirects to `/contact/thanks/`. On failure (network, timeout ~12s, non-2xx, or `success: false`), an inline fallback offers a prefilled `mailto:info@peakandpillar.ca` and `tel:647-885-9183`.
- No-JS fallback: form `action` is the Web3Forms endpoint with `redirect` set to the thanks page.


## Deploy: GitHub Pages
Contents of this folder sit at the root of the `main` branch; Settings → Pages: "Deploy from a branch", `main`, `/ (root)`, custom domain `peakandpillar.ca`, Enforce HTTPS.
DNS at Porkbun: keep the email-forwarding MX/TXT records untouched.

## Editing
Contact details are in the home page hero, contact section, footer, JSON-LD and the contact page (phone 647-885-9183, info@peakandpillar.ca, Oakville, Ontario; no street address).

## Supplies catalog (v4)
`supplies/index.html` is a live catalog of facility consumables (static HTML product cards — no JS required to display). Forms: `#supplies-quote` (quote / auto-restock) and `#request-item` (can't find it / source an item). Both use Web3Forms via `assets/forms.js` and redirect to `/contact/thanks/` on success.
To edit the catalog, update the `<li class="product-card">` items in the `#product-grid` list. Keep cost bases and markup figures off the public page.
Delivery: FREE local delivery on orders $149.99+; $5.99 under that; local pickup available. Order by phone/SMS 647-885-9183, email info@peakandpillar.ca, or the quote form.
