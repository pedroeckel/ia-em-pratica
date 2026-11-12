# PRD-CAR-01 — Resumo determinístico de carrinho

- Data: 2026-11-12.
- Estado: produto especificado, implementado e verificado tecnicamente no exercício.
- Fonte: [brief](../../brief.md), [convenções](../../AGENTS.md) e [controle documental](../governanca.md).
- Aceite comercial: não se aplica; não existe cliente ou contrato neste exemplo.

## Problema, público e objetivo

Um serviço de orçamento precisa resumir carrinhos sem divergências causadas por
ponto flutuante. Hoje existe apenas a estrutura imutável `Item`; não existe
cálculo. O público é quem integra a biblioteca a um serviço Python.

O resultado esperado é um orçamento reproduzível em centavos, que exponha as
parcelas e recuse entradas inválidas. Não há baseline real de divergências nem
meta comercial acordada. A hipótese de produto é reduzir divergências entre
orçamentos equivalentes; medir isso exigiria uma operação real, fora do exercício.

## Escopo e exclusões

Inclui subtotal, desconto percentual, frete e resumo em memória. Não inclui HTTP,
interface, persistência, estoque, pagamento, tributação, moedas ou integrações.

## Requisitos

| ID | Resultado observável | Origem | Prioridade |
| --- | --- | --- | --- |
| CAR-REQ-01 | Somar preço unitário × quantidade; lista vazia tem subtotal zero | Brief, subtotal | Essencial |
| CAR-REQ-02 | Aceitar somente lista de `Item`, preço inteiro não negativo e quantidade inteira positiva; rejeitar booleanos e não inteiros com `ValueError` | Brief, entradas | Essencial |
| CAR-REQ-03 | Aplicar desconto inteiro de 0% a 50%, padrão zero, uma vez sobre o subtotal, com arredondamento de meio centavo para cima | Brief, desconto | Essencial |
| CAR-REQ-04 | Frete de 1.000 centavos abaixo de 10.000 após desconto, zero a partir do limite e zero para lista vazia | Brief, frete | Essencial |
| CAR-REQ-05 | Expor subtotal, desconto, frete e total em inteiros exatos; total é subtotal menos desconto mais frete | Brief, resultado e precisão | Essencial |
| CAR-REQ-06 | Preservar lista, ordem, itens e valores em sucesso e rejeição; não devolver resultado parcial em erro | Brief, integridade | Essencial |

## Dados, regras e restrições

Um item é uma linha de orçamento; a biblioteca não agrega por identidade de
produto. A entrada é uma lista em memória. Cada linha contém preço em centavos e
quantidade; não há limite superior de inteiro definido no brief. Não existem
tempo de referência, dado pessoal ou dependência de dados externos.

Um item de preço zero é permitido e torna a lista não vazia. Com esse único item,
o frete é de 1.000 e o total também. Percentual inválido é rejeitado mesmo que a
lista esteja vazia. O desconto não incide sobre o frete. Nenhuma mensagem textual
de exceção é contrato público; a classe exigida é `ValueError`.

Reutilizar `Item`, biblioteca padrão e Poetry, conforme as convenções locais.
Desenho da API e organização dos testes pertencem à SPEC.

## Aceite e evidências

| Critério | REQs | Condição e resultado esperado | Evidência planejada |
| --- | --- | --- | --- |
| CAR-AC-01 | 01 | Lista vazia produz subtotal 0; preços 1.990 × 2 e 550 × 3 produzem subtotal 5.630 | Teste de subtotal |
| CAR-AC-02 | 02 | Lista inválida, linha que não é `Item`, preço negativo/não inteiro/booleano ou quantidade não positiva/não inteira/booleana geram `ValueError` | Testes de rejeição |
| CAR-AC-03 | 03 | Descontos 0 e 50 são aceitos; fora do intervalo, booleano ou não inteiro é rejeitado, inclusive em lista vazia | Testes de limites |
| CAR-AC-04 | 03, 05 | Subtotal 101 e desconto 50% geram desconto 51; subtotal 101/102/103 com 25% gera 25/26/26 | Testes de arredondamento |
| CAR-AC-05 | 04 | Base após desconto 9.999 paga frete 1.000; 10.000 e 10.001 pagam zero; subtotal 10.000 com 1% passa a pagar 1.000 | Testes do limiar |
| CAR-AC-06 | 01, 04, 05 | Lista vazia com desconto válido produz quatro parcelas zero; um item de preço zero produz frete e total 1.000 | Testes de vazio e preço zero |
| CAR-AC-07 | 05 | Para subtotal 5.630 e desconto 10%, o resultado é subtotal 5.630, desconto 563, frete 1.000 e total 6.067; todas as parcelas são inteiros, preservando precisão inclusive acima de 2^53 | Testes do resumo |
| CAR-AC-08 | 06 | Sucesso e erro preservam a lista, sua ordem, referências e valores dos itens; erro não retorna resumo parcial | Testes de integridade |

O responsável por emitir o veredito técnico é o verificador independente do
exercício, não um aprovador comercial. As evidências e a aprovação técnica estão no
[relatório independente](../entregas/spec-carrinho.validation.md); aceite comercial não se aplica.

## Dependências, riscos e entrega

Dependências: Python >=3.12, Poetry e o contrato `Item` existente. Não há dependência
de provedor externo. Riscos: aplicar desconto por item, usar float ou testar frete
antes do desconto. Mitigação: exemplos explícitos nos critérios e verificação
independente com erros comportamentais em cópia isolada.

Sequência: derivar uma SPEC coesa, implementar subtotal/validações e depois resumo
com desconto/frete. Sem prazo contratual. A conclusão técnica exige todos os
critérios com evidência, checagens aplicáveis aprovadas e relatório independente.

## Pendências

Nenhuma decisão de negócio necessária ao exercício ficou aberta. Uma eventual
integração com operação real exigirá baseline, responsável e métricas próprios;
isso não faz parte desta entrega.
