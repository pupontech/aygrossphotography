/**
 * Portfolio Photo Archiving & Mirroring Script
 *
 * Downloads all 30 active portfolio photographs plus the About portrait
 * from WordPress legacy uploads into public/images/photos/
 * to ensure complete hosting independence and long-term resilience.
 */

import fs from 'fs';
import path from 'path';
import { portraitPhotos, eventPhotos, aboutPage } from '../src/lib/data';
import { getImageUrl } from '../src/lib/image';

async function mirrorPhotos() {
  console.log('🖼️ Starting Portfolio Photography Mirroring & Archival...');

  const outDir = path.resolve(process.cwd(), 'public/images/photos');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const allPhotos = [
    ...portraitPhotos,
    ...eventPhotos,
    { id: 'about-portrait', image: aboutPage.portrait! }
  ];

  console.log(`Found ${allPhotos.length} active photography assets to mirror.`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (const item of allPhotos) {
    const remoteUrl = getImageUrl(item.image);
    if (!remoteUrl) continue;

    const filename = path.basename(new URL(remoteUrl).pathname);
    const localPath = path.join(outDir, filename);

    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
      console.log(`⏭️ Already mirrored: ${filename}`);
      skipCount++;
      continue;
    }

    console.log(`⬇️ Downloading: ${filename}...`);
    try {
      const res = await fetch(remoteUrl);
      if (!res.ok) {
        console.error(`❌ HTTP ${res.status} fetching ${remoteUrl}`);
        failCount++;
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(localPath, buffer);
      console.log(`✅ Saved ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err: any) {
      console.error(`❌ Error downloading ${remoteUrl}:`, err.message);
      failCount++;
    }
  }

  console.log('\n================ PHOTO ARCHIVAL SUMMARY ================');
  console.log(`Total Photos: ${allPhotos.length}`);
  console.log(`Downloaded:   ${successCount}`);
  console.log(`Skipped:      ${skipCount}`);
  console.log(`Failed:       ${failCount}`);
  console.log('========================================================\n');

  if (failCount > 0) {
    console.warn('⚠️ Some photos failed to download. Check network or remote URLs.');
  } else {
    console.log('🎉 All active portfolio photographs successfully verified & archived!');
  }
}

mirrorPhotos().catch(console.error);
