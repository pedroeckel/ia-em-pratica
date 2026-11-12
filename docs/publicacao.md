# Publicação e manutenção

O workflow de qualidade verifica o catálogo, os testes, o build e o exercício em Linux (Node 22/Python 3.12 e Node 24/Python 3.13) e Windows (Node 22/Python 3.13). Apenas após a matriz passar, um push na main gera e publica o GitHub Pages. PRs executam os testes sem publicar o site.

A automação usa permissões de leitura por padrão; apenas o job de deploy recebe `pages: write` e `id-token: write`. Actions são fixadas a commits, com atualizações propostas pelo Dependabot. Não há secrets de provedores, tokens de aluno ou execução de integrações externas no CI.

Antes de uma versão: revise o PRD/SPEC quando houver impacto, execute `npm run check` e a regressão do exemplo, atualize `CHANGELOG.md`, `package.json` e `catalog/config.json`, e faça revisão independente. Uma nova versão do catálogo não muda automaticamente a versão das skills. Alterações em instruções testadas exigem nova evidência e fingerprint.

Para gerar downloads localmente: `npm run package`. Publique ZIPs e SHA256SUMS juntos na release correspondente ao commit revisado. O site também gera seus downloads no build.

Para desenvolvimento: `npm ci --ignore-scripts`, `npm run check` e `npm run preview`. Node 22+, Python 3.12+ para a regressão do exercício. O catálogo e o instalador não requerem backend ou credenciais.

Revalide recursos antes da aula e após mudança upstream. A data de evidência nunca é renovada por um build; o site calcula revisão pendente com a janela registrada. Métricas de uso dependem de observação real, conforme o plano de aula.

## Proveniência da primeira edição

Antes da primeira publicação, os e-mails dos commits foram normalizados para o endereço público noreply do mantenedor. As árvores de conteúdo de todos os commits foram preservadas. O [mapa de proveniência](../evidence/publication-provenance.json) relaciona os hashes locais citados nos relatórios aos commits públicos com conteúdo idêntico. A mudança de metadados Git não altera o veredito técnico.

A `main` exige PR, os três checks da matriz e resolução de conversas; bloqueia force push e exclusão. Não exige aprovação de outra pessoa, pois há um único mantenedor. O proprietário mantém a permissão administrativa de exceção; o fluxo normal é revisar e aguardar os checks antes de integrar. Relatos privados de vulnerabilidade estão habilitados no GitHub.
