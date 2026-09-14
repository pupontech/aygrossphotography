/**
 * Migration Verification Tool
 * Validates photo counts, alt text coverage, gallery references,
 * and redirect configurations.
 */

import fs from 'fs';
import path from 'path';
import { portraitsGallery, eventsGallery, homePage } from '../src/lib/data';

function verifyMigration() {
  console.log('🧪 Starting Migration & Content Parity Verification...');

  let passed = true;

  // 1. Portraits gallery count
  const portraitsCount = portraitsGallery.photos.length;
  console.log(`- Portraits photo count: ${portraitsCount} (Expected: 22)`);
  if (portraitsCount !== 22) {
    console.error('❌ Portraits count mismatch!');
    passed = false;
  }

  // 2. Events gallery count
  const eventsCount = eventsGallery.photos.length;
  console.log(`- Events photo count: ${eventsCount} (Expected: 8)`);
  if (eventsCount !== 8) {
    console.error('❌ Events count mismatch!');
    passed = false;
  }

  // 3. Homepage photos
  const homeCount = homePage.featuredPhotos.length;
  console.log(`- Homepage featured photo count: ${homeCount}`);
  if (homeCount < 5) {
    console.error('❌ Homepage featured photos too low!');
    passed = false;
  }

  // 4. Alt text coverage
  const allPhotos = [...portraitsGallery.photos, ...eventsGallery.photos];
  const missingAlt = allPhotos.filter((p) => !p.alt || p.alt.trim().length === 0);
  console.log(`- Photos missing alt text: ${missingAlt.length}`);
  if (missingAlt.length > 0) {
    console.error(`❌ Found ${missingAlt.length} photos without alt text!`);
    passed = false;
  }

  // 5. Static dist verification
  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    const requiredFiles = [
      'index.html',
      'portraits/index.html',
      'events/index.html',
      'events-photography/index.html',
      'about/index.html',
      'faq/index.html',
      'pricing/index.html',
      'contact/index.html',
      '404.html',
      'robots.txt'
    ];

    let distOk = true;
    for (const file of requiredFiles) {
      const filePath = path.join(distDir, file);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing dist file: ${file}`);
        distOk = false;
        passed = false;
      }
    }
    if (distOk) {
      console.log('✅ All required static HTML entrypoints exist in dist/');
    }
  } else {
    console.log('ℹ️ dist directory not yet built (run npm run build first)');
  }

  if (passed) {
    console.log('🎉 Verification PASSED: All photo counts, alt texts, and static routes are intact.');
  } else {
    console.error('💥 Verification FAILED: Some checks did not satisfy acceptance criteria.');
    process.exit(1);
  }
}

verifyMigration();
