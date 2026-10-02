import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourcePath = path.join(root, 'WEB.pdf');
const outputDir = path.join(root, 'public', 'images', 'laban');
await fs.mkdir(outputDir, { recursive: true });

// Each page in WEB.pdf contains one full-resolution JPEG visual.
const pdf = await fs.readFile(sourcePath);
const pdfText = pdf.toString('latin1');
const imageRefs = [...pdfText.matchAll(/\/Subtype\s*\/Image/g)];
const pages = imageRefs.map((match, index) => {
  const imageDictionary = pdfText.slice(Math.max(0, match.index - 400), match.index);
  const length = imageDictionary.match(/\/Length\s+(\d+)/)?.[1];
  if (!length) throw new Error(`Could not read the image stream for page ${index + 1}`);
  let offset = pdfText.indexOf('stream', match.index) + 6;
  if (pdf[offset] === 13) offset += 1;
  if (pdf[offset] === 10) offset += 1;
  return pdf.subarray(offset, offset + Number(length));
});
if (pages.length !== 4) throw new Error(`Expected four PDF pages, found ${pages.length}`);

async function webp(source, name, box, width, quality = 91) {
  await sharp(source).extract(box).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(path.join(outputDir, name));
}

async function extractHeroComposition(source) {
  const box = { left: 490, top: 502, width: 698, height: 548 };
  const { data, info } = await sharp(source).extract(box).resize({ width: 820 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const background = new Uint8Array(width * height);
  const seen = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let tail = 0;
  const brimShape = [[153,455],[174,437],[206,417],[244,397],[284,380],[326,365],[368,352],[413,342],[458,336],[503,336],[545,341],[581,346],[604,350],[586,374],[558,395],[526,414],[492,431],[456,447],[418,460],[378,470],[337,480],[296,487],[256,488],[219,481],[188,470],[165,460]];
  const insideBrim = (x, y) => {
    const px = x * 698 / width; const py = y * 698 / width;
    let inside = false;
    for (let i = 0, j = brimShape.length - 1; i < brimShape.length; j = i, i += 1) {
      const [xi, yi] = brimShape[i]; const [xj, yj] = brimShape[j];
      if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  const isBackdrop = (pixel) => {
    const offset = pixel * 4; const r = data[offset]; const g = data[offset + 1]; const b = data[offset + 2];
    if (insideBrim(pixel % width, Math.floor(pixel / width))) return false;
    return b > 118 && b - r > 75 && g - r > 24 && b > g * 1.17;
  };
  const seed = (pixel) => { if (!seen[pixel] && isBackdrop(pixel)) { seen[pixel] = 1; queue[tail++] = pixel; } };
  for (let x = 0; x < width; x += 1) { seed(x); seed((height - 1) * width + x); }
  for (let y = 1; y < height - 1; y += 1) { seed(y * width); seed(y * width + width - 1); }
  for (let head = 0; head < tail; head += 1) {
    const pixel = queue[head]; background[pixel] = 1; const x = pixel % width;
    if (x > 0) seed(pixel - 1); if (x + 1 < width) seed(pixel + 1);
    if (pixel >= width) seed(pixel - width); if (pixel + width < width * height) seed(pixel + width);
  }
  for (let pixel = 0; pixel < width * height; pixel += 1) if (background[pixel]) data[pixel * 4 + 3] = 0;
  await sharp(data, { raw: info }).webp({ quality: 94, alphaQuality: 100, effort: 6 }).toFile(path.join(outputDir, 'hero-art-cutout.webp'));
}

async function extractBlueBackdrop(source, name) {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const background = new Uint8Array(width * height);
  const seen = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let tail = 0;
  const isBlueField = (pixel) => {
    const offset = pixel * 4;
    const red = data[offset]; const green = data[offset + 1]; const blue = data[offset + 2];
    return blue > 118 && blue - red > 75 && green - red > 24 && blue > green * 1.17;
  };
  const seed = (pixel) => {
    if (!seen[pixel] && isBlueField(pixel)) { seen[pixel] = 1; queue[tail++] = pixel; }
  };
  for (let x = 0; x < width; x += 1) { seed(x); seed((height - 1) * width + x); }
  for (let y = 1; y < height - 1; y += 1) { seed(y * width); seed(y * width + width - 1); }
  for (let head = 0; head < tail; head += 1) {
    const pixel = queue[head]; background[pixel] = 1; const x = pixel % width;
    if (x > 0) seed(pixel - 1);
    if (x + 1 < width) seed(pixel + 1);
    if (pixel >= width) seed(pixel - width);
    if (pixel + width < width * height) seed(pixel + width);
  }
  for (let pixel = 0; pixel < width * height; pixel += 1) data[pixel * 4 + 3] = background[pixel] ? 255 : 0;
  await sharp(data, { raw: info }).webp({ quality: 96, alphaQuality: 100, effort: 6 }).toFile(path.join(outputDir, name));
}

const [hero, story, products] = pages;
await Promise.all([
  extractHeroComposition(hero),
  webp(story, 'story-photo.webp', { left: 137, top: 205, width: 674, height: 845 }, 1050),
  webp(story, 'founder-one.webp', { left: 1125, top: 518, width: 172, height: 205 }, 430),
  webp(story, 'founder-two.webp', { left: 1323, top: 518, width: 172, height: 205 }, 430),
  webp(story, 'founder-three.webp', { left: 1125, top: 763, width: 172, height: 205 }, 430),
  webp(story, 'founder-four.webp', { left: 1323, top: 763, width: 172, height: 205 }, 430),
  webp(products, 'dessert-cream.webp', { left: 460, top: 252, width: 248, height: 248 }, 460),
  webp(products, 'dessert-blue.webp', { left: 737, top: 193, width: 245, height: 246 }, 460),
  webp(products, 'product-environment.webp', { left: 429, top: 572, width: 850, height: 478 }, 1150),
]);

// Remove the page's blue field from the original white wordmark, preserving
// the hand-drawn lettering as an alpha image for the live blue navigation.
const { data, info } = await sharp(hero).extract({ left: 134, top: 61, width: 184, height: 96 }).resize({ width: 460 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const lightest = Math.min(data[i], data[i + 1], data[i + 2]);
  data[i + 3] = Math.max(0, Math.min(255, Math.round((lightest - 140) * 2.2)));
  data[i] = 255;
  data[i + 1] = 255;
  data[i + 2] = 255;
}
await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(path.join(outputDir, 'laban-logo.png'));

console.log('Prepared local Laban Spot artwork, story portraits, dessert circles, and logo from WEB.pdf.');
