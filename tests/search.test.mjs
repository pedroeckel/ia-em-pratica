import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { filterResources, parseState, serializeState, effectiveStatus } from '../web/catalog-core.mjs';
const resources = JSON.parse(await readFile(new URL('../catalog/resources.json',import.meta.url),'utf8'));
const state = (values) => ({...parseState(''),...values});
test('busca ignora acentos e combina palavras',() => {
  assert.deepEqual(filterResources(resources,state({q:'VERIFICACAO CODIGO'}),'2026-11-12').map((r) => r.id), ['executar-spec']);
});
test('filtros são cumulativos e o resultado vazio é explícito',() => {
  assert.equal(filterResources(resources,state({type:'mcp'}),'2026-11-12').length,0);
  assert.equal(filterResources(resources,state({q:'PRD',goal:'planejamento',client:'codex'}),'2026-11-12').length,2);
});
test('estado da URL é compartilhável, limitado e não aceita enums desconhecidos',() => {
  const input=state({q:'ação & testes',type:'skill',client:'codex'});
  assert.deepEqual(parseState('?'+serializeState(input)),input);
  assert.equal(parseState('?type=script&client=desconhecido').type,'all');
  assert.equal(parseState('?q='+ 'a'.repeat(500)).q.length,160);
});
test('revisão vencida deixa de aparecer entre testes atualizados',() => {
  const resource=resources[0];assert.equal(effectiveStatus(resource,'2026-11-12'),'testado');
  assert.equal(effectiveStatus(resource,'2027-03-01'),'revisao-pendente');
  assert.equal(filterResources([resource],state({status:'testado'}),'2027-03-01').length,0);
});
