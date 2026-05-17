const fs = require('fs');

// 1. Update style.scss to reduce padding-top on the about-section
let scss = fs.readFileSync('public/style.scss', 'utf8');
scss = scss.replace(`.about-section {
  background: var(--bg);
}`, `.about-section {
  background: var(--bg);
  padding-top: 40px !important; /* Eliminate extra whitespace below the stats bar section */
}`);

scss = scss.replace(`.about-section {\r\n  background: var(--bg);\r\n}`, `.about-section {
  background: var(--bg);
  padding-top: 40px !important; /* Eliminate extra whitespace below the stats bar section */
}`);

fs.writeFileSync('public/style.scss', scss);
console.log('SCSS updated to reduce about section padding-top.');
