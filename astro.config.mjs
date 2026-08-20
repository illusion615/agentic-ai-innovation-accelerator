// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Published as a GitHub Pages *project* site, so it is served from a subpath
  // rather than the origin root. Every internal URL goes through `withBase` /
  // `localePath` in src/i18n/config.ts because of it.
  site: 'https://illusion615.github.io',
  base: '/agentic-ai-innovation-accelerator',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
