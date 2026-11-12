# Estrutura de um PRD

Use o formato já adotado pelo projeto. Esta estrutura é uma referência para
preencher lacunas, não uma exigência de criar seções vazias.

## Conteúdo

1. **Identificação:** ID, título, versão ou data, estado documental, responsável,
   fontes, fase e marco quando existirem. Registre separadamente a situação da
   autorização de implementação e do aceite externo.
2. **Problema e contexto:** evidência do problema, situação atual, consequência e
   limites das fontes. Separe diagnóstico comprovado de hipótese.
3. **Usuários e áreas atendidas:** pessoas que usam, operam ou validam a entrega;
   suas decisões e jornadas principais.
4. **Objetivos de negócio:** mudanças observáveis esperadas; prioridade e critério
   para avaliar o resultado.
5. **Escopo e não escopo:** capacidades incluídas, exclusões, interfaces com outros
   PRDs e o que permanece como evolução proposta.
6. **Requisitos funcionais:** IDs estáveis, comportamento observável, origem e
   prioridade. Evite juntar resultados independentes no mesmo requisito.
7. **Dados:** fontes, grão, chaves, qualidade mínima, disponibilidade, proveniência
   e limitações. Em análises, explicite população, denominador, unidade e período.
8. **Restrições técnicas e integração:** contratos existentes, compatibilidade,
   autenticação, desempenho ou acessibilidade quando relevantes ao problema.
   Separe uma restrição conhecida de uma solução técnica ainda sugerida.
9. **Regras e premissas:** condições que sustentam a proposta, como validar e o
   impacto se forem falsas.
10. **Métricas de sucesso:** definição, baseline com fonte, meta ou proposta de
    meta, janela, forma de medição e responsável conhecido.
11. **Dependências e riscos:** origem do bloqueio, impacto, mitigação e responsável
    pela resolução quando identificado.
12. **Entregas e sequência:** resultados demonstráveis, dependências e marcos;
    diferencie estimativa técnica de compromisso aprovado.
13. **Evidências e aceite:** critérios verificáveis, evidência esperada e autoridade
    de validação. Não atribua um ID de evidência realizada a algo ainda planejado.
14. **Pendências e referências:** decisões abertas com alternativas e impactos,
    fontes versionadas e próximos passos.

## Tabelas úteis

Adapte os nomes e IDs ao projeto. A ausência de informação deve aparecer como
pendência explícita, sem valores inventados.

| Requisito | Resultado observável | Fonte | Prioridade | Critério de aceite |
| --- | --- | --- | --- | --- |
| ID existente ou alocado | O que o usuário/sistema passa a conseguir fazer | Documento ou decisão | Prioridade justificada | Resultado verificável |

| Critério | Requisitos cobertos | Condição e resultado esperado | Evidência esperada | Aprovador / pendência |
| --- | --- | --- | --- | --- |
| Identidade local do critério | REQs | Dado um contexto, ao executar uma ação, ocorre um resultado | Teste, demonstração, documento ou aceite escrito | Autoridade identificada ou definição pendente |

| Métrica | Definição e unidade | Baseline e fonte | Meta e estado | Janela / medição |
| --- | --- | --- | --- | --- |
| Métrica relevante ao objetivo | Fórmula e população quando aplicáveis | Conhecido ou a medir | Acordada ou proposta | Período e método |

## Pronto para desdobrar

O PRD está pronto para derivar SPECs quando escopo e exclusões estão claros,
requisitos são rastreáveis, critérios de aceite permitem definir evidências e
dependências estão identificadas. Pendências podem permanecer, desde que esteja
claro quais SPECs elas bloqueiam. Um PRD em rascunho pode gerar SPECs em rascunho;
isso não libera execução bloqueada nem representa aceite formal.
