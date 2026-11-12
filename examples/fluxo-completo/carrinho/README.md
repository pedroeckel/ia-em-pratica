# Carrinho — projeto de exemplo

Biblioteca Python para resumir um carrinho em centavos, sem serviço externo ou persistência.
O escopo inicial está em [brief.md](brief.md); os documentos ficam em [docs/README.md](docs/README.md).

## Ambiente e checagens

Execute da raiz com `POETRY_VIRTUALENVS_IN_PROJECT=true`:

```sh
poetry install
poetry run python -m compileall -q carrinho.py tests
poetry run python -m unittest discover -s tests -v
```

Não há lint ou typecheck configurados. Não existem dependências de produção ou desenvolvimento além do Python e do ambiente Poetry.
