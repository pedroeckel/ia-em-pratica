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
