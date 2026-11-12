# SPEC 01.1 — Catálogo, distribuição e curadoria

Origem: [PRD 01](../produto/prd-marketplace.md). Estado: planejamento da versão 0.1.0.

## Implementação

Um catálogo JSON é a fonte única para páginas estáticas e índices. Node 22 com módulos ES e `node:test`; nenhuma dependência no site publicado ou no instalador. Ajv e YAML são ferramentas de desenvolvimento para validar contratos e frontmatter. GitHub Pages publica a saída `dist/`. A interface usa HTML semântico, CSS local e JS progressivo; busca não depende de serviço externo.

Direção visual: biblioteca editorial clara, tipografia forte, verde como único destaque e lista de recursos com divisórias. Conteúdo: orientação curta, busca/filtros como superfície principal, percurso de três passos e páginas de detalhes. Interações: foco visível, alteração de filtros com contador acessível e transições discretas respeitando movimento reduzido.

## Contratos de curadoria

Status: `testado` exige versão, data, ambiente, escopo, limites e arquivo de evidência local. `em-avaliacao` declara ausência da prova; `descontinuado` preserva referência e motivo. Revalidação tem validade informada; revisões vencidas ficam visíveis. Compatibilidade distingue teste de execução, instalação e documentação. Ferramenta oficial não recebe automaticamente validação pedagógica.

## Tarefas atômicas

| Tarefa | Resultado | Requisitos | Verificação |
| --- | --- | --- | --- |
| T1 | Skills, catálogo, fontes e evidências públicas com licenças | 02,04,07 | Validador, testes de regras de status e exemplo Python |
| T2 | Instalador e artefatos versionados | 03,06 | Testes em diretórios isolados: sucesso, conflitos, caminhos, integridade e simulação |
| T3 | Site e filtros compartilháveis | 01,02,05 | Testes de busca/estado/escape e smoke em navegador desktop/mobile |
| T4 | CI, contribuição, manutenção e distribuição nativa Claude | 05,06 | Build limpo, validação nativa do manifesto e revisão independente |

Gates: `npm run validate`, `npm test`, `npm run build`, `git diff --check`; regressão do exemplo em seu diretório com `python3 -m unittest discover -s tests -v`. Não executar nem marcar como testadas as integrações externas candidatas. O instalador usa apenas diretórios declarados, valida hashes e recusa links simbólicos; conflitos não alteram destinos existentes.

A publicação ocorre após revisão local, em repositório novo. Nenhum arquivo do Vetor será publicado. O pacote não incluirá tokens, caminhos locais ou dados de cliente. Skill e conteúdo: CC BY 4.0; infraestrutura: MIT; autoria de derivados preservada.

## Execução

- T1: catálogo com três skills próprias, formato extensível a MCP/plugin, origem/licenças e exercício sanitizado. Validador, 10 testes de contrato e regressão do exemplo aprovados. Nenhum terceiro publicado.
- T2: instalador sem dependências de runtime, com escopos, simulação, integridade e conflitos explícitos; ZIPs com checksums. Oito testes do instalador e um de empacotamento aprovados.
- T3: catálogo e guias estáticos, busca/filtros e URLs compartilháveis, HTML sem JS, cópia de comandos e interface responsiva. Seis testes de busca/renderização e smoke de navegador aprovados; publicação ainda pendente.
- T4: workflows fixados a commits oficiais, matriz Linux/Windows, deploy condicionado aos testes, documentação de uso e curadoria, formulários e manifesto Claude validados localmente. Revisão independente e execução do CI remoto ainda pendentes.
