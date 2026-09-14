# AY Gross Photography — Modern Portfolio Website

A minimal, photography-first portfolio website rebuilt for **AY Gross Photography** ([aygrossphotography.com](https://aygrossphotography.com/)). Built with **Astro 7 (SSG)**, **TypeScript**, **Bunny.net Storage & CDN**, and **GitHub Actions CI/CD**.

---

## 📸 Architectural Overview

```
+------------------------------------+
|         Static Data Layer          |
|    - src/lib/data.ts               |
|    - High-res photography items    |
|    - Curated galleries & copy      |
+-----------------+------------------+
                  |
        Git Push / Build Trigger
                  |
                  v
+------------------------+    +------------------+    +--------------------------+
|  GitHub Actions CI/CD  |--->|   Astro 7 SSG    |--->| Bunny.net Storage & CDN  |
|  - npm ci              |    |   (Zero React)   |    | - Static HTML/CSS/JS     |
|  - astro check         |    |   Pure TS/CSS    |    | - Pull Zone Edge Cache   |
|  - npm run build       |    +------------------+    +-------------+------------+
+------------------------+                                          |
                                                                    v
                                                        https://aygrossphotography.com
```

---

## ✨ Core Design & Technology Principles

1. **Photography-First & Editorial:**
   Photographs provide all the color. UI chrome is understated with a restrained neutral palette (`#fcfbf9` light, `#121211` dark). No CSS color filters are applied to photography.
2. **Astro 7 Static Site Generation (SSG):**
   100% static output (`dist/`). Zero server-side runtime overhead. Lightning fast builds (< 1.5s).
3. **Zero CMS Overhead:**
   Content and photos are tracked directly in code (`src/lib/data.ts`), fully versioned in Git without any third-party CMS downtime, schema migration issues, or API quotas.
4. **Desktop Sticky Sidebar & Mobile Navigation:**
   Desktop keeps a fixed sidebar with persistent branding, clean navigation, external link to *Darkroom Edits*, and an instant dark/light theme toggle. Mobile uses an accessible slide-out drawer with >= 44px touch targets.
5. **Modern Image Presentation:**
   Responsive srcset loading, native lazy-loading, and an accessible keyboard/touch lightbox viewer with EXIF-respecting presentation.
6. **Bunny.net Global Edge Delivery:**
   Static build output is synced directly to Bunny Storage with edge cache invalidation across worldwide PoPs.

---

## 📁 Repository Structure

```
aygrossphotography/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD to Bunny.net
├── public/
│   ├── _headers                    # Security & cache control headers
│   ├── _redirects                  # 301 redirect rules (e.g. /events-photography)
│   ├── favicon.svg                 # Camera aperture SVG icon
│   ├── apple-touch-icon.png        # Apple iOS icon
│   ├── logo.png                    # Square brand icon for Schema.org
│   └── og-image.jpg                # 1200x630 OpenGraph social share card
├── reports/
│   ├── audit-report.json           # Legacy site audit discovery
│   └── migration-summary.json      # Verification metrics
├── scripts/
│   ├── audit-existing-site.ts      # Automated crawler of aygrossphotography.com
│   ├── audit-site-qa.ts            # Automated static site QA & SEO/a11y audit suite
│   ├── bunny-deploy.ts             # Syncs dist/ to Bunny Storage & purges CDN
│   ├── generate-brand-assets.ts    # Generates OG image, logo, and icons via Sharp
│   ├── test-endpoints.ts           # Verifies all local HTTP status codes
│   └── verify-migration.ts         # QA script validating photo parity & alt texts
├── src/
│   ├── components/
│   │   ├── Lightbox.astro          # Accessible modal viewer (Escape, Arrows, Touch)
│   │   ├── MobileNav.astro         # Accessible mobile drawer & theme switcher
│   │   ├── PhotoGrid.astro         # Natural masonry column photo grid
│   │   ├── PhotoImage.astro        # High-performance responsive picture element
│   │   ├── SEO.astro               # OpenGraph, Twitter, & JSON-LD Structured Data
│   │   └── Sidebar.astro           # Sticky desktop sidebar
│   ├── layouts/
│   │   └── Layout.astro            # Base shell with FOUT-free theme boot script
│   ├── lib/
│   │   ├── data.ts                 # Single source of truth for site content & photos
│   │   ├── image.ts                # Responsive image utilities & helpers
│   │   └── types.ts                # TypeScript domain interfaces
│   ├── pages/
│   │   ├── 404.astro               # Minimal 404 error page
│   │   ├── about.astro             # About AY Gross & grandfather mentorship
│   │   ├── contact.astro           # Letterbird embed & direct contact cards
│   │   ├── events.astro            # Canonical Events gallery
│   │   ├── events-photography.astro# Permanent 301 redirect to /events
│   │   ├── faq.astro               # Semantic details/summary accordion
│   │   ├── index.astro             # Photography-dominated homepage
│   │   ├── portraits.astro         # Portraits gallery
│   │   ├── pricing.astro           # Investment packages
│   │   └── robots.txt.ts           # Dynamic robots.txt route
│   └── styles/
│       ├── global.css              # Typography, CSS reset, layout utilities
│       └── variables.css           # Restrained light & dark color tokens
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🛠 Local Development Setup

### 1. Prerequisites
- **Node.js**: v20.x or v22.x (`.nvmrc` included)
- **npm**: v10+

### 2. Installation
```bash
# Clone the repository
cd aygrossphotography

# Install dependencies
npm install
```

### 3. Running the Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 4. Running Static Verification & Build
```bash
# Type check and component diagnostics (0 errors, 0 warnings)
npm run check

# Production static build
npm run build

# Run automated static site QA audit (HTML, SEO, links, schemas, images)
npm run test:audit

# Run complete QA verification suite
npm test

# Test all local endpoints against preview server
npx tsx scripts/test-endpoints.ts
```

---

## ✍️ Content & Photo Editing

All site content and galleries are managed in `src/lib/data.ts`:

- **Adding / Reordering Photos**: Edit `portraitPhotos` or `eventPhotos` arrays in `src/lib/data.ts`. Set `featured: true` to include in the homepage hero feed.
- **Updating Text & Bios**: Update `aboutPage`, `faqPage`, `pricingPage`, `contactPage`, or `siteSettings` objects.
- **SEO & Meta Descriptions**: Each gallery and page includes optional `seo` blocks for customized page titles and OpenGraph descriptions.

---

## 🚀 Bunny.net Deployment & CI/CD

### Production Architecture
1. Developer pushes commits to `main`.
2. GitHub Actions runs:
   - `npm ci`
   - `npx astro check` (0 errors)
   - `npx tsx scripts/verify-migration.ts`
   - `npm run build` (outputs to `dist/`)
   - `npx tsx scripts/bunny-deploy.ts`
3. `bunny-deploy.ts` uploads static assets to Bunny Storage Zone and calls the Bunny API to purge Pull Zone cache.
4. Global CDN edge nodes update within seconds.

---

## 🗺 SEO & Legacy Redirect Map

| Legacy URL | Rebuilt Canonical URL | Status | Implementation |
|---|---|---|---|
| `/` | `https://aygrossphotography.com/` | 200 | Static index.astro |
| `/portraits/` | `https://aygrossphotography.com/portraits` | 200 | Static portraits.astro |
| `/events-photography/` | `https://aygrossphotography.com/events` | 301 Permanent | `public/_redirects`, meta-refresh, canonical |
| `/events/` | `https://aygrossphotography.com/events` | 200 | Canonical events gallery |
| `/about/` | `https://aygrossphotography.com/about` | 200 | Static about.astro |
| `/faq/` | `https://aygrossphotography.com/faq` | 200 | Static faq.astro |
| `/pricing/` | `https://aygrossphotography.com/pricing` | 200 | Static pricing.astro |
| `/contact/` | `https://aygrossphotography.com/contact` | 200 | Static contact.astro |
| External: Editing Services | `https://darkroomedits.com/` | External | Direct link in sidebar & drawer |

---

## 📜 License & Credits

- Rebuilt specifically for **AY Gross Photography**.
- Frontend layout architecture adapted from the open-source **Astro Photo Folio** (MIT License).
