/**
 * Regenerates the vendored webfonts in `src/assets/fonts/` and `src/styles/fonts.css`.
 *
 * Run manually when the type stack changes:  node scripts/fetch-fonts.mjs
 * The site itself never touches the network at build time.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);

const CSS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=EB+Garamond:ital,wght@0,400..600;1,400..600' +
  '&family=Inter:wght@300..700' +
  '&display=swap';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();
const blocks = [...css.matchAll(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/g)];

mkdirSync(resolve(ROOT, 'src/assets/fonts'), { recursive: true });

const faces = [];
for (const [, subset, block] of blocks) {
  if (!KEEP_SUBSETS.has(subset)) continue;

  const url = block.match(/url\((https:[^)]+)\)/)[1];
  const family = block.match(/font-family:\s*'([^']+)'/)[1].toLowerCase().replace(/\s+/g, '-');
  const weight = (block.match(/font-weight:\s*([^;]+)/)?.[1] ?? '400').trim().replace(/\s+/g, '-');
  const italic = /font-style:\s*italic/.test(block) ? '-italic' : '';
  const file = `${family}-${weight}${italic}-${subset}.woff2`;

  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  writeFileSync(resolve(ROOT, 'src/assets/fonts', file), Buffer.from(await res.arrayBuffer()));

  // Relative, not root-absolute: it makes Vite own the asset, which is what
  // gets the deployment base applied in dev as well as in the build.
  faces.push(
    `/* ${subset} */\n${block.replace(/url\(https:[^)]+\)/, `url(../assets/fonts/${file})`)}`
  );
  console.log('vendored', file);
}

const header =
  '/* Self-hosted webfonts — vendored from Google Fonts (SIL OFL 1.1) so the site\n' +
  '   builds and runs with no network access. Regenerate with scripts/fetch-fonts.mjs. */\n\n';

writeFileSync(resolve(ROOT, 'src/styles/fonts.css'), header + faces.join('\n\n') + '\n');
console.log(`\n${faces.length} @font-face rules written to src/styles/fonts.css`);
