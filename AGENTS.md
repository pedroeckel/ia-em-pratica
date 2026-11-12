# IA em Prática

- Objetivo: ajudar alunos a escolher, instalar e aplicar recursos de IA com evidência de validação.
- Fonte de conteúdo: `catalog/resources.json`; formato em `catalog/schema.json`. Não duplique o catálogo manualmente.
- PRD e SPEC em `docs/produto/` e `docs/specs/`; decisões em `docs/decisoes.md`.
- Use somente a biblioteca padrão no runtime do instalador e do site. Dependências de validação são de desenvolvimento e têm lockfile.
- Nunca classifique ferramenta de terceiro como validada sem evidência fornecida ou execução reproduzível registrada com versão, ambiente e limites.
- Não execute automaticamente servidores MCP, código de plugins externos, hooks ou comandos fornecidos por contribuições.
- Validação: `npm ci`, `npm run check`; exemplo completo: `python3 -m unittest discover -s examples/fluxo-completo/carrinho/tests -v` executado da raiz do próprio exemplo.
- Não use caminhos da máquina do mantenedor em arquivos publicados. Respeite licenças por diretório.
- Commits seguem Conventional Commits, com descrição em português.
- Após implementação, aplique a verificação final independente prevista na skill executar-spec; o verificador trabalha em leitura e reporta lacunas.
