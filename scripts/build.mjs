import { cp, lstat, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, 'dist');
const required = ['index.html', 'styles.css', 'src'];

async function assertPortable(target) {
  const info = await lstat(target);
  if (info.isSymbolicLink()) {
    throw new Error(`Symbolic links cannot be included in a Pages artifact: ${path.relative(root, target)}`);
  }
  if (info.isDirectory()) {
    for (const name of await readdir(target)) await assertPortable(path.join(target, name));
  } else if (!info.isFile()) {
    throw new Error(`Unsupported artifact entry: ${path.relative(root, target)}`);
  }
}

// Check the inputs before replacing a previously usable build.
for (const entry of required) await assertPortable(path.join(root, entry));
const entries = [...required];
try {
  await assertPortable(path.join(root, 'assets'));
  entries.push('assets');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const entry of entries) {
  const target = path.join(destination, entry);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(path.join(root, entry), target, { recursive: true, dereference: false });
}
await writeFile(path.join(destination, '.nojekyll'), '');
console.log('Built dist/ with the essay, synchronized walkthrough, and local photographs. Ready for GitHub Pages.');
