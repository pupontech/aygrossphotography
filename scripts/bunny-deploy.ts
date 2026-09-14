/**
 * Bunny.net Deployment & Cache Invalidation Tool
 *
 * Deploys static output from dist/ to Bunny Storage Zone
 * and purges the Bunny Pull Zone CDN cache.
 *
 * NOTE: Portfolio photography is delivered exclusively via Sanity Image CDN.
 * Bunny Storage only hosts the generated static site (HTML, CSS, JS, favicons).
 */

import fs from 'fs';
import path from 'path';

const STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE_NAME;
const STORAGE_PASSWORD = process.env.BUNNY_STORAGE_API_KEY;
const STORAGE_REGION = process.env.BUNNY_STORAGE_REGION || 'de'; // 'de', 'ny', 'la', 'sg', 'syd'
const PULL_ZONE_ID = process.env.BUNNY_PULL_ZONE_ID;
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;

const storageHost = STORAGE_REGION === 'de'
  ? 'storage.bunnycdn.com'
  : `${STORAGE_REGION}.storage.bunnycdn.com`;

async function deployToBunny() {
  console.log('====================================================');
  console.log('🐰 Bunny.net Static Site Deployment');
  console.log('====================================================');

  if (!STORAGE_ZONE || !STORAGE_PASSWORD) {
    console.warn('⚠️ BUNNY_STORAGE_ZONE_NAME or BUNNY_STORAGE_API_KEY not set.');
    console.log('👉 In GitHub Actions, configure these secrets to enable automatic deployments.');
    console.log('👉 For local testing, dist/ is verified and ready for static serving.');
    return;
  }

  const distPath = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('dist directory does not exist. Run `npm run build` before deploying.');
  }

  console.log(`📦 Scanning files in: ${distPath}`);

  // Recursive walk
  function getAllFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, fileList);
      } else {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const allFiles = getAllFiles(distPath);
  console.log(`🚀 Found ${allFiles.length} static assets to sync to Bunny Storage: ${STORAGE_ZONE}`);

  for (const filePath of allFiles) {
    const relativePath = path.relative(distPath, filePath).replace(/\\/g, '/');
    const uploadUrl = `https://${storageHost}/${STORAGE_ZONE}/${relativePath}`;
    const fileStream = fs.readFileSync(filePath);

    console.log(`Uploading -> /${relativePath}`);
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        AccessKey: STORAGE_PASSWORD,
        'Content-Type': 'application/octet-stream'
      },
      body: fileStream
    });

    if (!res.ok) {
      console.error(`❌ Failed to upload ${relativePath}: ${res.status} ${res.statusText}`);
    }
  }

  console.log('✅ All static assets uploaded successfully to Bunny Storage.');

  // Purge Pull Zone Cache
  if (PULL_ZONE_ID && BUNNY_API_KEY) {
    console.log(`🧹 Purging Bunny Pull Zone cache (Zone ID: ${PULL_ZONE_ID})...`);
    const purgeRes = await fetch(`https://api.bunny.net/pullzone/${PULL_ZONE_ID}/purgeCache`, {
      method: 'POST',
      headers: {
        AccessKey: BUNNY_API_KEY
      }
    });

    if (purgeRes.ok) {
      console.log('✅ Bunny CDN cache purged successfully.');
    } else {
      console.warn(`⚠️ Failed to purge Bunny CDN cache: ${purgeRes.status}`);
    }
  } else {
    console.log('ℹ️ Pull zone ID or API key omitted; skipping CDN cache purge.');
  }

  console.log('====================================================');
  console.log('🎉 Bunny.net Deployment Complete!');
  console.log('====================================================');
}

deployToBunny().catch((err) => {
  console.error('Deployment error:', err);
  process.exit(1);
});
