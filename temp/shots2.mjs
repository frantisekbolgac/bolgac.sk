import { chromium } from '/data/tools/playwright/node_modules/playwright-core/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('http://localhost:8002/blog/astro-github-cloudflare/', { waitUntil: 'networkidle' });
await p.screenshot({ path: 'temp/shot-post.png' });
await b.close();
console.log('done');
