const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Update font import at top of file
const oldImport = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap');`;
const newImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

scss = scss.replace(oldImport, newImport);

// 2. Add missing variables inside :root block
const oldRootStart = `:root {
  /* - Typography - */
  --font: 'Inter', sans-serif;
  --font-display: 'Plus Jakarta Sans', sans-serif;`;

const newRootStart = `:root {
  /* - Typography - */
  --font: 'Inter', sans-serif;
  --font-display: 'Plus Jakarta Sans', sans-serif;
  
  /* - Missing Brand Colors & Spacings (Fixed) - */
  --bg-white: #FFFFFF;
  --radius-sm: 8px;
  --radius-xl: 32px;
  --secondary: #0076cf;`;

scss = scss.replace(oldRootStart.replace(/\n/g, '\r\n'), newRootStart).replace(oldRootStart, newRootStart);

fs.writeFileSync('public/style.scss', scss);
console.log('Root CSS variables updated successfully.');
