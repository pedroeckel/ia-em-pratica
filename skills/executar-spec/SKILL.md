---
name: executar-spec
description: "Produz uma entrega a partir de um plano ou SPEC e confere o resultado contra o combinado. Use para executar ou retomar trabalhos como documentos, planilhas, processos, materiais, eventos ou software, dentro das ferramentas e autorizações disponíveis."
license: CC-BY-4.0
metadata:
  version: "2.0.0"
  based-on: "tlc-spec-driven 3.2.0 — Felipe Rodrigues (github.com/felipfr)"
---

# Produzir e conferir — executar SPEC

Realize o trabalho descrito no plano e mostre o que ficou pronto, o que foi
conferido e o que ainda depende de uma pessoa ou ferramenta. Uma SPEC é um plano
detalhado; não pressupõe software, Git ou uma estrutura de pastas.

## Entender a entrega e o estado atual

Use o plano já presente na conversa, um documento indicado ou instruções claras da
pessoa. Não exija arquivo, PRD separado ou etapas anteriores formais. Se faltar uma
definição que impeça a execução, esclareça somente essa parte; a skill `$criar-spec`
pode ajudar a detalhá-la, mas não é uma dependência obrigatória.

Confira materiais e trabalho existentes antes de produzir algo novo. Preserve
conteúdo válido e mudanças alheias. Apresente um plano curto proporcional ao
trabalho, com resultado esperado e forma de conferir. Ao retomar, descubra o que
já está feito e continue sem refazer etapas concluídas.

## Produzir por resultados

Execute em partes que possam ser conferidas. Para um material, escreva e revise;
para uma planilha, organize os dados e confira os cálculos; para software, altere
o código e rode as verificações pertinentes. Leia
[execucao-e-validacao.md](references/execucao-e-validacao.md) para escolher uma
verificação adequada ao tipo de entrega.

Use as ferramentas disponíveis e o formato solicitado. Não acrescente software,
programação ou automações quando a entrega não precisar deles. Entregue no chat
quando isso bastar; crie arquivos quando pedidos ou necessários ao resultado.
Não substitua execução por uma lista de recomendações se puder produzir a entrega.

Se faltar dado, marque a lacuna e continue o que não depender dela. Não invente
contatos, resultados de pesquisa, valores ou aprovações. Se faltar uma ferramenta,
explique o limite e produza a parte útil possível: por exemplo, preparar o roteiro
de um evento não significa reservar o espaço ou realizar o evento.

Use a autorização vigente para ações externas. Produzir um texto não autoriza
enviá-lo; planejar um evento não autoriza contratar fornecedores; implementar
software não autoriza publicá-lo. Não peça aprovação repetida para trabalho já
autorizado. Antes de um novo compromisso externo, deixe o resultado revisável e
obtenha a decisão que estiver faltando.

## Conferir o que foi combinado

Compare a entrega com o plano original, não apenas com o que acabou de produzir.
Use evidências do próprio trabalho: conteúdo, cálculo, demonstração ou teste,
conforme o caso. Corrija falhas dentro do escopo e repita somente as checagens
necessárias. Se um erro persistir sem nova forma de resolvê-lo, apresente a causa
e a decisão ou recurso necessário, sem repetir tentativas iguais.

Uma releitura separada pode bastar para uma tarefa simples. Use revisão adicional
quando o risco ou as regras do projeto justificarem e o ambiente permitir. Não
rotule autorrevisão como independente nem imponha subagentes ou relatórios formais
a todo trabalho. Não declare validação que não foi realizada.

## Entregar com clareza

Apresente a entrega e uma conferência curta: o que foi atendido, como verificou,
pendências e próximo passo. Diferencie “rascunho produzido”, “resultado conferido”
e “aprovado pela pessoa” quando essa aprovação fizer parte do contexto. A ausência
de uma etapa cerimonial não é pendência; uma necessidade real não atendida é.

Se precisar pausar, registre o resultado parcial e o ponto de retomada no próprio
chat ou no local já usado pelo projeto, sem criar uma estrutura paralela.

## Origem e adaptação

Adaptada de **Tech Lead's Club — Spec-Driven Development**, `tlc-spec-driven`
3.2.0, por [Felipe Rodrigues](https://github.com/felipfr), sob
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
A fonte consultada inclui `SKILL.md`, `tasks.md`, `implement.md` e `validate.md`.
Esta versão mantém planejamento proporcional, execução por resultados e
conferência contra o combinado. Amplia a aplicação para entregas não técnicas e
remove convenções de um projeto específico e obrigações universais de Git,
commits, relatórios e testes de mutação. Não depende dos scripts da skill original.
