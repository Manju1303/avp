const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Lift the .hero-content-wrap on desktop
scss = scss.replace(`.hero-content-wrap {
  position: relative;
  width: 100%;
  z-index: 5;
  padding: 40px 0;
  box-sizing: border-box;
}`, `.hero-content-wrap {
  position: relative;
  width: 100%;
  z-index: 5;
  padding: 40px 0;
  box-sizing: border-box;
  margin-top: -110px; /* Lift text upwards into the empty top space to prevent bottom overlapping */
}`);

scss = scss.replace(`.hero-content-wrap {
  position: relative;\r\n  width: 100%;\r\n  z-index: 5;\r\n  padding: 40px 0;\r\n  box-sizing: border-box;\r\n}`, `.hero-content-wrap {
  position: relative;
  width: 100%;
  z-index: 5;
  padding: 40px 0;
  box-sizing: border-box;
  margin-top: -110px; /* Lift text upwards into the empty top space to prevent bottom overlapping */
}`);

// 2. Ensure that on mobile devices, margin-top is reset to 0 so layout flows naturally
const mobileReset = `  .hero-content-wrap {
    margin-top: 0 !important;
  }`;

scss = scss.replace(`@media (max-width: 1300px) {`, `@media (max-width: 1300px) {
${mobileReset}`);

scss = scss.replace(`@media(max-width: 1300px){`, `@media (max-width: 1300px) {
${mobileReset}`);

fs.writeFileSync('public/style.scss', scss);
console.log('Hero text successfully lifted and compiled.');
