# Validação independente — SPEC-CAR-01 — rodada 2

Data: 2026-11-12. Verificador: `/root/verificar_fluxo_skills`, separado do autor.
**Veredito técnico: aprovado no alcance do exercício. Todos os oito critérios
possuem evidência localizada e passaram.** A lacuna de integridade da primeira
rodada foi corrigida; as quatro mutações do sensor foram detectadas por falhas
comportamentais, com baseline válida e imports da cópia confirmados.

## Versão avaliada e independência

- PRD: `docs/produto/prd-carrinho.md`; SPEC: `docs/entregas/spec-carrinho.md`.
- Branch: `feat/spec-carrinho`, derivada de `feat/prd-carrinho`; base do PRD permanece
  `a5a7b39`. Intervalo completo: **`0997014..4cd0cd5`**; HEAD avaliado:
  `4cd0cd507a4df1c875752032d862828e7af36e56`.
- Correção de cobertura: `ac28fc8`; preservação do relatório anterior e ajuste de
  estado: `4cd0cd5`. `carrinho.py`, brief, PRD e dependências não mudaram em relação
  a `d8cb76b`. O código efetivo foi comparado com a versão anterior.
- A entrada continha somente este sidecar não rastreado; os 14 arquivos rastreados
  estavam iguais ao HEAD. Eles mantiveram seus SHA-256 até o fim da verificação,
  inclusive o [relatório da rodada 1](spec-carrinho.validation.rodada-1.md), que não
  foi alterado. A reprovação anterior continua válida para a versão anterior.
- A avaliação da correção usou o contrato original e execução própria. Declarações
  focais do autor na SPEC foram lidas como contexto; seus sensores não foram
  consultados nem usados como prova. Não houve edição de código, testes, SPEC,
  skills ou do relatório anterior, commit, publicação ou delegação adicional.
- O histórico de planejamento já revisado na rodada 1 não foi repetido. As fontes
  normativas e os contratos foram reconferidos, sem alterar resultados para
  acomodar o código.

## Correção examinada

Os cinco testes de integridade mantêm as verificações anteriores de tamanho,
ordem e identidade e agora guardam os campos numéricos em tuplas antes da chamada:
`tests/test_subtotal.py:43,55` e `tests/test_resumo.py:75,87,100`. Como os campos
válidos são inteiros, essas tuplas constituem snapshots independentes dos valores;
a comparação posterior não compartilha o estado do `Item`.

As novas asserções em `tests/test_subtotal.py:46,59` e
`tests/test_resumo.py:78,91,104` cobrem sucesso, item inválido depois de um válido
e desconto inválido, nas fronteiras pertinentes. Nenhum teste anterior ou regra
foi removido, enfraquecido ou pulado. O ajuste é limitado à lacuna de CAR-AC-08.

## Critérios e evidências atuais

Resultados normativos reconfirmados: 1.990 × 2 + 550 × 3 = 5.630;
5.630 × 10% = 563; total 5.630 − 563 + 1.000 = 6.067. 101 × 50% = 50,5,
arredondado para 51. 101/102/103 × 25% = 25,25/25,5/25,75, arredondados para
25/26/26. O limiar de frete consulta o valor após desconto e isenta em 10.000.
Esses resultados vêm do brief/PRD, não de consultar o retorno do código.

Na tabela, PRD designa `docs/produto/prd-carrinho.md` e SPEC designa
`docs/entregas/spec-carrinho.md`. Todos os testes citados foram executados nesta
rodada, com asserções de valores/erros e resultados aprovados.

| Critério / fonte | Resultado normativo | Evidência localizada + asserção | Situação |
| --- | --- | --- | --- |
| CAR-AC-01; PRD:54; brief:8 | Subtotal vazio 0; duas linhas do exemplo 5.630 | `tests/test_subtotal.py:8`: `subtotal([]) == 0`; `:11`: soma igual a 5630 | Atendido |
| CAR-AC-02; PRD:55; brief:7,13; SPEC:37 | Lista/linha/preço/quantidade inválidos → `ValueError`; bool não é inteiro válido | `tests/test_subtotal.py:19,25,31,37`: `assertRaises(ValueError)` para coleções, elementos e famílias de valores inválidos; `tests/test_resumo.py:69` verifica a fronteira do resumo. `carrinho.py:40` reutiliza a validação do subtotal | Atendido |
| CAR-AC-03; PRD:56; brief:9 | Percentuais inteiros 0..50, padrão 0; fora do intervalo, bool e não inteiro → erro, até no vazio | `tests/test_resumo.py:9`: padrão produz desconto 0; `:19`: 50 aceito; `:49,51`: vazio em 0/1/50; `:60`: `ValueError` para −1, 51, float, bool, string e `None`, em vazio/não vazio | Atendido |
| CAR-AC-04; PRD:57; brief:10 | 101/50% → desconto 51 e total 1.050; 101/102/103 a 25% → 25/26/26 | `tests/test_resumo.py:19,26`: igualdade do resumo inteiro com resultados explícitos; `:30` prova incidência única sobre subtotal 2, com desconto 1 | Atendido; M1 detectada |
| CAR-AC-05; PRD:58; brief:11 | Bases 9.999/10.000/10.001 → frete 1.000/0/0; 10.000 com 1% → desconto 100, frete 1.000, total 10.900 | `tests/test_resumo.py:37`: limiares; `:41`: `Resumo(10000, 100, 1000, 10900)`; `:45`: base descontada exatamente 10.000 é isenta | Atendido; M2/M3 detectadas |
| CAR-AC-06; PRD:59; brief:8,11 | Vazio com desconto válido → quatro zeros; item de preço zero → frete/total 1.000 | `tests/test_resumo.py:51`: `Resumo(0, 0, 0, 0)`; `:54`: `Resumo(0, 0, 1000, 1000)`; `tests/test_subtotal.py:14`: subtotal zero com item | Atendido |
| CAR-AC-07; PRD:60; brief:5,12; SPEC:57 | Resumo 5.630/563/1.000/6.067, parcelas inteiras, precisão acima de 2^53 | `tests/test_resumo.py:13`: resumo explícito; `:16`: `type(valor) is int`; `:111`: resumo exato 9.007.199.254.740.993 / 4.503.599.627.370.497 / 0 / 4.503.599.627.370.496; `tests/test_subtotal.py:67,68`: 27.021.597.764.222.979 e tipo int | Atendido |
| CAR-AC-08; PRD:61; brief:8,13; SPEC:43 | Preservar comprimento, ordem, referências e valores em sucesso/erro; exceção em vez de resultado parcial | `tests/test_subtotal.py:44,46,48,49,50` e `:56,59,61,62,63`; `tests/test_resumo.py:76,78,80,81,82`, `:88,91,93,94,95` e `:101,104,106,107,108`: resultados ou `ValueError`, snapshots de preço/quantidade, tamanho e identidade por posição | Atendido; M4 detectada nas novas asserções, tanto em sucesso quanto em erro |

O mapa permanece completo: REQ-01 → AC-01/06; REQ-02 → AC-02;
REQ-03 → AC-03/04; REQ-04 → AC-05/06; REQ-05 → AC-04/06/07;
REQ-06 → AC-08. Os prefixos completos são CAR-REQ e CAR-AC. A matriz da SPEC:66–71
e a governança:15–20 mantêm esses vínculos. Não há critério sem evidência.

## Gates e ambiente

Execução da raiz do projeto, em Poetry 2.2.1 e Python 3.13.0 do `.venv` local,
com `POETRY_VIRTUALENVS_IN_PROJECT=true`. O import real foi confirmado em
`<raiz>/carrinho.py`; o cache da compilação foi direcionado a `<diretorio-temporario>`.

| Comando / revisão | Código | Resultado |
| --- | --- | --- |
| `poetry --version`; `poetry run python -c 'import sys,carrinho; ...'` | 0 / 0 | Versão, executável e origem do import confirmados |
| `poetry run python -m compileall -q carrinho.py tests` | 0 | Compilação aprovada antes dos testes |
| `git diff --check 0997014..4cd0cd5` | 0 | Intervalo aprovado |
| `poetry run python -m unittest discover -s tests -v` | 0 | 26 métodos: 10 de subtotal e 16 de resumo; 0 falhas, 0 erros, 0 skips |
| `git diff --check` | 0 | Diff atual aprovado |
| Revisão de IDs, links e hashes | 0 | 6 REQs e 8 ACs únicos; 11 links existentes; 14 arquivos rastreados preservados |

Não há lint, typecheck ou CI configurados; nenhum gate foi inventado. Não houve
instalação de dependências. Comandos e saídas integrais estão em
[rodada2-gates.json](../../../evidencias/rodada2-gates.json), e a revisão documental
em [rodada2-revisao-documental.json](../../../evidencias/rodada2-revisao-documental.json).
A contagem de 26 métodos inclui subtestes e não representa todas as entradas testadas.

## Sensor independente da rodada 2

Uma nova cópia temporária foi criada em
`<diretorio-temporario>/carrinho-rodada2-sensor-pskwa66f`. Cada cenário partiu dos arquivos
atuais, comparados por SHA-256 antes da mutação, incluindo o sidecar não rastreado
existente. A baseline sem mutação executou os mesmos 26 métodos com sucesso.

O comando foi `<raiz>/.venv/bin/python -B -c <runner>`, no diretório de cada cópia,
sem `PYTHONPATH`. O runner descobre a suíte real em `tests`, exige 26 métodos,
confirma o caminho de `carrinho` e dos dois módulos de teste sob a cópia e executa
`unittest.TextTestRunner`. O uso do interpretador do ambiente original não altera
a origem do código: **todos os cinco registros de imports apontam para a cópia**.

| Cenário | Alteração isolada / critério | Código; testes/falhas/erros/skips | Resultado |
| --- | --- | --- | --- |
| Baseline | Sem mutação | 0; 26/0/0/0 | Válida |
| M1 | Remover `+ 50` no desconto, truncando em vez de arredondar / AC-04 | 1; 26/4/0/0 | Detectada: desconto 25 em vez de 26, 50 em vez de 51 e erro no inteiro grande |
| M2 | Trocar `< 10000` por `<= 10000` no frete / AC-05 | 1; 26/2/0/0 | Detectada: cobrança indevida na base 10.000, antes/depois de desconto |
| M3 | Usar subtotal original como base do frete / AC-05 | 1; 26/1/0/0 | Detectada: frete 0 em vez de 1.000 após desconto de 1% sobre 10.000 |
| M4 | Após acumular cada linha, executar `object.__setattr__(item, "preco_centavos", 0)` / AC-08 | 1; 26/4/0/0 | Detectada: ambos os testes de integridade do subtotal e os de sucesso/erro de item no resumo falham |

Em M4, os novos snapshots comparam `[(0, 2), (0, 3)]` com
`[(1990, 2), (550, 3)]` em sucesso e `[(0, 2), (-1, 3)]` com
`[(1990, 2), (-1, 3)]` em erro. As falhas apontam exatamente para
`tests/test_subtotal.py:46,59` e `tests/test_resumo.py:78,91`. O teste de desconto
inválido continua verde, pois a mutação está após uma etapa que não é alcançada
nesse erro. Isso é consistente com o fluxo, sem perda da sua asserção própria.

**Sensor aprovado: quatro mutações detectadas; nenhuma sobrevivente.** As falhas
são `AssertionError` sobre resultados/valores, sem erro de sintaxe, importação,
ambiente ou skip. As contagens de falhas incluem subtestes quando existentes.
M4 é a mesma violação definida pelo verificador na rodada 1; não há escrita
semelhante no código real, nem se atribui ao experimento a prova de que esse
mecanismo de erro seria frequente.

Saídas integrais, imports, diffs e argumentos:
[rodada2-sensor.json](../../../evidencias/rodada2-sensor.json) e
[rodada2-sensor-runner.py](../../../evidencias/rodada2-sensor-runner.py).
Diffs separados: `rodada2-M1-arredondamento.diff`, `rodada2-M2-limiar.diff`,
`rodada2-M3-base-frete.diff` e `rodada2-M4-integridade.diff`, na mesma pasta.
As cópias e o cache temporário foram descartados após persistir as evidências.

## Governança, skill e fechamento

A correção T3 está registrada na SPEC:109,128–135 e em `docs/governanca.md:39`–44.
A redação que ainda dizia faltar produzir testes foi corrigida em SPEC:124–126.
Índice, SPEC e governança mantiveram a nova revisão pendente até sua realização,
sem ocultar a reprovação. O commit de correção reúne testes e governança, sem
alterar a regra ou adicionar dependência. Não foi encontrada divergência de escopo,
ID, fonte ou aceite. O fechamento dos estados documentais cabe ao executor a partir
deste veredito; o verificador não edita esses documentos.

A skill instalada `executar-spec` agora informa versão **1.0.1**. Foram relidos
seu `SKILL.md` e `references/execucao-e-validacao.md` integralmente. Em comparação
com a orientação lida na rodada 1, a especialização relevante está no passo 5,
linhas 75–78 da referência: **para critérios de não mutação**, capturar snapshot
independente dos valores antes da chamada e conferi-lo após sucesso e erro,
além de ordem/referências; cópia rasa não comprova campos intactos.
A orientação é condicional, adequada à falha concreta e não impõe um ritual a
entregas sem esse critério. A correção observada segue essa orientação. Não foram
constatadas novas falhas das skills neste alcance. Versão, trechos e hashes lidos:
[rodada2-skill.json](../../../evidencias/rodada2-skill.json).

**Lacunas bloqueantes remanescentes: nenhuma.** T1/T2 continuam implementadas e
verificadas; T3 tem a cobertura corrigida e agora confirmada independentemente.
Todos os oito critérios estão tecnicamente atendidos na versão avaliada.
A rodada 1 permanece preservada, sem transformar sua reprovação em aprovação.

Não houve homologação humana/UAT ou aceite comercial, que não se aplicam ao
exemplo sem interface/cliente. A aprovação é limitada a esta biblioteca simples,
determinística e sem serviços externos. Não demonstra aplicação generalizada das
skills a integração, persistência, concorrência, interface, otimização, publicação
ou contratos, nem prova exaustiva sobre todos os inteiros/subclasses possíveis.
