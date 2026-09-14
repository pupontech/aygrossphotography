import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDir = path.resolve(process.cwd(), 'public/images/photos');
const files = fs.readdirSync(photosDir);

async function verifyAll() {
  console.log(`Verifying ${files.length} photos in ${photosDir}...\n`);

  let allValid = true;
  for (const f of files) {
    const fullPath = path.join(photosDir, f);
    const stats = fs.statSync(fullPath);
    try {
      const meta = await sharp(fullPath).metadata();
      console.log(`✅ [${meta.format}] ${f}: ${meta.width}x${meta.height}, ${(stats.size / 1024).toFixed(1)} KB`);
    } catch (err: any) {
      console.error(`❌ INVALID IMAGE: ${f} (${stats.size} bytes): ${err.message}`);
      allValid = false;
    }
  }

  console.log(`\nAll photos valid: ${allValid ? '🎉 YES, 100% VALID IMAGES!' : '💥 NO, ERRORS FOUND'}`);
}

verifyAll().catch(console.error);
