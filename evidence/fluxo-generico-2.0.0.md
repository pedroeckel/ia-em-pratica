# Revisão das skills 2.0.0

Data dos exercícios e da revisão: 16/11/2026. Estado de curadoria: **em avaliação**.

## O que mudou

As três skills preservam definição → plano → execução com conferência. A revisão remove os perfis de um projeto específico e as exigências universais de repositório, caminhos, Git, governança contratual e testes de mutação. Código e verificações técnicas são condicionais à entrega. Os nomes de invocação e as atribuições permanecem.

## Exercícios observados

Um agente separado do autor leu as skills e produziu os [artefatos dos exercícios](../examples/fluxo-generico/README.md), em diretório temporário, sem alterar a implementação ou usar serviços externos:

- Loja: definiu, planejou e produziu um rascunho de guia, mantendo contatos desconhecidos como pendência e distinguindo horário de funcionamento de jornada individual.
- Biblioteca: planejou e produziu materiais de troca de livros com os recursos informados. A autorização do espaço ficou pendente e escolhas de organização foram identificadas como propostas. Não houve convite, reserva ou evento.

A conferência desses materiais foi do próprio agente. A revisão das instruções e do diff foi independente do autor. A loja já era o exemplo das referências; o caso da biblioteca ampliou a variação, sem comprovar generalização universal.

## Problemas encontrados e corrigidos

- O guia ainda instalava a tag anterior sem aviso local. A publicação usa agora v2.0.0 em seus comandos e distingue as evidências históricas das versões 1.x.
- A mudança de vocabulário retirou termos pesquisáveis. Foram incluídas tags de domínios suportados, e as consultas por planilha, guia, software, código, testes e evento foram verificadas novamente.

## Verificação técnica e limites

O catálogo, as referências locais, o YAML, a integridade dos pacotes, o instalador, a busca e o build possuem checagens automatizadas. O processo de publicação executa `npm run check`; esses resultados dizem respeito à distribuição, não à qualidade de toda entrega futura.

Não houve teste com pessoas do público-alvo, execução observada desta revisão em todos os clientes, planilha executada ou implementação de software com as skills 2.0.0. A orientação de planilhas é breve. A instalação ainda requer cliente compatível. Nada disso é apresentado como validado.

O [exercício histórico de software](fluxo-produto.md) pertence às versões 1.x e não transfere seu selo para esta revisão. Os arquivos distribuídos têm fingerprint; gerar novos hashes não é uma nova prova funcional.
