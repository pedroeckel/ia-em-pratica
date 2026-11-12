# Validação independente — SPEC-CAR-01 — rodada 1

Data: 2026-11-12. Verificador: subagente independente `/root/verificar_fluxo_skills`.
Fontes: `brief.md`, `AGENTS.md`, PRD-CAR-01, SPEC-CAR-01, `docs/governanca.md`,
`docs/README.md`, README, manifest e histórico Git do projeto de exemplo Carrinho.

**Veredito técnico: reprovado nesta rodada por lacuna de cobertura.** Os gates
existentes passaram e nenhum defeito foi constatado no código atual. O sensor
revelou uma implementação que viola a preservação dos valores dos itens e ainda
passa pelos 26 testes. A conclusão técnica exige corrigir essa cobertura e repetir
a verificação pertinente; a execução atual não concede aprovação da SPEC.

## Alcance e independência

- Branch avaliada: `feat/spec-carrinho`; base do PRD:
  `feat/prd-carrinho`, em `a5a7b39dad3fea276afa760e791cf1ac6299b7fd`.
- Intervalo de implementação: `0997014..d8cb76b`; HEAD efetivamente avaliado:
  `d8cb76b8e4cd020b9194820e021aabdaaadb622e`. O planejamento anterior foi revisado
  em `a5a7b39` e `0997014`.
- A árvore iniciou limpa. Ao encerrar a coleta, os 13 arquivos rastreados mantinham
  os mesmos SHA-256 e o mesmo HEAD. Mudanças posteriores não integram esta rodada.
- Os resultados foram derivados do brief e do PRD, antes da conclusão da avaliação
  do código. Não foram recebidas conclusões do autor nem consultados seus sensores
  anteriores. A existência desses arquivos foi observada no inventário, sem leitura.
- Não foram alterados código, testes, SPEC ou skills. A escrita restringiu-se a este
  relatório e às evidências adicionais autorizadas. Não houve commit, publicação
  nem delegação adicional. As mutações ocorreram exclusivamente em `/private/tmp`.

## Resultados normativos e cobertura reconstruída

A unidade é centavo inteiro. Pela fonte, 1.990 × 2 + 550 × 3 = 5.630;
10% de 5.630 = 563 e 5.630 − 563 + 1.000 = 6.067. Para 101 × 50%, o desconto
exato de 50,5 centavos arredonda para 51. Para 101/102/103 × 25%, os valores
25,25/25,5/25,75 resultam em 25/26/26. O frete consulta a base descontada e
é isento em 10.000, inclusive. Esses resultados não foram obtidos pela execução
da função sob teste.

| Critério / origem normativa | Resultado esperado | Evidência localizada e asserção | Resultado observado / situação |
| --- | --- | --- | --- |
| CAR-AC-01 / PRD:54; brief:8 | Vazio → subtotal 0; duas linhas → 5.630 | `tests/test_subtotal.py:8` verifica `subtotal([]) == 0`; `:11` verifica `subtotal([Item(1990, 2), Item(550, 3)]) == 5630` | Ambas passaram; atendido |
| CAR-AC-02 / PRD:55; brief:7,13; SPEC:37 | Outras coleções, linhas inválidas, preço negativo/não inteiro/booleano e quantidade não positiva/não inteira/booleana → `ValueError` nas funções públicas | `tests/test_subtotal.py:19`, `:25`, `:31`, `:37`: `assertRaises(ValueError)` sobre famílias de entradas; `tests/test_resumo.py:69` faz o mesmo na outra fronteira. `carrinho.py:40` delega ao mesmo validador | Coleções, elementos, números negativos, zero na quantidade, float, bool, string e `None` cobertos nos casos pertinentes; atendido |
| CAR-AC-03 / PRD:56; brief:9 | Percentuais inteiros 0..50, padrão 0; demais tipos/valores rejeitados até no vazio | `tests/test_resumo.py:9` compara padrão com `Resumo(5630, 0, 1000, 6630)`; `:19` cobre 50; `:49` cobre vazio em 0/1/50; `:60` exige `ValueError` para −1, 51, float, bool, string e `None`, com vazio e não vazio | Todos passaram; atendido |
| CAR-AC-04 / PRD:57; brief:10 | 101/50% → desconto 51, total 1.050; 101/102/103 a 25% → descontos 25/26/26 e totais 1.076/1.076/1.077 | `tests/test_resumo.py:19` e `:26` comparam todas as parcelas aos valores explícitos; `:30` adicionalmente exige desconto único de 1 sobre duas linhas de 1 a 50%, evitando arredondamento por linha | Todos passaram; mutação M1 detectada por asserções; atendido |
| CAR-AC-05 / PRD:58; brief:11 | Bases 9.999/10.000/10.001 → frete 1.000/0/0; subtotal 10.000 com 1% → desconto 100, base 9.900, frete 1.000, total 10.900 | `tests/test_resumo.py:37` compara limiares; `:41` compara `Resumo(10000, 100, 1000, 10900)`; `:45` cobre base descontada exatamente 10.000 | Todos passaram; M2 e M3 detectadas; atendido |
| CAR-AC-06 / PRD:59; brief:8,11 | Vazio com desconto válido → quatro zeros; item de preço zero → frete e total 1.000 | `tests/test_resumo.py:51`: `Resumo(0, 0, 0, 0)` para 0/1/50%; `:54`: `Resumo(0, 0, 1000, 1000)`; `tests/test_subtotal.py:14`: subtotal zero com item presente | Todos passaram; atendido |
| CAR-AC-07 / PRD:60; brief:5,12; SPEC:57 | Resumo 5.630/563/1.000/6.067; parcelas inteiras e precisão além de 2^53 | `tests/test_resumo.py:13` compara as quatro parcelas; `:16` exige `type(valor) is int`; `:102` espera 9.007.199.254.740.993 / 4.503.599.627.370.497 / 0 / 4.503.599.627.370.496; `tests/test_subtotal.py:61` espera 27.021.597.764.222.979 e `:62` exige `int` | Valores exatos passaram; fonte/código não usam float; atendido |
| CAR-AC-08 / PRD:61; brief:8,13; SPEC:43 | Sucesso e erro preservam comprimento, ordem, referências e valores; erro não retorna resultado parcial | `tests/test_subtotal.py:43` e `:52`; `tests/test_resumo.py:75`, `:84`, `:94`: resultados/`ValueError`, igualdade da lista, tamanho e identidade por posição. Snapshot independente em `../../../evidencias/verificador-integridade-probe.py:8` e `:17` registra e compara tuplas de valores antes/depois | Suíte e probe da baseline passaram. A igualdade usa cópia rasa (`tests/test_subtotal.py:42,51`; `tests/test_resumo.py:74,83,93`), portanto não observa alteração interna. M4 sobreviveu. Comportamento atual observado conforme; cobertura reprovada |

`PRD` e `SPEC` na tabela designam `docs/produto/prd-carrinho.md` e
`docs/entregas/spec-carrinho.md`, respectivamente. A evidência de ausência de
resultado parcial é a exceção exigida em vez de retorno; não há saída por callback,
persistência ou outro canal no código avaliado.

Mapa independente: CAR-REQ-01 → AC-01/06; CAR-REQ-02 → AC-02;
CAR-REQ-03 → AC-03/04 e teste adicional de incidência única;
CAR-REQ-04 → AC-05/06; CAR-REQ-05 → AC-04/06/07;
CAR-REQ-06 → AC-08. São seis requisitos e oito critérios, sem exclusão implícita.
A comparação com a SPEC:66–71 e governança:15–20 encontrou o mesmo mapa.

## Gates executados e ambiente

Diretório: raiz do Carrinho. Poetry 2.2.1, Python 3.13.0 no `.venv` local.
`POETRY_VIRTUALENVS_IN_PROJECT=true`. O import real foi confirmado em
`<raiz>/carrinho.py`. Cache de compilação foi redirecionado para pasta temporária
por `PYTHONPYCACHEPREFIX`, preservando os arquivos reais.

| Comando / procedimento | Código | Resultado |
| --- | --- | --- |
| `poetry --version` e `poetry run python -c 'import sys,carrinho; ...'` | 0 / 0 | Versões, executável e import confirmados |
| `poetry run python -m compileall -q carrinho.py tests` | 0 | Compilação aprovada, antes dos testes |
| `git diff --check 0997014..d8cb76b` | 0 | Intervalo sem erros de whitespace |
| `poetry run python -m unittest discover -s tests -v` | 0 | 26 métodos: 16 de resumo + 10 de subtotal; 0 falhas, 0 erros, 0 skips |
| `git diff --check` | 0 | Árvore sem erro de whitespace |
| Revisão documental de IDs e destinos Markdown | 0 | 6 REQs e 8 ACs únicos nas definições do PRD; 11 links locais existentes |
| Comparação SHA-256 final e HEAD | 0 | 13 arquivos rastreados inalterados, HEAD preservado |

Comandos, diretórios, códigos e saídas integrais:
[verificador-gates.json](../../../evidencias/verificador-gates.json).
Revisão documental: [verificador-revisao-documental.json](../../../evidencias/verificador-revisao-documental.json).
Não há lint, typecheck ou CI configurados; não foram inventados gates.
Não foi necessário reinstalar o ambiente, pois o existente estava disponível e
não há dependência a adicionar. Os 26 métodos incluem subtestes; não representam
26 entradas individuais nem cobertura exaustiva do domínio.

## Sensor de discriminação

Foram copiadas as versões efetivamente avaliadas dos 13 arquivos rastreados para
`/private/tmp/carrinho-sensor-independente-sg169vvu`. Cada cenário começou de uma
cópia própria sem mutação, comparada por SHA-256 com a árvore limpa. O interpretador
foi o mesmo `.venv/bin/python` do projeto, sem instalar dependências. O código e os
testes importados vieram das cópias: o runner confirmou `carrinho.__file__` e os
arquivos de ambos os módulos de teste sob o diretório isolado em **cada execução**.
`PYTHONPATH` foi removido e `-B` impediu cache do experimento.

Comando executado em cada cenário: `<raiz>/.venv/bin/python -B -c <runner>`.
O runner usa `unittest.defaultTestLoader.discover("tests")`, exige 26 métodos,
executa `TextTestRunner` e retorna 1 se houver falha comportamental. O script e o
argumento integral estão persistidos nas evidências.

| Cenário | Mudança comportamental / contrato | Código / contagens | Diagnóstico |
| --- | --- | --- | --- |
| Baseline | Nenhuma mudança | 0; 26 testes, 0 falhas/erros/skips | Baseline válida, imports da cópia confirmados |
| M1 | Em `carrinho.py:41`, retirar o `+ 50`: truncar o desconto | 1; 26 testes, 4 falhas incluindo subtestes, 0 erros/skips | Detectada: descontos 25 em vez de 26; 50 em vez de 51; erro no caso inteiro grande. `AssertionError` em valores de resumo |
| M2 | Em `:43`, trocar `< 10000` por `<= 10000` | 1; 26 testes, 2 falhas, 0 erros/skips | Detectada: frete 1.000 em vez de 0 na base 10.000, sem e com desconto |
| M3 | Em `:43`, consultar `valor_subtotal` em vez de `base_frete` | 1; 26 testes, 1 falha, 0 erros/skips | Detectada: subtotal 10.000 com 1% produz frete 0 e total 9.900, em vez de 1.000 e 10.900 |
| M4 | Após acumular a linha em `:25`, inserir `object.__setattr__(item, "preco_centavos", 0)` | 0; 26 testes, 0 falhas/erros/skips | **Sobrevivente**: preserva o número calculado, altera preços internos e viola CAR-AC-08 |

As três primeiras mutações cobrem os riscos aritméticos centrais. A quarta foi
acrescentada após identificar a cópia rasa nos testes de integridade. `Item` é
frozen, mas esse mecanismo explícito permite modificar o campo; o experimento
mede a capacidade de observar a invariância exigida, sem afirmar que essa escrita
exista no código atual ou que seja um acidente provável.

Confirmação independente de M4: o probe de snapshots de valores passou nos quatro
casos da baseline (`subtotal`/`calcular_total`, sucesso/erro). Na cópia mutada,
falhou já no primeiro caso com código 1 e `AssertionError`:
`((1990, 2), (550, 3)) != ((0, 2), (0, 3))`. Portanto M4 é uma violação observável;
não se trata de import errado, erro de sintaxe, ambiente inválido ou mutação
semanticamente equivalente. O probe do verificador não integra a suíte do
produto e não corrige a lacuna do projeto por si só.

**Sensor: falhou, com 3 detectadas e 1 sobrevivente.** Saídas, imports, comandos,
diffs e probe: [verificador-sensor.json](../../../evidencias/verificador-sensor.json),
[runner](../../../evidencias/verificador-sensor-runner.py),
[probe](../../../evidencias/verificador-integridade-probe.py) e arquivos
`verificador-M1-arredondamento.diff`, `verificador-M2-limiar.diff`,
`verificador-M3-base-frete.diff`, `verificador-M4-integridade.diff` na mesma pasta.
As cópias temporárias criadas por esta verificação foram descartadas após salvar
as evidências; nenhuma mutação foi aplicada à árvore real.

## Fluxo das skills e governança

Foram lidos integralmente os `SKILL.md` de `criar-prd`, `criar-spec` e
`executar-spec`, suas referências `estrutura-prd.md`, `estrutura-spec.md` e
`execucao-e-validacao.md`. O perfil Vetor não foi transplantado para este projeto
fictício: suas convenções próprias estão em `AGENTS.md:3`–11 e o brief:3 distingue
expressamente o exemplo do negócio Vetor.

| Etapa | Confronto com os artefatos e histórico | Avaliação |
| --- | --- | --- |
| criar-prd | PRD:4–6 separa autorização local e aceite; :14–17 declara ausência de baseline/meta comercial; :21–22 delimita exclusões; :28–33 define REQs observáveis; :54–64 dá critérios, evidências planejadas e autoridade técnica; :69–76 registra dependências, riscos e sequência. Commit `a5a7b39` contém PRD, índice e governança, sem código | A estrutura proporcional foi cumprida; não foram fabricados cliente, métricas acordadas ou aprovação |
| criar-spec | SPEC:4–7 identifica origem/branch; :15 assume os seis REQs e oito critérios; :25–57 fixa contratos e limites; :66–84 dá mapa/resultados; :88–101 reaproveita stack e comandos; :107–113 planeja duas tarefas coesas. Commit `0997014` contém somente documentação | Derivação coesa e anterior à implementação; sem expansão de escopo ou dependência circular |
| executar-spec | `cd7c5a6` reúne subtotal, testes e governança; `d8cb76b` reúne resumo, testes e governança. Ambos são commits locais Conventional Commits em português. Branch da SPEC descende da branch do PRD; não existe remoto. Gates foram executados novamente pelo verificador; relatório e sensor independentes produzidos | Implementação e atomicidade conformes. A adequação da prova de valores falhou no sensor; a SPEC permanece sem conclusão técnica |

O diff não altera o brief, PRD, construtor preexistente de `Item`, dependências ou
formulação de otimização. Não há risco/decisão adicional de produto constatado
que requeira mudar o escopo. Os estados em SPEC:6, governança:15–20 e índice:8
preservam a pendência de verificação, sem antecipar aceite.

Não foi constatada falha obrigatória na redação das três skills. A lacuna é de
aplicação do requisito de evidência adequada em CAR-AC-08; o sensor previsto na
skill permitiu expô-la. Uma recomendação opcional seria explicitar snapshots por
valor em invariantes de objetos, mas esta rodada não modifica skills nem trata
essa especialização como requisito já escrito. O histórico Git comprova a ordem
dos artefatos, não comprova por si só todas as leituras ou o raciocínio anterior
à escrita do autor.

## Lacunas priorizadas e fechamento

1. **P2 — bloqueia aprovação técnica: cobertura de valores em CAR-AC-08.** As cópias
   rasas mantêm aliases dos objetos originais. Preservar asserções de identidade e
   posição e acrescentar snapshots independentes de preço/quantidade em sucesso e
   erro nas funções públicas. Reexecutar os gates e demonstrar a detecção da M4,
   mantendo a baseline verde. Não há mudança de regra de negócio a autorizar.
2. **P3 — redação de estado:** SPEC:123–124 ainda diz que os testes precisam ser
   produzidos, embora :107–108 já registrem execução. Na atualização do fechamento,
   distinguir o que já foi executado da revisão que ficou pendente, preservando
   o histórico real. Isso não altera o veredito funcional.

T1 e T2 estão implementadas e têm verificação focal verde, conforme o código e os
commits avaliados. A garantia final da suíte para o requisito de integridade não
está comprovada; a aprovação independente da SPEC foi negada nesta rodada.

Homologação humana/UAT e aceite comercial não foram realizados nem presumidos;
não se aplicam ao exercício sem interface/cliente. O exemplo avalia uma biblioteca
pequena, determinística e sem serviços externos: não demonstra generalização das
skills a persistência, concorrência, interfaces, integração real, modelagem de
otimização, publicação ou compromissos contratuais. A revisão atual comprova as
regras e casos descritos acima; não é prova exaustiva para todos os inteiros,
subclasses Python ou entradas adversariais possíveis.
