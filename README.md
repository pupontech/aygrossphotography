# AY Gross Photography — Modern Portfolio Website

A minimal, photography-first portfolio website rebuilt for **AY Gross Photography** ([aygrossphotography.com](https://aygrossphotography.com/)). Built with **Astro 7 (SSG)**, **TypeScript**, **Sanity CMS**, **Sanity Image CDN**, **Bunny.net Storage & CDN**, and **GitHub Actions CI/CD**.

---

## 📸 Architectural Overview

```
                      +-----------------------------+
                      |   Sanity Studio (Separate)  |
                      |   - Sanity Content Lake     |
                      |   - Photo Documents         |
                      |   - Ordered Galleries       |
                      +--------------+--------------+
                                     |
                          Publish Webhook / Build
                                     |
                                     v
+------------------------+    +--------------+    +--------------------------+
|  GitHub Actions CI/CD  |--->| Astro 7 SSG  |--->| Bunny.net Storage & CDN  |
|  - npm ci              |    | (Zero React) |    | - Static HTML/CSS/JS     |
|  - astro check         |    | Pure TS/CSS  |    | - Pull Zone Edge Cache   |
|  - npm run build       |    +--------------+    +-------------+------------+
+------------------------+                                      |
                                                                v
                                                    https://aygrossphotography.com
                                                                |
                                                    Portfolio Photography (Direct)
                                                                |
                                                                v
                                                    Sanity Image CDN (WebP/AVIF)
```

---

## ✨ Core Design & Technology Principles

1. **Photography-First & Editorial:**
   Photographs provide all the color. UI chrome is understated with a restrained neutral palette (`#fcfbf9` light, `#121211` dark). No CSS color filters are applied to photography.
2. **Astro 7 Static Site Generation (SSG):**
   100% static output (`dist/`). Zero server-side runtime overhead. Build time < 2 seconds.
3. **Zero React on Public Frontend:**
   The public website uses pure Astro components, Vanilla TypeScript, and native HTML/CSS. Sanity Studio remains completely decoupled to prevent heavy bundle sizes.
4. **Desktop Sticky Sidebar & Mobile Navigation:**
   Desktop keeps a fixed sidebar with persistent branding, clean navigation, external link to *Darkroom Edits*, and an instant dark/light theme toggle. Mobile uses an accessible slide-out drawer with >= 44px touch targets.
5. **Sanity CMS as Single Source of Truth:**
   Portfolio images, gallery memberships, editorial ordering, homepage curation, alt text, and page content are managed through Sanity.
6. **Bunny.net Hosting vs. Sanity Image CDN:**
   Bunny Storage hosts only static site code (HTML, CSS, JS, favicons). Portfolio photography is delivered directly from Sanity Image CDN with on-the-fly responsive transformations.

---

## 🔒 Image & Master File Policies

### Web-Master Policy
Sanity is the website presentation CMS, not the raw archival client vault.
- Upload web-masters with approximately **3000–4000 px** maximum long edge.
- Never upscale smaller photographs.
- Preserve original aspect ratios, natural skin tones, and color spaces.
- Archival print-resolution RAW/TIFF files remain stored in secure offline client archives.

### Casual High-Resolution Download Protection
- No intrusive fake DRM or right-click blocking.
- Web-master originals are never exposed directly.
- The Lightbox viewer requests transformed variants capped at **2200 px** maximum width with quality 85–86.
- The grid requests responsive thumbnails (480w, 768w, 1024w).

### EXIF Privacy
- Sensitive private metadata (camera serial numbers, precise GPS coordinates) is stripped from public derivatives by the CDN pipeline.

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
│   └── favicon.svg                 # Camera aperture SVG icon
├── reports/
│   ├── audit-report.json           # Legacy site audit discovery
│   └── migration-summary.json      # Verification & migration metrics
├── sanity/
│   ├── schemaTypes/
│   │   ├── siteSettings.ts         # Singleton: business metadata, social, contact
│   │   ├── homePage.ts             # Singleton: curated hero & featured photos
│   │   ├── photo.ts                # Reusable photograph schema with hotspot & crop
│   │   ├── gallery.ts              # Ordered gallery schema (Portraits, Events, etc.)
│   │   ├── aboutPage.ts            # Singleton: biography, portrait, highlights
│   │   ├── faqPage.ts              # Singleton: ordered Q&A items
│   │   ├── pricingPage.ts          # Singleton: pricing packages
│   │   ├── contactPage.ts          # Singleton: Letterbird config & direct contact
│   │   ├── testimonial.ts          # Testimonials schema
│   │   ├── seo.ts                  # Reusable SEO metadata
│   │   └── index.ts
│   └── deskStructure.ts            # Pinned singleton Studio desk structure
├── sanity.config.ts                # Sanity Studio configuration
├── sanity.cli.ts                   # Sanity CLI configuration
├── scripts/
│   ├── audit-existing-site.ts      # Automated crawler of aygrossphotography.com
│   ├── migrate-wordpress.ts        # Idempotent WP -> Sanity migration tool
│   ├── verify-migration.ts         # QA script validating photo parity & alt texts
│   ├── bunny-deploy.ts             # Syncs dist/ to Bunny Storage & purges CDN
│   └── test-endpoints.ts           # Verifies all local HTTP status codes
├── src/
│   ├── components/
│   │   ├── Lightbox.astro          # Accessible modal viewer (Escape, Arrows, Touch)
│   │   ├── MobileNav.astro         # Accessible mobile drawer & theme switcher
│   │   ├── PhotoGrid.astro         # Natural masonry column photo grid
│   │   ├── SanityImage.astro       # Responsive picture element with auto-format
│   │   ├── SEO.astro               # OpenGraph, Twitter, & JSON-LD Structured Data
│   │   └── Sidebar.astro           # Sticky desktop sidebar
│   ├── layouts/
│   │   └── Layout.astro            # Base shell with FOUT-free theme boot script
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts           # Resilient client with verified offline fallback
│   │       ├── fixtures.ts         # Audited live data fixtures from existing site
│   │       ├── image.ts            # URL builder & responsive srcSet generator
│   │       ├── queries.ts          # Centralized GROQ queries
│   │       └── types.ts            # TypeScript interfaces
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
npm ci
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configurable variables:
```ini
# Public Sanity Configuration
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01

# Private Sanity Tokens (Optional for build/migration)
SANITY_API_READ_TOKEN=your_read_token
SANITY_WRITE_TOKEN=your_migration_write_token

# Bunny.net Deployment Credentials (GitHub Actions Secrets)
BUNNY_STORAGE_ZONE_NAME=aygross-storage
BUNNY_STORAGE_API_KEY=your_bunny_storage_password
BUNNY_STORAGE_REGION=de
BUNNY_PULL_ZONE_ID=123456
BUNNY_API_KEY=your_bunny_account_api_key
```

*Note: If Sanity credentials are not configured, the website automatically and seamlessly runs using verified offline fixtures captured during the legacy site audit.*

### 4. Running the Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 5. Running Static Verification & Build
```bash
# Type check and component diagnostics
npx astro check

# Production static build
npm run build

# Verify migration parity
npx tsx scripts/verify-migration.ts

# Test all local endpoints
npx tsx scripts/test-endpoints.ts
```

---

## ✍️ Sanity Studio & Content Management

### Launching Sanity Studio Locally
```bash
npx sanity dev
```
Studio will be available at `http://localhost:3333`.

### Deploying Sanity Studio
Deploy Studio to Sanity's global hosting:
```bash
npx sanity deploy
```
You will be prompted to choose a studio hostname (e.g. `aygrossphotography.sanity.studio`).

### Editorial Workflow
1. **Photographs:**
   - Add a new photo under **All Photographs**.
   - Set internal title and **Alt Text** (mandatory for accessibility).
   - Adjust **Hotspot & Crop** for responsive framing.
   - Toggle `Featured` if desired for homepage promotion.
2. **Galleries:**
   - Under **Galleries & Collections**, select `Portraits` or `Events`.
   - Drag and drop photographs into the desired order. Order in Sanity is the exact order rendered in the gallery.
3. **Homepage:**
   - In **Pages -> Homepage**, manually select and reorder featured photographs.
4. **Publishing:**
   - Click **Publish**. Sanity triggers a webhook to rebuild the static site.

---

## 🚀 Bunny.net Deployment & CI/CD

### Production Architecture
1. Editor clicks **Publish** in Sanity Studio.
2. Sanity Webhook triggers GitHub Actions (`repository_dispatch` event `sanity-publish`).
3. GitHub Actions runs:
   - `npm ci`
   - `npx astro check` (0 errors)
   - `npx tsx scripts/verify-migration.ts`
   - `npm run build` (outputs to `dist/`)
   - `npx tsx scripts/bunny-deploy.ts`
4. `bunny-deploy.ts` uploads static assets to Bunny Storage Zone and calls the Bunny API to purge Pull Zone cache.
5. Global CDN edge nodes update within seconds.

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
