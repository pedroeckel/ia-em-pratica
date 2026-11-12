import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir, lstat, symlink, rm, access, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { installSkills } from '../scripts/install.mjs';
import { repoRoot, fileInventory } from '../scripts/lib/files.mjs';
async function fixture(t) { const root = await mkdtemp(path.join(tmpdir(), 'ia-em-pratica-test-')); t.after(() => rm(root, { recursive: true, force: true })); return realpath(root); }

test('instala no escopo de projeto com integridade completa', async (t) => {
  const root = await fixture(t);
  const result = await installSkills({ names: ['criar-prd'], agent: 'codex', scope: 'project', projectRoot: root });
  assert.equal(result[0].state, 'instalada');
  assert.deepEqual(await fileInventory(path.join(root, '.agents/skills/criar-prd')), await fileInventory(path.join(repoRoot, 'skills/criar-prd')));
});
test('Claude e escopo de usuário usam o caminho apropriado', async (t) => {
  const root = await fixture(t);
  const [result] = await installSkills({ names: ['criar-spec'], agent: 'claude-code', scope: 'user', userRoot: root });
  assert.equal(result.target, path.join(root, '.claude/skills/criar-spec'));
  await access(path.join(result.target, 'SKILL.md'));
});
test('simulação não cria diretórios', async (t) => {
  const root = await fixture(t);
  const [result] = await installSkills({ names: ['all'], agent: 'codex', scope: 'project', projectRoot: root, dryRun: true });
  assert.equal(result.state, 'simulada');
  await assert.rejects(lstat(path.join(root, '.agents')), { code: 'ENOENT' });
});
test('reinstalar edição idêntica é operação sem alteração', async (t) => {
  const root = await fixture(t); const options = { names: ['all'], agent: 'codex', scope: 'project', projectRoot: root };
  await installSkills(options);
  assert.ok((await installSkills(options)).every((r) => r.state === 'inalterada'));
});
test('conflito preserva edições e não instala as outras skills', async (t) => {
  const root = await fixture(t); const target = path.join(root, '.agents/skills/criar-spec'); await mkdir(target, { recursive: true });
  await writeFile(path.join(target, 'SKILL.md'), 'edição do aluno');
  await assert.rejects(installSkills({ names: ['all'], agent: 'codex', scope: 'project', projectRoot: root }), /Já existe/);
  assert.equal(await readFile(path.join(target, 'SKILL.md'), 'utf8'), 'edição do aluno');
  await assert.rejects(lstat(path.join(root, '.agents/skills/criar-prd')), { code: 'ENOENT' });
});
test('não instala candidatos externos ou paths arbitrários', async (t) => {
  const root = await fixture(t);
  for (const name of ['github-mcp', '../fora', '/tmp/fora', 'inexistente']) await assert.rejects(installSkills({ names: [name], agent: 'codex', scope: 'project', projectRoot: root }), /desconhecida/);
  await assert.rejects(lstat(path.join(root, '.agents')), { code: 'ENOENT' });
});
test('recusa destino simbólico e não altera sua referência', async (t) => {
  const root = await fixture(t); const outside = await fixture(t);
  await symlink(outside, path.join(root, '.agents'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(installSkills({ names: ['criar-prd'], agent: 'codex', scope: 'project', projectRoot: root }), /diretórios reais/);
  await assert.rejects(lstat(path.join(outside, 'skills')), { code: 'ENOENT' });
});

test('conteúdo de origem alterado falha antes de escrever no destino',async(t)=>{
 const root=await fixture(t);const source=await fixture(t);
 const {cp}=await import('node:fs/promises');
 await cp(path.join(repoRoot,'catalog'),path.join(source,'catalog'),{recursive:true});
 await cp(path.join(repoRoot,'skills/criar-prd'),path.join(source,'skills/criar-prd'),{recursive:true});
 await writeFile(path.join(source,'skills/criar-prd/SKILL.md'),'alteração sem evidência');
 await assert.rejects(installSkills({names:['criar-prd'],agent:'codex',scope:'project',projectRoot:root,sourceRoot:source}),/Integridade inválida/);
 await assert.rejects(lstat(path.join(root,'.agents')),{code:'ENOENT'});
});
