import { chromium } from '/data/tools/playwright/node_modules/playwright-core/index.mjs';
const b = await chromium.launch();
for (const [name, w, h, dark] of [['desk-light',1280,900,false],['mob-light',390,844,false],['mob-dark',390,844,true],['desk-dark',1280,900,true]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  if (dark) await p.addInitScript(() => localStorage.setItem('theme','dark'));
  await p.goto('http://localhost:8002/blog/prvy-post/', { waitUntil: 'networkidle' });
  await p.screenshot({ path: `temp/shot-${name}.png` });
  await p.close();
}
await b.close();
console.log('done');
