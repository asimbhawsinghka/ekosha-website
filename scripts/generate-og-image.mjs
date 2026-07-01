// Generates public/og-image.png (1200x630) for social sharing/SEO.
// Run with: npm run og:image
// Brand-coloured card composited with the eKosha logo via sharp.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const W = 1200;
const H = 630;

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D3B66"/>
      <stop offset="100%" stop-color="#0E2240"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="1080" cy="120" r="220" fill="#E0B341" opacity="0.07"/>

  <text x="96" y="300" font-family="Inter, Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff">eKosha</text>
  <text x="98" y="372" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="600" fill="#E0B341">Help your family stay financially prepared</text>
  <text x="98" y="430" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="400" fill="#ffffff" opacity="0.7">Organise what your family depends on — and share it with people you trust.</text>

  <rect x="96" y="500" width="560" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="96" y="552" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff" opacity="0.85">Encrypted · Private · Built for Indian families</text>
  <text x="980" y="552" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#E0B341">ekosha.co.in</text>
</svg>`);

const logo = await sharp(`${root}public/images/logo.png`)
  .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(background)
  .composite([{ input: logo, top: 60, left: 96 }])
  .png()
  .toFile(`${root}public/og-image.png`);

console.log('Wrote public/og-image.png (1200x630)');
