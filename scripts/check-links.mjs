import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { repoRoot } from './lib/files.mjs';
let count=0;
async function check(folder) {
 for(const item of await readdir(folder,{withFileTypes:true})) {
  if(['.git','node_modules','dist','artifacts','__pycache__','.venv'].includes(item.name))continue;
  const file=path.join(folder,item.name);
  if(item.isDirectory())await check(file);
  else if(item.name.endsWith('.md')) {
   const text=await readFile(file,'utf8');
   for(const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target=match[1];if(/^(https?:|mailto:|#)/.test(target))continue;
    await access(path.resolve(path.dirname(file),decodeURIComponent(target.split('#')[0]))).catch((error)=>{throw new Error(`Link local ausente em ${path.relative(repoRoot,file)}: ${target}`,{cause:error});});count++;
   }
  } else if(/\.ya?ml$/.test(item.name))parse(await readFile(file,'utf8'),{uniqueKeys:true});
 }
}
await check(repoRoot);console.log(`${count} referências locais conferidas; YAML válido.`);
