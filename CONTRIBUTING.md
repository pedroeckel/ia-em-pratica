# Contribuir

Comece pela necessidade de um aluno: que tarefa fica mais fácil com este recurso?

- Para sugerir uma ferramenta, use o formulário “Sugerir recurso”.
- Para erro de instalação ou uso, use “Relatar dificuldade”.
- Para contar uma aplicação, use “Compartilhar experiência”.

As [issues](https://github.com/pedroeckel/ia-em-pratica/issues/new/choose) não exigem adicionar código. Não inclua tokens, dados pessoais ou arquivos de clientes.

## Alterar o catálogo

1. Crie um fork/branch; use o [procedimento de curadoria](docs/curadoria.md).
2. Use [o modelo de recurso](templates/resource-terceiro.json) e [o modelo de evidência](templates/evidence.md) quando úteis. Edite `catalog/resources.json`, incluindo fonte, licença, clientes e evidência local quando houver teste. O JSON é a fonte única; não edite `CATALOG.md` à mão.
3. Para uma skill nova, siga o [padrão Agent Skills](https://agentskills.io/specification), preserve atribuições e declare uma versão. Se conteúdo testado mudou, execute/reveja os testes e a evidência antes de atualizar seu fingerprint.
4. Use `npm run integrity` para gerar o manifesto somente após essa revisão; o comando não concede aprovação.
5. Execute `npm ci --ignore-scripts`, `npm run check` e confira a prévia com `npm run preview`.
6. No PR, descreva o caso de uso e o que foi realmente testado. O mantenedor aprova os recursos de terceiros antes de publicação.

A automação valida estrutura e consistência, não a veracidade de uma alegação de sucesso. Não execute código de fornecedores dentro de workflows para ganhar um selo.

## Testes do exemplo

```sh
cd examples/fluxo-completo/carrinho
python3 -m unittest discover -s tests -v
```

## Produto e experiência

Preserve HTML útil sem JavaScript, navegação por teclado, estados vazios recuperáveis, legibilidade em 375 px e ausência de rolagem horizontal. Links e cópia de comandos precisam de nomes claros. Testes devem verificar resultados e invariantes; snapshots de não mutação precisam ser independentes dos objetos originais.

Use commits Conventional Commits com descrição em português. Mantenha mudanças pequenas e não inclua arquivos de ambiente, credenciais, dados operacionais ou caminhos particulares.
