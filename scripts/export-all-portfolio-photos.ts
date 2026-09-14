import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceBaseDir = 'C:\\Users\\Ay\\Desktop\\portfolio ssorted';
const outputDir = path.resolve(process.cwd(), 'public/images/photos');

// All 30 portfolio photos in src/lib/data.ts
const photoTargets = [
  { id: 'photo-ayg0704', filename: 'AYG0704-scaled.jpg', regex: /AYG0?704\.jpg$/i },
  { id: 'photo-ayg6788', filename: 'AYG6788-scaled.jpg', regex: /AYG6788\.jpg$/i },
  { id: 'photo-ayg7972', filename: 'AYG7972-scaled.jpg', regex: /AYG7972\.jpg$/i },
  { id: 'photo-ayg8503', filename: 'AYG8503-scaled.jpg', regex: /AYG8503\.jpg$/i },
  { id: 'photo-ayg9405', filename: 'AYG9405-scaled.jpg', regex: /AYG9405\.jpg$/i },
  { id: 'photo-mg4278', filename: 'MG_4278-scaled.jpg', regex: /_?MG_?4278.*\.jpg$/i },
  { id: 'photo-mg4526', filename: 'MG_4526_1-scaled.jpg', regex: /_?MG_?4526.*\.jpg$/i },
  { id: 'photo-mg5920', filename: 'MG_5920-scaled.jpg', regex: /_?MG_?5920.*\.jpg$/i },
  { id: 'photo-mg5960', filename: 'mg_5960-scaled.jpg', regex: /_?MG_?5960.*\.jpg$/i },
  { id: 'photo-mg6397', filename: 'MG_6397-scaled.jpg', regex: /_?MG_?6397.*\.jpg$/i },
  { id: 'photo-export0010', filename: 'Untitled_Export-0010-scaled.jpg', regex: /Export[-_ ]?0010.*\.jpg$/i },
  { id: 'photo-ayg160705', filename: 'ayg160705-159-1-scaled.jpg', regex: /ayg160705[-_ ]159.*\.jpg$/i },
  { id: 'photo-ayg0089', filename: 'AYG0089-scaled.jpg', regex: /AYG0?089.*\.jpg$/i },
  { id: 'photo-ayg0384', filename: 'AYG0384-scaled.jpg', regex: /AYG0?384.*\.jpg$/i },
  { id: 'photo-ayg160518', filename: 'AYG160518_-105-scaled.jpg', regex: /AYG160518.*105.*\.jpg$/i },
  { id: 'photo-ayg160525', filename: 'AYG160525_-277-scaled.jpg', regex: /AYG160525.*277.*\.jpg$/i },
  { id: 'photo-ayg160501', filename: 'AYG160501_-57-scaled.jpg', regex: /AYG160501.*57.*\.jpg$/i },
  { id: 'photo-mg1445', filename: 'MG_1445-Edit-scaled.jpg', regex: /_?MG_?1445.*\.jpg$/i },
  { id: 'photo-mg1982', filename: 'MG_1982-Edit-scaled.jpg', regex: /_?MG_?1982.*\.jpg$/i },
  { id: 'photo-ayg160621', filename: 'ayg160621-218_1-scaled.jpg', regex: /ayg160621.*218.*\.jpg$/i },
  { id: 'photo-ayg9991', filename: 'AYG9991-scaled.jpg', regex: /AYG9991.*\.jpg$/i },
  { id: 'photo-mg1236', filename: 'MG_1236-scaled.jpg', regex: /_?MG_?1236.*\.jpg$/i },
  { id: 'photo-mg5400', filename: 'MG_5400-scaled.jpg', regex: /_?MG_?5400.*\.jpg$/i },
  { id: 'photo-mg9223', filename: 'MG_9223-scaled.jpg', regex: /_?MG_?9223.*\.jpg$/i },
  { id: 'photo-ayg9271', filename: 'AYG9271-scaled.jpg', regex: /AYG9271.*\.jpg$/i },
  { id: 'photo-ayg160626', filename: 'ayg160626-368_1.jpg', regex: /ayg160626.*368.*\.jpg$/i },
  { id: 'photo-mg9242', filename: 'MG_9242-Edit-scaled.jpg', regex: /_?MG_?9242.*\.jpg$/i },
  { id: 'photo-mg4771', filename: 'MG_4771-scaled.jpg', regex: /_?MG_?4771.*\.jpg$/i },
  { id: 'photo-y7633', filename: 'Y__7633-scaled.jpg', regex: /_?Y__?7633.*\.jpg$/i },
  { id: 'photo-ayg9192', filename: 'AYG9192-scaled.jpg', regex: /AYG9192.*\.jpg$/i }
];

const csvPath = path.join(sourceBaseDir, 'image_inventory.csv');
const lines = fs.readFileSync(csvPath, 'utf-8').split('\n');

interface Candidate {
  fullPath: string;
  relPath: string;
  category: string;
  width: number;
  height: number;
  pixels: number;
  sizeBytes: number;
}

const allFiles: Candidate[] = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const parts = line.split(',');
  if (parts[2] !== 'image') continue;
  const rel = parts[0];
  const ext = path.extname(rel).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg') continue;

  const category = parts[1];
  const width = parts[3] ? parseInt(parts[3]) : 0;
  const height = parts[4] ? parseInt(parts[4]) : 0;
  const pixels = parts[5] ? parseInt(parts[5]) : 0;
  const sizeBytes = parts[6] ? parseInt(parts[6]) : 0;

  allFiles.push({
    fullPath: path.join(sourceBaseDir, category, rel),
    relPath: path.join(category, rel),
    category,
    width,
    height,
    pixels,
    sizeBytes
  });
}

console.log(`Indexed ${allFiles.length} candidate JPEG files.`);

async function exportPhotos() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const exportSummary: any[] = [];

  for (const t of photoTargets) {
    const candidates = allFiles.filter(f => {
      const base = path.basename(f.relPath);
      return t.regex.test(base) && fs.existsSync(f.fullPath);
    });

    if (candidates.length === 0) {
      console.error(`❌ NO CANDIDATE FOUND FOR ${t.filename}`);
      continue;
    }

    // Sort to pick the best master:
    // Prefer 01_Highest_resolution, then highest pixels, then highest sizeBytes
    candidates.sort((a, b) => {
      const aIs01 = a.category === '01_Highest_resolution' ? 1 : 0;
      const bIs01 = b.category === '01_Highest_resolution' ? 1 : 0;
      if (aIs01 !== bIs01) return bIs01 - aIs01;
      if (a.pixels !== b.pixels) return b.pixels - a.pixels;
      return b.sizeBytes - a.sizeBytes;
    });

    const best = candidates[0];
    const targetPath = path.join(outputDir, t.filename);

    console.log(`\nProcessing [${t.filename}]`);
    console.log(`  Source: ${best.relPath} (${best.width}x${best.height}, ${(best.sizeBytes / (1024 * 1024)).toFixed(2)} MB)`);

    // Process with sharp: max 2560px on long edge, progressive MozJPEG 85%
    await sharp(best.fullPath)
      .rotate() // auto-orient based on EXIF
      .resize({
        width: 2560,
        height: 2560,
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(targetPath);

    const outStats = fs.statSync(targetPath);
    const outMeta = await sharp(targetPath).metadata();

    console.log(`  ✅ Exported: ${outMeta.width}x${outMeta.height}, ${(outStats.size / 1024).toFixed(1)} KB`);

    exportSummary.push({
      target: t.filename,
      source: best.relPath,
      sourceDim: `${best.width}x${best.height}`,
      sourceMB: (best.sizeBytes / (1024 * 1024)).toFixed(2),
      outDim: `${outMeta.width}x${outMeta.height}`,
      outKB: Math.round(outStats.size / 1024)
    });
  }

  console.log('\n================ EXPORT COMPLETE ================');
  console.log(`Successfully exported ${exportSummary.length}/${photoTargets.length} photos.`);
}

exportPhotos().catch(console.error);
