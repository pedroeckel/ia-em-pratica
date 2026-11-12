# Instalar e usar

## Qual cliente você usa?

| Cliente | Skill pessoal | Skill no projeto | Invocação |
| --- | --- | --- | --- |
| Codex local | `~/.agents/skills/nome/` | `<projeto>/.agents/skills/nome/` | `$nome` ou seleção de skills |
| Claude Code local | `~/.claude/skills/nome/` | `<projeto>/.claude/skills/nome/` | `/nome` |
| Claude Code via plugin | Gerenciado pelo marketplace Claude | Conforme escopo do cliente | `/produto-para-codigo:nome` |

Esses destinos são locais; não significam instalação em ChatGPT na nuvem ou em outro cliente. Plugins de plataformas diferentes não usam automaticamente o mesmo manifesto. [Skills no Codex](https://developers.openai.com/codex/skills/) · [Skills no Claude Code](https://code.claude.com/docs/en/skills) · [Marketplace Claude](https://code.claude.com/docs/en/plugin-marketplaces).

## Instalador local

Requisitos: Git e Node.js 22 ou superior. Baixe a versão da aula e entre na pasta:

```sh
git clone --branch v0.1.0 https://github.com/pedroeckel/ia-em-pratica.git
cd ia-em-pratica
node scripts/install.mjs --skill all --agent codex --scope user --dry-run
node scripts/install.mjs --skill all --agent codex --scope user
```

Não é necessário executar `npm install` para usar esse instalador. Suas operações usam apenas o Node. Ele não instala MCPs, não pede tokens, não modifica configurações de clientes e não executa scripts das skills.

Para Claude Code, troque `--agent codex` por `--agent claude-code`. Para instalar uma única skill, substitua `all` por `criar-prd`, `criar-spec` ou `executar-spec`.

Para limitar ao projeto, execute da pasta do catálogo e indique um diretório já existente:

```sh
node scripts/install.mjs --skill criar-prd --agent codex --scope project --project /caminho/do/projeto --dry-run
node scripts/install.mjs --skill criar-prd --agent codex --scope project --project /caminho/do/projeto
```

No PowerShell, use por exemplo `--project "C:\Projetos\meu-projeto"`. No macOS, aliases do diretório temporário são resolvidos para a pasta real; um link simbólico dentro da árvore de destino continua sendo recusado.

## Instalação manual, sem Node

1. No [catálogo](https://pedroeckel.github.io/ia-em-pratica/), abra a skill e baixe seu ZIP.
2. Extraia o arquivo. Você terá uma pasta como `criar-prd`, contendo `SKILL.md`, referências e licença.
3. Copie **essa pasta inteira** para o destino do cliente na tabela acima. Não coloque duas pastas de mesmo nome aninhadas.
4. Preserve uma versão anterior antes de substituir; o processo manual não possui a proteção de conflito do instalador.
5. Confira o resultado na lista de skills do cliente. Se não aparecer, confira o caminho e reinicie/recarregue as skills conforme o cliente.

No Windows, `~` significa sua pasta de usuário, normalmente acessível por `%USERPROFILE%` no Explorer. No Codex, a estrutura de projeto é `.agents/skills`, não a pasta deste catálogo chamada `skills`.

## Conferir um download

Os arquivos distribuídos têm `SHA256SUMS` no mesmo local. Para conferir um ZIP:

```sh
shasum -a 256 criar-prd.zip
```

No PowerShell: `Get-FileHash .\criar-prd.zip -Algorithm SHA256`. Compare com o hash publicado junto do arquivo. O hash verifica correspondência de bytes; não é uma avaliação de qualidade do recurso.

## Atualizar, remover e resolver conflitos

- Reinstalar a edição idêntica não altera os arquivos.
- Uma pasta diferente já existente é um conflito explícito; nenhuma edição do aluno é sobrescrita. Preserve/renomeie essa pasta antes de instalar a nova versão.
- Para remover, exclua somente a pasta da skill instalada, depois de preservar mudanças suas. No plugin Claude, use o gerenciamento de plugins do cliente.
- Se uma skill aparecer duplicada, confira instalações em diferentes escopos e diretórios legados. O instalador não apaga cópias que não criou.
- Use `--dry-run` para ver o destino. Links simbólicos em `.agents`, `.claude` ou no destino da skill são recusados para evitar escrever em outro local sem perceber.

## Primeiro pedido

No Codex: `Use $criar-prd para definir um PRD de uma biblioteca de carrinho de compras.`
No Claude Code com pasta individual: `/criar-prd Defina um PRD de uma biblioteca de carrinho de compras.`
No Claude Code com o plugin: `/produto-para-codigo:criar-prd Defina um PRD de uma biblioteca de carrinho de compras.`

Continue com o [exercício completo](../examples/fluxo-completo/relatorio.md). As regras do seu repositório e as permissões reais do cliente continuam valendo.
