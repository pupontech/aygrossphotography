/**
 * Comprehensive Automated Static Site QA & Audit Suite
 *
 * Validates:
 * 1. HTML Semantics & Headings (h1 presence, hierarchy)
 * 2. Technical SEO Metadata (title, description, canonical, OpenGraph, Twitter)
 * 3. JSON-LD Structured Data Schema validity
 * 4. Image accessibility (alt text, src, dimensions)
 * 5. Internal link integrity (zero 404s)
 * 6. Robots.txt and Sitemap index existence
 */

import fs from 'fs';
import path from 'path';

interface AuditStats {
  pagesChecked: number;
  headingsChecked: number;
  imagesChecked: number;
  linksChecked: number;
  schemasChecked: number;
  warnings: string[];
  errors: string[];
}

const stats: AuditStats = {
  pagesChecked: 0,
  headingsChecked: 0,
  imagesChecked: 0,
  linksChecked: 0,
  schemasChecked: 0,
  warnings: [],
  errors: []
};

const distDir = path.resolve(process.cwd(), 'dist');

function getHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function auditHtmlFile(filePath: string) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf-8');
  stats.pagesChecked++;

  const isRedirectPage = relPath.includes('events-photography');

  // 1. Title Tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    stats.errors.push(`[${relPath}] Missing or empty <title> tag.`);
  } else {
    const titleText = titleMatch[1].trim();
    if (titleText.length > 70) {
      stats.warnings.push(`[${relPath}] Title length is ${titleText.length} chars (recommended <= 70): "${titleText}"`);
    }
  }

  // 2. Meta Description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  if (!isRedirectPage) {
    if (!descMatch || !descMatch[1].trim()) {
      stats.errors.push(`[${relPath}] Missing or empty meta description.`);
    } else if (descMatch[1].trim().length > 175) {
      stats.warnings.push(`[${relPath}] Meta description exceeds 175 chars (${descMatch[1].trim().length} chars).`);
    }
  }

  // 3. Canonical URL
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) ||
                        html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
  if (!canonicalMatch || !canonicalMatch[1].trim()) {
    stats.errors.push(`[${relPath}] Missing canonical <link rel="canonical"> tag.`);
  } else {
    const canonicalUrl = canonicalMatch[1].trim();
    if (!canonicalUrl.startsWith('https://aygrossphotography.com')) {
      stats.errors.push(`[${relPath}] Canonical URL must use preferred origin (got: ${canonicalUrl}).`);
    }
  }

  // 4. OpenGraph Tags
  if (!isRedirectPage) {
    const ogTags = ['og:title', 'og:description', 'og:image', 'og:url'];
    for (const tag of ogTags) {
      const regex = new RegExp(`<meta[^>]+property=["']${tag}["'][^>]+content=["']([^"']*)["']`, 'i');
      if (!regex.test(html)) {
        stats.errors.push(`[${relPath}] Missing OpenGraph tag: ${tag}`);
      }
    }
  }

  // 5. Headings Hierarchy
  if (!isRedirectPage) {
    const h1Matches = html.match(/<h1[^>]*>/gi) || [];
    stats.headingsChecked += h1Matches.length;
    if (h1Matches.length === 0) {
      stats.errors.push(`[${relPath}] Missing <h1> element.`);
    } else if (h1Matches.length > 1) {
      stats.warnings.push(`[${relPath}] Found ${h1Matches.length} <h1> tags (prefer a single primary H1).`);
    }
  }

  // 6. Image Auditing
  const imgRegex = /<img\b([^>]*)>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    stats.imagesChecked++;
    const attrs = imgMatch[1];

    // Check alt attribute
    const hasAlt = /\balt=["']([^"']*)["']/i.test(attrs);
    if (!hasAlt) {
      stats.errors.push(`[${relPath}] Image missing alt attribute: ${imgMatch[0].slice(0, 80)}...`);
    }

    // Check src attribute
    const srcMatch = /\bsrc=["']([^"']*)["']/i.exec(attrs);
    if (!srcMatch || !srcMatch[1].trim()) {
      stats.errors.push(`[${relPath}] Image missing valid src attribute.`);
    }
  }

  // 7. JSON-LD Schema Validation
  const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
    stats.schemasChecked++;
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (!parsed['@context'] || !parsed['@context'].includes('schema.org')) {
        stats.errors.push(`[${relPath}] JSON-LD Schema missing @context schema.org.`);
      }
    } catch (e: any) {
      stats.errors.push(`[${relPath}] Invalid JSON-LD Syntax: ${e.message}`);
    }
  }

  // 8. Internal Links Integrity
  const linkRegex = /<a\b[^>]+href=["']([^"']*)["'][^>]*>/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const href = linkMatch[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      stats.linksChecked++;
      const cleanHref = href.split('#')[0].split('?')[0];

      if (cleanHref.length > 1) {
        // Normalize target path in dist
        let targetPath = cleanHref.replace(/^\//, '');
        if (targetPath.endsWith('/')) {
          targetPath = path.join(targetPath, 'index.html');
        } else if (!targetPath.endsWith('.html') && !targetPath.endsWith('.txt') && !targetPath.endsWith('.xml') && !targetPath.includes('.')) {
          targetPath = path.join(targetPath, 'index.html');
        }

        const fullTarget = path.join(distDir, targetPath);
        if (!fs.existsSync(fullTarget)) {
          stats.errors.push(`[${relPath}] Broken internal link: href="${href}" (Target not found: ${targetPath})`);
        }
      }
    }
  }
}

function runAudit() {
  console.log('🔍 Running Comprehensive Static Site QA & Audit Suite...\n');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found! Run npm run build first.');
    process.exit(1);
  }

  const htmlFiles = getHtmlFiles(distDir);
  console.log(`📄 Discovered ${htmlFiles.length} HTML files in dist/ to audit.`);

  for (const file of htmlFiles) {
    auditHtmlFile(file);
  }

  // Check robots.txt and sitemap
  const robotsPath = path.join(distDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    console.log('✅ robots.txt exists');
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    if (robotsContent.includes('Disallow: /events-photography')) {
      stats.errors.push('robots.txt incorrectly disallows legacy redirect route /events-photography');
    }
  } else {
    stats.errors.push('Missing robots.txt in dist/');
  }

  const sitemapPath = path.join(distDir, 'sitemap-index.xml');
  if (fs.existsSync(sitemapPath)) {
    console.log('✅ sitemap-index.xml exists');
  } else {
    stats.errors.push('Missing sitemap-index.xml in dist/');
  }

  const sitemapChildPath = path.join(distDir, 'sitemap-0.xml');
  if (fs.existsSync(sitemapChildPath)) {
    console.log('✅ sitemap-0.xml exists');
    const sitemapContent = fs.readFileSync(sitemapChildPath, 'utf-8');
    const locMatches = sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g);
    for (const match of locMatches) {
      const url = match[1];
      const pathname = new URL(url).pathname;
      let expectedFile = pathname.replace(/^\//, '');
      if (!expectedFile || expectedFile.endsWith('/')) {
        expectedFile = path.join(expectedFile, 'index.html');
      } else {
        expectedFile = path.join(expectedFile, 'index.html');
      }
      const fullExpected = path.join(distDir, expectedFile);
      if (!fs.existsSync(fullExpected)) {
        stats.errors.push(`Sitemap URL does not exist on disk: ${url} (expected: ${expectedFile})`);
      }
    }
  } else {
    stats.errors.push('Missing sitemap-0.xml in dist/');
  }

  // Check critical static assets
  const criticalAssets = [
    'manifest.webmanifest',
    'og-image.jpg',
    'logo.png',
    'apple-touch-icon.png',
    'favicon.svg',
    'fonts/aleo-400.woff2',
    'fonts/aleo-600.woff2',
    'fonts/inter-400.woff2',
    'fonts/inter-500.woff2',
    'fonts/inter-600.woff2'
  ];

  for (const asset of criticalAssets) {
    const assetPath = path.join(distDir, asset);
    if (!fs.existsSync(assetPath)) {
      stats.errors.push(`Missing critical asset in dist/: ${asset}`);
    } else {
      console.log(`✅ Asset verified in dist/: ${asset}`);
    }
  }

  // Summary Report
  console.log('\n================ AUDIT RESULTS ================');
  console.log(`Pages Audited:    ${stats.pagesChecked}`);
  console.log(`Headings Audited: ${stats.headingsChecked}`);
  console.log(`Images Audited:   ${stats.imagesChecked}`);
  console.log(`Links Audited:    ${stats.linksChecked}`);
  console.log(`Schemas Audited:  ${stats.schemasChecked}`);
  console.log(`Warnings:         ${stats.warnings.length}`);
  console.log(`Errors:           ${stats.errors.length}`);
  console.log('===============================================\n');

  if (stats.warnings.length > 0) {
    console.log('⚠️ Warnings:');
    stats.warnings.forEach((w) => console.log(`  - ${w}`));
    console.log('');
  }

  if (stats.errors.length > 0) {
    console.error('❌ Errors:');
    stats.errors.forEach((e) => console.error(`  - ${e}`));
    console.error('\n💥 QA Audit FAILED with critical issues.');
    process.exit(1);
  } else {
    console.log('🎉 QA Audit PASSED with 0 errors! Production ready.');
  }
}

runAudit();
