const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [16, 48, 128];
const inputSvg = path.join(__dirname, 'icon.svg');
const outputDir = path.join(__dirname, '..', 'icons');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertToPng() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(inputSvg);

    // Convert to each size
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon${size}.png`));
      
      console.log(`✓ Created icon${size}.png`);
    }

    console.log('\nIcon conversion complete! ✨');
  } catch (error) {
    console.error('Error converting icons:', error);
    process.exit(1);
  }
}

convertToPng(); 