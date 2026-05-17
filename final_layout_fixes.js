const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Upgrade mobile breakpoint to 1300px (to trigger hamburger menu sooner)
scss = scss.replace(/@media \(max-width: 1280px\)/g, '@media (max-width: 1300px)');

// 2. Add extra compact styles for screens between 1301px and 1400px to prevent logo overlap
const desktopCompactStyles = `
@media (min-width: 1301px) and (max-width: 1440px) {
  .nav-links {
    gap: 4px !important;
    margin-right: 12px !important;
  }
  .nav-links a {
    padding: 4px 6px !important;
    font-size: 12.5px !important;
  }
  .nav-btn {
    padding: 10px 16px !important;
    font-size: 13px !important;
  }
}`;

scss = scss + "\n" + desktopCompactStyles;

// 3. Redefine desktop .hero to use relative vertical centering
scss = scss.replace(`.hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  margin-top: calc(var(--topbar-h) + var(--header-h));
  overflow: hidden;
}`, `.hero {
  position: relative;
  min-height: 100dvh;
  margin-top: calc(var(--topbar-h) + var(--header-h));
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}`);

scss = scss.replace(`.hero {
  position: relative;\r\n  height: 100dvh;\r\n  min-height: 600px;\r\n  margin-top: calc(var(--topbar-h) + var(--header-h));\r\n  overflow: hidden;\r\n}`, `.hero {
  position: relative;
  min-height: 100dvh;
  margin-top: calc(var(--topbar-h) + var(--header-h));
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}`);

// 4. Redefine .hero-content-wrap to be relative so container height is respected
scss = scss.replace(`.hero-content-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  z-index: 5;
  padding-top: 40px;
}`, `.hero-content-wrap {
  position: relative;
  width: 100%;
  z-index: 5;
  padding: 40px 0;
  box-sizing: border-box;
}`);

scss = scss.replace(`.hero-content-wrap {
  position: absolute;\r\n  inset: 0;\r\n  display: flex;\r\n  align-items: center;\r\n  z-index: 5;\r\n  padding-top: 40px;\r\n}`, `.hero-content-wrap {
  position: relative;
  width: 100%;
  z-index: 5;
  padding: 40px 0;
  box-sizing: border-box;
}`);

// 5. Update mobile/tablet .hero under @media (max-width: 1300px)
scss = scss.replace(`  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    padding: 40px 20px 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }`, `  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    height: auto !important;
    padding: 60px 20px 100px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`);

scss = scss.replace(`  .hero {
    margin-top: var(--header-h-mobile);\r\n    min-height: calc(100vh - var(--header-h-mobile));\r\n    padding: 40px 20px 80px 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    overflow: hidden;\r\n  }`, `  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    height: auto !important;
    padding: 60px 20px 100px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`);

// For safety, let's also do it for the re-applied style.scss modifications in step 2
scss = scss.replace(`  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    padding: 40px 20px 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }`, `  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    height: auto !important;
    padding: 60px 20px 100px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`);

scss = scss.replace(`  .hero {
    margin-top: var(--header-h-mobile);\r\n    min-height: calc(100vh - var(--header-h-mobile));\r\n    padding: 40px 20px 80px 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    overflow: hidden;\r\n  }`, `  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    height: auto !important;
    padding: 60px 20px 100px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`);

fs.writeFileSync('public/style.scss', scss);
console.log('Final layout fixes successfully applied to style.scss');
