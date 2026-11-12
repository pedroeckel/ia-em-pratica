# Convenções do Carrinho

- PRDs ficam em `docs/produto/`; SPECs em `docs/entregas/`.
- O índice é `docs/README.md`; o controle documental fica em `docs/governanca.md`.
- Use `PRD-CAR-01`, `SPEC-CAR-01`, `CAR-REQ-nn` e `CAR-AC-nn` no primeiro incremento.
- Branch do PRD: `feat/prd-carrinho`; branch da SPEC: `feat/spec-carrinho`, derivada da branch do PRD.
- Código e testes devem usar somente a biblioteca padrão do Python.
- Use Poetry com ambiente `.venv` dentro deste projeto.
- Checagens: `poetry run python -m compileall -q carrinho.py tests`; depois `poetry run python -m unittest discover -s tests -v`.
- Cada tarefa implementada e verificada recebe um commit local Conventional Commits, com descrição em português.
- Este repositório não tem remoto, provedor de issues, marcos contratuais ou aprovador comercial.
