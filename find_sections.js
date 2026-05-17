const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
html.split('\n').forEach((line, idx) => {
  if (line.includes('<section') || line.includes('id="') || line.includes('testimonials')) {
    console.log((idx+1) + ': ' + line.trim());
  }
});
