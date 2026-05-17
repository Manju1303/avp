const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Expand the header container specifically to 1440px and enforce 100% width
const headerContainerStyle = `header .container {
  width: 100% !important;
  max-width: 1440px !important;
  display: flex;
  align-items: center;
}`;

// Find the header styling block and inject the style
scss = scss.replace(`header {`, `${headerContainerStyle}\n\nheader {`);

// 2. Also clean up any potential helper script
fs.writeFileSync('public/style.scss', scss);
console.log('Header container expanded to 1440px successfully.');
