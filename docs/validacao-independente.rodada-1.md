# Validação independente — marketplace 0.1.0

Data: 2026-11-12. Verificador: agente novo, separado da autoria, sem receber sua conclusão. Fontes normativas: `AGENTS.md`, `docs/produto/prd-marketplace.md` e `docs/specs/spec-marketplace.md`; procedimento: skill `executar-spec` e referência de execução/validação, ambas lidas integralmente.

Snapshot avaliado: branch `feat/spec-marketplace`, intervalo `9334fe5..5055ed1`, árvore inicialmente limpa. Código e documentos existentes permaneceram em leitura. Apenas este relatório foi escrito; `dist/` e `artifacts/` ignorados foram regenerados, e `CATALOG.md` permaneceu idêntico.

**Veredito: reprovado para encerramento técnico da SPEC neste snapshot.** A implementação principal e os gates locais passam, mas há duas divergências reproduzidas que devem ser corrigidas antes da publicação conforme o contrato: status vencido inconsistente e sanitização incompleta. Não foi encontrado bloqueio externo à preparação do repositório. O CI remoto e o deploy ainda não foram executados; sucesso local não comprova publicação do site.

## Cobertura derivada do PRD

| Requisito e resultado esperado | Evidência localizada e resultado observado | Situação |
| --- | --- | --- |
| REQ-01 — busca sem acentos, filtros cumulativos, vazio recuperável e URL persistente | `web/catalog-core.mjs:1`, `:11`, `:22`; `tests/search.test.mjs:7`, `:10`, `:14`; `web/app.mjs:9`, `:29`. No navegador, `VERIFICACAO CODIGO` retornou apenas `executar-spec`; tipo MCP produziu zero resultados; recarregar preservou busca/tipo; limpar restaurou os três recursos e o foco. | Atendido |
| REQ-02 — conceitos, instalação e exercício em português | `scripts/lib/render.mjs:30` apresenta skill/MCP/plugin e percurso brief→instalação→comparação; `README.md:19` e `docs/instalacao.md:5` orientam cliente e primeiro pedido. Links locais e percurso do guia conferidos. Metas de tempo são propostas, sem dados de turma inventados (`docs/plano-de-aula.md:24`). | Atendido tecnicamente; uso com alunos não observado |
| REQ-03 — três skills, dois clientes e dois escopos, simulação, integridade e conflitos | `scripts/install.mjs:20`, `:30`, `:38`, `:43`, `:46`; `tests/install.test.mjs:10`, `:22`, `:33`, `:45`, `:52`. Oito testes aprovados e smoke adicional nas quatro combinações cliente/escopo: 12 cópias com inventário idêntico; cada simulação deixou a pasta vazia. Conflito preserva edição e impede instalar as demais; origem alterada e destino simbólico são recusados. | Atendido no ambiente local |
| REQ-04 — origem/licença, evidência contextual e validade do selo | `catalog/resources.json:9`, `:23`, `:27`; `scripts/lib/catalog.mjs:17`; `docs/curadoria.md:11`, `:18`, `:20`; `evidence/fluxo-produto.md:5`, `:16`. Três skills autorais, nenhum terceiro; ambiente/versão/limites explícitos e fingerprint verificado. Porém o selo vencido diverge entre superfícies (L1). | Falhou em L1 |
| REQ-05 — site responsivo, detalhes, links, HTML sem JS, README e Claude | `scripts/build.mjs:20`; `scripts/lib/render.mjs:10`, `:21`, `:28`; `.claude-plugin/marketplace.json:10`; `.claude-plugin/plugin.json:2`. Seis rotas visitadas a 1280 e 375 px, sem rolagem horizontal; contexto sem JS exibiu os três recursos, instruções e download. Dois manifests passaram no validador nativo Claude. | Atendido localmente; ativação completa no cliente e site público não observados |
| REQ-06 — esquema/testes no CI, contribuição, deploy só na main e distribuição verificável | `catalog/schema.json:1`; `.github/workflows/ci.yml:13`, `:39`, `:47`, `:68`, `:71`; `CONTRIBUTING.md:13`; `.github/ISSUE_TEMPLATE/sugerir-recurso.yml:1`; `scripts/package.mjs:7`. Workflow depende da matriz de checks e restringe build/deploy à main; permissões mínimas e pins explícitos. Quatro ZIPs e dois manifestos de checksum conferidos. | Estrutura e gates locais atendidos; CI remoto/deploy pendentes |
| REQ-07 — exemplo completo, duas rodadas e limites honestos | `examples/fluxo-completo/relatorio.md:15`, `:34`, `:46`; índice em `examples/fluxo-completo/carrinho/docs/README.md:12`; `evidence/instruction-snapshot.json:2`. PRD/SPEC/fontes/testes e os dois relatórios existem; regressão atual: 26 testes aprovados. Os três corpos de instrução e seis referências correspondem aos snapshots. Os vereditos históricos comprovam apenas o exercício, sem substituir esta revisão do marketplace. Sanitização declarada diverge dos arquivos (L2). | Conteúdo reproduzível; publicação falha em L2 |

T1 e T3 permanecem com as lacunas L2 e L1, respectivamente. T2 está verificada no ambiente local. T4 tem revisão local realizada, com execução remota pendente.

## Checagens executadas

Ambiente desta revisão: macOS, Node `22.13.0`, npm `10.9.2`, Python `3.14.2`. A regressão atual usa Python do sistema; não foi apresentada como repetição do ambiente histórico Python 3.13/Poetry 2.2.1. Não há lint ou typecheck próprios configurados.

| Comando/procedimento | Saída e código |
| --- | --- |
| `npm ci --ignore-scripts` | Código 0; sete pacotes instalados a partir do lockfile; sem scripts de instalação |
| `npm run check` | Código 0: validate + test + build |
| `npm run validate` dentro do check | Três recursos, 76 referências locais e YAML válidos |
| `npm test` dentro do check | 25 testes: 10 catálogo, 8 instalador, 1 ZIP, 2 renderização e 4 busca; zero falhas, cancelados, skips ou TODOs |
| `npm run build` dentro do check | Código 0; catálogo, detalhes, guias e downloads gerados |
| `git diff --check`; `git diff --exit-code -- CATALOG.md` | Ambos código 0 |
| `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -v`, na raiz do carrinho | Código 0; 26 testes, zero falhas/erros/skips |
| `claude plugin validate .`; `claude plugin validate .claude-plugin/plugin.json` | Ambos código 0; marketplace e plugin válidos estruturalmente; sem instalar ou executar o plugin |
| `npm run package` + inspeção independente via Node/fflate/assert | Código 0; três ZIPs individuais e kit com 15 arquivos; cada conteúdo corresponde à fonte; oito hashes conferidos nos dois `SHA256SUMS`; saídas de artifacts/site idênticas |
| Conferência independente dos snapshots | Três corpos de SKILL.md e seis referências coincidem. Método de corpo: conteúdo posterior ao segundo delimitador `---`, preservando a quebra de linha |
| Inspeção dos HTMLs gerados | Código 0; sete HTMLs e 65 destinos relativos existentes |
| Smoke Playwright em prévia somente local | Busca, filtros, URL após reload, vazio/limpeza/foco; seis rotas × duas larguras; três recursos e comandos/download sem JS; atalho `/` e movimento reduzido conferidos; zero erros/avisos de console |

O primeiro início de prévia foi recusado pelo sandbox; a prévia foi iniciada depois com permissão apenas para escuta local. Nenhum recurso externo foi executado, nenhum pacote foi instalado globalmente e nenhuma publicação ou commit foi feito.

## Sensor de discriminação

Executado em cópia temporária isolada do snapshot avaliado, com dependências copiadas e comandos/imports relativos à própria cópia. Baseline sem mutação: `node --test`, código 0, 25/25, zero skips. Uma primeira cópia omitiu o diretório `dist` interno do Ajv; esse erro de importação foi descartado, a cópia reparada e a baseline executada novamente antes dos resultados abaixo.

| Mutação dirigida | Critério/teste | Resultado |
| --- | --- | --- |
| M1: remover `.replace(/\p{M}/gu, '')` de `web/catalog-core.mjs:1` | REQ-01; `node --test tests/search.test.mjs`; teste `busca ignora acentos e combina palavras` | Código 1; 4 testes, 1 falha por `AssertionError`: lista vazia em vez de `executar-spec` |
| M2: prefixar com `false &&` a recusa por inventário divergente em `scripts/install.mjs:38` | REQ-03; `node --test tests/install.test.mjs`; teste `conteúdo de origem alterado falha antes de escrever no destino` | Código 1; 8 testes, 1 falha comportamental: rejeição obrigatória ausente |
| M3: prefixar com `false &&` a recusa por fingerprint divergente em `scripts/lib/catalog.mjs:34` | REQ-04; `node --test tests/catalog.test.mjs`; teste `rejeita alteração de conteúdo sem nova prova` | Código 1; 10 testes, 1 falha comportamental: rejeição obrigatória ausente |

Resultado: **3/3 mutações detectadas, nenhuma sobrevivente**, sem contar erros de ambiente como detecção. Esse sensor é proporcional aos novos comportamentos críticos; não é auditoria exaustiva. As falhas L1/L2 foram encontradas por probes adicionais e revisão documental, não pela suíte existente.

## Lacunas priorizadas

1. **L1 — P2, validade inconsistente do selo.** `web/app.mjs:3` e `:16` recalculam status somente quando existe o formulário da home; `scripts/lib/render.mjs:25` gera o selo estático do detalhe e `:34` usa `validation.status` bruto no índice Markdown. Reprodução sem alterar a árvore: navegador com relógio em 2027-03-01 sobre o build de 2026-11-12 mostra “Revisão pendente” na home e “Testado em exemplo” no detalhe da mesma skill. Probe de `markdownIndex` com data vencida também conserva “Testado em exemplo”. Contraria `docs/curadoria.md:18` e SPEC:13. Corrigir a consistência das superfícies e cobrir o vencimento entre builds, preservando a data histórica.
2. **L2 — P2, sanitização incompleta dos materiais públicos.** SPEC:26 proíbe caminhos locais e `evidence/fluxo-produto.md:14` afirma sua substituição, mas dez arquivos do exemplo ainda contêm caminhos absolutos de diretórios temporários da execução histórica: exemplos localizados em `examples/fluxo-completo/evidencias/rodada2-fechamento.json:9` e `examples/fluxo-completo/carrinho/docs/entregas/spec-carrinho.validation.rodada-1.md:88`, além dos logs JSON de sensores/gates. Não é evidência de segredo ou dado de cliente; é divergência concreta da política e da alegação pública. Sanitizar consistentemente com marcadores e revalidar referências, fingerprints afetados e gates.

## Limites e próxima verificação

Documentos revisados: AGENTS, PRD/SPEC, decisões, início/instalação/curadoria/aula/publicação, contribuição/licenças e cadeia de evidência do exemplo. Documentos normativos alterados pelo verificador: nenhum.

Não foram realizados CI remoto Linux/Windows, deploy GitHub Pages, instalação/ativação completa em Codex ou Claude, homologação humana com alunos, medição das metas pedagógicas ou auditoria exaustiva de segurança. Pins de Actions e condições de deploy foram revisados na fonte; isso não equivale à execução dessas Actions. O release/tag e o site público ainda não existem como resultado observado desta revisão.

Após corrigir L1/L2, revalidar os casos reproduzidos e os gates afetados. A publicação do repositório precisa ser seguida pela execução real da matriz e do deploy; só então verificar as URLs e downloads públicos. Não há fundamento para declarar CI remoto ou site publicados como aprovados antecipadamente.
