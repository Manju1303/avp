const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Fix desktop overlay (add padding-top to .hero-content-wrap)
let oldContentWrap = `.hero-content-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  z-index: 5;
}`;

let newContentWrap = `.hero-content-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  z-index: 5;
  padding-top: 40px;
}`;

scss = scss.replace(oldContentWrap.replace(/\n/g, '\r\n'), newContentWrap).replace(oldContentWrap, newContentWrap);

// 2. Fix mobile/tablet overlay (change flex direction and justify-content on .hero)
let oldHeroMobile = `  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    padding: 40px 20px 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }`;

let newHeroMobile = `  .hero {
    margin-top: var(--header-h-mobile);
    min-height: calc(100vh - var(--header-h-mobile));
    padding: 50px 20px 80px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
  }`;

scss = scss.replace(oldHeroMobile.replace(/\n/g, '\r\n'), newHeroMobile).replace(oldHeroMobile, newHeroMobile);

fs.writeFileSync('public/style.scss', scss);
console.log('Overlaps fixed in style.scss');
