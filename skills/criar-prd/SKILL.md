---
name: criar-prd
description: "Cria ou revisa um PRD a partir de uma necessidade, proposta, contrato ou descoberta, com escopo, requisitos rastreáveis, métricas, evidências e critérios de aceite. Use para definir o que entregar e por quê, antes de desdobrar em SPECs."
license: CC-BY-4.0
metadata:
  author: "Pedro Eckel"
  version: "1.0.0"
---

# Criar PRD

Transforme a necessidade em um documento de produto que permita decidir o escopo e
derivar SPECs verificáveis. Use o Vetor como referência de governança, adaptando as
convenções ao repositório atual.

## Entradas e limites

- Use a necessidade informada e as fontes disponíveis: proposta, contrato,
  descoberta, processos, PRDs existentes e decisões registradas.
- Se o pedido já nomear um PRD, revise esse documento antes de propor outro.
- Identifique fatos, hipóteses, recomendações e decisões pendentes. Não invente
  aprovadores, métricas de baseline, prazos acordados ou autorização comercial.
- Entregue o PRD e a governança impactada. Não inicie SPECs ou implementação sem
  que essas etapas façam parte do pedido.

## 1. Descobrir as convenções

Leia as instruções aplicáveis, índices de documentos e um PRD representativo do
mesmo domínio. Se existir, carregue `.specs/project/PROJECT_CONTROL.md` para caminhos,
provedor, identificadores e estratégia de branches. A governança oficial prevalece
sobre a memória operacional.

Se reconhecer o projeto Vetor por suas instruções e estrutura documental, leia
[perfil-vetor.md](references/perfil-vetor.md). Não transfira cliente, fases,
numeração ou ferramentas do Vetor para outro projeto.

Em outro repositório, descubra as fontes equivalentes de escopo, rastreabilidade,
aceite, premissas, mudanças e cronograma. Se não houver estrutura, proponha a
menor convenção necessária; `docs/prds/prd_NN_slug.md` é uma opção, não uma
obrigação. Reutilize os IDs existentes e consulte todos os registros pertinentes
antes de escolher o próximo número.

## 2. Delimitar o problema

Apresente um plano curto antes de editar. Extraia das fontes:

- problema, público e decisão ou tarefa que precisa melhorar;
- resultado de negócio e como será medido;
- escopo, exclusões e fronteiras com PRDs vizinhos;
- regras de negócio e dependências de dados, pessoas e sistemas;
- restrições de entrega, evidência necessária e quem pode aceitar.

Pergunte somente o que não puder ser descoberto e mudar materialmente o escopo ou
o aceite. Continue as partes independentes. Uma lacuna não impede um rascunho,
mas deve ter impacto e responsável pela resolução explícitos, quando conhecidos.
Não apresente uma recomendação como escolha aprovada.

## 3. Redigir o PRD

Leia [estrutura-prd.md](references/estrutura-prd.md) e adapte-a ao padrão local.
Preserve o texto válido em revisões e evite detalhes de implementação que ainda
dependam de uma SPEC. Registre restrições técnicas somente quando comprovadas ou
explicitamente propostas.

Cada requisito deve ter identidade estável e um resultado observável. Cada
critério de aceite deve apontar para requisito, evidência esperada e aprovador ou
pendência de definição. Separe métricas de sucesso do produto de critérios para
aceitar a entrega. Meta sem baseline conhecido deve permanecer identificada como
proposta, com a forma de medir o baseline.

Dimensione o documento pelo problema. Um PRD pequeno pode combinar seções, mas
continua precisando de escopo, requisitos, aceite, evidências e dependências.
Inclua uma sequência de entregas quando útil; não detalhe tarefas de código.

## 4. Integrar à governança

Atualize o índice e os registros exigidos pelo projeto no mesmo conjunto de
mudanças. Conforme o impacto, revise rastreabilidade, premissas, decisões, log de
mudanças e cronograma. Não crie uma `DEC` para cada escolha de redação nem altere
marcos contratuais para acomodar uma estimativa técnica.

No planejamento de uma alteração de formulação, explicite a proposta e a
obrigação de atualizar formulação normativa, código e testes conjuntamente na
execução; não altere a formulação vigente apenas no PRD ou no documento formal.

Mantenha rascunho, autorização de implementação, validação técnica e aceite
formal como estados distintos. Registre a autorização que já existir; a criação
do PRD não concede aprovação de escopo nem exige uma nova aprovação para trabalho
que já esteja autorizado. Ferramentas de gestão não são pré-requisito universal.
Crie ou atualize registros externos somente quando isso estiver no pedido ou em
autorização vigente; registre vínculos ausentes como pendências reais.

## 5. Revisar e entregar

Confira IDs únicos, referências existentes, coerência entre requisitos e aceite,
fronteiras com outros PRDs e consistência com as fontes. Verifique se uma pessoa
nova consegue entender o que será entregue, como comprovar e o que está pendente.
Execute a validação documental disponível; não rode testes da aplicação por uma
mudança apenas documental sem relação com esses testes.

Informe os arquivos criados ou alterados, documentos de governança consultados e
atualizados, validações realizadas e decisões pendentes. Quando apropriado, indique
o próximo comando: `$criar-spec` com o caminho do PRD. Não execute a próxima etapa
automaticamente, salvo se o pedido já abranger o fluxo completo.
