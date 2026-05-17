const fs = require('fs');

// 1. Upgrade fonts in public/index.html
let html = fs.readFileSync('public/index.html', 'utf8');

const oldFontLink1 = `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap">`;
const oldFontLink2 = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">`;

const newFontLink1 = `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">`;
const newFontLink2 = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

html = html.replace(oldFontLink1, newFontLink1).replace(oldFontLink2, newFontLink2);
fs.writeFileSync('public/index.html', html);
console.log('Fonts upgraded in public/index.html');

// 2. Upgrade fonts in public/style.scss
let scss = fs.readFileSync('public/style.scss', 'utf8');

scss = scss.replace(`  --font: 'Roboto', sans-serif;
  --font-display: 'Poppins', sans-serif;`, `  --font: 'Inter', sans-serif;
  --font-display: 'Plus Jakarta Sans', sans-serif;`);

scss = scss.replace(`  --font: 'Roboto', sans-serif;\r\n  --font-display: 'Poppins', sans-serif;`, `  --font: 'Inter', sans-serif;\r\n  --font-display: 'Plus Jakarta Sans', sans-serif;`);

fs.writeFileSync('public/style.scss', scss);
console.log('Fonts upgraded in public/style.scss');
