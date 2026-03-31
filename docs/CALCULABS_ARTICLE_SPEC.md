# CalcuLabs Article Spec V1

Especificação oficial e única fonte de verdade para criação de artigos no Knowledge Hub.

## Regra Absoluta

Qualquer implementação de frontend DEVE seguir esta spec sem alterações. É proibido:

- Interpretar estrutura
- Simplificar campos
- Omitir campos
- Criar campos novos
- Alterar nomes de campos
- Tomar decisões de UX fora desta spec

Se qualquer item acima for violado → implementação inválida.

---

## Estrutura do Artigo (Obrigatória)

```json
{
  "slug": "string (único, kebab-case)",
  "title": "string",
  "category": "string (slug da categoria)",
  "meta_title": "string",
  "meta_description": "string",
  "search_intent": "informacional | comercial | navegacional",
  "summary": "string (mínimo 200 caracteres)",
  "content": "string HTML (mínimo 1500 palavras)",
  "faq": [
    { "q": "string", "a": "string" }
  ],
  "how_to": ["string"],
  "entities": ["string"],
  "semantic_keywords": ["string"],
  "examples": ["string"],
  "comparisons": ["string"],
  "related_calculators": ["slug existente"],
  "related_articles": ["slug existente"],
  "internal_links": ["slug existente"],
  "featured_snippet_answer": "string (máx 300 caracteres)",
  "priority": "low | medium | high",
  "cluster": {
    "is_pillar": "boolean",
    "cluster_name": "string",
    "satellites": ["slug"]
  }
}
```

---

## Regras de Validação

Todas as regras abaixo são obrigatórias. O validador (`src/lib/validate-article.ts`) verifica cada uma.

### Campos Obrigatórios

Todos os campos listados na estrutura acima são obrigatórios. Nenhum pode ser omitido.

### Slug

- Único no dataset (`src/data/articles.json`)
- Formato kebab-case (ex: `juros-compostos-guia-completo`)
- Não pode ser vazio

### Title

- Não pode ser vazio

### Category

- Deve corresponder a um slug existente em `src/data/categories.json`

### Meta Title

- Não pode ser vazio

### Meta Description

- Não pode ser vazio

### Search Intent

- Deve ser exatamente um de: `informacional`, `comercial`, `navegacional`

### Summary

- Mínimo de 200 caracteres
- Não pode ser vazio

### Content

- String HTML
- Mínimo de 2500 palavras (contagem por split em espaços)
- Deve conter pelo menos 2 links internos reais (atributo `href` presente no HTML)
- Proibido conteúdo genérico (placeholder, lorem ipsum, texto vazio)
- Proibido conteúdo curto (abaixo de 1500 palavras)

### FAQ

- Array de objetos `{ "q": "string", "a": "string" }`
- Mínimo de 3 itens
- Cada item deve ter `q` não vazio e `a` não vazio

### How To

- Array de strings
- Mínimo de 3 itens
- Cada item não pode ser vazio

### Entities

- Array de strings
- Não pode ser vazio

### Semantic Keywords

- Array de strings
- Mínimo de 5 itens
- Cada item não pode ser vazio

### Examples

- Array de strings
- Não pode ser vazio

### Comparisons

- Array de strings
- Não pode ser vazio

### Related Calculators

- Array de strings (slugs)
- Mínimo de 2 itens
- Cada slug deve corresponder a uma calculadora existente em `src/data/calculators.json`

### Related Articles

- Array de strings (slugs)
- Mínimo de 1 item
- Cada slug deve corresponder a um artigo existente em `src/data/articles.json` (exceto o próprio artigo)

### Internal Links

- Array de strings (slugs)
- Mínimo de 2 itens
- Cada slug deve corresponder a um artigo existente em `src/data/articles.json` ou uma calculadora em `src/data/calculators.json`

### Featured Snippet Answer

- String
- Máximo de 300 caracteres
- Não pode ser vazio

### Priority

- Deve ser exatamente um de: `low`, `medium`, `high`

### Cluster

- Objeto com 3 campos:
  - `is_pillar`: boolean
  - `cluster_name`: string (não pode ser vazio)
  - `satellites`: array de strings (slugs de artigos)

---

## Regras de Inventário

Todo artigo DEVE estar registrado em `/docs/master_inventory-articles.md` antes de existir em `src/data/articles.json`.

### Colunas do Inventário

| Coluna | Descrição |
|--------|-----------|
| ID | Sequencial (1, 2, 3...) |
| Slug | Slug único do artigo |
| Title | Título do artigo |
| Cluster | Nome do cluster |
| Tipo | `pillar` ou `satellite` |
| Status | `planejado`, `em_producao`, ou `publicado` |
| Priority | `low`, `medium`, ou `high` |

### Regras

- Não permitir slug duplicado no inventário
- Inventário é fonte primária de controle
- Todo artigo deve estar aqui antes de existir no JSON

---

## Fonte de Dados

### `src/data/articles.json`

- Array de objetos
- Cada objeto deve seguir 100% esta spec
- Não permitir objetos incompletos
- Não permitir campos extras
- Não permitir valores nulos

---

## Validação

### CLI

```bash
bun run src/lib/validate-article.ts [slug]
```

- Sem argumento: valida todos os artigos
- Com argumento: valida apenas o artigo com o slug informado

### Verificações

1. Estrutura completa (todos os campos presentes)
2. Tipos corretos
3. Regras obrigatórias (mínimos, formatos, enums)
4. Consistência de links (calculadoras existem)
5. Consistência de artigos (slugs referenciados existem)
6. Conteúdo HTML com links internos (`href`)
7. Slug único

---

## Última Atualização

2026-03-28 — Spec V1 criada.
