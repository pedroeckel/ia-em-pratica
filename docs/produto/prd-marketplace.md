# PRD 01 — IA em Prática

Estado: escopo da primeira versão definido; implementação autorizada no pedido de criação do repositório.
Público: alunos dos cursos de IA de Pedro Eckel e pessoas que aprendem por exemplos.

## Problema e proposta

Uma lista de links não responde se um recurso ajuda na tarefa, funciona no ambiente do aluno ou foi realmente testado. O catálogo deve permitir escolher por objetivo, instalar com instruções claras e obter um primeiro resultado.

## Requisitos e aceite

| ID | Requisito | Critério verificável |
| --- | --- | --- |
| REQ-01 | Descobrir por objetivo, tipo, ferramenta e status | Busca ignora acentos; filtros combinam; estado vazio oferece limpeza; URL preserva seleção |
| REQ-02 | Começar sem conhecer os conceitos | Início distingue skill, MCP e plugin; roteiro leva à instalação e ao exercício; conteúdo em português |
| REQ-03 | Instalar as três skills com previsibilidade | Instalação em Codex/Claude, usuário/projeto, simulação, verificação de integridade e nenhuma sobrescrita silenciosa |
| REQ-04 | Entender o alcance da curadoria | Cada recurso identifica autoria, origem, licença, status, data, ambiente, evidência e limites; terceiros pendentes não recebem selo de teste |
| REQ-05 | Usar pelo navegador e pelo GitHub | Site estático responsivo, páginas por recurso, links compartilháveis, HTML útil sem JS, README e marketplace Claude |
| REQ-06 | Manter e ampliar sem regressão | Esquema e testes no CI; contribuições estruturadas; deploy restrito à main; versão e arquivos distribuídos verificáveis |
| REQ-07 | Reproduzir o aprendizado | Exemplo PRD→SPEC→implementação com testes e relatórios das duas rodadas; limites da prova explícitos |

## Escopo e exclusões

Inclui catálogo público, três skills próprias, candidatos externos identificados, instalador, conteúdo de início, exercícios, contribuição e publicação GitHub Pages. Não inclui pagamentos, contas, ranking por popularidade, promessa de compatibilidade universal ou operação automática de integrações.

## Métricas e decisões

Meta inicial proposta: um aluno chegar ao primeiro exercício em até 10 minutos e localizar um recurso adequado em até 60 segundos. Baseline ainda inexistente; medir por sessão observada com alunos, sem inventar analytics. Contadores de estrelas não são proxy de aprendizagem. O primeiro teste com turma validará esses alvos.

## Evidências e riscos

Aceite técnico: gates locais e CI, navegação desktop/mobile, instalador em diretórios temporários, revisão independente. Uso real por alunos continua não observado. Riscos: versão externa mudar, falso selo de validação, instalação sobrescrever trabalho e dependência desnecessária de infraestrutura. Mitigações no contrato da SPEC.
