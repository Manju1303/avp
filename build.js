const fs = require('fs');
const { execSync } = require('child_process');

function run(label, cmd) {
  console.log(label + '...');
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error('\n❌ BUILD FAILED at step: ' + label);
    console.error(e.message);
    process.exit(1);
  }
}

console.log('Cleaning dist...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist/public', { recursive: true });

console.log('Copying assets...');
try {
  fs.cpSync('public', 'dist/public', { recursive: true });
} catch (e) {
  console.error('\n❌ BUILD FAILED at step: Copying assets');
  console.error(e.message);
  process.exit(1);
}
run('Compiling SCSS', 'npx sass public/style.scss dist/public/style.css --style compressed --no-source-map');
run('Minifying HTML', 'npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true public/index.html -o dist/public/index.html');

console.log('\n✅ Build completed successfully in dist/public/');
