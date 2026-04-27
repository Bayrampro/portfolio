# BaDi Systems — Portfolio Website

Multilingual portfolio website for **BaDi Systems** with separate tracks for:
- Business services and case studies
- Student support services

## Pages

- `index.html` — main landing page
- `for-business.html` — business-focused page with project case studies
- `for-students.html` — student services and achievements

## Localization

The site supports 3 languages:
- English (`EN`)
- Russian (`RU`)
- Turkmen (`TK`)

Localization is implemented in `i18n.js` with:
- language switcher in navbar
- per-page translations
- localized dynamic content (typewriter text, service prices, project cards, form labels/messages)
- persisted language in `localStorage`

## Tech

- HTML5
- CSS3
- Vanilla JavaScript
- GSAP (animations)
- Vanilla Tilt

## Run locally

This is a static site. Open `index.html` directly or run any local static server from the project root.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## SEO setup

The project includes:
- canonical and hreflang tags for all pages
- Open Graph and Twitter meta tags
- JSON-LD structured data (`Organization`, `WebSite`, `WebPage`)
- `robots.txt` at the project root

To generate production `sitemap.xml` and `robots.txt` with your real domain:

```bash
bash scripts/generate-seo-files.sh https://your-domain.example
```

For GitHub Actions deploy, set repository secret or variable `SITE_URL` (for example `https://your-domain.example`).  
Then the deploy workflow will auto-generate SEO files before rsync.

## Contacts

- Bayram Annagurbanov
- GitHub: [https://github.com/Bayrampro](https://github.com/Bayrampro)
- Telegram: [https://t.me/byprogger](https://t.me/byprogger)
