# SPEC-CAR-01 — Cálculo de subtotal e resumo

- Data: 2026-11-12.
- Origem: [PRD-CAR-01](../produto/prd-carrinho.md), [brief](../../brief.md).
- Branch: `feat/spec-carrinho`, derivada de `feat/prd-carrinho`.
- Estado: implementada e verificada tecnicamente na rodada 2; primeira reprovação e correção preservadas no histórico.
- Provedor, marco contratual e aceite externo: não se aplicam.

## Objetivo e fronteiras

Implementar uma única entrega coesa: calcular um orçamento a partir de `Item`
sem ponto flutuante ou efeitos sobre a entrada. Antes existe somente a dataclass
`Item`; depois o integrador obtém subtotal isolado ou resumo completo.

Todos os seis requisitos e oito critérios do PRD pertencem a esta SPEC. Não há
API HTTP, armazenamento, interface ou nova dependência. Não se aplica formulação
de otimizador: esta biblioteca implementa aritmética determinística do brief.

## API e contratos

Reutilizar `Item(preco_centavos: int, quantidade: int)`, já presente em `carrinho.py`.
O módulo expõe:

```python
def subtotal(itens: list[Item]) -> int: ...

@dataclass(frozen=True)
class Resumo:
    subtotal_centavos: int
    desconto_centavos: int
    frete_centavos: int
    total_centavos: int

def calcular_total(itens: list[Item], desconto_percentual: int = 0) -> Resumo: ...
```

Validar as entradas nas funções públicas, sem alterar o construtor existente de
`Item`. Aceitar lista e instâncias de `Item`; rejeitar outras coleções, elementos
inválidos e valores incompatíveis com `ValueError`. `int` não inclui booleanos
para este contrato; preço >=0, quantidade >0 e percentual entre 0 e 50, inclusive.
A validação de desconto se aplica até à lista vazia. A mensagem de erro é livre.

Se houver erro, a função lança a exceção sem retornar valor parcial. Não há
persistência ou estado compartilhado. A entrada mantém comprimento, ordem,
referências e valores, inclusive se uma linha válida anteceder uma linha inválida.

## Regras de cálculo

- Subtotal: soma de preço × quantidade, começando em zero.
- Desconto: porcentagem sobre o subtotal inteiro, uma única vez; arredondamento
  para o inteiro mais próximo, com meio centavo para cima. Expressão inteira
  equivalente: `(subtotal * percentual + 50) // 100`.
- Base do frete: subtotal menos desconto. Lista não vazia paga 1.000 se essa base
  for estritamente menor que 10.000; caso contrário paga zero. Lista vazia paga zero.
- Total: subtotal menos desconto mais frete; as quatro parcelas são inteiros.
- Um item de preço zero é uma lista não vazia; não convertê-lo em carrinho vazio.
- Inteiros acima de 2^53 continuam exatos; não converter para `float`.

## Cobertura de aceite

Os IDs e resultados dos oito critérios são herdados integralmente do PRD; nenhuma
asserção poderá redefini-los com base no resultado do código.

| REQ | Critérios | Verificação planejada | Entrega |
| --- | --- | --- | --- |
| CAR-REQ-01 | CAR-AC-01, 06 | Vazio e soma 5.630 | T1 + integração em T2 |
| CAR-REQ-02 | CAR-AC-02 | Rejeição de coleção/linha/preço/quantidade inválidos nas funções públicas | T1 + T2 |
| CAR-REQ-03 | CAR-AC-03, 04 | Limites, padrão, 101×50%=51 e 101/102/103×25%=25/26/26 | T2 |
| CAR-REQ-04 | CAR-AC-05, 06 | Limiares, desconto cruzando o limite, vazio e item de preço zero | T2 |
| CAR-REQ-05 | CAR-AC-04, 06, 07 | Resumo exato 5.630/563/1.000/6.067, tipos e inteiros grandes | T2 |
| CAR-REQ-06 | CAR-AC-08 | Preservação da entrada em sucesso e erro | T1 + T2 |

Resultados completos adicionais para os exemplos do PRD:

| Itens / percentual | Subtotal | Desconto | Frete | Total |
| --- | --- | --- | --- | --- |
| 101×1 / 50% | 101 | 51 | 1.000 | 1.050 |
| 9.999×1 / 0% | 9.999 | 0 | 1.000 | 10.999 |
| 10.000×1 / 0% | 10.000 | 0 | 0 | 10.000 |
| 10.001×1 / 0% | 10.001 | 0 | 0 | 10.001 |
| 10.000×1 / 1% | 10.000 | 100 | 1.000 | 10.900 |
| 20.000×1 / 50% | 20.000 | 10.000 | 0 | 10.000 |
| lista vazia / 50% | 0 | 0 | 0 | 0 |
| 0×1 / 0% | 0 | 0 | 1.000 | 1.000 |

## Reutilização, dependências e validação

Reutilizar dataclasses, aritmética inteira, `Item` e o ambiente Poetry existente.
Testes com `unittest`, sem instalação adicional. A implementação cabe em um
módulo e não apresenta decisão arquitetural que justifique desenho separado.

Os comandos foram localizados no README e em AGENTS, executados da raiz:

1. `poetry run python -m compileall -q carrinho.py tests`.
2. `poetry run python -m unittest discover -s tests -v`.
3. `git diff --check` para consistência do diff.

Não há lint ou typecheck configurado. Baseline do ambiente Poetry: Python 3.13.0,
Poetry 2.2.1; o Python externo ao ambiente é 3.14.2.
`poetry install` concluiu sem dependências. A descoberta inicial encontrou zero
testes e retornou código 5 (`NO TESTS RAN`); isso não é aceite nem suíte aprovada.

## Plano de execução e evidência

| Tarefa | Resultado e arquivos | Dependência | Pronto quando | Estado |
| --- | --- | --- | --- | --- |
| T1 | `subtotal` e validações em `carrinho.py`, testes em `tests/test_subtotal.py`, rastreabilidade no controle | `Item` e PRD/SPEC existentes | CAR-AC-01/02 e integridade do subtotal passam nas checagens | Implementada e verificada focalmente: 10 testes aprovados |
| T2 | `Resumo` e `calcular_total`, testes em `tests/test_resumo.py`, estado e rastreabilidade | T1 verificada | Todos os critérios passam nas checagens; commit de implementação produzido | Implementada e verificada focalmente: 26 testes aprovados na suíte completa |
| T3 | Reforçar a prova de preservação dos valores nos dois arquivos de teste, sem mudar comportamento ou requisitos | Falha do sensor em CAR-AC-08 | Comparar snapshots independentes após sucesso e erro; checagens passam; sensor de alteração de item é detectado | Correção implementada e confirmada independentemente na rodada 2 |

Cada tarefa reúne código, testes e registro do resultado num commit local. A
verificação final independente ocorre após T2 e produz
`spec-carrinho.validation.md`, com matriz por critério, comandos e sensor em
cópia isolada. Sua aprovação é necessária para a conclusão técnica do exemplo.

## Riscos, governança e pendências

Riscos principais: ordem de cálculo do desconto/frete, limiar inclusivo e
arredondamento. Testes derivam dos exemplos normativos e o sensor altera esses
comportamentos na cópia de avaliação. Atualizar índice e controle documental
com estados reais de implementação e verificação. Não reescrever o brief para
acomodar um resultado divergente.

Nenhum bloqueio externo ou decisão aberta. Os testes já foram produzidos e as
checagens focais foram executadas. A primeira revisão reprovou a cobertura de
integridade; a correção foi aplicada e confirmada independentemente na rodada 2.

## Resultado da primeira rodada e correção

A primeira revisão independente sobre `0997014..d8cb76b` encontrou uma mutação
de valores de `Item` não detectada por CAR-AC-08. A cópia rasa da lista preservava
referências, mas não constituía snapshot independente dos campos. T3 adiciona
esse snapshot aos testes de integridade em sucesso e erro. A implementação real
não foi alterada. Os 26 testes continuam aprovados; a correção focal detectou o
mesmo erro em cópia isolada. A segunda revisão aprovou todos os critérios e detectou
as quatro mutações; o [relatório final](spec-carrinho.validation.md) registra o alcance.
A [primeira reprovação](spec-carrinho.validation.rodada-1.md) permanece preservada.
