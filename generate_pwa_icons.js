const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const inputImage = path.join(__dirname, 'public', 'logo.jpeg');

async function createIcon(size, paddingRatio, outputPath) {
  const innerSize = Math.round(size * (1 - paddingRatio));
  const resizedLogo = await sharp(inputImage)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .png()
    .toFile(outputPath);

  console.log(`Created ${outputPath}`);
}

async function generateAll() {
  await createIcon(192, 0.1, path.join(iconsDir, 'icon-192.png'));
  await createIcon(512, 0.1, path.join(iconsDir, 'icon-512.png'));
  await createIcon(512, 0.25, path.join(iconsDir, 'maskable-512.png'));
  await createIcon(180, 0.08, path.join(iconsDir, 'apple-touch-icon.png'));
  await createIcon(32, 0.05, path.join(iconsDir, 'favicon-32.png'));
  await createIcon(16, 0.05, path.join(iconsDir, 'favicon-16.png'));
  console.log('All PWA icons generated successfully!');
}

generateAll().catch(console.error);
