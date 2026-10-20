import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const [html, styles, sceneStyles, content, scene, app] = await Promise.all([
  read('index.html'), read('styles.css'), read('src/scene.css'),
  read('src/content.js'), read('src/scene.js'), read('src/app.js'),
]);
const javascript = [content, scene, app.replace(/^import .*;\s*$/gm, '')]
  .join('\n\n').replace(/^export\s+/gm, '').replace(/<\/script/gi, '<\\/script');
const document = html
  .replace(/\s*<link rel="stylesheet" href="\.\/(?:styles\.css|src\/scene\.css)" \/>/g, '')
  .replace('<script type="module" src="./src/app.js"></script>', `<style>\n${styles}\n${sceneStyles}\n</style>\n<script type="module">\n${javascript}\n</script>`);
await writeFile(path.join(root, 'preview.html'), document);
console.log('Built preview.html: a self-contained copy that opens without a local server.');
