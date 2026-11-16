# Segundo exercício: biblioteca comunitária

## Pedido e aplicação

Pedido: “Coordeno voluntários de uma biblioteca comunitária. Quero organizar
uma troca de livros no próximo sábado, das 10h às 12h, para até 20 pessoas.
Temos três mesas e duas pessoas disponíveis. Ainda não sei se o espaço será
autorizado. Prepare o plano e os materiais que der para adiantar. Não faça
convites nem reservas.”

Apliquei criar-spec ao próprio pedido: a skill permite partir de uma ideia e
organizar uma definição breve, sem exigir PRD formal. Em seguida, executar-spec
produziu os materiais locais planejados, com releitura contra o pedido e o plano.
Não foi necessário consultar fontes externas ou pedir arquitetura, arquivos,
ferramentas ou autorização repetida à pessoa.

## Resultados observados

| Critério derivado do pedido e das skills | Evidência |
| --- | --- |
| Preparar plano executável com dados conhecidos | plano.md contém resumo, materiais, etapas, dependências e checagens. |
| Produzir o trabalho adiantável | materiais.md contém roteiro, proposta de mesas, contagem e lista de checagem, não só recomendações. |
| Respeitar recursos | A proposta usa três mesas e duas pessoas, sem necessidade de equipe ou mobiliário adicional. |
| Respeitar limites | Todos os períodos propostos ficam entre 10h e 12h; a folha contém 20 posições, numeradas de 1 a 20. |
| Separar proposta de dado conhecido | Divisões de horário, equipe e mesas são marcadas como propostas; data, local e dinâmica não são tratados como confirmados. |
| Tratar a autorização ausente | A autorização aparece pendente no plano e na lista; os materiais são internos e condicionados a ela. |
| Não transformar preparação em ação externa | Somente arquivos locais foram produzidos. Não foi redigido convite, enviado contato ou feita reserva. |

A folha de contagem foi inspecionada: quatro colunas com cinco posições, de 1 a 20,
sem lacunas ou repetições de numeração. Nenhuma posição foi marcada como presença.
Nenhum item de autorização foi marcado como concluído.

## Lacunas preservadas

A coordenação ainda precisa obter a autorização e suas condições; confirmar o
local e a data no calendário; definir a dinâmica da troca, o destino dos livros
restantes e a forma de contar retornos. O plano não inventa essas regras nem
representa o espaço como apto. A organização dentro do período informado depende
das condições de acesso ao local, também não fornecidas.

O pedido “até 20 pessoas” não esclarece se conta os voluntários. A folha foi
rotulada como contagem de participantes e a disponibilidade de duas pessoas foi
mantida separada. Antes do uso, a coordenação deve confirmar se o limite inclui
as duas pessoas da equipe. Essa decisão não impede o preparo do rascunho.

Conclusão: o segundo caso demonstra aplicação em preparação de evento e separação
entre materiais prontos e realização condicionada. Ampliou a evidência além do
exemplo da loja; não houve evento realizado, autorização obtida, teste humano,
planilha ou software executados. A revisão dos materiais foi do próprio agente.
