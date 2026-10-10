import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets';
const SOURCE = `${OUT}/kartikay-portrait.png`;
mkdirSync(OUT, { recursive: true });

for (const width of [1100, 720, 420]) {
  await sharp(SOURCE)
    .resize({ width })
    .webp({ quality: 86, alphaQuality: 90 })
    .toFile(`${OUT}/portrait-${width}.webp`);
}

const portrait = await sharp(SOURCE).resize({ height: 600 }).png().toBuffer();
const socialCard = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="78%" cy="45%" r="48%">
        <stop offset="0" stop-color="#b9ff4a" stop-opacity=".24"/>
        <stop offset="1" stop-color="#b9ff4a" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="#fff" stroke-opacity=".035"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="#07070a"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <text x="76" y="278" font-family="Arial, sans-serif" font-size="100" font-weight="700" fill="#f4f1ec" letter-spacing="2">KARTIKAY</text>
    <text x="82" y="336" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="#b9ff4a" letter-spacing="5">SOFTWARE ENGINEER · AI / ML</text>
    <text x="82" y="392" font-family="Arial, sans-serif" font-size="18" fill="#a7a6ad" letter-spacing="2">FULL-STACK SYSTEMS · BACKEND · APPLIED AI</text>
    <path d="M82 438h120" stroke="#b9ff4a" stroke-width="3" stroke-linecap="round"/>
    <text x="82" y="478" font-family="Arial, sans-serif" font-size="16" fill="#a7a6ad">Selected projects, experience, and engineering notes</text>
  </svg>
`);

await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#07070a' } })
  .composite([{ input: portrait, gravity: 'southeast' }, { input: socialCard }])
  .jpeg({ quality: 88 })
  .toFile(`${OUT}/og-image.jpg`);

console.log('Built Kartikay portrait variants and social card.');
