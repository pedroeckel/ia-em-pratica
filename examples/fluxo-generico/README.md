# Da ideia à entrega, sem programar

Estes são exercícios controlados de agente da revisão 2.0.0, realizados em 16/11/2026. Os dados foram fornecidos nos pedidos de exemplo; não representam organizações reais. Não houve teste com usuários, envio de mensagens, convite, reserva ou realização de evento.

## Guia de boas-vindas

Pedido: “Tenho uma pequena loja e quero um guia de boas-vindas para novos funcionários. Não sei programar. A loja abre de segunda a sábado, das 9h às 18h; uniforme é camiseta azul e calça preta; o primeiro dia inclui conhecer o espaço e acompanhar alguém no atendimento. Ainda não tenho a lista de contatos. Quero um rascunho, não envie a ninguém.”

1. `criar-prd` organizou a [definição](loja/definicao.md).
2. `criar-spec` preparou o [plano](loja/plano.md).
3. `executar-spec` produziu o [guia](loja/guia.md).

O guia distingue horário da loja de jornada individual e deixa os contatos pendentes. Produzir o rascunho não significa aprová-lo ou distribuí-lo.

## Troca de livros

Pedido: “Coordeno voluntários de uma biblioteca comunitária. Quero organizar uma troca de livros no próximo sábado, das 10h às 12h, para até 20 pessoas. Temos três mesas e duas pessoas disponíveis. Ainda não sei se o espaço será autorizado. Prepare o plano e os materiais que der para adiantar. Não faça convites nem reservas.”

- `criar-spec` partiu diretamente do pedido e organizou o [plano](biblioteca/plano.md).
- `executar-spec` preparou os [materiais](biblioteca/materiais.md), com [conferência](biblioteca/conferencia.md).

A autorização continua pendente; organização e dinâmica são propostas. Não é preciso um PRD formal para começar de instruções claras.

## Experimente com sua tarefa

Conte a necessidade e os dados conhecidos. Peça para usar `criar-prd`, depois `criar-spec` e `executar-spec` na mesma conversa. Você também pode começar de um plano que já tenha. Os nomes das skills no Codex usam `$`; no Claude Code, `/` ou o namespace do plugin, conforme o [guia de instalação](../../docs/instalacao.md).

Veja o [alcance da revisão](../../evidence/fluxo-generico-2.0.0.md). Um exercício de agente não demonstra facilidade de uso por pessoas não técnicas.
