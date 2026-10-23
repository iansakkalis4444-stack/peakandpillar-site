# Peak & Pillar: static website

Plain HTML + CSS with a few lines of inline vanilla JavaScript (scroll fade-ins and a contact-form check). No build step, no external scripts. Domain: **https://peakandpillar.ca/**

## Pages
- `index.html`: home page (SEO, Open Graph and LocalBusiness JSON-LD in `<head>`)
- `contact/index.html`: contact details and enquiry form (https://peakandpillar.ca/contact/)
- `contact/thanks/index.html`: thank-you page shown after a form submission (noindex)

## Files
- `styles.css`: all styles (Poppins via Google Fonts; brand colours charcoal `#474F56`, dark green `#18543B`)
- `assets/`: logo, favicons, photos, `og-image.png` (1200x630)
- `CNAME`: `peakandpillar.ca` (GitHub Pages custom domain)
- `.nojekyll`: tells GitHub Pages to serve the files as-is (no Jekyll build)
- `robots.txt`, `sitemap.xml`: for https://peakandpillar.ca/

## Contact form
The form posts to FormSubmit.co (free, no account): `https://formsubmit.co/info@peakandpillar.ca`.
- The very first submission triggers a one-time "Activate Form" email to info@peakandpillar.ca. The link in it must be clicked once before submissions are delivered (FormSubmit holds submissions made before activation for 30 days).
- Hidden fields: `_subject`, `_template=table`, `_captcha=false`, `_next` (thank-you page), `_url`, plus a `_honey` honeypot for spam.
- After activation, FormSubmit may email a random-string endpoint that can replace the plain address in the form `action` to keep it hidden from bots.

## Deploy: GitHub Pages
Contents of this folder sit at the root of the `main` branch; Settings → Pages: "Deploy from a branch", `main`, `/ (root)`, custom domain `peakandpillar.ca`, Enforce HTTPS.
DNS at Porkbun: keep the email-forwarding MX/TXT records untouched.

## Editing
Contact details are in the home page hero, contact section, footer, JSON-LD and the contact page (phone 647-885-9183, info@peakandpillar.ca, Oakville, Ontario; no street address).
