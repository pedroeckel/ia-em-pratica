import { readFile, writeFile } from 'node:fs/promises';
import { fileInventory, inventoryDigest, safePath, repoRoot } from './lib/files.mjs';
const resources = JSON.parse(await readFile(safePath(repoRoot, 'catalog/resources.json'), 'utf8'));
const inventory = {};
for (const resource of resources.filter((r) => r.skillPath)) {
  inventory[resource.id] = await fileInventory(safePath(repoRoot, resource.skillPath));
  resource.validation.contentSha256 = inventoryDigest(inventory[resource.id]);
}
await writeFile(safePath(repoRoot, 'catalog/integrity.json'), JSON.stringify(inventory, null, 2) + '\n');
await writeFile(safePath(repoRoot, 'catalog/resources.json'), JSON.stringify(resources, null, 2) + '\n');
console.log('Manifesto gerado. Alterar hashes não equivale a uma nova validação funcional; revise a evidência.');
