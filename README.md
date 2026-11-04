# Peak & Pillar: static website

Plain HTML + CSS with a little vanilla JavaScript (scroll fade-ins, `assets/nav.js` mobile menu, `assets/forms.js` for Web3Forms). No build step. Domain: **https://peakandpillar.ca/**

## Pages
- `index.html`: home (ProfessionalService JSON-LD, Open Graph)
- `commercial-facility-inspections/`: service page + Service JSON-LD
- `preventative-maintenance/`: Quarterly Care Plan
- `vendor-project-management/`: quoted per project
- `property-maintenance-consulting/`: consulting overview
- `faq/`: FAQ + FAQPage JSON-LD
- `supplies/`: facility consumables catalog + quote / restock / item-request forms
- `contact/`: inquiry form
- `contact/thanks/`: thank-you (noindex)
- `404.html`: branded not-found page (GitHub Pages)

## Files
- `styles.css`: Poppins; brand colours charcoal `#474F56`, dark green `#18543B`
- `assets/`: logo, favicons, photos, `og-image.png` (1200x630), `forms.js`, `nav.js`
- `CNAME`: `peakandpillar.ca`
- `.nojekyll`, `robots.txt`, `sitemap.xml`

## Forms (Web3Forms)
See `assets/forms.js`. Access key is public client-side. Success redirects to `/contact/thanks/`.

## Deploy
Contents of this folder sit at the root of the `main` branch (GitHub Pages). Do not touch Porkbun MX/SPF records.
