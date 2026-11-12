export const normalize = (value) => String(value).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
export const statusLabels = { testado: 'Testado em exemplo', 'em-avaliacao': 'Em avaliação', descontinuado: 'Descontinuado', 'revisao-pendente': 'Revisão pendente' };
export const clientLabels = { codex: 'Codex', 'claude-code': 'Claude Code' };
export const goalLabels = { planejamento: 'Planejar um projeto', desenvolvimento: 'Desenvolver com IA', pesquisa: 'Pesquisar documentação', integracoes: 'Conectar ferramentas' };
export function effectiveStatus(resource, today = new Date().toISOString().slice(0, 10)) {
  const proof = resource.validation;
  if (proof.status !== 'testado') return proof.status;
  const elapsed = (Date.parse(today) - Date.parse(proof.date)) / 86400000;
  return elapsed > proof.reviewAfterDays ? 'revisao-pendente' : 'testado';
}
export function filterResources(resources, state, today) {
  const words = normalize(state.q || '').trim().split(/\s+/).filter(Boolean);
  return resources.filter((r) => {
    const text = normalize([r.title, r.summary, r.outcome, r.provider, ...r.tags, ...r.goals.map((g) => goalLabels[g])].join(' '));
    return words.every((word) => text.includes(word)) &&
      (!state.type || state.type === 'all' || state.type === r.type) &&
      (!state.client || state.client === 'all' || r.clients.includes(state.client)) &&
      (!state.goal || state.goal === 'all' || r.goals.includes(state.goal)) &&
      (!state.status || state.status === 'all' || effectiveStatus(r, today) === state.status);
  });
}
export function parseState(search) {
  const query = new URLSearchParams(search);
  const read = (key, values) => values.includes(query.get(key)) ? query.get(key) : 'all';
  return { q: (query.get('q') || '').slice(0, 160), type: read('type', ['skill','mcp','plugin']), client: read('client',Object.keys(clientLabels)), goal: read('goal',Object.keys(goalLabels)), status: read('status',Object.keys(statusLabels)) };
}
export function serializeState(state) {
  const query = new URLSearchParams();
  for (const key of ['q','type','client','goal','status']) if (state[key] && state[key] !== 'all') query.set(key,state[key]);
  return query.toString();
}
