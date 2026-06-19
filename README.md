# TasteBud Landing

The marketing site for **TasteBud** — the consumer dining companion — and **TasteHub**, the restaurant-facing taste-intelligence platform.

- **One-pager** (`/`) — everything a *diner* needs: hero, how it works, features, the "anatomy of a pick" showcase, testimonials, FAQ, and beta access capture.
- **For business** (`/for-business`) — a dedicated *business* page introducing **TasteHub**: Dish Diagnostics ("why isn't this plate selling?"), the Flavor Copilot for chefs, Diner Taste Intelligence, the data flywheel, and a partner/investor contact form.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, using the exact TasteBud design system (tokens, the `Outfit` typeface, and the brand glyph) so the site is visually one brand with the app. It is **mobile-first** and exports to **fully static HTML** — deploy it anywhere.

---

## 1. Local development

```bash
cd TasteBudLanding
npm install
npm run dev          # http://localhost:3000
```

## 2. Production build (static export)

```bash
npm run build        # outputs a static site to ./out
```

`next.config.mjs` sets `output: "export"`, so `npm run build` produces a self-contained `./out/` folder (HTML, CSS, JS, the generated OG image, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`). No Node server is required to host it.

To preview the exact static output locally:

```bash
npx serve out
```

---

## 3. Deploying to `tastebud-co.com`

Your apex domain `tastebud-co.com` is currently free (the app lives on `app.` and the API on `api.`). Pick **one** of the options below. **Vercel is recommended** — it's purpose-built for Next.js and takes ~5 minutes.

### Option A — Vercel (recommended)

1. Push this folder to a GitHub repo (it can be its own repo, or a subfolder).
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
   - If it's a subfolder, set **Root Directory** to `TasteBudLanding`.
   - Framework preset auto-detects **Next.js**. Leave build command (`next build`) and output as default — Vercel handles the static export automatically.
3. **Settings → Domains → Add** `tastebud-co.com` (and `www.tastebud-co.com`).
4. Vercel shows the DNS records to set. At your domain registrar / DNS provider:
   - Apex `tastebud-co.com` → **A** record to Vercel's IP `76.76.21.21` (or an `ALIAS`/`ANAME` to `cname.vercel-dns.com` if your DNS supports it).
   - `www` → **CNAME** to `cname.vercel-dns.com`.
   - Leave `app.` and `api.` records untouched.
5. HTTPS is provisioned automatically. Every `git push` redeploys.

> Optional: on Vercel you can delete the `output: "export"` line in `next.config.mjs` to unlock Next.js Image Optimization and ISR. Not required — the static export works perfectly on Vercel as-is.

### Option B — Cloudflare Pages or Netlify (free static hosting)

1. Connect the repo. Build command: `npm run build`. Output directory: `out`.
2. Add the custom domain `tastebud-co.com` in the dashboard and follow its DNS instructions (Cloudflare Pages is easiest if your DNS is already on Cloudflare — it wires the apex automatically).

### Option C — Your existing DigitalOcean droplet (nginx)

Since you already run the backend on a droplet, you can serve the static site there too.

1. Build locally and copy the output up:
   ```bash
   npm run build
   rsync -avz --delete out/ youruser@YOUR_DROPLET_IP:/var/www/tastebud-landing/
   ```
2. nginx server block:
   ```nginx
   server {
     listen 80;
     server_name tastebud-co.com www.tastebud-co.com;
     root /var/www/tastebud-landing;

     # Static export uses trailingSlash, so directories resolve to index.html
     location / {
       try_files $uri $uri/ $uri.html /index.html;
     }

     # The generated OG image has no file extension — serve it as PNG
     location = /opengraph-image {
       default_type image/png;
     }

     error_page 404 /404.html;
   }
   ```
3. Point DNS apex `A` record at the droplet IP, then add TLS with `sudo certbot --nginx -d tastebud-co.com -d www.tastebud-co.com`.

---

## 4. Wiring up the forms (optional, but recommended before launch)

Both the beta **AccessForm** and the **BusinessForm** work out of the box with an optimistic "you're on the list ✓" confirmation. To actually capture submissions, set two build-time environment variables to endpoints that accept a JSON `POST`:

```bash
# .env (or Vercel/Cloudflare project env vars)
NEXT_PUBLIC_ACCESS_FORM_ENDPOINT="https://api.tastebud-co.com/api/v1/waitlist"
NEXT_PUBLIC_BUSINESS_FORM_ENDPOINT="https://api.tastebud-co.com/api/v1/business-leads"
```

- **Access form** posts `{ email, source: "landing-access" }`.
- **Business form** posts `{ name, email, role, company, message, source: "for-business" }`.

No-code alternative: point these at a [Formspree](https://formspree.io) form URL — it works with the same JSON `POST` and emails you each submission. Configure email recipients in `lib/site.ts` (`email` / `businessEmail`).

---

## 5. Project structure

```
TasteBudLanding/
├── app/
│   ├── layout.tsx              # fonts, site-wide SEO metadata, Organization JSON-LD
│   ├── page.tsx                # the diner one-pager (+ SoftwareApplication & FAQ JSON-LD)
│   ├── for-business/page.tsx   # TasteHub business page (+ Service & Breadcrumb JSON-LD)
│   ├── privacy/ · terms/       # placeholder legal pages (replace before launch)
│   ├── opengraph-image.tsx     # build-time 1200×630 social share image
│   ├── sitemap.ts · robots.ts · manifest.ts
│   ├── not-found.tsx · globals.css
├── components/                 # Nav, Footer, SwipeCard, AccessForm, BusinessForm, Faq, …
├── lib/
│   ├── site.ts                 # brand constants, URLs, form endpoints — edit here
│   └── dishGradient.ts         # the app's deterministic dish-gradient algorithm
├── public/                     # brand-icon.svg, favicon.ico, apple-touch-icon.png
└── tailwind.config.ts          # design tokens mirrored from the product app
```

## 6. Languages (English / Español)

The whole site is bilingual, using the same `i18next` model as the product app and the **same persistence key** (`tastebud-language`), so a visitor's language choice is shared between the marketing site and the app.

- **Auto-detection:** Spanish browsers (`es`, `es-MX`, `es-ES`, …) see Spanish; every other language sees English. A stored choice always wins. Detection runs client-side after mount (`components/I18nProvider.tsx`), so the prerendered static HTML stays deterministic English for crawlers — no hydration mismatch.
- **Manual switch:** an **EN / ES** picker sits in the nav on every breakpoint (`components/LanguageToggle.tsx`).
- **All copy** — nav, hero, the demo dish cards, sections, FAQ, forms, footer, 404 and the legal pages — comes from `locales/en.json` and `locales/es.json`. To edit wording or add a string, change both files (same key). Structured data and `<title>`/meta stay in English on purpose, to match the indexed static HTML.

To add a third language: drop a `locales/<lng>.json`, register it in `lib/i18n.ts` (`resources` + `SUPPORTED_LANGUAGES`), and extend `detectLanguage()`.

## 7. SEO notes

Everything below is already implemented:

- Per-page `<title>`, meta description, and **canonical** URLs.
- **Open Graph + Twitter** cards with an auto-generated branded share image.
- **Structured data** (JSON-LD): `Organization` + `WebSite` site-wide, `SoftwareApplication` + `FAQPage` on the home page, `Service` + `BreadcrumbList` on the business page. Validate at [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- `sitemap.xml`, `robots.txt`, and a PWA `manifest.webmanifest`.
- Semantic landmarks (`<header>/<main>/<footer>/<nav>`), a single `<h1>` per page, descriptive `alt`/`aria-label`s, and a JS-free `<details>` FAQ that stays crawlable.
- Mobile-first responsive layout, `prefers-reduced-motion` support.

After launch: verify the domain in **Google Search Console** and submit `https://tastebud-co.com/sitemap.xml`. If you change the production domain, update `lib/site.ts` (`url`, `domain`) — every canonical, sitemap, and JSON-LD URL derives from it.
# TasteBudLanding
