# Execução, evidências e verificação

## Planejamento verificável

Reutilize `*.design.md`, `*.tasks.md` e a memória operacional existentes. Na ausência
de convenção, mantenha sidecars junto da SPEC. Não crie um segundo catálogo de
requisitos ou decisões quando o projeto já tiver um.

Para cada tarefa, registre:

| Campo | Conteúdo |
| --- | --- |
| Identidade | ID de tarefa no padrão local |
| Resultado | Uma mudança coesa e demonstrável |
| Origem | REQs e critérios da SPEC atendidos |
| Dependências | Resultados necessários antes de iniciar |
| Reutilização | Código, contratos e testes existentes |
| Arquivos | Código, testes e governança previstos |
| Pronto quando | Condição observável e resultado esperado |
| Verificação | Testes/revisões e comandos reais |
| Evidência | Saída, arquivo e localização a registrar |
| Commit | Mensagem conforme o projeto, se autorizado |

Não exija um arquivo por tarefa: um resultado pode precisar de serviço, adaptação
de contrato, teste e documento no mesmo commit. Não encerre uma tarefa com testes
de seu comportamento adiados para outra. Se ela não pode ser verificada sozinha,
reveja sua fronteira ou inclua a integração mínima que a torna verificável.

Se houver fases ou diagrama, confira que as dependências neles coincidem com as
definições textuais e não criam ciclos. Planeje execução sequencial por padrão.

## Matriz de cobertura e comandos

Derive a matriz das instruções de qualidade, dos critérios da SPEC e das camadas
afetadas. Testes existentes informam estilo, localização e infraestrutura; seus
valores esperados não substituem o contrato da SPEC.

| Critério / caso exigido | Resultado definido na SPEC | Camada | Teste ou revisão | Comando / procedimento |
| --- | --- | --- | --- | --- |
| Identidade e condição | Valor, estado ou efeito esperado | Domínio, API, interface, dados ou documento | Verificação adequada | Comando descoberto e diretório |

Para lógica de negócio, cubra resultados e limites especificados; para fronteiras,
entradas válidas, inválidas e falhas exigidas; para persistência, efeitos e
consistência; para interface, fluxos e estados definidos. Evite testes que apenas
espelhem detalhes internos. Alterações documentais ou reversíveis de baixo impacto
podem usar revisão e validação estrutural sem criar uma nova suíte.

Identifique os gates existentes:

| Alcance | Quando executar | Fonte dos comandos |
| --- | --- | --- |
| Barato | Antes de testes custosos, quando aplicável | Formatador, lint e typecheck já configurados |
| Focal | Depois da tarefa que altera comportamento | Testes dos critérios afetados |
| Integração | Quando contratos ou fluxos atravessarem camadas | Testes de integração/e2e pertinentes |
| Conclusão | Encerramento da SPEC | Gates exigidos pelo escopo e CI relevante |

Registre ambiente, dados necessários e estado inicial relevante. Se um comando
não puder rodar, registre o motivo e quais critérios ficam sem comprovação. Não
invente um comando de lint ou teste ausente. Depois de passar no gate, não repita
uma suíte cara sem mudança, falha ou preocupação ainda aberta que justifique.

## Ciclo de uma tarefa

1. Confirme pré-condições, resultado e arquivos previstos.
2. Derive os testes dos critérios antes ou junto da implementação. Um resultado
   indefinido vira lacuna de especificação, não uma asserção vaga.
3. Implemente a menor mudança que cumpre o contrato. Incorpore os documentos
   exigidos pelo impacto no mesmo conjunto de mudanças.
4. Rode as checagens aplicáveis e registre comandos, códigos de saída, contagens
   e skips pertinentes. Diferencie falhas preexistentes comprovadas de novas.
5. Relacione cada critério da tarefa a uma asserção ou evidência verificável.
   Confira se o valor esperado vem da SPEC e se a asserção falharia diante de
   um erro plausível. Conteúdo de payload deve ser conferido, não só contagem
   de chamadas a mocks.
   Para critérios de não mutação, capture antes da chamada um snapshot independente
   dos valores e confira-o após sucesso e erro, além de ordem e referências. Uma
   cópia rasa da lista compartilha os objetos: igualdade entre essas listas não
   comprova que os campos dos objetos permaneceram intactos.
6. Revise o diff de escopo, a governança e a integridade dos testes. Nunca remova
   testes legados só porque não estão associados à nova SPEC. Corrija um teste
   errado apenas quando houver evidência normativa e preserve o histórico da
   justificativa no registro adequado.
7. Se autorizado, faça um commit contendo apenas a tarefa. Evite `git add .` em
   árvore com trabalho preexistente. A mensagem segue a convenção local.
   Sem autorização de commits ou com instrução contrária, deixe alterações
   revisáveis e reporte os commits pendentes.
8. Atualize o estado de execução com resultado, evidência e hash quando houver.

Gate que falhou não permite marcar tarefa como verificada. Se a checagem não
executou, a implementação pode estar pronta, mas a verificação permanece pendente.
Uma falha preexistente não autoriza ignorar a checagem; declare seu impacto no
critério de conclusão vigente.

## Verificação final independente

Despache um Verificador novo quando isso for permitido pelo ambiente. Forneça:

- SPEC normativa, PRD e decisões estritamente necessários aos critérios;
- identificação de arquivos e intervalo de commits ou diff da mudança;
- testes e comandos reais, com pré-condições;
- este procedimento de validação.

O Verificador reconstrói a cobertura sem receber a conclusão ou o raciocínio do
autor. Não altera a implementação nem resolve lacunas. Escreve o relatório e
devolve o veredito, critérios sem prova e lista priorizada de problemas.

Sem subagentes disponíveis ou permitidos, faça uma revisão separada e registre
`independência entre autor e verificador: pendente`. Não rotule uma autorrevisão
como revisão independente. Se a independência for requisito de conclusão do
projeto, a conclusão formal permanece pendente.

Para cada critério:

| Critério | Resultado normativo | Evidência localizada | Resultado observado | Situação |
| --- | --- | --- | --- | --- |
| ID e condição | Valor/estado esperado | Arquivo:linha + asserção, relatório ou artefato identificável | Resultado executado | Atendido, falhou ou não verificado |

Sem evidência localizada e execução pertinente, não declare atendimento. Busque
nos arquivos de teste antes de concluir que uma prova está ausente. Uma função
existente ou um nome de teste não prova o resultado do critério. Para documentos,
registre a referência cruzada e o procedimento de revisão em vez de fabricar uma
asserção de código.

## Sensor de discriminação

Para comportamento executável relevante, confirme que os testes detectam uma
implementação plausivelmente errada. Use profundidade proporcional ao risco:
normalmente uma a três alterações dirigidas aos novos comportamentos críticos.
Para caminhos de alto impacto, aumente a cobertura conforme os riscos e a
infraestrutura disponível, sem instalar ferramentas por padrão.

1. Crie cópia temporária isolada ou worktree descartável do código **efetivamente
   avaliado**. Se houver alterações não commitadas no escopo, inclua-as; testar
   apenas `HEAD` nesse caso avalia a versão errada. Não use stash nem altere a
   árvore real para injetar falhas.
2. Rode o teste focal na cópia sem mutação para confirmar uma baseline válida.
3. Injete um erro comportamental que contrarie um critério: inverter uma condição
   limite, trocar um estado retornado ou suprimir um efeito obrigatório.
4. Rode o teste correspondente no contexto isolado. Confirme que imports e
   comandos apontam para a cópia e não para o checkout original.
5. O teste deve falhar pelo comportamento errado. Erro de sintaxe, importação ou
   ambiente não conta como mutação detectada. Teste que passa indica lacuna.
6. Descarte somente a mutação/cópia criada pelo experimento e registre resultado,
   critério, teste, diff e comando. Preserve qualquer evidência de análise útil.

Não mutile credenciais, dados de cliente ou serviços reais. Se não houver isolamento
seguro, declare o sensor não executado e a limitação. Para entrega apenas
documental ou sem comportamento executável alterado, registre `não aplicável` e
use a revisão documental; não injete erros artificiais só para cumprir ritual.

Mutação sobrevivente gera tarefa de correção da cobertura ou do comportamento.
Confirme a fonte normativa antes de alterar um teste. O relatório precisa dizer
se o sensor passou, falhou, não se aplica ou ficou pendente.

## Relatório persistente e conclusão

Use o local de evidências adotado pelo projeto. Sem padrão, um sidecar
`<nome-da-spec>.validation.md` junto da SPEC evita criar outra árvore. O relatório
contém:

- data, SPEC/PRD, branch/base, intervalo ou diff coberto e identificação do verificador;
- estado das tarefas e distinção entre implementado e verificado;
- matriz de critérios com evidências, resultados e lacunas de precisão;
- comandos, ambiente, códigos de saída, contagens, skips e motivos;
- sensor, baseline e mutações detectadas/sobreviventes quando aplicável;
- documentos normativos revisados/alterados, limites e riscos residuais;
- homologação/UAT quando realizada e aceite externo somente se comprovado;
- veredito técnico: aprovado, reprovado ou parcialmente verificado, e próximos passos.

Corrija falhas dentro do escopo autorizado e reenvie para verificação. Limite o
ciclo a três tentativas por problema persistente; depois, apresente a causa,
evidências e a decisão externa necessária. Não enfraqueça o critério para encerrar.
Novos requisitos seguem planejamento e controle de mudança.

UAT interativa cabe quando julgamento humano for necessário, especialmente em
fluxos de interface. Prepare o resultado revisável antes de solicitar intervenção.
Não presuma homologação por capturas ou testes automatizados.

Uma falha concreta pode gerar lição reutilizável no mecanismo já existente. Não
promova hipótese a regra permanente e não edite arquivos gerados manualmente se
houver um gerador definido. Um resultado sem falhas não exige nova lição.
