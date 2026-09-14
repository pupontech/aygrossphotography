import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateBrandAssets() {
  console.log('🎨 Generating brand and social preview assets with Sharp...');

  const publicDir = path.resolve(process.cwd(), 'public');

  // 1. OpenGraph Social Share Card (1200 x 630)
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#131210"/>
        <stop offset="100%" stop-color="#1a1917"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c9a866"/>
        <stop offset="100%" stop-color="#e8cf96"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <rect x="32" y="32" width="1136" height="566" fill="none" stroke="#2a2826" stroke-width="1.5" rx="8"/>

    <!-- Subtle Accent Top Border -->
    <line x1="80" y1="32" x2="280" y2="32" stroke="url(#goldGrad)" stroke-width="3"/>

    <!-- Aperture Camera Emblem -->
    <g transform="translate(100, 110)">
      <rect width="72" height="72" rx="16" fill="#232220" stroke="#33312e" stroke-width="1.5"/>
      <circle cx="36" cy="36" r="18" stroke="#c9a866" stroke-width="2.5" fill="none"/>
      <circle cx="36" cy="36" r="8" stroke="#c9a866" stroke-width="2" fill="none"/>
      <path d="M36 18 L48 27" stroke="#c9a866" stroke-width="2" stroke-linecap="round"/>
      <path d="M52 31 L45 45" stroke="#c9a866" stroke-width="2" stroke-linecap="round"/>
      <path d="M43 51 L29 49" stroke="#c9a866" stroke-width="2" stroke-linecap="round"/>
      <path d="M23 45 L25 31" stroke="#c9a866" stroke-width="2" stroke-linecap="round"/>
      <path d="M27 23 L41 23" stroke="#c9a866" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Category Eyebrow -->
    <text x="100" y="240" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="600" letter-spacing="4" fill="#c9a866" text-transform="uppercase">
      FINE ART PHOTOGRAPHY • JERUSALEM &amp; ISRAEL
    </text>

    <!-- Brand Title -->
    <text x="100" y="330" font-family="'Georgia', 'Times New Roman', serif" font-size="68" font-weight="400" fill="#ededeb" letter-spacing="-1">
      AY Gross Photography
    </text>

    <!-- Subtitle / Tagline -->
    <text x="100" y="395" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="300" fill="#a3a19b" letter-spacing="0.5">
      Natural family portraits and authentic event storytelling in golden hour light.
    </text>

    <!-- Divider -->
    <line x1="100" y1="450" x2="300" y2="450" stroke="#403e3b" stroke-width="1.5"/>

    <!-- Bottom Features & Domain -->
    <text x="100" y="520" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="500" fill="#73716c" letter-spacing="1">
      PORTRAITS  •  BAR MITZVAHS  •  EVENTS  •  FINE ART PRINTS
    </text>

    <text x="1100" y="520" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="500" fill="#c9a866" text-anchor="end" letter-spacing="1">
      aygrossphotography.com
    </text>
  </svg>
  `;

  const ogBuffer = await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const ogPath = path.join(publicDir, 'og-image.jpg');
  fs.writeFileSync(ogPath, ogBuffer);
  console.log(`✅ Generated ${ogPath} (${ogBuffer.length} bytes)`);

  // 2. Square Brand Logo for Schema.org (512 x 512)
  const logoSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="96" fill="#181716"/>
    <rect x="24" y="24" width="464" height="464" rx="80" fill="none" stroke="#2a2826" stroke-width="4"/>
    <g transform="translate(106, 86)">
      <circle cx="150" cy="150" r="120" stroke="#c9a866" stroke-width="12" fill="none"/>
      <circle cx="150" cy="150" r="54" stroke="#c9a866" stroke-width="10" fill="none"/>
      <path d="M150 30 L230 90" stroke="#c9a866" stroke-width="10" stroke-linecap="round"/>
      <path d="M255 120 L210 210" stroke="#c9a866" stroke-width="10" stroke-linecap="round"/>
      <path d="M195 255 L105 240" stroke="#c9a866" stroke-width="10" stroke-linecap="round"/>
      <path d="M60 210 L75 120" stroke="#c9a866" stroke-width="10" stroke-linecap="round"/>
      <path d="M90 60 L180 60" stroke="#c9a866" stroke-width="10" stroke-linecap="round"/>
    </g>
    <text x="256" y="420" font-family="'Georgia', serif" font-size="38" font-weight="600" fill="#fcfbf9" text-anchor="middle" letter-spacing="6">
      AY GROSS
    </text>
  </svg>
  `;

  const logoBuffer = await sharp(Buffer.from(logoSvg))
    .png()
    .toBuffer();

  const logoPath = path.join(publicDir, 'logo.png');
  fs.writeFileSync(logoPath, logoBuffer);
  console.log(`✅ Generated ${logoPath} (${logoBuffer.length} bytes)`);

  // 3. Apple Touch Icon (180 x 180)
  const appleTouchSvg = `
  <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="180" rx="36" fill="#181716"/>
    <g transform="translate(30, 30)">
      <circle cx="60" cy="60" r="48" stroke="#fcfbf9" stroke-width="5" fill="none"/>
      <circle cx="60" cy="60" r="21" stroke="#c9a866" stroke-width="4" fill="none"/>
      <path d="M60 12 L92 36" stroke="#fcfbf9" stroke-width="4" stroke-linecap="round"/>
      <path d="M102 48 L84 84" stroke="#fcfbf9" stroke-width="4" stroke-linecap="round"/>
      <path d="M78 102 L42 96" stroke="#fcfbf9" stroke-width="4" stroke-linecap="round"/>
      <path d="M24 84 L30 48" stroke="#fcfbf9" stroke-width="4" stroke-linecap="round"/>
      <path d="M36 24 L72 24" stroke="#fcfbf9" stroke-width="4" stroke-linecap="round"/>
    </g>
  </svg>
  `;

  const appleBuffer = await sharp(Buffer.from(appleTouchSvg))
    .png()
    .toBuffer();

  const applePath = path.join(publicDir, 'apple-touch-icon.png');
  fs.writeFileSync(applePath, appleBuffer);
  console.log(`✅ Generated ${applePath} (${appleBuffer.length} bytes)`);

  console.log('🎉 Brand assets successfully generated!');
}

generateBrandAssets().catch((err) => {
  console.error('Failed to generate brand assets:', err);
  process.exit(1);
});
