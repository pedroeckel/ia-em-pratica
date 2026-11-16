---
name: criar-spec
description: "Transforma uma definição de projeto ou PRD em um plano detalhado de entrega (SPEC), com passos, materiais, regras e formas de conferir. Use para preparar a execução de trabalhos técnicos ou não técnicos."
license: CC-BY-4.0
metadata:
  author: "Pedro Eckel"
  version: "2.0.0"
---

# Detalhar a entrega — criar SPEC

Transforme o que foi combinado em instruções suficientes para produzir e conferir
a entrega. SPEC significa especificação: aqui, um plano detalhado do trabalho,
que pode ser um material, processo, evento, serviço ou software.

## Entender o ponto de partida

Use o PRD, resumo ou definição já presente na conversa, ou um documento indicado.
Não exija que a pessoa tenha usado outra skill, conheça siglas ou informe caminhos.
Se só houver uma ideia, organize uma definição breve com o que já se sabe e peça
apenas a decisão que alterar o resultado. Não invente que um PRD formal existe.

Respeite o escopo combinado e consulte materiais disponíveis antes de perguntar.
Descubra o que já existe e pode ser aproveitado: textos, modelos, planilhas,
processos ou ferramentas. Em projetos de software, examine também o código e suas
regras. Não procure repositórios nem bibliotecas para uma entrega não técnica.

## Especificar sem complicar

Leia [estrutura-spec.md](references/estrutura-spec.md) e escolha o detalhamento
necessário. Mostre:

- o resultado e seu formato, para quem ele será útil e o que ficará de fora;
- as informações ou materiais de entrada e o que precisa existir ao final;
- as regras, seções ou comportamentos que precisam ser respeitados;
- os passos e a ordem de execução, com dependências reais;
- como conferir cada resultado e o que fazer se faltar informação.

Ligue cada parte do plano a uma necessidade do resumo ou PRD. Uma lista simples
basta em projetos pequenos. Não crie uma especificação por arquivo ou etapa; divida
somente quando houver entregas que possam ser feitas e conferidas separadamente.

Faça as escolhas de método que couberem ao assistente e explique as que afetarem
o resultado da pessoa. Não transforme preferência técnica em pergunta obrigatória.
Destaque sugestões como sugestões. Se faltar uma regra de negócio, dado ou escolha
que mude a entrega, identifique a dúvida e avance somente nas partes independentes.

Use termos do domínio da pessoa. Inclua detalhes de código, integrações, testes
automatizados ou infraestrutura apenas quando a entrega depender deles. Nesse caso,
descubra as convenções existentes e confirme contratos incertos em documentação
oficial; não invente comandos ou acrescente funcionalidades ao pedido.

## Conferir e entregar

Confira se cada necessidade está atendida ou aparece como pendência explícita.
Verifique se outra pessoa conseguiria produzir e conferir a entrega sem ter de
adivinhar regras. Separe checagens planejadas de resultados já observados.

Entregue o plano no chat ou no formato/local combinado. Não imponha documentos
extras, pastas, códigos de identificação ou aprovações formais. Preserve controles
que o projeto realmente exigir. A existência do plano não significa aprovação
externa nem autoriza ações fora do pedido.

Indique a próxima ação em linguagem comum: produzir a entrega com `$executar-spec`
a partir deste plano. Não exija salvar um arquivo antes de continuar. Se o pedido
incluir apenas planejamento, não comece a execução.
