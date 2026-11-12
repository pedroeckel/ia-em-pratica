import { parseState, serializeState, filterResources, effectiveStatus, statusLabels } from './catalog-core.mjs';

const form = document.querySelector('#catalog-filters');
if (form) {
  const resources = JSON.parse(document.querySelector('#catalog-data').textContent);
  const controls = Object.fromEntries(['q','type','client','goal','status'].map((key) => [key,form.elements.namedItem(key)]));
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  const apply = (state, updateUrl) => {
    for (const key of Object.keys(controls)) controls[key].value = state[key];
    const selected = new Set(filterResources(resources,state).map((r) => r.id));
    for (const resource of resources) {
      const row = document.getElementById(`resource-${resource.id}`);
      row.hidden = !selected.has(resource.id);
      const badge = row.querySelector('[data-status]');
      badge.textContent = statusLabels[effectiveStatus(resource)];
      badge.dataset.status = effectiveStatus(resource);
    }
    count.textContent = `${selected.size} ${selected.size === 1 ? 'recurso encontrado' : 'recursos encontrados'}`;
    empty.hidden = selected.size > 0;
    if (updateUrl) {
      const query = serializeState(state);
      history.replaceState(null,'',location.pathname + (query ? `?${query}` : '') + location.hash);
    }
  };
  const update = () => apply(Object.fromEntries(Object.keys(controls).map((key) => [key,controls[key].value])),true);
  form.addEventListener('submit',(event) => {event.preventDefault();update();});
  form.addEventListener('input',update);
  form.addEventListener('change',update);
  document.querySelectorAll('[data-clear-filters]').forEach((button) => button.addEventListener('click',() => {apply(parseState(''),true); controls.q.focus();}));
  window.addEventListener('popstate',() => apply(parseState(location.search),false));
  document.addEventListener('keydown',(event) => {if (event.key === '/' && !event.ctrlKey && !event.metaKey && !['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName) && !event.target.isContentEditable) {event.preventDefault();controls.q.focus();}});
  apply(parseState(location.search),false);
}
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click',async () => {
    const target = document.getElementById(button.dataset.copy);
    const feedback = button.closest('.copy-block').querySelector('[role="status"]');
    try {await navigator.clipboard.writeText(target.textContent);feedback.textContent = 'Copiado.';}
    catch {feedback.textContent = 'Selecione o texto e copie manualmente.'; const selection = window.getSelection(); const range=document.createRange();range.selectNodeContents(target);selection.removeAllRanges();selection.addRange(range);}
  });
}
