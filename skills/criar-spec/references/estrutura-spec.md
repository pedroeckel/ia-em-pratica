# Estrutura de uma SPEC

Preserve o formato local e combine seções quando a entrega for pequena. Use as
mesmas identidades de requisitos do PRD; critérios locais devem seguir a convenção
existente. Não adicione novos prefixos globais apenas para preencher este modelo.

## Identificação e origem

- ID e título da SPEC; estado documental e data/versão quando usados.
- PRD, requisitos e critérios de aceite de origem.
- Issue, marco, prioridade e branch somente quando identificados; campos ainda
  desconhecidos devem dizer qual vínculo está pendente.
- Fontes normativas e decisões aplicáveis.
- Autorizações de execução existentes e limites de aceite, quando pertinentes.

## Objetivo e problema

Declare o resultado verificável desta entrega, o comportamento atual e o impacto
da diferença. Use exemplos concretos de antes/depois quando ajudarem a entender
o resultado. Não deduza que o comportamento atual é a regra desejada.

## Escopo e exclusões

Descreva o que esta SPEC entrega e as fronteiras com outras SPECs. Registre quais
requisitos ela cobre integral ou parcialmente e quais critérios permanecem com
outra entrega. Uma dependência não significa incorporar o escopo do outro PRD.

## Entradas, saídas e regras

Detalhe apenas o que for relevante:

- origem de dados, grão, chaves, unidades, período e proveniência;
- contratos públicos, estados, compatibilidade e comportamento legado;
- regras de negócio, fórmulas referenciadas e tratamento de entradas inválidas;
- erros observáveis, ausência de dados, recuperação e efeitos persistidos;
- permissões, concorrência e idempotência quando houver estado compartilhado;
- fluxos de interface e resultados em carregamento, vazio, erro e sucesso.

Números de exemplo precisam ter população e contexto. Uma contagem de uma fixture
não vira constante do produto. Ausente, zero, provisório e não verificado são
estados distintos quando o domínio os diferencia.

## Reutilização e abordagem

Liste os componentes, serviços, contratos, testes e dependências existentes que
serão reutilizados. Identifique o que realmente precisa mudar. Coloque alternativas
arquiteturais extensas em desenho separado apenas quando justificadas. Uma nova
dependência requer necessidade concreta e verificação de alternativas já presentes.

## Dependências e bloqueios

| Dependência | Resultado necessário | Como verificar disponibilidade | Efeito se pendente |
| --- | --- | --- | --- |
| SPEC, contrato, dado, ambiente ou decisão | Pré-condição objetiva | Artefato e verificação | Parte bloqueada e trabalho independente possível |

Diferencie pré-condições de execução, de integração, de homologação e de aceite.
Não bloqueie desenvolvimento autorizado por uma pendência que só impeça aceite.

## Critérios de aceite e validação

| Critério | Requisito do PRD | Condição / ação / resultado esperado | Verificação planejada | Evidência esperada |
| --- | --- | --- | --- | --- |
| Identidade local estável | REQ de origem | Resultado preciso | Teste ou revisão adequada | Arquivo, saída, captura ou registro formal |

Cada resultado e caso de erro exigido tem verificação proporcional ao risco. Para
regras executáveis, derive os testes do resultado definido na SPEC. Para entrega
documental, use revisão da rastreabilidade, links e consistência; não crie testes
que apenas procurem o texto que acabou de escrever.

Registre os comandos descobertos no repositório, seu diretório de execução e
as pré-condições de ambiente/dados. Comando ainda desconhecido é uma pendência,
não uma oportunidade de inventar um script. A aprovação futura não é evidência
que já existe.

## Governança e evidências

Liste os documentos que precisam mudar junto da implementação: PRD, matriz de
rastreabilidade, premissas, log, decisões, checklist e cronograma conforme impacto.
Para formulação, inclua explicitamente documento matemático normativo, código e
testes no mesmo conjunto de mudanças. Durante a especificação, registre a proposta
sem substituir a formulação efetiva que o código ainda não implementa.

Defina o resultado técnico esperado e a evidência necessária para aceite externo
separadamente. Não marque evidência planejada como emitida.

## Plano e pendências

Mostre sequência de resultados, sem decomposição artificial por arquivo. Se houver
`*.tasks.md`, cada tarefa deve ter dependências, arquivos previstos, REQs/critérios,
resultado de pronto, testes, comandos e documentos associados. Código, testes e
governança de uma mesma mudança ficam juntos.

Registre alternativas abertas com impacto e critério de decisão. Conclua com a
primeira tarefa desbloqueada e o que falta para as demais, sem executar o código
quando a solicitação se limita a especificar.
