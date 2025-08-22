# Rooted Marketing Site

A Netlify-ready static marketing site for Rooted Ag.

## Local development

Open a simple static server in the project root:

- Using Python 3:

```bash
cd /Users/rhysalgar/Projects/rooted_marketing_site
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

Edit files under `index.html` or `assets/` and refresh your browser.

## Deploy to Netlify

- In Netlify, create a new site from git and select this repo
- Build settings:
  - Build command: (leave blank)
  - Publish directory: `.`

`netlify.toml` is included for headers and future customization.

## Structure

- `index.html` — Home page 
- `404.html` — Not found page
- `assets/css/styles.css` — Base styles
- `assets/js/main.js` — Placeholder script
- `netlify.toml` — Netlify config
