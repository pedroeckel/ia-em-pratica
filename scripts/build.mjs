import { mkdir, writeFile, readFile, cp, rm, access } from 'node:fs/promises';
import path from 'node:path';
import { repoRoot } from './lib/files.mjs';
import { loadCatalog } from './lib/catalog.mjs';
import { home,detail,guide,layout,markdownIndex } from './lib/render.mjs';
import { makeArchives } from './package.mjs';
const resources=await loadCatalog();
const config=JSON.parse(await readFile(path.join(repoRoot,'catalog/config.json'),'utf8'));
const output=path.join(repoRoot,'dist');
let existing=false;
try {await access(output);existing=true;} catch(error) {if(error.code!=='ENOENT')throw error;}
if(existing) {
  const marker=await readFile(path.join(output,'.ia-em-pratica-generated'),'utf8').catch(()=>{throw new Error('dist/ existente não foi identificado como saída gerada; preservado.');});
  if(marker!=='generated\n')throw new Error('Marcador de build inválido; dist/ preservado.');
  await rm(output,{recursive:true});
}
await mkdir(path.join(output,'assets'),{recursive:true});
await writeFile(path.join(output,'.ia-em-pratica-generated'),'generated\n');
await cp(path.join(repoRoot,'web'),path.join(output,'assets'),{recursive:true});
async function page(route,html) {const folder=path.join(output,route);await mkdir(folder,{recursive:true});await writeFile(path.join(folder,'index.html'),html);}
await page('',home(config,resources));
for(const resource of resources)await page(`recursos/${resource.id}`,detail(config,resource));
for(const route of ['comecar','curadoria'])await page(route,guide(config,route));
await writeFile(path.join(output,'404.html'),layout({config,title:'Página não encontrada',description:'Volte ao catálogo para encontrar um recurso.',body:`<section class="guide"><h1>Este caminho não existe.</h1><p>Encontre o recurso no catálogo.</p><a href="${config.siteUrl}" class="button">Voltar ao catálogo</a></section>`,prefix:config.siteUrl}));
await writeFile(path.join(output,'catalog.json'),JSON.stringify(resources,null,2)+'\n');
await writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}sitemap.xml\n`);
await writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['','comecar/','curadoria/',...resources.map((r)=>`recursos/${r.id}/`)].map((route)=>`<url><loc>${config.siteUrl}${route}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(output,'llms.txt'),`# ${config.name}\n\n${config.description}\n\n- Catálogo estruturado: ${config.siteUrl}catalog.json\n- Instalação e escopo: https://github.com/${config.repository}/blob/main/docs/instalacao.md\n- Evidências: https://github.com/${config.repository}/blob/main/evidence/fluxo-produto.md\n`);
await makeArchives(resources,path.join(output,'downloads'));
await writeFile(path.join(repoRoot,'CATALOG.md'),markdownIndex(config,resources));
console.log(`Build estático concluído: ${resources.length} recursos, guias e downloads em dist/.`);
