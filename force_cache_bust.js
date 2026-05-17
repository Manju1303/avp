const fs = require('fs');

// 1. Bust browser and CDN cache by updating index.html stylesheet version query parameter to ?v=2.0
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace('style.css?v=1.3', 'style.css?v=2.0');
fs.writeFileSync('public/index.html', html);
console.log('Cache bust version updated in public/index.html');

// 2. Increase desktop hero content wrap lift to -180px for perfect vertical centering and spacing
let scss = fs.readFileSync('public/style.scss', 'utf8');
scss = scss.replace('margin-top: -110px;', 'margin-top: -180px;');
scss = scss.replace('margin-top: -110px;\r\n', 'margin-top: -180px;\r\n');
fs.writeFileSync('public/style.scss', scss);
console.log('Hero text lift increased to -180px in public/style.scss');
