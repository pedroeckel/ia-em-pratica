# Evidência — fluxo de produto

Data: 2026-11-12. Estado: testado em exemplo técnico, não observado em turma.

As instruções das três skills foram aplicadas ao [exemplo completo](../examples/fluxo-completo/relatorio.md), da criação do PRD à implementação. A prova não é um teste de ativação automática de skill na interface. As duas primeiras skills publicadas recebem somente metadados de versão/autoria/licença, preservando integralmente as instruções exercitadas. A executar-spec mantém a versão 1.0.1 já avaliada.

- Ambiente do exemplo: Python 3.13.0, Poetry 2.2.1.
- Cobertura: seis requisitos e oito critérios.
- Resultado final: 26 testes, zero falhas/erros/skips.
- Sensor final: quatro mutações detectadas, nenhuma sobrevivente.
- Revisão: verificador separado do autor.
- Primeira rodada reprovada por cópia rasa na prova de não mutação; testes reforçados e segunda rodada aprovada. A reprovação permanece no histórico.

Fontes, exemplos e limites estão nos [relatórios](../examples/fluxo-completo/carrinho/docs/README.md). Os logs foram preparados para publicação substituindo caminhos absolutos da máquina por marcadores descritivos; o conteúdo do código e dos testes foi preservado. Não são arquivos brutos da máquina do mantenedor.

O exercício não testa contas externas, dados de alunos, Claude Code em execução completa, serviços MCP, plugins de terceiros, segurança exaustiva ou uso pedagógico real. As candidaturas externas não herdam esta evidência.
