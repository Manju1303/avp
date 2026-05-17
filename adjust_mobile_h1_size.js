const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Enforce exactly 20px font size on mobile hero h1 under 1300px
scss = scss.replace(`  .hero-content h1 {
    font-size: 18px !important;
    line-height: 1.3 !important;
  }`, `  .hero-content h1 {
    font-size: 20px !important;
    line-height: 1.3 !important;
  }`);

scss = scss.replace(`  .hero-content h1 {\r\n    font-size: 18px !important;\r\n    line-height: 1.3 !important;\r\n  }`, `  .hero-content h1 {
    font-size: 20px !important;
    line-height: 1.3 !important;
  }`);

// 2. Enforce 20px font size under 768px
scss = scss.replace(`  .hero-content h1 {
    font-size: clamp(32px, 9vw, 42px);
  }`, `  .hero-content h1 {
    font-size: 20px !important;
  }`);

scss = scss.replace(`  .hero-content h1 {\r\n    font-size: clamp(32px, 9vw, 42px);\r\n  }`, `  .hero-content h1 {
    font-size: 20px !important;
  }`);

// 3. Enforce 20px font size under 480px
scss = scss.replace(`  .hero-content h1 {
    font-size: 18px !important;
  }`, `  .hero-content h1 {
    font-size: 20px !important;
  }`);

scss = scss.replace(`  .hero-content h1 {\r\n    font-size: 18px !important;\r\n  }`, `  .hero-content h1 {
    font-size: 20px !important;
  }`);

fs.writeFileSync('public/style.scss', scss);
console.log('Mobile hero h1 font size set to exactly 20px successfully.');
