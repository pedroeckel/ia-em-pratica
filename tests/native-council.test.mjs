import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { unzipSync } from 'fflate';
import { parse } from 'yaml';
import { installSkills } from '../scripts/install.mjs';
import { makeArchives } from '../scripts/package.mjs';
import { fileInventory, inventoryDigest, repoRoot, sha256 } from '../scripts/lib/files.mjs';

const id = 'native-llm-council';
const resources = JSON.parse(await readFile(new URL('../catalog/resources.json', import.meta.url), 'utf8'));
async function temporary(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'council-distribution-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test('conselho instala sozinho nos dois clientes com pacote e integridade completos', async (t) => {
  const source = await fileInventory(path.join(repoRoot, 'skills', id));
  const entry = resources.find(r => r.id === id);
  assert.ok(entry);
  assert.equal(inventoryDigest(source), entry.validation.contentSha256);
  for (const agent of ['codex', 'claude-code']) {
    const root = await temporary(t);
    const [installed] = await installSkills({ names: [id], agent, scope: 'user', userRoot: root });
    assert.equal(installed.state, 'instalada');
    assert.deepEqual(await fileInventory(installed.target), source);
    const metadata = parse(await readFile(path.join(installed.target, 'agents/openai.yaml'), 'utf8'));
    assert.equal(metadata.policy.allow_implicit_invocation, false);
    assert.match(metadata.interface.default_prompt, /\$native-llm-council/);
    const [same] = await installSkills({ names: [id], agent, scope: 'user', userRoot: root });
    assert.equal(same.state, 'inalterada');
  }
});

test('download do conselho preserva licença, referências e bytes conferidos pelo instalador', async (t) => {
  const root = await temporary(t);
  await makeArchives(resources, root);
  const zip = await readFile(path.join(root, id + '.zip'));
  const entries = unzipSync(zip);
  const source = await fileInventory(path.join(repoRoot, 'skills', id));
  assert.deepEqual(Object.keys(entries).sort(), Object.keys(source).map(name => id + '/' + name).sort());
  for (const [name, digest] of Object.entries(source)) assert.equal(sha256(entries[id + '/' + name]), digest);
  assert.equal(sha256(entries[id + '/LICENSE']), source.LICENSE);
  const sums = await readFile(path.join(root, 'SHA256SUMS'), 'utf8');
  assert.ok(sums.includes(sha256(zip) + '  ' + id + '.zip'));
});

test('conselho fica disponível no catálogo sem virar etapa obrigatória do percurso inicial', async () => {
  const { home } = await import('../scripts/lib/render.mjs');
  const config = JSON.parse(await readFile(new URL('../catalog/config.json', import.meta.url), 'utf8'));
  const html = home(config, resources);
  assert.ok(html.includes('id="resource-native-llm-council"'));
  const pathSection = html.match(/<aside class="learning-path"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(pathSection);
  const steps = [...pathSection.matchAll(/href="recursos\/([^/]+)\/"/g)].map(match => match[1]);
  assert.deepEqual(steps, ['criar-prd', 'criar-spec', 'executar-spec']);
  assert.ok(!html.includes('pacote das três skills'));
});
