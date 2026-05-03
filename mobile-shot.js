const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const PAGES = ['/', '/skate-stoppers', '/products', '/about', '/contact', '/skateboard-deterrents-for-benches', '/blog/specifying-skate-stoppers-canadian-winter', '/toronto'];
(async () => {
  const dir = path.join(__dirname, 'audit/screenshots/mobile');
  fs.mkdirSync(dir, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  for (const url of PAGES) {
    try {
      await p.goto('http://localhost:3051' + url, { waitUntil: 'networkidle', timeout: 12000 });
      const slug = url === '/' ? 'home' : url.replace(/\//g, '-').replace(/^-/, '');
      await p.screenshot({ path: path.join(dir, `${slug}.png`), fullPage: false });
      console.log('  ✓', url);
    } catch (e) {
      console.log('  ✗', url, e.message);
    }
  }
  await b.close();
})();
