const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Enforce global overflow protection
const overflowProtection = `html, body {
  max-width: 100% !important;
  overflow-x: hidden !important;
}`;

scss = overflowProtection + '\n\n' + scss;

// 2. Adjust Desktop Heading Font Size to 36px as requested
scss = scss.replace(`.hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 800;
  color: #fff;
  line-height: 1.05;`, `.hero-content h1 {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;`);

scss = scss.replace(`.hero-content h1 {
  font-family: var(--font-display);\r\n  font-size: clamp(48px, 6vw, 72px);\r\n  font-weight: 800;\r\n  color: #fff;\r\n  line-height: 1.05;`, `.hero-content h1 {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;`);

// 3. Update Mobile Header and Hero Layout under @media (max-width: 1300px)
scss = scss.replace(`.logo-img {
    width: 42px !important;
    height: 42px !important;
  }`, `.logo-img {
    width: 50px !important;
    height: 50px !important;
  }`);

scss = scss.replace(`.logo-img {\r\n    width: 42px !important;\r\n    height: 42px !important;\r\n  }`, `.logo-img {
    width: 50px !important;
    height: 50px !important;
  }`);

// Update logo-name font size
scss = scss.replace(`.logo-name {
    font-size: 14px;
    line-height: 1.1;
  }`, `.logo-name {
    font-size: 14px !important;
    line-height: 1.1;
  }`);

scss = scss.replace(`.logo-name {\r\n    font-size: 14px;\r\n    line-height: 1.1;\r\n  }`, `.logo-name {
    font-size: 14px !important;
    line-height: 1.1;
  }`);

// Update hero to auto height and adjust padding top and bottom
scss = scss.replace(`.hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    padding: 50px 20px 80px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`, `.hero {
    margin-top: var(--header-h-mobile);
    height: auto !important;
    min-height: auto !important;
    padding: 40px 16px 80px 16px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`);

scss = scss.replace(`.hero {\r\n    margin-top: var(--header-h-mobile);\r\n    min-height: calc(100vh - var(--header-h-mobile));\r\n    padding: 50px 20px 80px 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: flex-start;\r\n    position: relative;\r\n    overflow: hidden;\r\n  }`, `.hero {
    margin-top: var(--header-h-mobile);
    height: auto !important;
    min-height: auto !important;
    padding: 40px 16px 80px 16px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`);

// Update mobile h1 and p font sizes and center-align
scss = scss.replace(`.hero-content h1 {
    font-size: clamp(34px, 10vw, 44px);
  }`, `.hero-content h1 {
    font-size: 18px !important;
    line-height: 1.3 !important;
  }`);

scss = scss.replace(`.hero-content h1 {\r\n    font-size: clamp(34px, 10vw, 44px);\r\n  }`, `.hero-content h1 {
    font-size: 18px !important;
    line-height: 1.3 !important;
  }`);

scss = scss.replace(`.hero-content p {
    font-size: 15px;
    margin-bottom: 16px;
    line-height: 1.6;
    opacity: 0.9;
    max-width: 700px !important;
    margin: 0 auto 16px auto;
  }`, `.hero-content p {
    font-size: 14px !important;
    line-height: 1.5 !important;
    opacity: 0.9;
    max-width: 700px !important;
    margin: 0 auto 16px auto;
  }`);

scss = scss.replace(`.hero-content p {\r\n    font-size: 15px;\r\n    margin-bottom: 16px;\r\n    line-height: 1.6;\r\n    opacity: 0.9;\r\n    max-width: 700px !important;\r\n    margin: 0 auto 16px auto;\r\n  }`, `.hero-content p {
    font-size: 14px !important;
    line-height: 1.5 !important;
    opacity: 0.9;
    max-width: 700px !important;
    margin: 0 auto 16px auto;
  }`);

// Add sticky bottom safe margin to protect content from the sticky buttons
const bodyMobileSpacing = `  body {
    padding-bottom: 60px !important;
  }`;

scss = scss.replace(`@media (max-width: 1300px) {`, `@media (max-width: 1300px) {
${bodyMobileSpacing}`);

scss = scss.replace(`@media(max-width: 1300px){`, `@media (max-width: 1300px) {
${bodyMobileSpacing}`);

// Enforce max-width 480px responsive sizes
scss = scss.replace(`.hero-content h1 {
    font-size: 32px;
  }`, `.hero-content h1 {
    font-size: 18px !important;
  }`);

scss = scss.replace(`.hero-content h1 {\r\n    font-size: 32px;\r\n  }`, `.hero-content h1 {
    font-size: 18px !important;
  }`);

fs.writeFileSync('public/style.scss', scss);
console.log('Mobile responsive and floating button layout fixes applied successfully.');
