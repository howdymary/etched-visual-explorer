import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const [html, styles, sceneStyles, content, sceneSource, app, essaySource] = await Promise.all([
  read('index.html'), read('styles.css'), read('src/scene.css'),
  read('src/content.js'), read('src/scene.js'), read('src/app.js'), read('src/essay.js'),
]);
// Embed hardware assets so the single-file preview remains portable and offline.
const imageData = {};
for (const match of sceneSource.matchAll(/(?:hardwareImage|photoDetail)\('([^']+)'/g)) {
  const name = match[1];
  const bytes = await readFile(path.join(root, 'assets/hardware', name));
  imageData[name] = `data:image/${name.endsWith('.webp') ? 'webp' : name.endsWith('.jpg') ? 'jpeg' : 'png'};base64,${bytes.toString('base64')}`;
}
const scene = sceneSource.replace('href="./assets/hardware/${file}"', 'href="${' + JSON.stringify(imageData) + '[file]}"');
const javascript = [content, essaySource, scene, app.replace(/^import .*;\s*$/gm, '')]
  .join('\n\n').replace(/^export\s+/gm, '').replace(/<\/script/gi, '<\\/script');
const document = html
  .replace(/\s*<link rel="stylesheet" href="\.\/(?:styles\.css|src\/scene\.css)" \/>/g, '')
  .replace('<script type="module" src="./src/app.js"></script>', `<style>\n${styles}\n${sceneStyles}\n</style>\n<script type="module">\n${javascript}\n</script>`);
await writeFile(path.join(root, 'preview.html'), document);
console.log('Built preview.html: a self-contained copy that opens without a local server.');
