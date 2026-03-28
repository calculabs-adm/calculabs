# Features

## Funcionalidades Ativas

### 1. Calculadoras Interativas
- 66 calculadoras em 8 categorias
- Avaliação client-side de fórmulas com resultado instantâneo
- Suporte a inputs: number, text, select, date
- Formatação automática: moeda (R$), porcentagem, número
- Fórmula visível na página para transparência

### 2. Navegação por Categoria
- Hierarquia: Categoria → Subcategoria → Calculadora
- 8 categorias, 17 subcategorias
- URLs amigáveis: `/{categoria}/{subcategoria}/{calculadora}`

### 3. Busca
- Busca typeahead no header (filtro client-side)
- Página de busca dedicada (`/busca`)
- Filtro por nome, descrição e keywords

### 4. Conteúdo Educacional (por calculadora)
- Exibição da fórmula
- Passo a passo de cálculo
- Exemplo prático resolvido
- Aplicações no mundo real
- Seção "Você Sabia" (curiosidades em HTML)
- Perguntas frequentes (FAQ)
- Calculadoras relacionadas

### 5. SEO
- Metadados dinâmicos por calculadora
- JSON-LD schemas: Article, BreadcrumbList, FAQPage, HowTo, WebApplication
- Sitemap.xml dinâmico
- robots.txt dinâmico
- OpenGraph e Twitter Cards
- URLs canônicas

### 6. Reporte de Erros
- Modal na página da calculadora
- Envia email via SMTP (nodemailer)
- Fallback: log no console se SMTP não configurado

### 7. Analytics
- Google Tag Manager (GTM-WCJ4FLF7)
- Endpoint interno `/api/tracking`
- Eventos rastreados:
  - `calculadora_visualizada`
  - `resultado_calculado`
  - `campo_alterado`
  - `resultado_copiado`

### 8. Compartilhamento
- Web Share API (mobile)
- Fallback: copiar link para clipboard

### 9. Validação de Calculadoras
- CLI tool: `bun run src/lib/validate-calculator.ts [slug]`
- Valida fórmulas contra exemplos práticos
- Tolerância de 1% no resultado

### 10. Seed do Banco
- Endpoint `/api/seed?key=...`
- Popula categorias, subcategorias e calculadoras

### 11. PreAdTransition (UX de Conversão)
- Bloco de transição antes do anúncio final da página
- Texto dinâmico por categoria (financas-pessoais, trabalhista-tributario, matematica, saude)
- Prepara o usuário para interagir com soluções externas
- Componente: `src/components/ui/PreAdTransition.tsx`
- Máximo 1 por página, sempre antes do AdBlock final

### 12. Knowledge Hub (em preparação)
- Sistema de governança de artigos com spec rígida
- Spec oficial: `docs/CALCULABS_ARTICLE_SPEC.md`
- Inventário: `docs/master_inventory-articles.md`
- Dados: `src/data/articles.json`
- Validador CLI: `bun run src/lib/validate-article.ts [slug]`
- Estrutura: slug, title, category, meta_title, meta_description, search_intent, summary, content (HTML 1500+ palavras), faq (3+), how_to (3+), entities, semantic_keywords (5+), examples, comparisons, related_calculators (2+), related_articles (1+), internal_links (2+), featured_snippet_answer, priority, cluster
- Páginas e rotas NÃO implementadas (apenas dados e validação)

## Categorias Disponíveis

| Categoria | Slug | Calculadoras |
|-----------|------|-------------|
| Finanças Pessoais | `financas-pessoais` | ~20 |
| Trabalhista e Tributário | `trabalhista-tributario` | ~10 |
| Matemática | `matematica` | ~15 |
| Saúde | `saude` | ~8 |
| Utilitários | `utilitarios` | ~4 |
| Engenharia e Construção | `engenharia-construcao` | ~3 |
| Astronomia | `astronomia` | 1 |
| Ciência | `ciencia` | 2 |

## Funções do Formula Engine

### Matemática
`pow`, `sqrt`, `abs`, `log`, `ln`, `sin`, `cos`, `tan`, `ceil`, `floor`, `round`, `min`, `max`

### Finanças
`calcular_ir_progressivo`, `calcular_inss`

### Saúde
`calcular_tmb`, `calcular_gordura`, `calcular_peso_ideal`

### Gravidez
`calcular_idade_gestacional`, `calcular_data_parto`, `calcular_ovulacao`

### Utilidades
`calcular_mmc`, `calcular_mdc`, `calcular_idade_exata`, `calcular_diferenca_datas`

### Impostos
`calcular_simples_nacional`, `calcular_das_mei`

### Astronomia
`calcular_peso_planetas`

## Última Atualização

2026-03-26 — Documentação criada pós-rollback.
