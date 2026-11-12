---
name: criar-spec
description: "Deriva ou revisa uma ou mais SPECs a partir de um PRD existente, com rastreabilidade de requisitos, dependências, critérios de aceite e plano de validação. Use para desdobrar o PRD em entregas implementáveis, antes de executar código."
license: CC-BY-4.0
metadata:
  author: "Pedro Eckel"
  version: "1.0.0"
---

# Criar SPEC a partir do PRD

Desdobre o PRD em entregas verificáveis sem expandir seu escopo. Cada SPEC deve
explicar o resultado, seus contratos, dependências e como comprovar a conclusão.

## 1. Localizar a origem e as regras

Leia as instruções do repositório, o PRD de origem por completo, seu índice de
SPECs e as decisões que afetem o recorte. Carregue o controle operacional existente
para caminhos, provedor e branches, sem tratá-lo como fonte superior à governança.
No Vetor, leia [perfil-vetor.md](references/perfil-vetor.md).

Se o PRD não foi nomeado, procure pelos termos do pedido e apresente a ambiguidade
somente se houver múltiplos candidatos plausíveis. Sem PRD ou fonte equivalente
identificável, não invente o vínculo: encaminhe a definição para `$criar-prd`.

Identifique o estado do PRD: rascunho, escopo aprovado, execução local autorizada,
pendências e aceite externo. Um PRD em rascunho pode sustentar SPECs em rascunho;
não declare o escopo aprovado por existir um documento.

## 2. Inspecionar antes de decompor

Leia uma SPEC representativa, os contratos e o código que já atendam ao recorte.
Procure componentes, bibliotecas, serviços, testes e validações reaproveitáveis.
Use configurações, manifests e CI para descobrir os comandos reais. Se uma
decisão depender de API ou biblioteca, confira a documentação atual por ferramentas
de documentação ou fontes oficiais; não invente contratos ou comandos.

Apresente um plano curto e um mapa de cobertura:

| Requisito do PRD | SPEC existente ou proposta | Entrega | Dependência | Situação |
| --- | --- | --- | --- | --- |
| ID e critério de origem | ID/caminho | Resultado verificável | SPEC, dado ou decisão | Coberto, parcial, pendente ou fora do recorte |

No desdobramento completo, cubra todos os requisitos e critérios de aceite do
PRD, ou justifique explicitamente o que permanece pendente. Num pedido parcial,
identifique os demais como fora do recorte atual; não os exclua do produto.

Prefira uma SPEC quando o resultado for coeso. Divida quando houver entregas
independentes, contratos distintos ou dependências que exijam sequência. Não
transforme cada arquivo ou componente em uma SPEC. Atualize uma SPEC existente
quando ela já for a dona natural do comportamento.

## 3. Escrever a SPEC

Leia [estrutura-spec.md](references/estrutura-spec.md). Numere a partir do índice
e dos registros existentes, preservando IDs publicados. Cada SPEC deve conter:

- PRD e requisitos de origem, artefatos e fontes normativas;
- objetivo, problema, escopo e exclusões;
- comportamento atual e esperado, entradas, saídas e contratos;
- regras, erros, limites e compatibilidade pertinentes ao recorte;
- dependências técnicas e externas, com critério de desbloqueio;
- critérios observáveis e matriz de aceite → verificação → evidência;
- impactos documentais, riscos, pendências e sequência de execução.

Descreva estados de carregamento, vazio, erro e transições para interfaces;
grão, chaves, qualidade, proveniência e idempotência para dados; precisão,
normalização e salvaguardas para modelagem, quando aplicáveis. Trate persistência,
concorrência, autenticação e chamadas externas quando o comportamento depender
delas, sem acrescentar funcionalidades que o PRD não pediu.

Cada critério deve especificar condição, ação e resultado esperado. Valores
numéricos, códigos de resposta e estados precisam de fonte ou decisão explícita.
Uma alternativa recomendada permanece proposta até ser decidida. Se faltar uma
decisão que mude o resultado, registre a lacuna e bloqueie somente a parte
dependente, sem preenchê-la a partir do comportamento atual do código.

## 4. Dimensionar desenho e tarefas

Para uma entrega simples, mantenha abordagem e passos na própria SPEC. Crie
sidecars de contexto, desenho e tarefas somente quando ambiguidades, alternativas,
múltiplos componentes ou dependências justificarem a separação. Reutilize arquivos
existentes e o padrão local. Não crie uma árvore paralela em `.specs/features/`
se o projeto organiza execução por PRD.

Se o pedido incluir desenho ou tarefas, produza-os com os contratos e comandos
descobertos. Cada tarefa representa um resultado coeso com seus testes e
documentos associados; não separe testes necessários para depois da conclusão.
Se o pedido for apenas a SPEC, deixe a decomposição detalhada para a execução.

## 5. Integrar, revisar e entregar

Atualize os índices, vínculos e registros documentais exigidos pelo impacto.
Mantenha cópias operacionais equivalentes nos campos normativos, se o projeto as
exigir. Para novas regras de modelagem, descreva a mudança como proposta e planeje
formulação normativa, código, testes e decisão no mesmo conjunto de execução;
não altere unilateralmente a formulação efetiva nesta etapa.

Valide IDs, links, cobertura dos requisitos e dos critérios de aceite, ausência
de dependências circulares e consistência entre dependências textuais e diagramas,
se existirem. Diferencie testes planejados de testes executados. Não crie issues,
publique comentários ou altere status externos apenas por o provedor estar
configurado; use a autorização vigente e registre o que faltar.

Entregue os caminhos das SPECs, o mapa de cobertura, ordem de execução, documentos
consultados e atualizados, validações e bloqueios reais. Indique `$executar-spec`
com a SPEC inicial quando útil. Execute a próxima etapa somente se ela já fizer
parte do pedido.
