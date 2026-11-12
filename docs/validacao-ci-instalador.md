# Validação independente — correção do instalador no CI

Data: 2026-11-12. Escopo: `596140c..69d1799`, branch `feat/corrige-instalador-node`; revisão focal independente conforme AGENTS e skill `executar-spec`. Foram lidos o diff integral dos quatro arquivos, PRD/SPEC, decisão da correção, testes do instalador e a proveniência pública. Não foi reutilizado um veredito anterior como prova desta alteração.

**Veredito: aprovado no escopo revisado.** A cópia por arquivo elimina a chamada problemática para uma árvore já reservada e mantém integridade, exclusividade e erro explícito. Não foi identificada lacuna bloqueante no delta. O CI do PR foi conferido diretamente e passou nas três combinações. Build/deploy do site foram pulados nesse run de PR; não representam publicação aprovada ou executada.

Snapshot de `scripts/install.mjs`: SHA-256 `8819a2f0eb506c709f1c8f48ea2986d19b31a473dd8913dd0438c23297e169a5`. O conteúdo revisado antes do commit foi reconferido no intervalo commitado. Código e documentos existentes ficaram em leitura; somente este relatório foi escrito pelo verificador. Nenhum commit, merge ou publicação foi executado por esta revisão.

## Evidências dos comportamentos afetados

| Critério normativo | Evidência e resultado |
| --- | --- |
| REQ-03 — instalar as três skills com conteúdo íntegro | `scripts/install.mjs:53` cria staging com destino novo; `:54` confere os hashes; `:55` reserva o destino com mkdir exclusivo; `:57` copia cada arquivo inventariado, inclusive referências e metadados em subpastas; `:62` confere novamente o inventário. Testes de sucesso com comparação integral e reinstalação passaram (`tests/install.test.mjs:10`, `:16`, `:28`). |
| REQ-03 — nenhuma sobrescrita silenciosa | Recusa prévia de conflitos em `scripts/install.mjs:44`; `COPYFILE_EXCL` em `:60`. Teste de conflito preservou a edição e impediu instalação parcial das demais (`tests/install.test.mjs:33`). Probe independente de arquivo criado depois da reserva também retornou EEXIST e preservou seus bytes. |
| REQ-03 — simulação, paths e integridade de origem | `scripts/install.mjs:39`, `:47`; testes `tests/install.test.mjs:22`, `:40`, `:45`, `:52` passaram: simulação sem escrita, nome/path arbitrário recusado, destino simbólico recusado e origem alterada recusada antes da escrita. |
| REQ-06 — regressão no CI e rastreabilidade | Decisão em `docs/decisoes.md:11`, contrato/condição de release em `docs/specs/spec-marketplace.md:43`, comportamento no `CHANGELOG.md:7`. Nenhuma dependência adicionada. A matriz real do PR passou para o mesmo HEAD revisado. |

## Execuções observadas

| Comando ou fonte | Resultado |
| --- | --- |
| `node --test tests/install.test.mjs`, macOS, Node 22.13.0 | Código 0; 8 testes, 8 aprovados, zero falhas/cancelados/skips/TODOs |
| Mesmo comando, macOS, Node 22.17.0 instalado localmente | Código 0; 8 testes, 8 aprovados, zero falhas/cancelados/skips/TODOs |
| `git diff --check` | Código 0 |
| `node scripts/check-links.mjs`, após gravação do relatório | Código 0; 80 referências locais e YAML válidos |
| Logs da [primeira execução da main](https://github.com/pedroeckel/ia-em-pratica/actions/runs/43215735497), consultados com `gh run view --log-failed` | Falha real confirmada no job Ubuntu/Node 22: 24/27 testes aprovados; três fluxos de sucesso do instalador interrompidos; código 1. Esse resultado não foi reinterpretado como sucesso |
| [Execução do PR com a correção](https://github.com/pedroeckel/ia-em-pratica/actions/runs/43216446337), consultada com `gh run view --json status,conclusion,headSha,jobs` | `completed/success`, HEAD `69d17993818c5e9394f1a729bd2143eedf359ecd`; Windows/Node 22, Ubuntu/Node 22 e Ubuntu/Node 24 em `success`; seus passos npm check, comparação de CATALOG, regressão Python e diff-check concluíram com sucesso. Jobs build/deploy: `skipped` |

Não foi repetida QA visual ou do catálogo, pois essas fontes não mudaram. A validação local é focal; a matriz remota acima fornece a evidência real das plataformas mais recentes, sem inferir compatibilidade universal.

## Sensor e probe de exclusividade

Cópia temporária isolada incluiu o código efetivamente revisado, catálogo, skills e testes. Imports e comandos apontaram para essa cópia. Baseline `node --test tests/install.test.mjs`: código 0, 8/8, zero skips.

| Experimento isolado | Resultado |
| --- | --- |
| M1: suprimir a chamada `copyFile` de `scripts/install.mjs:60` | A mesma suíte retornou código 1, cinco aprovações e três falhas nos fluxos que deveriam instalar com sucesso. Probe adicional confirmou destino vazio e causa explícita `Destino não corresponde à cópia verificada`; não foi erro de sintaxe, import ou ambiente |
| Probe sem mutação comportamental: criar arquivo sentinela entre mkdir do destino e a primeira cópia, simulando interferência após o preflight | Código 0: instalação interrompida com causa EEXIST e conteúdo sentinela preservado. Instrumentação ocorreu apenas na cópia temporária |
| M2: no mesmo cenário, trocar `COPYFILE_EXCL` por `0` | Código 1 por `AssertionError`: rejeição obrigatória ausente após a sobrescrita. O sensor detecta a perda da proteção específica da nova cópia |

**2/2 mutações detectadas; nenhuma sobrevivente.** O segundo probe verifica um conflito entre reserva e cópia, sem prometer transação ou isolamento completo contra interferência concorrente arbitrária. Uma falha de instalação continua deixando o destino parcial para inspeção e propaga a causa, conforme `scripts/install.mjs:63`; o staging é limpo em `:66`.

## Limites e fechamento

Não há lacuna concreta bloqueante identificada para integrar essa correção. A revisão não cobriu componentes imutáveis, publicação em produção, ativação das skills em clientes ou auditoria exaustiva de concorrência/segurança. O erro inicial evidencia a necessidade da matriz real: os dois runtimes locais, isoladamente, não comprovariam a correção em Node 24/Windows.

A aprovação se aplica ao delta e ao HEAD identificados. A release continua condicionada ao fluxo do projeto e à execução pertinente da main/deploy; o run bem-sucedido de PR pulou esses jobs intencionalmente.
