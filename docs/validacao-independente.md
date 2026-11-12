# Validação independente — rodada 2

Data: 2026-11-12. Verificador separado da autoria, seguindo `executar-spec` e sua referência de execução/validação já lidas integralmente. Intervalo completo: `9334fe5..917384b`, branch `feat/spec-marketplace`; revalidação focal das correções posteriores a `5055ed1`. PRD, SPEC, decisões e curadoria foram reconfrontados com as fontes e com resultados próprios, sem presumir aprovação do autor.

**Veredito: aprovado na verificação técnica local, sem lacuna bloqueante identificada para publicar o repositório.** L1 e L2 da rodada anterior foram resolvidas. A publicação do site ainda depende da execução real do CI e do deploy; nenhum sucesso remoto foi observado nesta revisão. Homologação com alunos e aceite externo continuam não realizados.

A rodada anterior permanece em `docs/validacao-independente.rodada-1.md`, sem alteração, SHA-256 `7eb365fb904149a38de66b06e3a8e321f16f1f53a342dd54adafec69cd649872`. Fontes reais ficaram em leitura; somente este relatório foi escrito. O build regenerou `dist/` ignorado e manteve `CATALOG.md` idêntico ao HEAD.

## Correções e critérios

| Requisito | Evidência e resultado reconferido | Situação |
| --- | --- | --- |
| REQ-01 — descoberta, filtros, URL e vazio recuperável | `web/catalog-core.mjs:1`, `:11`, `:22`; `web/app.mjs:17`; quatro testes de busca/estado novamente aprovados. Contrato e lógica desses recursos permanecem equivalentes à primeira revisão. | Atendido localmente |
| REQ-02 — início compreensível em português | `README.md:21`, `scripts/lib/render.mjs:30`, `docs/plano-de-aula.md:5` agora orientam uma pasta nova fora do catálogo, com cópia do brief. O exemplo resolvido é referência de comparação. Guia visitado em desktop/mobile. | Atendido tecnicamente; uso em turma não observado |
| REQ-03 — instalação previsível | `scripts/install.mjs:20`, `:38`, `:43`; oito testes do instalador novamente aprovados. Instalador, skills e manifestos de integridade não foram alterados pelas correções; permanecem aplicáveis as quatro combinações/12 cópias verificadas na rodada 1. | Atendido no ambiente local |
| REQ-04 — validade e evidência contextual | `web/app.mjs:3` recalcula selos antes da condição do formulário; `scripts/lib/render.mjs:26` fornece JSON aos detalhes. Browser confirmou os três detalhes sem formulário e a home antes/no/depois do limite, mantendo a data da prova. `scripts/lib/render.mjs:33`, `CATALOG.md:3`, `docs/curadoria.md:39`, `docs/decisoes.md:8` definem e implementam o índice como instantâneo histórico explícito. | L1 resolvida |
| REQ-05 — site, detalhes, responsividade e distribuição Claude | Seis rotas novamente visitadas a 1280 e 375 px sem rolagem horizontal. `web/style.css:1` tem os mesmos tokens quando removidos os espaços de formatação; `.editorconfig:1` apenas define estilo de arquivos. Renderização/escape e contexto do detalhe passaram. Manifests nativos não mudaram desde a validação Claude bem-sucedida da rodada 1. | Atendido localmente; publicação/ativação completa não observadas |
| REQ-06 — manutenção, CI e distribuição verificável | Suíte completa atual: 27 testes aprovados; build e catálogo gerado sem divergência. `.github/workflows/ci.yml:47`, `:68` permanecem condicionados aos gates e à main. Empacotador/ZIPs não mudaram e seu teste voltou a passar. | Gates locais atendidos; CI remoto/deploy pendentes |
| REQ-07 — exemplo, duas rodadas e publicação sanitizada | `docs/decisoes.md:9`; dez arquivos históricos modificados contêm somente a substituição uniforme do prefixo de diretório temporário por marcador. Código, testes, contagens e vereditos históricos foram preservados. Regressão atual: 26 testes aprovados. Varredura dos arquivos rastreados não encontrou caminhos pessoais ou temporários de execução nos materiais. | L2 resolvida |

O ajuste do índice é coerente com o PRD: o estado histórico recebe data explícita no texto e no cabeçalho da coluna, preserva a data do teste e aponta ao site para o estado atual. A regra de vencimento continua sendo `effectiveStatus`, sem renovar a evidência ou produzir aparência de teste novo. Não foi enfraquecida a exigência de mostrar o contexto da curadoria; foi esclarecido o instante ao qual a afirmação está vinculada.

## Execuções e probes próprios

Ambiente mantido: macOS, Node 22.13.0, npm 10.9.2 e Python 3.14.2. Dependências e lockfile não mudaram; não houve nova instalação. Não existem gates próprios de lint/typecheck configurados.

| Comando/procedimento | Resultado |
| --- | --- |
| `npm run check` | Código 0; validate + 27 testes + build |
| Validação dentro do check | Três recursos; 76 referências locais; YAML, esquema e integridade válidos |
| `npm test` dentro do check | 27 testes: 10 catálogo, 8 instalador, 1 ZIP, 4 renderização e 4 busca; zero falhas, cancelados, skips ou TODOs |
| `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -v`, na raiz do carrinho | Código 0; 26 testes, zero falhas/erros/skips; não confundido com o ambiente histórico Poetry/Python 3.13 |
| `git diff --check`; `git diff --exit-code -- CATALOG.md` | Ambos código 0 |
| Probe independente do índice e da configuração | Código 0; datas 2026-11-12 e 2027-02-10 mostram três testes vigentes; 2027-02-11 e 2027-03-01 mostram três revisões pendentes; todas preservam `teste: 2026-11-12`. Default coincide byte a byte com CATALOG.md; entradas não sofrem mutação; cinco datas editoriais inválidas foram recusadas |
| Browser com relógio controlado, sem novo build | Nas mesmas quatro datas, home e os três detalhes coincidem: “Testado em exemplo” até o dia 90 e “Revisão pendente” a partir do dia 91. Detalhes têm zero formulários de busca, recebem o JSON correto e conservam a data 2026-11-12 |
| Smoke após formatação CSS | Seis rotas × duas larguras (1280/375 px), sem overflow horizontal; zero erros/avisos de console |
| Varredura e comparação da sanitização | Dez arquivos alterados equivalem exatamente aos anteriores após trocar apenas o prefixo temporário pelo marcador. Nenhum caminho pessoal/temporário de execução remanescente nos materiais rastreados; os dois caminhos genéricos de fixture em testes foram distinguidos de dados da máquina |

## Sensor focal das correções

Cópia temporária isolada do HEAD efetivamente avaliado, com imports relativos à cópia e dependências completas. Baseline: `node --test tests/render.test.mjs`, código 0, quatro testes aprovados, zero skips.

| Mutação | Teste e resultado |
| --- | --- |
| M1: remover `resources:[r]` do retorno de `detail` em `scripts/lib/render.mjs:26` | Mesmo comando; código 1, uma falha por `AssertionError` no teste de contexto do detalhe (`tests/render.test.mjs:23`); três passaram |
| M2: substituir `statusLabels[effectiveStatus(r,asOf)]` por `statusLabels[r.validation.status]` em `scripts/lib/render.mjs:34` | Mesmo comando; código 1, uma falha por `AssertionError` no teste de vencimento do índice (`tests/render.test.mjs:31`); três passaram |

**2/2 mutações detectadas, nenhuma sobrevivente**, sem falhas de ambiente contadas como detecção. Os três sensores da rodada 1 cobrem comportamentos que não mudaram. O probe adicional de navegador confirma a execução do recalculo de fato, além da presença do JSON verificada pelos testes unitários.

## Alcance e pendências

T1, T2 e T3 estão verificadas tecnicamente no alcance local. T4 tem estrutura, gates e revisão local verificados; execução remota e publicação permanecem pendentes. Não há nova lacuna bloqueante identificada nas correções avaliadas.

O recalculo ao abrir o site depende de JavaScript e do relógio do cliente; sem JS, o HTML continua útil com instruções, downloads, data e janela de revisão, mas o selo inicial representa o último build. Não foi exigida nem inferida atualização periódica de commits no GitHub: o índice declara seu instante histórico. A revisão não comprova ativação completa das skills nos clientes, uso real por alunos, metas pedagógicas, segurança exaustiva ou funcionamento em todos os sistemas.

Governança revisada nesta rodada: PRD, SPEC, decisões, curadoria e orientações de início/aula; nenhum documento normativo foi alterado pelo verificador. O histórico reprovado foi preservado. Nenhum serviço externo, plugin de terceiro, publicação, instalação global ou commit foi executado.

Próximo passo autorizado ao responsável: publicar o repositório revisado, acompanhar a matriz real Linux/Windows e o deploy e verificar as URLs/downloads públicos. A aprovação local permite esse próximo passo; não substitui a evidência remota ainda ausente.
