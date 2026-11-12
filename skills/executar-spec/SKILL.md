---
name: executar-spec
description: "Planeja e implementa uma SPEC existente vinculada a um PRD, com profundidade adaptativa, tarefas e commits atômicos, testes derivados do aceite, governança e verificação final. Use para executar, retomar ou validar uma SPEC; não para criar o PRD inicial."
license: CC-BY-4.0
metadata:
  version: "1.0.1"
  based-on: "tlc-spec-driven 3.2.0 — Felipe Rodrigues (github.com/felipfr)"
---

# Executar SPEC

Implemente a SPEC existente como contrato de resultado. Adapte o fluxo
**Confirmar SPEC → Desenhar quando necessário → Planejar tarefas → Executar →
Verificar** à complexidade, preservando a governança do projeto.

Esta skill é autossuficiente. Não depende de ativar a `tlc-spec-driven` original
nem de seus caminhos ou scripts. Leia as referências desta pasta por completo
antes de aplicar o procedimento correspondente.

## Contrato de execução

1. Os resultados esperados vêm dos critérios da SPEC e do PRD, nunca de copiar o
   comportamento do código para o teste. Uma lacuna de precisão permanece visível.
2. Cada tarefa reúne um resultado coeso, testes pertinentes e documentos afetados.
   Só marque como verificada depois de passar nas checagens aplicáveis. Falha,
   teste não executado e teste pulado não são aprovação.
3. Preserve a atomicidade: um commit por tarefa verificada quando commits fizerem
   parte do fluxo autorizado. Respeite instruções de não commitar; nesse caso,
   mantenha a separação das tarefas e registre que os commits estão pendentes.
4. Depois da última tarefa, rode a verificação final automaticamente. Quando a
   ferramenta e as instruções do ambiente permitirem, despache um Verificador novo
   em subagente, separado do autor. Sem essa possibilidade, faça revisão separada
   e declare que a independência entre autor e verificador não foi satisfeita.
   Não declare esse requisito atendido por uma autorrevisão.

## 1. Confirmar a SPEC e o estado do trabalho

Leia as instruções aplicáveis, o controle operacional e o estado de retomada quando
existirem. Carregue a SPEC normativa completa, o PRD e as decisões relevantes,
além dos sidecars existentes. Leia somente o recorte de outras SPECs necessário
para confirmar contratos ou dependências. No Vetor, leia
[perfil-vetor.md](references/perfil-vetor.md).

Confira branch, base, diff inicial e mudanças preexistentes. Uma execução de SPEC
usa a estratégia de branch do projeto; não escolha `main` por hábito. Preserve
trabalho alheio e use checkout isolado quando necessário e permitido. Se não for
possível isolar alterações sobrepostas com segurança, explique o bloqueio.

Confirme os resultados, as dependências e a autorização vigente. Não reescreva o
PRD para justificar uma implementação divergente. Se faltar uma decisão, registre
alternativas e impacto e continue o trabalho que não depender dela. Escopo novo
segue o controle de mudança do projeto.

## 2. Dimensionar desenho e tarefas

| Situação | Desenho | Tarefas |
| --- | --- | --- |
| Até três passos óbvios, sem decisão arquitetural | Abordagem na própria SPEC/plano | Lista curta com resultado e validação |
| Vários componentes ou contratos afetados | Sidecar quando esclarecer interfaces e decisões | Tarefas explícitas por resultado |
| Mais de cinco passos ou dependências complexas | Desenho proporcional às decisões | Arquivo de tarefas formal |
| Domínio ambíguo ou modelagem nova | Resolver ambiguidades e registrar alternativas | Separar tarefas desbloqueadas das dependentes |

Uma SPEC formal continua necessária mesmo para execução pequena quando a
governança do projeto a exigir. Não substitua a SPEC existente por uma frase.
Reutilize os sidecars e nomes locais; não migre `.specs/prds/` para
`.specs/features/`.

Antes de editar código, leia [execucao-e-validacao.md](references/execucao-e-validacao.md).
Apresente um plano curto com hipóteses, arquivos, passos e critérios de sucesso.
Descubra os comandos de validação nos manifests, testes e CI. Reaproveite a stack
existente antes de propor dependências. Para APIs ou bibliotecas ainda incertas,
consulte documentação atual depois de inspecionar código e documentação local.

## 3. Executar sem perder rastreabilidade

Execute uma tarefa por vez: confirmar dependências → testes pertinentes ao aceite
→ implementação mínima → governança no mesmo diff → checagens → revisão → commit
autorizado → atualização do estado. Comece pelas checagens baratas existentes,
depois testes focais e integrações necessárias. Na conclusão, rode os gates do
escopo que ainda forem necessários.

Não enfraqueça, remova ou pule testes para esconder uma falha. Um teste comprovadamente
incorreto pode ser corrigido com base na fonte normativa, mantendo explícita a
justificativa e a cobertura do comportamento correto. Não escreva comentários de
histórico da conversa nem marcadores de desvio no código; registre divergências
nos documentos apropriados.

Mudança na formulação exige documento matemático normativo, implementação e testes
coerentes no mesmo conjunto de mudanças, inclusive quando apresentada como
refatoração. Se o documento não existir, criá-lo é pré-requisito da mudança.

O pedido de executar autoriza a implementação necessária, não publicação, envio de
mensagens ou promoção operacional automática. Use a autorização existente para
ações externas e registre pendências sem pedir confirmação repetida. Não imponha
aprovações entre fases quando o trabalho já estiver autorizado.

## 4. Verificar e fechar

O Verificador recebe a SPEC, fontes normativas necessárias, intervalo do diff,
testes e o procedimento desta skill; ele deriva os resultados independentemente,
sem receber a conclusão do autor. Opera em leitura na árvore real; eventuais
experimentos usam somente uma cópia descartável. Não delegue implementação por
padrão. Delegue lotes de trabalho somente quando houver pedido ou autorização
específica para isso.

Verifique cada critério por evidência localizada e confira o resultado esperado,
além de o teste passar. Para comportamento executável relevante, aplique o sensor
de discriminação descrito na referência. Registre relatório de validação com
checagens, evidências, lacunas, alcance e independência do verificador. Corrija as
lacunas dentro do escopo e revalide, com até três ciclos antes de comunicar um
impedimento persistente que exija decisão externa.

Separe implementação, verificação técnica, homologação e aceite formal. Sem
evidência de uma etapa, ela permanece pendente; uma suíte verde não concede aceite
contratual. Registre lições somente quando houver falha concreta e no mecanismo
existente do projeto, sem criar registros fictícios nem exigir scripts ausentes.

Na pausa, preserve decisões e atualize apenas a seção de handoff do estado vigente:
SPEC, branch/base, tarefas e commits, checagens, arquivos pendentes, bloqueios e
próximo passo. Na retomada, confirme esse estado com o git antes de continuar.

Entregue resumo do comportamento alterado, arquivos relevantes, governança
consultada/atualizada, testes e resultados, relatório de validação, commits quando
feitos e limitações reais. Não marque a SPEC ou uma fase como concluída enquanto
faltarem requisitos de sua definição de pronto.

## Origem e adaptação

Adaptada de **Tech Lead's Club — Spec-Driven Development**, `tlc-spec-driven`
versão 3.2.0, por [Felipe Rodrigues](https://github.com/felipfr), disponibilizada
sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Fonte consultada: o `SKILL.md` e as referências `tasks.md`, `implement.md` e
`validate.md` da skill fornecida pelo solicitante.

Esta adaptação organiza a execução a partir de um PRD e uma SPEC existentes,
incorpora a governança observada no Vetor, usa caminhos descobertos no projeto e
remove a dependência dos scripts originais. A atomização passa a ser por resultado
coeso, reunindo código, testes e documentos. Autorizações e restrições locais
prevalecem sobre commits e delegações. O sensor é proporcional ao comportamento
executável; entregas documentais usam revisão apropriada.
