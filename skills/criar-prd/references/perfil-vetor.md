# Perfil documental do Vetor

Use este perfil somente quando estiver trabalhando no repositório Vetor ou quando
as instruções do projeto confirmarem essa governança. Em outros projetos, descubra
as convenções locais. Este arquivo orienta a descoberta; os documentos atuais do
repositório continuam sendo as fontes de verdade.

## Fontes e precedência

Leia `AGENTS.md` e instruções mais próximas do diretório afetado. Para mudanças
governadas, consulte `01_docs/platform/prds/prd_01_governanca_de_escopo_aceite_e_marcos.md`
e as SPECs relevantes em
`01_docs/platform/specs/prd_01_governanca_de_escopo_aceite_e_marcos/`.

Use `.specs/project/PROJECT_CONTROL.md` para descobrir provedor, nomes, caminhos,
links e estratégia operacional. A `DEC-018` formaliza a distinção:

| Camada | Caminho / papel |
| --- | --- |
| PRD normativo | `01_docs/platform/prds/prd_NN_slug.md` |
| SPEC normativa | `01_docs/platform/specs/prd_NN_slug/spec_NN_n_slug.md` |
| Planejamento operacional | `.specs/prds/prd_NN_slug/`, quando usado |
| Controle e retomada | `.specs/project/PROJECT_CONTROL.md` e o arquivo de estado vigente |
| Legado | `.specs/features/` e `.specs/STATE.md` podem existir; não migrar nem duplicar automaticamente |

A cópia operacional não substitui a SPEC oficial. Quando houver espelho, mantenha
coerentes requisitos, contratos, critérios e vínculos; uma cópia desatualizada não
prevalece sobre a fonte normativa. Reutilize os índices existentes em vez de criar
um catálogo paralelo. Sidecars seguem o nome da SPEC, com `.context.md`,
`.design.md` e `.tasks.md`, quando necessários. Descubra o local do relatório de
validação nas evidências do recorte; não imponha o layout da skill de origem.

## Governança por impacto

Os caminhos abaixo são relativos a `01_docs/platform/governance/`.
Leia as seções pertinentes antes de editar. Para registros extensos, pesquise os
IDs e assuntos e leia cada registro relevante completo; não é necessário carregar
todo o histórico do projeto para uma mudança pequena.

| Impacto | Documento a consultar e atualizar quando afetado |
| --- | --- |
| Escopo, interpretação contratual e vínculos | PRD correspondente e `matriz_de_rastreabilidade_contratual.md` |
| IDs e nomes | `convencao_de_nomenclatura_e_identificacao.md` |
| Aceite, aprovadores ou evidências por fase | `checklist_de_aceite_por_fase.md` |
| Marcos, prazo e sequência de entregas | `cronograma_executivo_e_governanca_de_evidencias_por_marco.md` |
| Premissas, exclusões, dependências e riscos | `matriz_de_premissas_exclusoes_e_dependencias.md` |
| Correção, ajuste, evolução ou bloqueio | `log_de_mudancas.md` |
| Decisão formal de dados, produto, KPI, interface, modelagem ou validação | `decisoes_de_projeto.md` |
| Formulação do otimizador | `modelo_matematico_formal.md`, implementação e testes conjuntamente |

Uma escolha interna sem efeito em escopo ou aceite não exige uma decisão formal
apenas por existir. Mudança funcional relevante, por outro lado, não entra sem
o reflexo documental correspondente.

## Identificadores

Confirme a convenção vigente e procure nos registros antes de alocar IDs:

- PRD: `PRD NN`, arquivo `prd_NN_slug.md`;
- SPEC: `SPEC NN.n`, arquivo `spec_NN_n_slug.md`;
- requisito: `REQ-NN-sss`, com sequencial de três dígitos por PRD;
- artefato/evidência: `ART-{fase}-sss`, `EVI-{fase}-sss`; artefato transversal
  pode usar `ART-GOV-sss`;
- decisão/mudança/risco: `DEC-sss`, `MUD-sss`, `RSK-sss`, sequenciais globais.

IDs publicados não são renumerados nem reutilizados. Não escolha o próximo número
apenas pela quantidade de linhas ou arquivos; busque os IDs realmente reservados,
incluindo descartados. Outros prefixos já existem para domínios específicos;
consulte a convenção em vez de criar novos.

As mudanças usam as classificações `CORRECAO`, `AJUSTE` e `EVOLUCAO`. A convenção
consultada reserva PRDs 01–11 ao escopo contratado e 12 em diante a evoluções
tratadas por `MUD`/decisão. Confirme a regra atual antes de criar um PRD. Não copie
as fases, o cliente ou essas faixas de números para outro projeto.

## Formulação matemática

`modelo_matematico_formal.md` define conjuntos, variáveis, domínios, objetivo,
pesos, normalizações, restrições e salvaguardas. A implementação em
`04_src/vetor_last_mile/optimization/modelo_base_pyomo.py` deve corresponder a ele.
Qualquer mudança nesses elementos exige documento, código e testes no mesmo
conjunto, com decisão formal registrada. Se o documento faltar, criá-lo é
pré-requisito. Refatoração que altera o resultado observável também é mudança
de formulação.

PRD/SPEC podem documentar uma proposta futura sem alterar a formulação efetiva.
Explicite esse estado e planeje a atualização conjunta na execução. Não declare
o modelo normativo atualizado quando apenas uma proposta foi escrita.

## Execução e autorização

- A branch da SPEC deriva da branch do PRD correspondente. Confirme a origem;
  não faça checkout de `main` por padrão nem commite diretamente na branch do PRD.
  O provedor pode fornecer o nome da branch; `AGENTS.md` define sua origem.
- Se abrir PR da SPEC, use como base a branch do PRD, salvo instrução explícita
  aplicável em contrário. Criar documentos não exige abrir PR automaticamente.
- `Poetry` e o ambiente gerenciado pelo projeto são o padrão para Python;
  descubra os comandos e necessidades atuais no `pyproject.toml`, README e CI.
  Para o frontend, leia suas instruções e manifests próprios.
- Commits seguem Conventional Commits, com descrição curta em português, verbo
  no presente e sem ponto final, conforme as instruções vigentes.
- Linear configurado como obrigatório não autoriza por si só publicar issues ou
  comentários. Use a autorização do pedido e os vínculos reais. Se um vínculo
  exigido faltar, registre-o; não invente ID, URL, branch ou aprovação.
- Uma autorização já concedida para execução local pode coexistir com acordo
  comercial, homologação e aceite pendentes. Respeite seu alcance; não a revogue
  nem a amplie ao interpretar registros antigos.
- Suíte verde e relatório técnico são evidência técnica. Não concedem aceite,
  liberação de faturamento ou promoção operacional. Esses estados dependem dos
  critérios vigentes e da evidência formal correspondente.

No encerramento, informe documentos validados e atualizados, comandos e resultados
das checagens e limitações. Uma SPEC pode estar implementada localmente e ainda
ter validação independente ou homologação pendente; registre o estado real.
