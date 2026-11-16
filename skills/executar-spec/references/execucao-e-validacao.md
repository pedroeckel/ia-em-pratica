# Escolher a conferência que faz sentido

A verificação deve comprovar o resultado pedido. Não transforme todo trabalho em
projeto de software nem trate um arquivo produzido como prova de uma ação externa.

| Entrega | Como conferir | Limite a comunicar |
| --- | --- | --- |
| Texto ou guia | Comparar conteúdo e dados com o plano e as fontes; revisar clareza e contradições | Redigido não significa enviado ou aprovado |
| Planilha | Conferir fórmulas, totais, unidades e exemplos calculados separadamente | Dados ausentes ou não verificados continuam identificados |
| Processo ou evento | Conferir sequência, materiais, papéis conhecidos e dependências | Roteiro pronto não significa processo adotado, evento realizado ou contratação feita |
| Material visual | Conferir conteúdo e, se possível, abrir/renderizar o resultado para verificar legibilidade e layout | Sem visualização, não afirmar que o aspecto final foi conferido |
| Software | Comparar comportamento com o plano; usar lint, tipos, testes e build existentes conforme a mudança | Teste não executado ou pulado não conta como aprovação |

## Um exemplo acessível

Plano: produzir um guia de boas-vindas com rotina, contatos e regras da loja.

Conferência: verificar cada seção e comparar dados com as informações fornecidas.
Se os contatos não foram informados, entregar o restante com o campo a confirmar
e declarar essa parte pendente. Não criar contatos fictícios nem dizer que a loja
adotou o guia. Para um pedido de rascunho, o rascunho pode estar concluído mesmo
contendo campos explicitamente aguardando informação; para um pedido de guia pronto
para distribuição, esses mesmos campos impedem a conclusão dessa entrega.

## Quando houver código

Leia instruções e código existentes e descubra os comandos reais antes de editar.
Reaproveite ferramentas e dependências disponíveis. Derive resultados esperados
do plano, não do comportamento atual da implementação. Inclua limites e falhas
relevantes. Não enfraqueça testes para fazê-los passar. Execute checagens baratas
antes das custosas e registre limitações reais quando não puder rodá-las.

Respeite o uso de branches, commits e registros apenas quando fizerem parte do
fluxo do projeto e estiverem autorizados. Preserve alterações preexistentes. Uma
mudança simples não exige uma árvore de documentos ou um relatório formal.
Revisão independente e testes que introduzem erros deliberados cabem quando o
risco ou uma exigência do projeto justificar; faça experimentos somente em ambiente
isolado e autorizado. Não os imponha a toda execução.
