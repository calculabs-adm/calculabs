# Recipe: Article Generator - SEO Optimized Content

Padrão completo para criação de artigos do Knowledge Hub CalcuLabs com SEO forte e estrutura otimizada.

## When to Use

- Criação de novos artigos para o Knowledge Hub
- Expansão de clusters existentes (engenharia-cimento, fisica-basica, juros-compostos, gestao-financeira-pessoal)
- Geração de conteúdo educacional sobre cálculos e fórmulas
- Qualquer artigo que precise seguir padrões rigorosos de SEO

## Prerequisites

- Tópico definido e validado
- Cluster de destino identificado (pillar ou satellite)
- Calculadoras relacionadas existentes
- Palavras-chave pesquisadas e validadas

## Environment

- Projeto CalcuLabs com estrutura completa
- Validador SEO automático implementado
- Memory bank atualizado

## SEO Standards Applied

### Mandatory Criteria (Block Publication)
- ✅ H1 único no início do conteúdo
- ✅ Meta title: 30-60 caracteres
- ✅ Meta description: 120-160 caracteres
- ✅ Conteúdo: mínimo 1500 palavras
- ✅ Featured snippet definido
- ✅ URL amigável (slug otimizado)

### Recommended Criteria (Optimize Performance)
- 📈 H2: mínimo 5 seções
- 🔍 Semantic keywords: 5+ termos
- ❓ FAQ: 3+ perguntas estruturadas
- 🏷️ Entities: 5+ conceitos identificados
- 🔗 Internal links: 1+ links relacionados
- 🧮 Related calculators: 1+ calculadoras

## Content Structure Template

### IDENTIFICAÇÃO
```json
{
  "slug": "nome-do-artigo",
  "title": "Título Completo e Otimizado",
  "category": "financas-pessoais|ciencia|engenharia-construcao",
  "search_intent": "informacional",
  "priority": "high"
}
```

### SEO
```json
{
  "meta_title": "Título | CalcuLabs (30-60 chars)",
  "meta_description": "Descrição atraente com keywords + call-to-action (120-160 chars)"
}
```

### ESTRUTURA DE CONTEÚDO

#### H1 Principal
`<h1>Título Exato do Artigo</h1>`

#### Introdução (300+ palavras)
- Definição clara do conceito
- Importância prática
- Benefícios para o usuário
- Contexto do problema que resolve

#### Seções Principais (H2 - mínimo 5)
- **O que é [Conceito]**: Explicação detalhada
- **Como calcular [Conceito]**: Fórmulas e exemplos práticos
- **Exemplos aplicados**: Casos reais com cálculos
- **Erros comuns**: O que evitar
- **Ferramentas**: Calculadoras e recursos disponíveis

#### FAQ (3+ perguntas)
Estruturado em JSON com perguntas frequentes.

#### Conclusão
- Resumo dos pontos principais
- Call-to-action para calculadoras
- Links para próximos conteúdos

### BLOCOS OBRIGATÓRIOS

#### FAQ Schema
```json
[
  {"q": "Pergunta 1?", "a": "Resposta objetiva"},
  {"q": "Pergunta 2?", "a": "Resposta objetiva"},
  {"q": "Pergunta 3?", "a": "Resposta objetiva"}
]
```

#### How-to Guide
```json
["Passo 1", "Passo 2", "Passo 3", "Passo 4"]
```

#### Entities
```json
["entidade1", "entidade2", "entidade3"]
```

#### Semantic Keywords
```json
["keyword1", "keyword2", "keyword3"]
```

#### Examples
```json
["Exemplo prático 1", "Exemplo prático 2"]
```

#### Comparisons
```json
["Comparação 1", "Comparação 2"]
```

### RELACIONAMENTOS

#### Related Calculators
```json
["calculadora-principal", "calculadora-secundaria"]
```

#### Related Articles
```json
["artigo-relacionado-cluster"]
```

#### Internal Links
```json
["artigo-relacionado-1", "calculadora-principal"]
```

### FEATURED SNIPPET
```json
{
  "featured_snippet_answer": "Resposta direta e objetiva para featured snippet"
}
```

### CLUSTER
```json
{
  "is_pillar": false,
  "cluster_name": "nome-do-cluster",
  "satellites": []
}
```

## Implementation Steps

### Step 1: Preparação
1. Definir tópico e palavras-chave
2. Identificar cluster de destino
3. Pesquisar concorrência
4. Validar calculadoras relacionadas

### Step 2: Criação do Conteúdo
1. Seguir estrutura template exatamente
2. Aplicar todos os critérios SEO obrigatórios
3. Incluir exemplos práticos e cálculos
4. Garantir mínimo 1500 palavras

### Step 3: Otimização SEO
1. Otimizar meta title (30-60 chars)
2. Escrever meta description atraente (120-160 chars)
3. Adicionar H1 único no início
4. Incluir semantic keywords naturalmente
5. Criar FAQ relevante
6. Definir featured snippet

### Step 4: Relacionamentos
1. Vincular calculadoras relacionadas
2. Adicionar internal links relevantes
3. Definir related articles do mesmo cluster
4. Identificar entities para Google Knowledge Graph

### Step 5: Validação e Publicação
1. Executar validador SEO automático
2. Corrigir issues identificados
3. Revalidar até 100/100
4. Commit apenas após aprovação
5. Atualizar documentação e memory bank

## Quality Assurance

### Validação Automática
- **Script**: `scripts/seo-validator.js`
- **Critérios**: 14 verificações obrigatórias
- **Bloqueio**: Commit rejeitado se reprovado

### Checklist Manual
- [ ] Título atrativo e otimizado
- [ ] Introdução convincente (300+ palavras)
- [ ] Conteúdo original e informativo
- [ ] Exemplos práticos incluídos
- [ ] Linguagem clara e acessível
- [ ] Call-to-action estratégico

## Memory Bank Updates

Após criação, atualizar:

### context.md
- Adicionar artigo à seção "Recently Completed"
- Documentar cluster expandido
- Atualizar estatísticas de conteúdo

### product.md
- Registrar novo conteúdo educacional
- Atualizar mapa de clusters
- Documentar novas calculadoras relacionadas

## Success Metrics

- **Indexação**: Aparecer nos resultados do Google em 24h
- **Posicionamento**: Top 10 para keywords principais
- **Engajamento**: Tempo médio na página > 3 minutos
- **Conversão**: Cliques para calculadoras relacionadas
- **SEO Score**: 100/100 na validação automática

---

**Template Version**: 1.0
**Last Updated**: 2026-03-31
**Compatible With**: CalcuLabs Knowledge Hub