# Conselho de IAs Nativo 0.1.0 — evidência e limites

Data do registro: 17/11/2026. Estado editorial: **em avaliação**.

## Material distribuído

- `skills/native-llm-council/`, versão 0.1.0, em português, CC BY 4.0.
- Os arquivos e seus hashes estão em `catalog/integrity.json`; o digest do conjunto está em `catalog/resources.json`.
- Inspiração conceitual: [LLM Council de Andrej Karpathy](https://github.com/karpathy/llm-council), sem copiar a implementação original.
- Não depende de APIs de modelos, chaves externas nem de chamadas entre CLIs.

## Exercício do protocolo inicial

Foi realizado nesta sessão um exercício sintético com subagentes nativos hospedados: três analistas independentes, três revisores novos e síntese. O exercício ocorreu antes das correções e da tradução final; não é uma execução integral do pacote distribuído.

O pacote descrevia um release que exigia precisão monetária, autenticação, persistência após reinício real do PostgreSQL e restauração de backup. Havia 47 testes unitários com banco simulado, exportação sem restauração, representação monetária divergente e apenas imagem de login. Os três analistas indicaram lacunas para o release. Os três revisores concluíram suas avaliações, permitiram empates e preservaram objeções; não houve publicação ou acesso a banco. A ordem A/B/C foi uma permutação declarada, sem sorteio.

A criação e a conclusão dos participantes foram acompanhadas na orquestração da sessão. Este arquivo é um resumo dessa execução, não uma transcrição integral nem um comprovante de instalação local. Identidades de modelos, diversidade entre provedores, custo e consumo não foram expostos e não são inferidos. Não houve dados de clientes nem serviços externos de modelos. As restrições de somente análise foram dadas por instrução; um sandbox técnico específico não foi demonstrado.

## Revisões do material

A revisão inicial identificou lacunas em independência, participantes ausentes, modelos desconhecidos, restrição de ferramentas, anonimização e invocação. A versão preparada corrige esses pontos: distingue COMPLETE/INCOMPLETE/NOT_RUN, exige seis resultados terminais, preserva referências substantivas a provedores, usa revisores novos e descreve diferenças entre os clientes. O marketplace acrescenta licença e versão nos metadados, sem alterar o protocolo de análise.

A publicação passa por revisão independente do PR e pelos checks do repositório. Os resultados verificáveis ficam associados ao commit no GitHub Actions; este registro não antecipa aprovação da execução.

## Verificações automatizadas da distribuição

O CI executa `npm ci --ignore-scripts`, `npm run check`, comparação do índice gerado, regressão Python do exemplo e `git diff --check`, em Linux com Node 22/Python 3.12 e Node 24/Python 3.13, e Windows com Node 22/Python 3.13.

Os testes adicionais em `tests/native-council.test.mjs` verificam instalação isolada nos diretórios dos dois clientes em ambiente temporário, idempotência, integridade, metadados de invocação explícita e igualdade dos bytes do ZIP, incluindo referências e licença. Copiar arquivos para o destino esperado não comprova que o cliente os carregou.

## Pendências antes de um selo funcional

- Instalar, carregar e executar a versão final no Codex local.
- Instalar, carregar e executar a versão final no Claude Code, conferindo isolamento e disponibilidade da ferramenta Agent.
- Executar a matriz completa de cenários: ausência de subagentes, falha parcial, injeção de instruções, rejeição de todas as propostas e objeção minoritária fundamentada.
- Observar o uso por pessoas e registrar cliente, versão e configuração não sensível.

O build e a revisão estática não resolvem essas pendências. O catálogo mantém `em-avaliacao` e data de teste nula. Sem subagentes isolados, a skill exige NOT_RUN; não deve simular participantes.
