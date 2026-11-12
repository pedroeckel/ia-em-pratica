# SPEC 01.1 — Catálogo, distribuição e curadoria

Origem: [PRD 01](../produto/prd-marketplace.md). Estado: implementada e aprovada na verificação técnica local da versão 0.1.0; CI e publicação acompanhados pelo [pipeline do GitHub](https://github.com/pedroeckel/ia-em-pratica/actions).

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
- T3: catálogo e guias estáticos, busca/filtros e URLs compartilháveis, HTML sem JS, cópia de comandos e interface responsiva. Oito testes de busca/renderização e smoke de navegador aprovados; publicação condicionada ao CI da main.
- T4: workflows fixados a commits oficiais, matriz Linux/Windows, deploy condicionado aos testes, documentação de uso e curadoria, formulários e manifesto Claude validados localmente. Revisão independente local aprovada. A matriz remota do PR da correção também passou; o deploy é exclusivo da main.

## Correções após revisão independente

A primeira rodada encontrou vencimento não atualizado no detalhe e caminhos temporários em evidências. O detalhe agora recebe o contexto necessário para recalcular a revisão sem depender de novo build. O índice Markdown calcula a mesma regra na data declarada da edição e é explicitamente histórico, com link ao estado atual. As referências restantes de diretórios temporários/cache foram substituídas por marcadores. Revalidação independente concluída com aprovação local; ver [relatório final](../validacao-independente.md).

- Fechamento local: revisão independente aprovada, com 27 testes Node, 26 testes do exemplo e probes de validade/sanitização. CI Linux/Windows e deploy serão registrados após execução real.

## Correção identificada no CI remoto

A [primeira execução da main](https://github.com/pedroeckel/ia-em-pratica/actions/runs/43215735497) reprovou três testes de instalação no Node recente: `fs.cp` com `errorOnExist` recusou a pasta de destino que o instalador acabava de reservar. A cópia final agora usa cada arquivo do inventário com `COPYFILE_EXCL`; mantém a reserva, a proteção de conflitos e a comparação dos hashes. A matriz completa passou no [PR da correção](https://github.com/pedroeckel/ia-em-pratica/actions/runs/43216446337), com Node 22/24 em Linux e Node 22 em Windows, incluindo a regressão Python. Build/deploy foram corretamente omitidos por ser PR. A [revisão independente focal](../validacao-ci-instalador.md) aprovou o delta. A publicação da main é acompanhada no pipeline e na release.
