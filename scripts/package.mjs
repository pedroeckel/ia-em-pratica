import { zipSync } from 'fflate';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileInventory, repoRoot, safePath, sha256 } from './lib/files.mjs';

export async function makeArchives(resources, output) {
  await mkdir(output,{recursive:true});
  const checksums=[];const kit={};
  for (const r of resources.filter((item)=>item.type==='skill' && item.skillPath)) {
    const folder=safePath(repoRoot,r.skillPath);const inventory=await fileInventory(folder);const contents={};
    for (const relative of Object.keys(inventory)) { const bytes=new Uint8Array(await readFile(safePath(folder,relative)));contents[`${r.id}/${relative}`]=bytes;kit[`${r.id}/${relative}`]=bytes; }
    const zip=zipSync(contents,{level:6,mtime:new Date(2026,0,1,0,0,0)});
    const name=`${r.id}.zip`;await writeFile(path.join(output,name),zip);checksums.push(`${sha256(zip)}  ${name}`);
  }
  const zip=zipSync(kit,{level:6,mtime:new Date(2026,0,1,0,0,0)});
  await writeFile(path.join(output,'skills-produto.zip'),zip);checksums.push(`${sha256(zip)}  skills-produto.zip`);
  await writeFile(path.join(output,'SHA256SUMS'),checksums.join('\n')+'\n');
  return checksums;
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  const {loadCatalog}=await import('./lib/catalog.mjs');
  const resources=await loadCatalog();await makeArchives(resources,path.join(repoRoot,'artifacts'));
  console.log('ZIPs e SHA256SUMS gerados em artifacts/.');
}
