import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';
import { readFile, access, lstat } from 'node:fs/promises';
import { safePath, fileInventory, inventoryDigest, repoRoot } from './files.mjs';

export async function validateCatalog(resources, root = repoRoot, today = new Date().toISOString().slice(0, 10)) {
  const schema = JSON.parse(await readFile(safePath(root, 'catalog/schema.json'), 'utf8'));
  const validate = new Ajv2020({ allErrors: true, strict: true }).compile(schema);
  if (!validate(resources)) throw new Error(`Catálogo inválido: ${JSON.stringify(validate.errors)}`);
  const ids = new Set();
  for (const resource of resources) {
    if (ids.has(resource.id)) throw new Error(`ID repetido: ${resource.id}`);
    ids.add(resource.id);
    const url = new URL(resource.url);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('URL externa inválida');
    const proof = resource.validation;
    if (proof.status === 'testado') {
      if (!proof.date || !proof.version || !proof.evidence || (resource.skillPath && !proof.contentSha256)) throw new Error(`Validação sem evidência/versionamento: ${resource.id}`);
      if (proof.date > today || !Number.isFinite(Date.parse(proof.date)) || new Date(proof.date).toISOString().slice(0, 10) !== proof.date) throw new Error('Data de validação inválida');
      if (/^(latest|main|master|head)$/i.test(proof.version)) throw new Error('Ref móvel não identifica a versão testada');
      await access(safePath(root, proof.evidence));
    }
    if (resource.skillPath !== null) {
      if (resource.type !== 'skill' || resource.ownership !== 'autoral' || resource.skillPath !== `skills/${resource.id}`) throw new Error('Origem da skill inválida');
      const folder = safePath(root, resource.skillPath);
      if ((await lstat(folder)).isSymbolicLink()) throw new Error('Skill não pode ser link simbólico');
      const text = await readFile(safePath(folder, 'SKILL.md'), 'utf8');
      const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      if (!match) throw new Error(`Frontmatter ausente: ${resource.id}`);
      const metadata = parse(match[1]);
      if (metadata.name !== resource.id || !metadata.description || metadata.description.length > 1024 || !metadata.license) throw new Error('Metadados da skill inválidos');
      if (proof.status === 'testado' && metadata.metadata?.version !== proof.version) throw new Error('Versão da evidência diverge da skill');
      const inventory = await fileInventory(folder);
      if (proof.status === 'testado' && inventoryDigest(inventory) !== proof.contentSha256) throw new Error(`Conteúdo mudou sem revalidação: ${resource.id}`);
      for (const [link] of [...text.matchAll(/\]\(([^)]+)\)/g)].map((m) => [m[1]])) {
        if (!/^(https?:|#)/.test(link)) await access(safePath(folder, link.split('#')[0]));
      }
    }
  }
  return resources;
}

export function validateConfig(config) {
  if (!config || typeof config.name !== 'string' || !config.name.trim() || !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}\/[a-zA-Z0-9][a-zA-Z0-9_.-]{0,99}$/.test(config.repository) || !/^\d+\.\d+\.\d+$/.test(config.version) || !/^[a-zA-Z0-9-]+$/.test(config.maintainer?.github)) throw new Error('Configuração editorial inválida');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(config.releasedAt || '') || !Number.isFinite(Date.parse(config.releasedAt)) || new Date(config.releasedAt).toISOString().slice(0,10) !== config.releasedAt) throw new Error('Data da edição inválida');
  const site = new URL(config.siteUrl);
  if (site.protocol !== 'https:' || site.username || site.password || site.search || site.hash || !site.pathname.endsWith('/') || site.href !== config.siteUrl) throw new Error('URL canônica inválida');
  return config;
}

export async function loadCatalog(root = repoRoot) {
  validateConfig(JSON.parse(await readFile(safePath(root, 'catalog/config.json'), 'utf8')));
  return validateCatalog(JSON.parse(await readFile(safePath(root, 'catalog/resources.json'), 'utf8')), root);
}
