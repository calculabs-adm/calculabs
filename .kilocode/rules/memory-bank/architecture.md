# System Patterns: CalcuLabs

## Architecture Overview

```
src/
├── app/                    # Next.js App Router
│   ├── [categoria]/        # Páginas de categoria (dinâmico)
│   │   ├── page.tsx        # Lista de subcategorias
│   │   └── [subcategoria]/[calculo]/page.tsx  # Página da calculadora
│   ├── conhecimento/        # Knowledge Hub
│   │   └── [slug]/page.tsx  # Página de artigo
│   ├── api/                # API routes
│   │   ├── tracking/       # Analytics interno
│   │   ├── report-error/   # Reporte de erros via SMTP
│   │   └── seed/           # Seed do banco de dados
│   ├── layout.tsx          # Layout raiz (Header, Footer, GTM)
│   ├── page.tsx            # Homepage
│   └── sitemap.ts          # Sitemap dinâmico
├── components/
│   ├── calculator/         # Componentes de calculadora
│   ├── home/               # Componentes da homepage
│   ├── layout/             # Header, Footer
│   └── ads/                # Componentes de monetização
├── data/                   # Dados estáticos JSON
│   ├── categories.json     # 8 categorias
│   ├── subcategories.json  # 17 subcategorias
│   ├── calculators.json    # 69 calculadoras
│   └── articles.json       # 9 artigos (Knowledge Hub)
├── db/                     # Camada de banco de dados
│   ├── schema.ts           # Schema Drizzle ORM
│   ├── index.ts            # Conexão DB
│   └── migrations/         # SQL migrations
└── lib/                    # Bibliotecas utilitárias
    ├── data.ts             # Acesso aos dados (JSON)
    ├── formula-engine.ts   # Engine de fórmulas
    ├── analytics.ts        # Tracking (GTM + API)
    ├── seo-generator.ts    # Geração de metadados SEO
    ├── validate-calculator.ts  # Validação CLI
    └── validate-article.ts     # Validação de artigos CLI
```

## Data Flow

```
JSON (src/data/) → lib/data.ts → Componentes React → Formula Engine (client-side)
```

## Tracking Architecture

```
trackEvent() → GTM (dataLayer) + /api/tracking
```

### Event Flow

1. Usuário interage com calculadora
2. CalculatorWidget → analytics.trackEvent()
3. Dual dispatch: GTM + API
4. API adiciona metadata e loga

## Key Design Patterns

### 1. App Router Pattern

```
src/app/
├── page.tsx                        # Route: /
├── [categoria]/page.tsx            # Route: /:categoria
├── [categoria]/[subcategoria]/
│   └── [calculo]/page.tsx          # Route: /:categoria/:subcategoria/:calculo
├── conhecimento/[slug]/page.tsx    # Route: /conhecimento/:slug
└── api/
    └── route.ts                    # API Route: /api
```

### 2. Server Components by Default

```tsx
// Server Component (default) - fetching, DB access
export default async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}

// Client Component - interactivity
"use client";
export default function CalculatorWidget() {
  const [result, setResult] = useState(null);
  return <button onClick={() => setResult(calculate())}>{result}</button>;
}
```

### 3. Formula Engine Pattern

```tsx
// Client-side formula evaluation
const result = evaluateFormula(formula, variables);
```

## File Naming Conventions

- Components: PascalCase (`CalculatorWidget.tsx`)
- Utilities: camelCase (`formula-engine.ts`)
- Pages: lowercase (`page.tsx`, `layout.tsx`)
- Directories: lowercase (`components/`, `lib/`)

## State Management

- `useState` para estado local de componentes
- `useContext` para estado compartilhado (se necessário)
- Server Components para fetching de dados
- JSON files para dados estáticos (calculadoras, artigos)
