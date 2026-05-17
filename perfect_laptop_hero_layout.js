const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Adjust desktop hero content wrap margin-top to a safe -60px (reverting from -180px) to prevent top header truncation
scss = scss.replace('margin-top: -180px;', 'margin-top: -60px;');
scss = scss.replace('margin-top: -180px;\r\n', 'margin-top: -60px;\r\n');

// 2. Reduce desktop h1 font size slightly to 34px (from 36px) as requested
scss = scss.replace('font-size: 36px;', 'font-size: 34px;');
scss = scss.replace('font-size: 36px;\r\n', 'font-size: 34px;\r\n');

// 3. Add responsive laptop screen optimizations to hide the massive 3rd paragraph on laptop heights (< 850px) or widths (< 1450px)
const laptopOptimizations = `
/* Laptop responsive height/width hero paragraph optimizations to prevent bottom clipping */
@media (max-width: 1450px), (max-height: 850px) {
  .hero-content p:nth-of-type(3) {
    display: none !important;
  }
  .hero-content-wrap {
    margin-top: -40px !important;
  }
}
`;

scss = scss + '\n' + laptopOptimizations;

fs.writeFileSync('public/style.scss', scss);
console.log('Desktop laptop hero layout optimized successfully.');
