# Adaptações dos ambientes nativos

Ler somente a seção correspondente ao ambiente atual. Identificar a ferramenta nativa no catálogo disponível, sem presumir nomes fixos de ferramentas ou versões.

## Codex

Usar as ferramentas nativas de criação, espera e mensagens efetivamente disponíveis. Quando houver uma opção de contexto mínimo ou conversa nova, usá-la para cada analista e revisor. Em ferramentas com a opção fork_turns, selecionar none e incluir o pacote completo na mensagem da tarefa.

Respeitar os padrões configurados de modelo e raciocínio. Não presumir que sejam iguais aos do coordenador sem verificação. Não interpretar a possibilidade de escolher modelos como autorização para acessar outro provedor. Não alterar config.toml, instalar definições de agentes nem conceder permissões durante o conselho.

Associar os IDs retornados a resultados terminais reais; a criação da tarefa não comprova sua conclusão. Encerrar as sessões concluídas quando houver suporte e isso for necessário para liberar capacidade. Manter os metadados da execução separados do conteúdo anonimizado das alternativas. Aguardar a conclusão sem consultas repetidas em intervalos curtos. Se não houver um mecanismo nativo de isolamento compatível, retornar NOT_RUN. Se a concorrência for limitada, executar novas sessões sequencialmente, sem reutilizar participantes.

## Claude Code

Executar o conselho na conversa principal. Usar a ferramenta Agent nativa e um agente general-purpose disponível, ou outro tipo com permissões equivalentes, para cada tarefa. Selecionar um tipo permitido quando o ambiente exigir; não inventar nomes de ferramentas, tipos de agentes ou identificadores de modelos.

Fornecer o pacote comum explicitamente. Conferir o contexto inicial conhecido, incluindo instruções do projeto, definições de agentes e memória persistente, e impedir a entrada de respostas anteriores ou resultados preferidos, respeitando instruções superiores. Se a versão instalada inserir todo o histórico da conversa principal sem permitir isolamento, retornar NOT_RUN para o protocolo estritamente independente, em vez de afirmar que a revisão foi cega.

Não configurar context: fork para o coordenador de uma forma que impeça a delegação. Não habilitar equipes de agentes, delegação aninhada, hooks, memória persistente de agentes ou bypassPermissions. Todos os subagentes devem retornar diretamente ao coordenador e não podem criar outros subagentes.

Restrições de ferramentas escritas no prompt são instruções comportamentais, não comprovação de isolamento técnico. Aplicar restrições técnicas de somente leitura quando disponíveis e declarar quando o isolamento depender apenas de instruções. Não afirmar que a skill amplia permissões do ambiente.

## Ausência do ambiente e interrupções

Se não houver subagentes disponíveis, não simular um diálogo entre várias pessoas usando um único modelo. Oferecer uma alternativa de agente único identificada dessa forma.

Em uma interrupção, informar os resultados recebidos e as etapas ausentes; não repetir chamadas cobradas ou tarefas de subagentes antes de consultar seu estado registrado. Um comprovante textual ajuda no diagnóstico, mas não garante execução única nem recuperação durável após falhas.

## Referências oficiais

- Subagentes do Codex: https://learn.chatgpt.com/docs/agent-configuration/subagents
- Subagentes do Claude Code: https://code.claude.com/docs/en/sub-agents
- Skills do Claude Code: https://code.claude.com/docs/en/skills

## Como acionar

No Codex, usar `$native-llm-council`; no Claude Code com instalação individual, usar `/native-llm-council`; pelo marketplace IA em Prática, usar `/produto-para-codigo:native-llm-council`. Um pedido explícito em linguagem natural também indica a intenção do usuário, mas seu efeito sobre o carregamento da skill depende da configuração do ambiente. Os metadados OpenAI desabilitam o carregamento implícito no Codex. O SKILL.md portátil, com dois campos, não desabilita o carregamento no Claude Code; suas instruções proíbem a delegação sem um pedido explícito de conselho. Uma variante específica do Claude com `disable-model-invocation: true` exige validação separada e não faz parte desta versão portátil.
