import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { escapeHtml, jsonForHtml, home, detail } from '../scripts/lib/render.mjs';
const config=JSON.parse(await readFile(new URL('../catalog/config.json',import.meta.url),'utf8'));
const resources=JSON.parse(await readFile(new URL('../catalog/resources.json',import.meta.url),'utf8'));

test('texto de contribuições não vira HTML ou script executável',()=>{
 const modified=structuredClone(resources);modified[0].title='<script>alert("x")</script>';
 const html=home(config,modified);
 assert.ok(html.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'));
 assert.ok(!html.includes('<script>alert("x")</script>'));
 assert.ok(jsonForHtml({text:'</script><script>alert(1)</script>'}).includes('\\u003c/script>'));
 assert.equal(escapeHtml('<>&"\''),'&lt;&gt;&amp;&quot;&#39;');
});
test('HTML básico contém catálogo, instruções e download sem depender de JS',()=>{
 const html=home(config,resources);assert.ok(html.includes('id="resource-criar-prd"'));
 const page=detail(config,resources[0]);assert.ok(page.includes('downloads/criar-prd.zip'));
 assert.ok(page.includes('--dry-run'));assert.ok(page.includes('Ler a evidência'));
 assert.ok(page.includes('execução completa dentro do Claude Code ainda não foi observada'));
});

test('detalhe carrega contexto de validade mesmo sem formulário de busca',()=>{
 const page=detail(config,resources[0]);
 const data=page.match(/<script type="application\/json" id="catalog-data">([\s\S]*?)<\/script>/);
 assert.ok(data,'Detalhe precisa de dados para atualizar vencimento entre builds');
 assert.equal(JSON.parse(data[1])[0].validation.date,resources[0].validation.date);
 assert.ok(page.includes(`data-resource-status="${resources[0].id}"`));
 assert.ok(!page.includes('id="catalog-filters"'));
});
test('índice calcula vencimento na data explicitamente declarada',async()=>{
 const {markdownIndex}=await import('../scripts/lib/render.mjs');
 const index=markdownIndex(config,[resources[0]],'2027-03-01');
 assert.ok(index.includes('Revisão pendente'));
 assert.ok(index.includes('2027-03-01'));
 assert.ok(index.includes('estado atual da revisão'));
 assert.ok(index.includes('teste: 2026-11-12'));
});
