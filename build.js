const fs = require('fs');
const { execSync } = require('child_process');

console.log('Cleaning dist...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist/public', { recursive: true });

console.log('Copying assets...');
execSync('npx cpy "public/**/*" "dist/public" --parents', { stdio: 'inherit' });

console.log('Compiling SCSS...');
execSync('npx sass public/style.scss dist/public/style.css --style compressed', { stdio: 'inherit' });

console.log('Minifying HTML...');
execSync('npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true public/index.html -o dist/public/index.html', { stdio: 'inherit' });

console.log('Build completed successfully in dist/public/');
