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

// 4) Hero — "Complete Financial Inventory Checklist" article.
await render('complete-financial-inventory-checklist-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" fill="#ffffff">The Complete Financial</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" fill="#ffffff">Inventory Checklist</text>
  <text x="80" y="418" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="500" fill="#ffffff" opacity="0.72">for Indian Families</text>
  <rect x="80" y="474" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="524" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 5) Inline — the 12-category checklist grid.
await render('financial-inventory-categories', 1200, 760, `
  <text x="60" y="80" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="800" fill="#ffffff">12 categories to check off</text>
  ${[
    'Bank accounts', 'Deposits (FD/RD)', 'Post office schemes', 'EPF, EPS &amp; NPS',
    'Insurance', 'Investments &amp; demat', 'Gold', 'Property',
    'Lockers', 'Business interests', 'Loans &amp; liabilities', 'Key documents',
  ].map((t, i) => `
    <g transform="translate(${60 + (i % 3) * 380}, ${140 + Math.floor(i / 3) * 150})">
      <rect width="340" height="120" rx="14" fill="#ffffff" opacity="0.06" stroke="${GOLD}" stroke-opacity="0.3"/>
      <circle cx="36" cy="36" r="18" fill="${GOLD}"/>
      <text x="36" y="43" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" fill="${NAVY}">${i + 1}</text>
      <text x="24" y="90" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="700" fill="#ffffff">${t}</text>
    </g>`).join('')}`);

// 6) Hero — "25 Financial Assets Most Families Forget About" article.
await render('25-financial-assets-families-forget-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="270" font-family="Inter, Arial, sans-serif" font-size="80" font-weight="800" fill="${GOLD}">25</text>
  <text x="220" y="270" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff">Financial Assets</text>
  <text x="78" y="348" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff">Most Families Forget About</text>
  <text x="80" y="430" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="500" fill="#ffffff" opacity="0.72">From an old EPF account to a locker nobody's opened in years</text>
  <rect x="80" y="486" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="536" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 7) Hero — "Nominee vs Legal Heir Explained Simply" article.
await render('nominee-vs-legal-heir-explained-simply-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="270" font-family="Inter, Arial, sans-serif" font-size="60" font-weight="800" fill="#ffffff">Nominee</text>
  <text x="330" y="270" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="600" fill="${GOLD}">vs</text>
  <text x="78" y="342" font-family="Inter, Arial, sans-serif" font-size="60" font-weight="800" fill="#ffffff">Legal Heir</text>
  <text x="80" y="424" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="500" fill="#ffffff" opacity="0.72">Explained simply — with what the Supreme Court says</text>
  <rect x="80" y="480" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="530" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 8) Hero — "A Financial Checklist for Newly Married Couples" article.
await render('financial-checklist-newly-married-couples-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">A Financial Checklist</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">for Newly Married</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="${GOLD}">Couples</text>
  <rect x="80" y="464" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="514" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 9) Hero — "How Often Should You Review Your Financial Information?" article.
await render('how-often-review-financial-information-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="800" fill="#ffffff">How Often Should You</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="800" fill="#ffffff">Review Your Financial</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="800" fill="${GOLD}">Information?</text>
  <rect x="80" y="464" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="514" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 10) Hero — "Financial Documents Every Indian Family Should Store Safely" article.
await render('financial-documents-store-safely-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="800" fill="#ffffff">Financial Documents</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="800" fill="#ffffff">Every Indian Family</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="800" fill="${GOLD}">Should Store Safely</text>
  <rect x="80" y="464" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="514" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 11) Hero — "How Many Bank Accounts Does the Average Indian Family Actually Have?" article.
await render('how-many-bank-accounts-average-indian-family-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">How Many Bank Accounts</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">Does the Average Indian</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="${GOLD}">Family Actually Have?</text>
  <rect x="80" y="464" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="514" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 12) Hero — "Seven Signs Your Financial Life Is Becoming Too Complicated" article.
await render('seven-signs-financial-life-too-complicated-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="270" font-family="Inter, Arial, sans-serif" font-size="80" font-weight="800" fill="${GOLD}">7</text>
  <text x="180" y="270" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff">Signs Your Financial</text>
  <text x="78" y="348" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff">Life Is Too Complicated</text>
  <rect x="80" y="474" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="524" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 13) Hero — "What to Do When a Family Member Is Hospitalised" article.
await render('hospitalisation-financial-checklist-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">What to Do When a</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">Family Member Is</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="${GOLD}">Hospitalised</text>
  <rect x="80" y="464" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="514" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 14) Hero — "Legal Heir Certificate, Succession Certificate, and Probate Explained" article.
await render('legal-heir-succession-certificate-probate-explained-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="258" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">Legal Heir Certificate,</text>
  <text x="78" y="322" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">Succession Certificate</text>
  <text x="78" y="386" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="${GOLD}">and Probate Explained</text>
  <rect x="80" y="442" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="492" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 15) Hero — "How to Claim Every Asset After a Death in the Family" article.
await render('how-to-claim-assets-after-death-in-family-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="264" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800" fill="#ffffff">How to Claim Every</text>
  <text x="78" y="336" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800" fill="#ffffff">Asset After a Death</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800" fill="${GOLD}">in the Family</text>
  <rect x="80" y="464" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="514" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 16) Hero — "Cloud Storage, a Paper File, or an App" article.
await render('where-should-your-family-financial-information-live-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="258" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">Cloud Storage, a Paper</text>
  <text x="78" y="322" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">File, or an App: Where</text>
  <text x="78" y="386" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="${GOLD}">Should It All Live?</text>
  <rect x="80" y="442" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="492" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

console.log('Blog images generated.');

// 17) Hero — "Renewal dates families forget" article.
await render('renewal-dates-families-forget-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="258" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">The Renewal Dates</text>
  <text x="78" y="326" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">Most Families Forget</text>
  <text x="78" y="394" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="${GOLD}">— and How to Catch Them</text>
  <rect x="80" y="450" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="500" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);

// 18) Inline — the reminder timeline (7 / 3 / 1 / due day).
await render('renewal-reminder-timeline', 1200, 460, `
  <text x="60" y="80" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">A reminder at each step, not just on the day</text>
  <line x1="140" y1="230" x2="1060" y2="230" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="3"/>
  ${[
    ['7 days', 'Arrange the payment', 140], ['3 days', 'Second reminder', 450],
    ['1 day', 'Last easy chance', 760], ['Due day', 'Renew or update', 1060],
  ].map(([t, d, x], i) => `
    <circle cx="${x}" cy="230" r="${i === 3 ? 22 : 16}" fill="${GOLD}"/>
    <text x="${x}" y="${i === 3 ? 300 : 292}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">${t}</text>
    <text x="${x}" y="338" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" fill="#ffffff" opacity="0.72">${d}</text>`).join('')}`);

// 19) Hero — "Nominee on Every Asset: A Yearly Check" article.
await render('nominee-on-every-asset-yearly-check-hero', 1200, 630, `
  <circle cx="1060" cy="120" r="240" fill="${GOLD}" opacity="0.07"/>
  <text x="80" y="150" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${GOLD}" letter-spacing="2">FAMILY FINANCIAL PREPAREDNESS</text>
  <text x="78" y="258" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">A Nominee on Every</text>
  <text x="78" y="330" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">Asset</text>
  <text x="78" y="402" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="700" fill="${GOLD}">A Yearly Check</text>
  <rect x="80" y="458" width="520" height="2" fill="#ffffff" opacity="0.15"/>
  <text x="80" y="508" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">eKosha · Private · Encrypted · Family-first</text>`);
