// Generates on-brand blog images into src/assets/blog/ (optimised further by
// astro:assets at build time). Mirrors scripts/generate-og-image.mjs — pure
// SVG + sharp, no external image dependencies, navy (#0E2240) + gold (#E0B341).
// Run with: npm run blog:images
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = `${root}src/assets/blog`;
await mkdir(outDir, { recursive: true });

const NAVY = '#0E2240';
const NAVY2 = '#0D3B66';
const GOLD = '#E0B341';

/** Shared defs: navy gradient + faint grid, matching the site hero + og-image. */
const defs = (w, h) => `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY2}"/>
      <stop offset="100%" stop-color="${NAVY}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>`;

async function render(name, w, h, svgBody) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${defs(w, h)}${svgBody}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${outDir}/${name}.png`);
  console.log(`Wrote src/assets/blog/${name}.png (${w}x${h})`);
}

// 1) Hero — article title over the brand card.
await render('if-something-happened-tomorrow-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="270" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="800" fill="#ffffff">If something happened</text>
  <text x="78" y="348" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="800" fill="#ffffff">to you tomorrow…</text>
  <text x="80" y="430" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="500" fill="#ffffff" opacity="0.72">…would your family know what you own?</text>
  <rect x="80" y="486" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="536" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 2) Inline — scattered vs. organised.
await render('scattered-vs-organised', 1200, 560, `
  <text x="60" y="80" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff">Scattered today</text>
  <text x="660" y="80" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700" fill="${GOLD}">Organised with eKosha</text>
  <line x1="600" y1="40" x2="600" y2="520" stroke="#ffffff" stroke-width="1" opacity="0.15"/>
  ${[
    ['Bank passbook — drawer', 130], ['FD slips — locker', 200], ['LIC policy — old email', 270],
    ['Mutual fund — an app', 340], ['Property papers — cupboard', 410], ['Nominee? — in memory', 480],
  ].map(([t, y], i) => `
    <g transform="translate(${60 + (i % 2) * 20}, ${y - 26}) rotate(${i % 2 ? -2 : 2})">
      <rect width="360" height="44" rx="8" fill="#ffffff" opacity="0.08"/>
      <text x="16" y="29" font-family="Inter, Arial, sans-serif" font-size="19" fill="#ffffff" opacity="0.75">${t}</text>
    </g>`).join('')}
  <g transform="translate(660, 120)">
    <rect width="460" height="360" rx="18" fill="#ffffff" opacity="0.06" stroke="${GOLD}" stroke-opacity="0.35"/>
    ${['Bank accounts', 'Deposits &amp; FDs', 'Insurance', 'Mutual funds', 'Property', 'Nominees set'].map((t, i) => `
      <g transform="translate(28, ${34 + i * 52})">
        <circle cx="10" cy="10" r="10" fill="${GOLD}"/>
        <path d="M5 10 l3 3 l6 -6" stroke="${NAVY}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="34" y="15" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="600" fill="#ffffff">${t}</text>
      </g>`).join('')}
  </g>`);

// 3) Inline — the 4-step preparedness checklist.
await render('preparedness-checklist', 1200, 620, `
  <text x="60" y="90" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">A 15-minute preparedness check</text>
  ${[
    ['1', 'List what you own', 'Accounts, deposits, insurance, investments, property.'],
    ['2', 'Note where it lives', 'Which bank, which institution, which folder.'],
    ['3', 'Name who should know', 'Nominees and the family member who can find it.'],
    ['4', 'Keep it current', 'Revisit when something changes — a new account, a new nominee.'],
  ].map(([n, t, d], i) => `
    <g transform="translate(60, ${150 + i * 110})">
      <circle cx="34" cy="34" r="34" fill="${GOLD}"/>
      <text x="34" y="46" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="${NAVY}">${n}</text>
      <text x="96" y="30" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff">${t}</text>
      <text x="96" y="62" font-family="Inter, Arial, sans-serif" font-size="20" fill="#ffffff" opacity="0.7">${d}</text>
    </g>`).join('')}`);

console.log('Blog images generated.');
