# Validação das skills PRD → SPEC → implementação

Data: 2026-11-12. Estado: aprovado no cenário testado, após correção e segunda verificação independente.

## Cenário e isolamento

Exercício fictício de uma biblioteca de carrinho em memória. O [brief](carrinho/brief.md) foi criado antes do PRD e define a fonte dos resultados esperados. O repositório de exemplo está separado do Vetor, sem remoto ou serviços externos.

Para testar a portabilidade, o exemplo usa `docs/produto/`, `docs/entregas/` e os IDs `CAR-REQ`/`CAR-AC`, conforme suas próprias instruções. Não requer fases, cliente, identificadores, Linear ou memória operacional do Vetor.

As etapas de autoria foram executadas pelo agente principal a partir dos arquivos instalados das três skills. Um agente novo, sem histórico da autoria, foi acionado para a verificação final prevista em `executar-spec`. Isso é um exercício funcional das instruções, não uma prova de descoberta automática das skills na interface.

## Artefatos

- [PRD](carrinho/docs/produto/prd-carrinho.md): seis requisitos, oito critérios e distinção entre resultado técnico e aceite externo.
- [SPEC](carrinho/docs/entregas/spec-carrinho.md): contratos, cobertura integral do PRD, exemplos precisos e duas tarefas.
- [Código](carrinho/carrinho.py): subtotal, validação, desconto, frete e resumo em centavos inteiros.
- [Governança](carrinho/docs/governanca.md): rastreabilidade e evolução do estado.
- [Demonstração](evidencias/demonstracao.json): subtotal 5.630, desconto 563, frete 1.000 e total 6.067 centavos.

## Validação executada

- `poetry install`: ambiente local sem dependências adicionais.
- Ambiente de execução: Python 3.13.0 dentro do Poetry 2.2.1. O Python externo é 3.14.2 e não foi confundido com o ambiente dos testes no registro final.
- `poetry run python -m compileall -q carrinho.py tests`: aprovado.
- `poetry run python -m unittest discover -s tests -v`: 26 testes aprovados, zero falhas e zero skips na primeira implementação.
- `git diff --check`: aprovado.
- Três skills aprovadas pelo `quick_validate.py`; referências locais dos documentos do exemplo verificadas.
- Não há lint ou typecheck configurado no exemplo; nenhum comando inexistente foi simulado.
- A descoberta inicial sem testes retornou código 5; esse resultado foi registrado como ausência de suíte, sem declarar sucesso. As fases RED de T1/T2 registram a ausência inicial das funções públicas antes da implementação.

Logs: [T1 RED](evidencias/t1-red.txt), [T1 GREEN](evidencias/t1-green.txt), [T2 RED](evidencias/t2-red.txt), [T2 GREEN](evidencias/t2-green.txt).

## Achado, correção e confirmação

Um sensor adicional do autor alterou o preço do primeiro item após calcular o subtotal, preservando o total retornado. O erro sobreviveu aos 26 testes originais: os testes de integridade copiavam a lista superficialmente, compartilhando os objetos usados na comparação. A implementação real não apresentava essa alteração; a falha estava na capacidade dos testes de detectar a regressão de `CAR-AC-08`.

Uma correção foi comprovada em cópia isolada: registrar os valores inteiros antes da chamada e compará-los depois, além de ordem e identidade. A baseline permaneceu verde e a mesma mutação passou a causar `AssertionError`. Evidências: [sensor original](evidencias/sensor-integridade-autor.json) e [sensor com correção](evidencias/sensor-integridade-corrigido-autor.json).

A revisão independente encontrou a mesma lacuna sem ler os resultados do autor e reprovou a primeira rodada. Seu [relatório original](carrinho/docs/entregas/spec-carrinho.validation.rodada-1.md) está preservado. Os três outros erros comportamentais introduzidos pelo verificador foram detectados: truncamento do desconto, limite inclusivo incorreto e frete calculado sobre o subtotal anterior ao desconto.

T3 aplicou a correção de cobertura no commit `ac28fc8`, com os 26 testes ainda verdes. A orientação condicional de snapshots independentes foi incorporada à referência de execução da skill `executar-spec`, agora na versão 1.0.1; os metadados e a referência foram os únicos arquivos de skills alterados. `criar-prd` e `criar-spec` não precisaram de ajuste. Uma frase desatualizada sobre o estado dos testes na SPEC também foi corrigida; nenhuma regra de negócio ou linha da implementação mudou.

A [segunda revisão independente](carrinho/docs/entregas/spec-carrinho.validation.md) aprovou todos os oito critérios sobre `0997014..4cd0cd5`. A baseline teve 26 testes aprovados, zero falhas/erros/skips e as quatro mutações foram detectadas, respectivamente com 4/2/1/4 falhas comportamentais. Nenhuma sobreviveu. Imports do módulo e dos testes foram confirmados da cópia isolada; erros de ambiente não foram contabilizados como detecção.

O fechamento documental foi registrado posteriormente no commit `e35ebe3`, sem alterar código ou testes. A primeira reprovação continua preservada e não foi reinterpretada como aprovação.

## Limites

Um exemplo pequeno exercita um fluxo completo com regras e critérios observáveis. Não prova cobertura universal de outras stacks, integrações externas, persistência concorrente, grandes planos ou governança contratual real. Seleção automática das skills na interface não foi testada. Nenhum aceite comercial é aplicável ou simulado.

## Rastreabilidade e isolamento

A branch do PRD é `feat/prd-carrinho`; a branch `feat/spec-carrinho` deriva dela. T1 e T2 têm commits locais separados, seguidos por T3 de correção da cobertura e registro da primeira revisão. O repositório não possui remoto.

Documentos locais consultados: brief, AGENTS, README, índice e controle documental. Documentos atualizados: PRD, SPEC, índice e controle, além dos relatórios de validação. Não foram aplicadas regras contratuais do Vetor ao exemplo.

A [conferência de isolamento](evidencias/isolamento-e-skills.json) compara hashes do estado/diff do Vetor antes e depois do exercício e confirma que permaneceram inalterados. O projeto real não foi modificado.

## Resultado por skill

| Skill | Resultado observado | Ajuste decorrente |
| --- | --- | --- |
| criar-prd | Criou PRD com fonte, seis requisitos, oito critérios, escopo e exclusões, no caminho do projeto de exemplo | Nenhum |
| criar-spec | Derivou uma SPEC coesa, vinculando todos os requisitos, contratos, exemplos e comandos reais | Nenhum |
| executar-spec | Implementou em duas tarefas, executou gates, acionou verificação independente, tratou falha e concluiu após nova rodada | Orientação de snapshots independentes em critérios de não mutação; versão 1.0.1 |

## Reproduzir

No diretório `carrinho`, execute:

```sh
POETRY_VIRTUALENVS_IN_PROJECT=true poetry install
poetry run python -m compileall -q carrinho.py tests
poetry run python -m unittest discover -s tests -v
```

O [histórico textual](historico.txt) registra a sequência de commits. O repositório Git completo e o ambiente estão no diretório local do exemplo. O pacote ZIP contém fontes, documentos e evidências, excluindo `.git`, `.venv` e caches; não é necessário depender do ambiente do Vetor para executá-lo.
