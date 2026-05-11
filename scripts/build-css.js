const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

async function build() {
  const inputPath = path.resolve(__dirname, '../src/css/tailwind.css');
  const outputPath = path.resolve(__dirname, '../src/css/tailwind.output.css');

  if (!fs.existsSync(inputPath)) {
    console.error('Input CSS not found:', inputPath);
    process.exit(1);
  }

  const css = fs.readFileSync(inputPath, 'utf8');

  try {
    const result = await postcss([tailwind, autoprefixer]).process(css, {
      from: inputPath,
      to: outputPath,
    });

    fs.writeFileSync(outputPath, result.css, 'utf8');
    if (result.map) fs.writeFileSync(outputPath + '.map', result.map.toString());
    console.log('Built', outputPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
