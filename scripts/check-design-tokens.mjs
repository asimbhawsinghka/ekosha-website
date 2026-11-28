// Verifies the website palette against the vendored EDL tokens.
//  1. tailwind.config.mjs resolves brand.* / tone.* from design/tokens.json (values equal).
//  2. If ../ekosha-foundation is checked out next to this repo, design/tokens.json is identical to the foundation copy.
// Usage: node scripts/check-design-tokens.mjs   (exit 1 on any mismatch)
import { existsSync, readFileSync } from 'node:fs';
import { URL, fileURLToPath } from 'node:url';
import config from '../tailwind.config.mjs';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const tokens = JSON.parse(readFileSync(here('../design/tokens.json'), 'utf-8'));
const light = tokens.colors.light;
const brand = config.theme.extend.colors.brand;
const problems = [];

const expectEq = (name, actual, expected) => {
  if (actual !== expected) problems.push(`${name}: tailwind=${actual} tokens=${expected}`);
};
expectEq('brand.navy', brand.navy, light.navy);
expectEq('brand.gold', brand.gold, light.spark);
expectEq('brand.bg', brand.bg, light.ivory);
expectEq('brand.text', brand.text, light.ink);
expectEq('brand.muted', brand.muted, light.ink2);
expectEq('brand.tertiary', brand.tertiary, light.navyMid);
expectEq('brand.goldInk', brand.goldInk, light.goldInk);
expectEq('brand.lineStrong', brand.lineStrong, light.lineStrong);
for (const [name, v] of Object.entries(tokens.colors.tones.light)) {
  const t = config.theme.extend.colors.tone[name];
  if (!t || t.fg !== v.fg || t.bg !== v.bg) problems.push(`tone.${name} differs from tokens`);
}

const sibling = here('../../ekosha-foundation/02-brand/design-language/tokens.json');
if (existsSync(sibling)) {
  const upstream = JSON.parse(readFileSync(sibling, 'utf-8'));
  if (JSON.stringify(upstream) !== JSON.stringify(tokens)) {
    problems.push('design/tokens.json differs from the foundation copy — copy it over, never edit it here');
  }
} else {
  console.log('check-design-tokens: foundation checkout not found; skipped upstream comparison');
}

if (problems.length) {
  console.error('check-design-tokens: FAILED\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log(`check-design-tokens: OK (EDL ${tokens.version})`);
