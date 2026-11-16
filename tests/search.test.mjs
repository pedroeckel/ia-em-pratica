import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { filterResources, parseState, serializeState, effectiveStatus } from '../web/catalog-core.mjs';
const resources = JSON.parse(await readFile(new URL('../catalog/resources.json',import.meta.url),'utf8'));
const state = (values) => ({...parseState(''),...values});
test('busca ignora acentos e combina palavras',() => {
  const fixture = [{...resources[2], title:'Verificação de texto', tags:['revisão']}];
  assert.deepEqual(filterResources(fixture,state({q:'VERIFICACAO REVISAO'}),'2026-11-12').map((r) => r.id), ['executar-spec']);
});
test('filtros são cumulativos e o resultado vazio é explícito',() => {
  assert.equal(filterResources(resources,state({type:'mcp'}),'2026-11-12').length,0);
  assert.equal(filterResources(resources,state({q:'entrega',goal:'planejamento',client:'codex'}),'2026-11-12').length,2);
});
test('estado da URL é compartilhável, limitado e não aceita enums desconhecidos',() => {
  const input=state({q:'ação & testes',type:'skill',client:'codex'});
  assert.deepEqual(parseState('?'+serializeState(input)),input);
  assert.equal(parseState('?type=script&client=desconhecido').type,'all');
  assert.equal(parseState('?q='+ 'a'.repeat(500)).q.length,160);
});
test('revisão vencida deixa de aparecer entre testes atualizados',() => {
  const resource=structuredClone(resources[0]);
  Object.assign(resource.validation,{status:'testado',date:'2026-11-12'});
  assert.equal(effectiveStatus(resource,'2026-11-12'),'testado');
  assert.equal(effectiveStatus(resource,'2027-03-01'),'revisao-pendente');
  assert.equal(filterResources([resource],state({status:'testado'}),'2027-03-01').length,0);
});

test('tarefas suportadas continuam descobertas pelo vocabulário do público', () => {
  for (const q of ['planilha', 'guia', 'software']) {
    assert.ok(filterResources(resources, state({q})).length > 0, q);
  }
  for (const q of ['código', 'testes']) {
    assert.ok(filterResources(resources, state({q})).some(({id}) => id === 'executar-spec'), q);
  }
});
