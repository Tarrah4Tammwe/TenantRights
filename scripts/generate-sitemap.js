const fs = require('fs');
const path = require('path');

// Import answers data (manually inlined for the script)
const { answers } = require('./lib/answers-data');

const SITE_URL = 'https://uktenantrights.co.uk';
const categories = [...new Set(answers.map(a => a.category))];

const urls = [
  // Homepage
  `<url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  // Category pages
  ...categories.map(cat =>
    `<url><loc>${SITE_URL}/${cat}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ),
  // Answer pages
  ...answers.map(a =>
    `<url><loc>${SITE_URL}/${a.category}/${a.slug}/</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>2026-05-03</lastmod></url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log(`Sitemap written with ${urls.length} URLs`);
