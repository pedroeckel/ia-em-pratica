# Controle documental

## Convenções

O brief define o escopo do primeiro incremento. PRDs organizam objetivos e requisitos; SPECs detalham contratos verificáveis. IDs publicados são permanentes. Os identificadores do primeiro incremento estão definidos em `AGENTS.md`.

## Estados

Rascunho, implementado localmente e verificado tecnicamente são estados distintos. Não existe aceite externo ou obrigação comercial neste exemplo.

## Rastreabilidade

| Requisitos | Critérios do PRD | SPEC | Estado |
| --- | --- | --- | --- |
| CAR-REQ-01 | CAR-AC-01, 06 | SPEC-CAR-01 | Verificado tecnicamente na rodada 2 |
| CAR-REQ-02 | CAR-AC-02 | SPEC-CAR-01 | Verificado tecnicamente na rodada 2 |
| CAR-REQ-03 | CAR-AC-03, 04 | SPEC-CAR-01 | Verificado tecnicamente na rodada 2 |
| CAR-REQ-04 | CAR-AC-05, 06 | SPEC-CAR-01 | Verificado tecnicamente na rodada 2 |
| CAR-REQ-05 | CAR-AC-04, 06, 07 | SPEC-CAR-01 | Verificado tecnicamente na rodada 2 |
| CAR-REQ-06 | CAR-AC-08 | SPEC-CAR-01 | Verificado tecnicamente na rodada 2 |

## Decisões e mudanças

Nenhuma decisão adicional ao brief.

- 2026-11-12: PRD-CAR-01 materializa o brief em seis requisitos e oito critérios;
  nenhuma regra foi alterada. Evidências técnicas ainda pendentes.
- 2026-11-12: SPEC-CAR-01 cobre integralmente os seis requisitos e oito critérios;
  define API, dois passos atômicos e verificação independente, sem alterar escopo.
- 2026-11-12, T1: subtotal e validações implementados; 10 testes, compilação e
  diff aprovados. Evidências: `../evidencias/t1-red.txt` e `t1-green.txt`, a partir
  da raiz do projeto. CAR-AC-01/02 e a integridade do subtotal têm evidência focal;
  os critérios do resumo e a verificação independente permanecem pendentes.
  Confirmado Python 3.13.0 dentro do Poetry; 3.14.2 é o intérprete externo.
- 2026-11-12, T2: resumo, desconto e frete implementados. A suíte completa passou
  com 26 testes, zero falhas e zero skips; compilação e diff aprovados. Evidências
  `../evidencias/t2-red.txt` e `../evidencias/t2-green.txt`, a partir da raiz do
  projeto. A revisão independente e o sensor permanecem pendentes.
- 2026-11-12, T3: primeira revisão e sensor separado do autor identificaram
  ausência de snapshot independente dos valores na prova de CAR-AC-08. Testes
  reforçados sem mudar a regra ou a implementação. Os 26 testes, compilação e
  diff passaram; a mesma mutação foi detectada na correção focal. A conclusão
  independente permanece pendente de nova rodada, preservando a reprovação
  original e suas evidências.

- 2026-11-12, fechamento: segunda rodada independente aprovada sobre
  `0997014..4cd0cd5`, cobrindo os oito critérios com evidência localizada.
  Baseline com 26 testes, zero falhas/erros/skips; quatro mutações detectadas.
  Relatórios [rodada 1](entregas/spec-carrinho.validation.rodada-1.md) e
  [rodada 2](entregas/spec-carrinho.validation.md). Nenhum aceite comercial
  se aplica. Este registro de estado é posterior ao intervalo técnico avaliado.
