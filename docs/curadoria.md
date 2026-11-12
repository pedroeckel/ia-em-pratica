# Como um recurso entra no catálogo

## Critério de publicação

O mantenedor publica uma recomendação quando existe um caso de uso, uma fonte oficial e evidência proporcional. Popularidade ou origem oficial não substituem um teste. Na primeira edição não há recursos de terceiros publicados, conforme a decisão do mantenedor.

## Registro mínimo

O arquivo `catalog/resources.json` é a fonte única. O esquema em `catalog/schema.json` aceita skills, MCPs e plugins. Para cada recurso registre: identificador estável, problema resolvido, resultado esperado, autoria/fornecedor, licença, fonte HTTPS, nível, objetivos, clientes e diferenças de compatibilidade.

A validação registra status, data, versão/ref testada, ambiente, escopo, limitações, evidência local e janela de revisão. Para skills distribuídas aqui, `contentSha256` vincula todos os arquivos ao material testado; mudança de conteúdo sem atualização da evidência falha no gate. Para recursos externos referenciados, não há instalador nem fingerprint de conteúdo distribuído: registre a versão/ref imutável do fornecedor e a configuração redigida usada no teste dentro da evidência. `contentSha256` fica `null`. Uma versão móvel como “latest” não identifica um experimento reproduzível.

## Estados

- `testado`: evidência registrada para a versão e o escopo declarados. O selo da interface é “Testado em exemplo”, com o contexto à vista.
- `em-avaliacao`: proposta sem recomendação concluída. Não herda evidência de outro recurso.
- `descontinuado`: preservar ID, origem, motivo e alternativa quando houver.
- “Revisão pendente”: estado calculado quando vence `reviewAfterDays`; a data histórica não é renovada por um build.

Datas, schema e existência da evidência são verificações automatizadas. A veracidade e a suficiência da evidência exigem revisão humana do mantenedor. Alterar hashes não cria, por si só, uma validação funcional.

## Passo a passo para terceiros

1. Abra uma sugestão com tarefa real da turma e link oficial.
2. Identifique versão/ref, cliente, sistema, requisitos, custo/plano quando pertinente e permissões de acesso.
3. Leia origem, licença, instruções e efeitos antes de executar. Use conta e dados de teste; não publique tokens nem informações de alunos.
4. Instale pelo fornecedor e execute uma tarefa mínima, um erro relevante e a remoção quando aplicável. Não aprove um MCP apenas porque o processo iniciou: confira uma resposta útil.
5. Registre a evidência em `evidence/` com versão, configuração sem segredos, comandos, resultado, restrições e quem revisou.
6. Proponha a entrada no catálogo e faça `npm run check`. A revisão do mantenedor decide o estado publicado.

A infraestrutura não executa automaticamente servidores MCP, instaladores ou hooks externos durante o build/CI. Manifests Claude são específicos desse cliente. Plugins de ChatGPT/Codex gerenciados precisam do empacotamento e publicação oficiais da plataforma; não são anunciados como instaláveis por um arquivo Claude.

## Manutenção e retirada

Reveja entradas após mudança de versão, quebra de instrução, fim da licença aplicável ou relato fundamentado. Registre resultado, preserve o histórico e informe o substituto quando existir. Antes de uma aula, confira a edição usada e fixe a versão dos materiais. Não reescreva um teste reprovado como aprovado; registre correção e nova rodada.

## Superfícies com relógios diferentes

O site recalcula a revisão ao abrir tanto o catálogo quanto os detalhes, sem depender de um novo deploy. O índice Markdown é um instantâneo versionado: declara a data de referência da edição e calcula a situação nessa data, preservando a data do teste. Para o estado atual, aponta ao site. Isso mantém o índice reproduzível e não o apresenta como um relógio ativo no GitHub. Um novo release usa a data da nova edição e recalcula o instantâneo.
