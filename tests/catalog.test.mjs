import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateCatalog, loadCatalog } from '../scripts/lib/catalog.mjs';
import { safePath, repoRoot } from '../scripts/lib/files.mjs';
const original = JSON.parse(await readFile(safePath(repoRoot, 'catalog/resources.json'), 'utf8'));
const changed = (edit) => { const data = structuredClone(original); edit(data); return data; };

test('catálogo passa no contrato e toda validação tem evidência', async () => {
  const resources = await loadCatalog();
  assert.ok(resources.length > 0);
  assert.ok(resources.filter((r) => r.validation.status === 'testado').every((r) => r.validation.evidence && r.validation.version));
});
test('rejeita identidade duplicada', async () => {
  await assert.rejects(validateCatalog(changed((r) => r.push(r[0]))), /ID repetido/);
});
test('não concede selo sem versão, prova e fingerprint', async () => {
  for (const field of ['date', 'version', 'evidence', 'contentSha256']) {
    await assert.rejects(validateCatalog(changed((r) => { r[0].validation[field] = null; })), /sem evidência/);
  }
});
test('rejeita versão incompatível com a evidência', async () => {
  await assert.rejects(validateCatalog(changed((r) => { r[0].validation.version = '999.0.0'; })), /Versão/);
});
test('rejeita evidência com data impossível ou futura', async () => {
  for (const date of ['2026-02-30', '2099-01-01']) await assert.rejects(validateCatalog(changed((r) => { r[0].validation.date = date; }), repoRoot, '2026-11-12'), /Data/);
});
test('rejeita alteração de conteúdo sem nova prova', async () => {
  await assert.rejects(validateCatalog(changed((r) => { r[0].validation.contentSha256 = '0'.repeat(64); })), /Conteúdo mudou/);
});
test('bloqueia caminhos absolutos e travessia', () => {
  for (const value of ['../arquivo', '/tmp/arquivo', 'skills/../arquivo', '..\\arquivo', '']) assert.throws(() => safePath(repoRoot, value));
});
test('bloqueia URLs executáveis ou com credenciais', async () => {
  for (const value of ['javascript:alert(1)', 'https://user:secret@example.com']) await assert.rejects(validateCatalog(changed((r) => { r[0].url = value; })));
});

test('configuração rejeita canônica insegura e destino de repositório inválido',async()=>{
 const {validateConfig}=await import('../scripts/lib/catalog.mjs');
 const config=JSON.parse(await readFile(safePath(repoRoot,'catalog/config.json'),'utf8'));
 assert.throws(()=>validateConfig({...config,repository:'../outro'}));
 assert.throws(()=>validateConfig({...config,releasedAt:'2026-02-30'}));
 assert.throws(()=>validateConfig({...config,siteUrl:'javascript:alert(1)'}));
 assert.throws(()=>validateConfig({...config,siteUrl:'https://example.com/\" onclick=\"evil'}));
});
test('modelo permite adicionar terceiro com prova local sem alterar o código',async(t)=>{
 const {mkdtemp,mkdir,cp,writeFile,rm}=await import('node:fs/promises');
 const {tmpdir}=await import('node:os');const path=await import('node:path');
 const root=await mkdtemp(path.join(tmpdir(),'ia-catalog-ext-'));t.after(()=>rm(root,{recursive:true,force:true}));
 await mkdir(path.join(root,'catalog'));await cp(safePath(repoRoot,'catalog/schema.json'),path.join(root,'catalog/schema.json'));
 await mkdir(path.join(root,'evidence'));await writeFile(path.join(root,'evidence/externo.md'),'Evidência fictícia da fixture de validação de formato.');
 const resource=JSON.parse(await readFile(safePath(repoRoot,'templates/resource-terceiro.json'),'utf8'));
 Object.assign(resource.validation,{status:'testado',date:'2026-11-12',version:'ref-fixture-01',evidence:'evidence/externo.md'});
 assert.equal((await validateCatalog([resource],root,'2026-11-12'))[0].ownership,'terceiro');
});
