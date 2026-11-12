import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { unzipSync } from 'fflate';
import { makeArchives } from '../scripts/package.mjs';
import { fileInventory, repoRoot, sha256 } from '../scripts/lib/files.mjs';
const resources=JSON.parse(await readFile(new URL('../catalog/resources.json',import.meta.url),'utf8'));
test('ZIPs preservam os arquivos e têm checksums verificáveis',async(t)=>{
 const output=await mkdtemp(path.join(tmpdir(),'ia-pack-test-'));t.after(()=>rm(output,{recursive:true,force:true}));
 await makeArchives(resources,output);
 const zip=await readFile(path.join(output,'criar-prd.zip'));const extracted=unzipSync(zip);
 const inventory=await fileInventory(path.join(repoRoot,'skills/criar-prd'));
 assert.equal(Object.keys(extracted).length,Object.keys(inventory).length);
 for(const [relative,digest] of Object.entries(inventory))assert.equal(sha256(extracted['criar-prd/'+relative]),digest);
 const sums=await readFile(path.join(output,'SHA256SUMS'),'utf8');assert.ok(sums.includes(sha256(zip)+'  criar-prd.zip'));
});
