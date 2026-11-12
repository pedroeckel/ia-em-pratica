import { createHash } from 'node:crypto';
import { readdir, readFile, lstat } from 'node:fs/promises';
import path from 'node:path';

export const repoRoot = path.resolve(import.meta.dirname, '../..');
export const sha256 = (value) => createHash('sha256').update(value).digest('hex');

export function safePath(root, relative) {
  if (typeof relative !== 'string' || !relative || relative.includes('\\') || relative.includes('\0') || path.isAbsolute(relative) || relative.split('/').includes('..')) {
    throw new Error(`Caminho relativo inválido: ${relative}`);
  }
  const result = path.resolve(root, relative);
  if (!result.startsWith(path.resolve(root) + path.sep)) throw new Error('Caminho fora da raiz');
  return result;
}

export async function fileInventory(folder, prefix = '') {
  const entries = await readdir(folder, { withFileTypes: true });
  const output = {};
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const full = path.join(folder, entry.name);
    const relative = prefix + entry.name;
    if ((await lstat(full)).isSymbolicLink()) throw new Error(`Link simbólico recusado: ${relative}`);
    if (entry.isDirectory()) Object.assign(output, await fileInventory(full, relative + '/'));
    else if (entry.isFile()) output[relative] = sha256(await readFile(full));
    else throw new Error(`Arquivo especial recusado: ${relative}`);
  }
  return output;
}

export function inventoryDigest(inventory) {
  return sha256(Object.keys(inventory).sort().map((name) => `${name}\0${inventory[name]}`).join('\n'));
}
