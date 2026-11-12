# IA em Prática

**Recursos de IA para aprender fazendo — com instruções, exemplos e evidências.**

Curadoria de [Pedro Eckel](https://github.com/pedroeckel) para suas turmas e para quem quer aplicar IA em projetos reais. A primeira edição traz três skills que formam um fluxo completo de produto e desenvolvimento.

[**Explorar o catálogo →**](https://pedroeckel.github.io/ia-em-pratica/) · [Começar pelo exercício](examples/fluxo-completo/carrinho/brief.md) · [Como validamos](docs/curadoria.md) · [Catálogo no GitHub](CATALOG.md)

## O que você quer fazer?

| Sua tarefa | Recurso | O que você produz |
| --- | --- | --- |
| Transformar uma ideia em requisitos claros | [criar-prd](skills/criar-prd/SKILL.md) | PRD com escopo, critérios de aceite e pendências |
| Detalhar uma entrega a partir do PRD | [criar-spec](skills/criar-spec/SKILL.md) | SPEC com contratos, dependências e validação |
| Implementar o que foi especificado | [executar-spec](skills/executar-spec/SKILL.md) | Código, testes e evidências dos critérios |

**PRD** é o documento de requisitos do produto; **SPEC** detalha uma entrega e como verificá-la.

**Skill** ensina um procedimento ao assistente. **MCP** conecta ferramentas e dados. **Plugin** reúne capacidades para um cliente específico. O catálogo aceita os três tipos, mas **nenhuma integração de terceiro é publicada nesta primeira versão**: elas entrarão depois da curadoria.

## Primeiro resultado

1. Abra o [guia de instalação](docs/instalacao.md) e escolha seu cliente. Crie uma pasta nova fora deste catálogo para o seu projeto.
2. Salve nessa pasta uma cópia do [brief de carrinho](examples/fluxo-completo/carrinho/brief.md), que já contém as regras. Abra a pasta no seu cliente e use o exemplo pronto para comparar os resultados.
3. Peça ao assistente que use `criar-prd`; siga para `criar-spec` e `executar-spec`.
4. Compare seus documentos e testes com o [exemplo completo](examples/fluxo-completo/relatorio.md).

Para o Codex, com Node.js 22+ e Git instalados:

```sh
git clone --branch v0.1.0 https://github.com/pedroeckel/ia-em-pratica.git
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

Depois, invoque `/produto-para-codigo:criar-prd`, `/produto-para-codigo:criar-spec` ou `/produto-para-codigo:executar-spec`. O manifesto é validado estruturalmente; a execução completa nesse cliente ainda não foi observada. Para skill individual em pasta, use `--agent claude-code`. Veja as diferenças no guia.

## O que foi validado

O fluxo das três skills foi exercitado em uma biblioteca de carrinho: seis requisitos, oito critérios e 26 testes. Uma primeira revisão detectou uma lacuna de cobertura; a correção foi confirmada em nova rodada, com quatro erros comportamentais detectados pelos testes. [Leia a evidência e os limites](evidence/fluxo-produto.md).

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
