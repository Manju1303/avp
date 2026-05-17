const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Revert container width to 1280px
scss = scss.replace('--container-w: 1366px;', '--container-w: 1280px;');

// 2. Revert 1366px media queries back to 1280px
scss = scss.replace(/@media \(max-width: 1366px\) \{/g, '@media (max-width: 1280px) {');

// 3. Fix desktop nav spacing for 1280px to prevent overlap without using hamburger
scss = scss.replace(/  \.nav-links a \{\r?\n    padding: 6px 8px;\r?\n    font-size: 13px;\r?\n  \}/g, `  .nav-links {
    gap: 4px;
  }
  .nav-links a {
    padding: 4px 6px;
    font-size: 12.5px;
  }`);

// 4. Revert facility img height to 200px important
scss = scss.replace(/  position: relative;\r?\n  aspect-ratio: 4 \/ 3;\r?\n  width: 100%;\r?\n  overflow: hidden;/g, `  position: relative;
  height: 200px !important;
  overflow: hidden;`);

// 5. Revert gallery item aspect-ratio
scss = scss.replace(/  width: 100%;\r?\n  height: 100%;\r?\n  aspect-ratio: 4 \/ 3;\r?\n  object-fit: cover;/g, `  width: 100%;
  height: 100%;
  object-fit: cover;`);

fs.writeFileSync('public/style.scss', scss);
console.log('Reverted desktop styles to original, kept mobile sticky bar');
