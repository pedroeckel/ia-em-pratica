# IA em Prática

**Recursos de IA para aprender fazendo — com instruções, exemplos e evidências.**

Curadoria de [Pedro Eckel](https://github.com/pedroeckel) para suas turmas e para quem quer aplicar IA em projetos reais. Três skills organizam o fluxo de definição, planejamento e execução. Uma quarta, opcional, compara decisões com subagentes nativos.

> Edição 2.1.0: inclui o Conselho de IAs Nativo 0.1.0, opcional e somente para análise. As skills permanecem em avaliação; ainda não houve teste com pessoas do público-alvo.

[**Explorar o catálogo →**](https://pedroeckel.github.io/ia-em-pratica/) · [Começar pelos exemplos](examples/fluxo-generico/README.md) · [Como validamos](docs/curadoria.md) · [Catálogo no GitHub](CATALOG.md)

## O que você quer fazer?

| Sua tarefa | Recurso | O que você produz |
| --- | --- | --- |
| Organizar uma ideia | [criar-prd](skills/criar-prd/SKILL.md) | O que entregar, para quem e como conferir |
| Planejar como produzir a entrega | [criar-spec](skills/criar-spec/SKILL.md) | Passos, materiais, regras e checagens |
| Produzir e conferir o trabalho | [executar-spec](skills/executar-spec/SKILL.md) | Documento, planilha, material, processo ou software, conforme o pedido |
| Comparar decisões com agentes independentes | [native-llm-council](skills/native-llm-council/SKILL.md) | Três propostas, três revisões novas e síntese com divergências |

**PRD** é o documento de requisitos do produto; **SPEC** detalha uma entrega e como verificá-la.

**Skill** ensina um procedimento ao assistente. **MCP** conecta ferramentas e dados. **Plugin** reúne capacidades para um cliente específico. O catálogo aceita os três tipos, mas **nenhuma integração de terceiro é publicada nesta primeira versão**: elas entrarão depois da curadoria.

## Primeiro resultado

1. Instale as skills seguindo o [guia](docs/instalacao.md), ou use as que já estiverem disponíveis no seu cliente.
2. Conte uma necessidade: `Use $criar-prd para me ajudar a criar um guia de boas-vindas para os novos funcionários da minha loja. Não sei programar.`
3. Continue na mesma conversa: `Use $criar-spec para detalhar o que combinamos em um plano.`
4. Peça: `Use $executar-spec para produzir o material com os dados que forneci e sinalizar o que faltar.`

Você pode começar de uma ideia, um plano já existente ou uma conversa anterior. Não precisa criar pastas nem conhecer as siglas. As skills orientam a IA; a instalação ainda depende de um cliente compatível. Não são um aplicativo independente.

Para o Codex, com Node.js 22+ e Git instalados:

```sh
git clone --branch v2.1.0 https://github.com/pedroeckel/ia-em-pratica.git
cd ia-em-pratica
node scripts/install.mjs --skill all --agent codex --scope user --dry-run
node scripts/install.mjs --skill all --agent codex --scope user
```

O instalador confere os hashes e informa o destino. Uma versão diferente existente não é sobrescrita. Se você não usa terminal, o [catálogo](https://pedroeckel.github.io/ia-em-pratica/) oferece ZIP por skill e o guia explica a cópia manual.

### Uso Claude Code

No Claude Code, você também pode instalar o pacote nativo:

```text
/plugin marketplace add pedroeckel/ia-em-pratica
/plugin install produto-para-codigo@ia-em-pratica
```

Depois, invoque `/produto-para-codigo:criar-prd`, `/produto-para-codigo:criar-spec`, `/produto-para-codigo:executar-spec` ou `/produto-para-codigo:native-llm-council`. O manifesto é validado estruturalmente; a execução completa nesse cliente ainda não foi observada. Para skill individual em pasta, use `--agent claude-code`. Veja as diferenças no guia.

## Conselho de IAs Nativo

Peça explicitamente: `Use $native-llm-council para comparar as alternativas desta decisão usando somente as evidências fornecidas.` A skill usa subagentes do cliente atual, sem API externa de modelo nem alternância automática entre Codex e Claude. Requer sessões independentes; se não estiverem disponíveis, informa `NOT_RUN`.

O conselho faz somente análise. Não implementa nem publica suas recomendações. O protocolo inicial foi exercitado com seis subagentes hospedados; a distribuição 0.1.0 e o Claude Code continuam em avaliação. [Evidência e limites](evidence/native-llm-council-0.1.0.md).

## O que foi validado

A evidência histórica abaixo se refere às versões 1.x. A revisão 2.0.0 permanece em avaliação. Dois [exercícios de agente fora de tecnologia](examples/fluxo-generico/README.md) e uma [revisão independente](evidence/fluxo-generico-2.0.0.md) foram registrados; isso não substitui teste com usuários.

O fluxo anterior foi exercitado em uma biblioteca de carrinho: seis requisitos, oito critérios e 26 testes. Uma primeira revisão detectou uma lacuna de cobertura; a correção foi confirmada em nova rodada, com quatro erros comportamentais detectados pelos testes. [Leia a evidência e os limites](evidence/fluxo-produto.md).

“Testado em exemplo” não significa uso comprovado em turma, auditoria de segurança ou compatibilidade universal. O catálogo distingue cliente testado de instrução apenas documentada e mostra quando a revisão fica pendente. Ainda não medimos adoção por alunos.

## Para professores e contribuidores

- [Roteiro de aula e coleta de feedback](docs/plano-de-aula.md).
- [Como sugerir e validar recursos](CONTRIBUTING.md).
- [Relatar uma dificuldade](https://github.com/pedroeckel/ia-em-pratica/issues/new/choose).
- [Decisões de produto e tecnologia](docs/decisoes.md).

Cada recurso tem fonte, licença, versão, escopo e limite de validação. Recursos de outras empresas permanecem ligados ao fornecedor, com atribuição preservada; o catálogo não executa seus servidores ou plugins automaticamente.

## Desenvolver o catálogo

```sh
npm ci --ignore-scripts
npm run check
npm run preview
```

Abra `http://127.0.0.1:4173`. A fonte única é `catalog/resources.json`; o build gera o site, os ZIPs e o `CATALOG.md`. Node 22+; o exercício adicional requer Python 3.12+. Não há backend, banco, login, rastreamento ou dependências de runtime no site/instalador. As poucas dependências de desenvolvimento têm versões fixadas.

## Licenças

Infraestrutura e código: [MIT](LICENSE). Skills e conteúdo editorial: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). A `executar-spec` deriva da `tlc-spec-driven` de Felipe Rodrigues; a atribuição permanece no pacote. Veja [autoria e licenças](THIRD_PARTY_NOTICES.md).
