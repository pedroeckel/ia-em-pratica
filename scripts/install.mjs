import { cp, mkdir, mkdtemp, readFile, lstat, rm, realpath } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileInventory, safePath, repoRoot } from './lib/files.mjs';

async function exists(file) { try { return await lstat(file); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } }
async function realParents(folder) {
  for (let current = path.resolve(folder); ; current = path.dirname(current)) {
    const stat = await exists(current);
    if (stat && (stat.isSymbolicLink() || !stat.isDirectory())) throw new Error(`Destino precisa usar diretórios reais: ${current}`);
    if (current === path.dirname(current)) break;
  }
}
function sameInventory(first, second) {
  const keys = Object.keys(first).sort();
  return keys.length === Object.keys(second).length && keys.every((key) => first[key] === second[key]);
}

export async function installSkills({ names, agent, scope, projectRoot = process.cwd(), userRoot = homedir(), dryRun = false, sourceRoot = repoRoot }) {
  if (!['codex', 'claude-code'].includes(agent) || !['user', 'project'].includes(scope)) throw new Error('Escolha --agent codex|claude-code e --scope user|project');
  const resources = JSON.parse(await readFile(safePath(sourceRoot, 'catalog/resources.json'), 'utf8'));
  const manifest = JSON.parse(await readFile(safePath(sourceRoot, 'catalog/integrity.json'), 'utf8'));
  const available = resources.filter((r) => r.type === 'skill' && r.ownership === 'autoral' && r.skillPath === `skills/${r.id}`);
  const selected = names.includes('all') ? available.map((r) => r.id) : [...new Set(names)];
  if (!selected.length) throw new Error('Informe --skill nome ou --skill all');
  const requestedBase = path.resolve(scope === 'user' ? userRoot : projectRoot);
  if (!(await exists(requestedBase))?.isDirectory()) throw new Error('A pasta de usuário/projeto precisa existir');
  const base = await realpath(requestedBase);
  const destination = path.join(base, agent === 'codex' ? '.agents' : '.claude', 'skills');
  await realParents(destination);
  const plan = [];
  for (const id of selected) {
    if (!/^[a-z][a-z0-9-]*$/.test(id) || !available.some((r) => r.id === id) || !manifest[id]) throw new Error(`Skill desconhecida: ${id}`);
    const source = safePath(sourceRoot, `skills/${id}`);
    if ((await lstat(source)).isSymbolicLink()) throw new Error('Origem simbólica recusada');
    const inventory = await fileInventory(source);
    if (!sameInventory(manifest[id], inventory)) throw new Error(`Integridade inválida: ${id}`);
    const target = path.join(destination, id);
    const stat = await exists(target);
    if (stat?.isSymbolicLink()) throw new Error(`Destino simbólico recusado: ${id}`);
    const identical = stat?.isDirectory() && sameInventory(inventory, await fileInventory(target));
    if (stat && !identical) throw new Error(`Já existe uma versão diferente em ${target}. Preserve ou renomeie a pasta antes de instalar; nenhum arquivo foi sobrescrito.`);
    plan.push({ id, source, target, inventory, state: identical ? 'inalterada' : dryRun ? 'simulada' : 'instalada' });
  }
  if (dryRun || plan.every((p) => p.state === 'inalterada')) return plan;
  await mkdir(destination, { recursive: true });
  for (const item of plan.filter((p) => p.state === 'instalada')) {
    const staging = await mkdtemp(path.join(destination, '.ia-em-pratica-'));
    try {
      const payload = path.join(staging, item.id);
      await cp(item.source, payload, { recursive: true, errorOnExist: true, force: false });
      if (!sameInventory(item.inventory, await fileInventory(payload))) throw new Error('Cópia não corresponde à origem verificada');
      await mkdir(item.target);
      try {
        await cp(payload, item.target, { recursive: true, errorOnExist: true, force: false });
        if (!sameInventory(item.inventory, await fileInventory(item.target))) throw new Error('Destino não corresponde à cópia verificada');
      } catch (error) {
        throw new Error(`Instalação interrompida em ${item.target}; o destino foi preservado para inspeção.`, { cause: error });
      }
    } finally {
      await rm(staging, { recursive: true, force: true });
    }
  }
  return plan;
}

function parseArgs(args) {
  const options = { names: [], agent: 'codex', scope: 'user', dryRun: false };
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key === '--dry-run') options.dryRun = true;
    else if (key === '--skill' && args[i + 1]) options.names.push(args[++i]);
    else if (key === '--agent' && args[i + 1]) options.agent = args[++i];
    else if (key === '--scope' && args[i + 1]) options.scope = args[++i];
    else if (key === '--project' && args[i + 1]) options.projectRoot = path.resolve(args[++i]);
    else throw new Error(`Argumento inválido ou incompleto: ${key}`);
  }
  return options;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    if (process.argv.includes('--help')) console.log('node scripts/install.mjs --skill nome|all --agent codex|claude-code --scope user|project [--project pasta] [--dry-run]');
    else for (const item of await installSkills(parseArgs(process.argv.slice(2)))) console.log(`${item.id}: ${item.state} → ${item.target}`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
