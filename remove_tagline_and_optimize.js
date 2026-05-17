const fs = require('fs');

// 1. Remove tagline from public/index.html
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace('<p class="hero-tagline">Serving Appakudal, Bhavani, Gobi & Erode Districts</p>', '');
html = html.replace('<p class="hero-tagline">Serving Appakudal, Bhavani, Gobi & Erode Districts</p>\r\n', '');
fs.writeFileSync('public/index.html', html);
console.log('Tagline removed successfully from public/index.html');

// 2. Adjust SCSS layout rules
let scss = fs.readFileSync('public/style.scss', 'utf8');

// Ensure margin-top is -60px on desktop to prevent top clipping
scss = scss.replace('margin-top: -180px;', 'margin-top: -60px;');
scss = scss.replace('margin-top: -180px;\r\n', 'margin-top: -60px;\r\n');

// Ensure H1 font size is exactly 34px on desktop (reduced from 36px)
scss = scss.replace('font-size: 36px;', 'font-size: 34px;');
scss = scss.replace('font-size: 36px;\r\n', 'font-size: 34px;\r\n');

// Add responsive laptop rules for new paragraph indices
// Hiding the massive second paragraph (Arockia Medical Centre offers...) on laptop screens
const laptopRules = `
/* Laptop responsive height/width hero paragraph optimizations to prevent bottom clipping */
@media (max-width: 1450px), (max-height: 850px) {
  .hero-content p:nth-of-type(2) {
    display: none !important;
  }
  .hero-content-wrap {
    margin-top: -40px !important;
  }
}
`;

// Clean up any old duplicate laptop rules first
scss = scss.split('/* Laptop responsive height/width hero paragraph optimizations to prevent bottom clipping */')[0];
scss = scss + '\n' + laptopRules;

fs.writeFileSync('public/style.scss', scss);
console.log('SCSS layout rules updated successfully.');
