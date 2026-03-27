# Architecture

## Estrutura de Diretórios

```
src/
├── app/                    # Next.js App Router
│   ├── [categoria]/        # Páginas de categoria (dinâmico)
│   │   ├── page.tsx        # Lista de subcategorias
│   │   └── [subcategoria]/[calculo]/page.tsx  # Página da calculadora
│   ├── api/
│   │   ├── tracking/       # Analytics interno
│   │   ├── report-error/   # Reporte de erros via SMTP
│   │   └── seed/           # Seed do banco de dados
│   ├── busca/              # Busca de calculadoras
│   ├── layout.tsx          # Layout raiz (Header, Footer, GTM)
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # Página 404
│   ├── sitemap.ts          # Sitemap dinâmico
│   └── robots.ts           # robots.txt dinâmico
├── components/
│   ├── calculator/         # Componentes de calculadora
│   ├── home/               # Componentes da homepage
│   └── layout/             # Header, Footer
├── data/                   # Dados estáticos JSON
├── db/                     # Camada de banco de dados
│   ├── schema.ts           # Schema Drizzle ORM
│   ├── index.ts            # Conexão DB
│   ├── migrate.ts          # Runner de migrations
│   ├── seed.ts             # Seed data
│   └── migrations/         # SQL migrations
└── lib/                    # Bibliotecas utilitárias
    ├── data.ts             # Acesso aos dados (JSON)
    ├── formula-engine.ts   # Engine de fórmulas
    ├── analytics.ts        # Tracking (GTM + API)
    ├── seo-generator.ts    # Geração de metadados SEO
    └── validate-calculator.ts  # Validação CLI
```

## Fluxo de Dados

```
JSON (src/data/) → lib/data.ts → Componentes React → Formula Engine (client-side)
```

1. `src/data/*.json` contém todo o conteúdo das calculadoras
2. `src/lib/data.ts` fornece funções tipadas para acesso
3. Componentes React renderizam a UI
4. `src/lib/formula-engine.ts` avalia fórmulas no browser

## Padrão de URL

```
/{categoria-slug}/{subcategoria-slug}/{calculadora-slug}
```

Exemplo: `/financas-pessoais/juros-investimentos/juros-compostos`

## Schema do Banco (Drizzle)

3 tabelas:

- **categories** — id, name, slug, description, icon, color, order
- **subcategories** — id, category_id (FK), name, slug, description, order
- **calculators** — id, category_id (FK), subcategory_id (FK), name, slug, title, description, formula, variables, steps, example, applications, curiosity, faqs, keywords, meta_title, meta_description, complexity, monetization_type, etc.

## Rotas da API

| Rota | Método | Função |
|------|--------|--------|
| `/api/tracking` | POST | Recebe eventos de analytics |
| `/api/report-error` | POST | Envia email de reporte de erro |
| `/api/seed` | POST/GET | Seed do banco (protegido por x-seed-key) |

## Rotas de Página

| Rota | Tipo | Função |
|------|------|--------|
| `/` | Static | Homepage |
| `/busca?q=` | Dynamic | Busca de calculadoras |
| `/:categoria` | SSG | Lista de subcategorias |
| `/:categoria/:subcategoria/:calculo` | SSG | Página da calculadora |
| `/sitemap.xml` | Dynamic | Sitemap |
| `/robots.txt` | Dynamic | Robots |

## Componentes Principais

| Componente | Função |
|-----------|--------|
| `CalculatorWidget` | Formulário de cálculo, avaliação de fórmula, exibição de resultado |
| `CalculatorTracker` | Evento de visualização (GTM + API) |
| `ErrorReportButton` | Modal de reporte de erro → SMTP |
| `ShareButton` | Compartilhamento (Web Share API / clipboard) |
| `Header` | Header sticky com busca typeahead |
| `Footer` | Footer com links de categorias e páginas |
| `LatestCalculatorsCarousel` | Carrossel de calculadoras recentes |

## Última Atualização

2026-03-26 — Documentação criada pós-rollback.
