# Brief — resumo de carrinho

Cenário fictício para avaliação local do fluxo de produto até implementação. As regras abaixo são a entrada do exemplo, não uma definição do negócio do Vetor.

Uma loja precisa calcular orçamentos determinísticos, sem erros de ponto flutuante. A biblioteca é usada por um serviço Python; não haverá interface, API HTTP, banco, estoque nem pagamento.

- Cada item possui preço unitário em centavos inteiros não negativos e quantidade inteira estritamente positiva. Valores booleanos e não inteiros são inválidos nesses campos. Itens precisam ser instâncias de `Item`; o carrinho é uma lista de itens.
- O subtotal é a soma de preço × quantidade. Carrinho vazio tem subtotal zero. Entradas não podem ser modificadas.
- O desconto opcional é uma porcentagem inteira de 0 a 50, inclusive; padrão zero. Booleanos e valores não inteiros são inválidos.
- O desconto incide uma vez sobre o subtotal e é arredondado para o centavo mais próximo, com empate de meio centavo arredondado para cima. Exemplo: subtotal 101 com desconto de 50% gera desconto de 51 centavos.
- O frete é de 1.000 centavos para um carrinho não vazio cujo subtotal depois do desconto seja inferior a 10.000 centavos. O frete é zero a partir de 10.000, inclusive. Carrinho vazio sempre tem frete zero. Um item de preço zero torna o carrinho não vazio e paga o frete de 1.000.
- O resultado expõe subtotal original, desconto em centavos, frete e total final, todos inteiros em centavos. Total = subtotal − desconto + frete.
- Entrada inválida gera `ValueError`; nenhum resultado parcial é devolvido. Não há contrato sobre a mensagem textual do erro.

O exercício inclui criar PRD, SPEC e implementação, com commits locais no repositório isolado e verificação independente. Não há autorização ou necessidade de publicação externa nem aceite comercial a simular.
