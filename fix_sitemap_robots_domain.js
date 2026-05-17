const fs = require('fs');

// 1. Update public/sitemap.xml to point to primary domain https://arockiamedicalcentre.in/
let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
sitemap = sitemap.replace('https://arockiamedicalcentre.pages.dev/', 'https://arockiamedicalcentre.in/');
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('sitemap.xml domain updated.');

// 2. Update public/robots.txt to point to primary domain sitemap
let robots = fs.readFileSync('public/robots.txt', 'utf8');
robots = robots.replace('https://arockiamedicalcentre.pages.dev/sitemap.xml', 'https://arockiamedicalcentre.in/sitemap.xml');
fs.writeFileSync('public/robots.txt', robots);
console.log('robots.txt domain updated.');
