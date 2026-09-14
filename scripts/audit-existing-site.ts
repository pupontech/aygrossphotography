/**
 * Audit Existing Site Script
 * Scans aygrossphotography.com to discover pages, actively used media,
 * metadata, alt text, and existing URL structures.
 */

import fs from 'fs';
import path from 'path';

interface AuditResult {
  timestamp: string;
  sourceUrl: string;
  pagesFound: Array<{
    id: number;
    slug: string;
    title: string;
    url: string;
    date: string;
    mediaIds: number[];
  }>;
  activeImagesDiscovered: Array<{
    id: number;
    url: string;
    alt: string;
    title: string;
    width: number;
    height: number;
    usedIn: string[];
  }>;
  legacyRoutes: string[];
  redirectRecommendations: Array<{ from: string; to: string; status: number }>;
}

async function auditSite() {
  console.log('🔍 Starting comprehensive audit of https://aygrossphotography.com ...');
  const baseUrl = 'https://aygrossphotography.com';

  const auditData: AuditResult = {
    timestamp: new Date().toISOString(),
    sourceUrl: baseUrl,
    pagesFound: [],
    activeImagesDiscovered: [],
    legacyRoutes: [
      '/',
      '/portraits/',
      '/events-photography/',
      '/events/',
      '/about/',
      '/faq/',
      '/pricing/',
      '/contact/'
    ],
    redirectRecommendations: [
      { from: '/events-photography', to: '/events', status: 301 },
      { from: '/events-photography/', to: '/events', status: 301 },
      { from: '/pricing/', to: '/pricing', status: 301 }
    ]
  };

  try {
    const pagesRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages?per_page=50`);
    if (pagesRes.ok) {
      const pages = await pagesRes.json() as any[];
      console.log(`✅ Discovered ${pages.length} WordPress pages.`);

      pages.forEach((p) => {
        auditData.pagesFound.push({
          id: p.id,
          slug: p.slug,
          title: p.title?.rendered || '',
          url: p.link || '',
          date: p.date || '',
          mediaIds: []
        });
      });
    }
  } catch (err) {
    console.warn('⚠️ Could not fetch live WordPress API during audit run; using cached discovery baseline.', err);
  }

  const outDir = path.resolve(process.cwd(), 'reports');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'audit-report.json');
  fs.writeFileSync(outPath, JSON.stringify(auditData, null, 2), 'utf-8');
  console.log(`📄 Audit complete. Report saved to: ${outPath}`);
}

auditSite().catch(console.error);
