# CALCULABS SYSTEM DOSSIER - COMPLETO

**Data de Geração:** 14/03/2026  
**Versão do Sistema:** 1.0.0  
**Total de Calculadoras:** 60 (57 ativas)

---

# 1. ARQUITETURA GERAL

## 1.1 Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|------------|---------|
| Framework | Next.js | 16.1.3 |
| UI | React | 19.2.3 |
| Estilização | Tailwind CSS | 4.1.17 |
| Banco de Dados | SQLite (Turso/libSQL) | - |
| ORM | Drizzle | 0.45.1 |
| Idiomas | TypeScript | 5.9.3 |
|Fonts| Geist Sans/Mono | - |

## 1.2 Estrutura de Diretórios Completa

```
src/
├── app/                              # Next.js App Router
│   ├── [categoria]/                  # Rota dinâmica: categoria
│   │   ├── page.tsx                 # Página de categoria
│   │   └── [subcategoria]/         # Rota dinâmica: subcategoria
│   │       └── [calculo]/            # Rota dinâmica: calculadora
│   │           └── page.tsx          # Página da calculadora
│   │
│   ├── api/                          # API Routes
│   │   ├── report-error/
│   │   │   └── route.ts             # Endpoint: reportar erro
│   │   └── seed/
│   │       └── route.ts              # Endpoint: executar seed
│   │
│   ├── busca/                        # Página de busca
│   │   └── page.tsx
│   │
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                     # Home page
│   ├── sitemap.ts                    # Sitemap dinâmico
│   ├── robots.ts                    # Robots.txt
│   └── not-found.tsx                # Página 404
│
├── components/                       # Componentes React
│   ├── calculator/
│   │   ├── CalculatorWidget.tsx    # Widget principal (CLIENT)
│   │   ├── CalculatorTracker.tsx  # Tracking analytics (CLIENT)
│   │   ├── ErrorReportButton.tsx   # Botão reportar erro (CLIENT)
│   │   └── ShareButton.tsx         # Botão compartilhar (CLIENT)
│   │
│   ├── layout/
│   │   ├── Header.tsx              # Cabeçalho (CLIENT)
│   │   └── Footer.tsx              # Rodapé
│   │
│   └── home/
│       └── LatestCalculatorsCarousel.tsx  # Carrossel (CLIENT)
│
├── data/                           # Dados JSON (fonte primária)
│   ├── calculators.json              # 60 calculadoras (330KB)
│   ├── categories.json              # 6 categorias
│   └── subcategories.json           # 14 subcategorias
│
├── db/                             # Camada de banco de dados
│   ├── index.ts                    # Configuração cliente Drizzle
│   ├── schema.ts                   # Schema Drizzle (NÃO USADO)
│   ├── seed.ts                     # Seed script
│   └── migrate.ts                   # Migrações
│
└── lib/                           # Utilitários
    ├── data.ts                     # Acesso a dados JSON
    ├── formula-engine.ts           # Motor de cálculo (servidor)
    ├── analytics.ts                # Tracking GTM
    └── seo-generator.ts            # Gerador SEO
```

---

# 2. ARQUITETURA DE DADOS

## 2.1 Fonte de Dados

O sistema utiliza **JSON files** como fonte primária de dados. O banco de dados (Drizzle + SQLite/Turso) possui schema definido mas **NÃO está em uso**.

### Arquivos de Dados

| Arquivo | Tamanho | Registros |
|---------|---------|-----------|
| calculators.json | 330KB | 60 |
| categories.json | 1.5KB | 6 |
| subcategories.json | 3.2KB | 14 |

## 2.2 Schema do Banco de Dados (Drizzle) - NÃO UTILIZADO

**Arquivo:** `src/db/schema.ts`

```typescript
// Categorias
categories = sqliteTable("categories", {
  id: integer().primaryKey(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  icon: text(),
  color: text(),
  order: integer().default(0),
  createdAt: integer("timestamp")
})

// Subcategorias  
subcategories = sqliteTable("subcategories", {
  id: integer().primaryKey(),
  categoryId: integer().references("categories.id"),
  name: text().notNull(),
  slug: text().notNull(),
  description: text(),
  order: integer().default(0),
  createdAt: integer("timestamp")
})

// Calculadoras
calculators = sqliteTable("calculators", {
  id: integer().primaryKey(),
  categoryId: integer().references("categories.id"),
  subcategoryId: integer().references("subcategories.id"),
  name: text().notNull(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text().notNull(),
  introduction: text().notNull(),
  formula: text().notNull(),
  formulaDisplay: text(),
  variables: text().notNull(),        // JSON
  steps: text(),                     // JSON
  example: text(),                   // JSON
  applications: text(),              // JSON
  curiosity: text(),                // HTML
  faqs: text(),                     // JSON
  relatedSlugs: text(),             // JSON
  keywords: text(),                 // JSON
  metaTitle: text().notNull(),
  metaDescription: text().notNull(),
  complexity: text().default("basico"),
  monetizationType: text().default("ads"),
  authorName: text(),
  authorBio: text(),
  sources: text(),
  updatedAt: integer("timestamp"),
  createdAt: integer("timestamp"),
  isActive: integer("boolean").default(true),
  viewCount: integer().default(0)
})
```

## 2.3 Estrutura dos Dados JSON

### Categories (categories.json)

```typescript
interface Category {
  id: number;           // Ex: 6, 7, 8, 9, 10, 11
  name: string;        // Ex: "Finanças Pessoais"
  slug: string;       // Ex: "financas-pessoais"
  description: string;// Ex: "Calculadoras para gestão..."
  icon: string;       // Ex: "💰"
  color: string;       // Ex: "#10b981"
  order: number;      // Ex: 1, 2, 3...
  created_at: number;  // Unix timestamp
}
```

### Subcategories (subcategories.json)

```typescript
interface Subcategory {
  id: number;           // Ex: 13, 14, 17, 19...
  category_id: number; // FK para category
  name: string;        // Ex: "Juros e Investimentos"
  slug: string;       // Ex: "juros-investimentos"
  description: string;// Ex: "Calculadoras de juros..."
  order: number;      // Ex: 1, 2...
  created_at: number;  // Unix timestamp
}
```

### Calculators (calculators.json)

```typescript
interface Calculator {
  id: number;              // 51-111 (IDs válidos)
  category_id: number;    // FK para categoria (6-11)
  subcategory_id: number; // FK para subcategoria
  name: string;           // "Juros Compostos"
  slug: string;          // "juros-compostos"
  title: string;         // "Calculadora de Juros Compostos"
  description: string;   // Curta descrição
  introduction: string;  // Texto longo introdutório
  formula: string;       // "M = P * ((1 + i) ** n - 1) / i"
  formula_display: string | null; // Exibição formatada
  variables: string;     // JSON: [{"id": "P", "label": "Principal", ...}]
  steps: string | null; // JSON: ["Passo 1", "Passo 2"]
  example: string | null; // JSON: {"title": "...", "inputs": {}, "result": ""}
  applications: string | null; // JSON: ["App 1", "App 2"]
  curiosity: string | null;  // HTML com conteúdo "Você Sabia?"
  faqs: string | null;      // JSON: [{"q": "?", "a": "..."}]
  related_slugs: string | null; // JSON: ["slug1", "slug2"]
  keywords: string | null;   // JSON: ["keyword1", "keyword2"]
  meta_title: string;        // SEO title
  meta_description: string; // SEO description
  complexity: string;       // "basico" | "tecnico" | "avancado"
  monetization_type: string | null; // "ads", "affiliate", "leads", "pro"
  author_name: string | null;
  author_bio: string | null;
  sources: string | null;
  updated_at: number;       // Unix timestamp
  created_at: number;       // Unix timestamp
  is_active: number;        // 0 ou 1
  view_count: number;       // Contador visualizações
}
```

---

# 3. SISTEMA DE GERAÇÃO DE PÁGINAS

## 3.1 Rotas Next.js

### Rota Raiz (`/`)

**Arquivo:** `src/app/page.tsx`

- **Tipo:** Server Component (Async)
- **Dados carregados:**
  - `getCategoriesWithCount()` - Todas as categorias com contagem
  - `getLatestCalculators(8)` - 8 calculadoras mais recentes
- **Features:**
  - Hero section
  - Stats bar
  - Carrossel Últimas Calculadoras
  - Calculadoras Populares (hardcoded)
  - Grid de Categorias
  - SEO content
  - Schema.org WebSite + SearchAction

### Rota de Categoria (`/[categoria]`)

**Arquivo:** `src/app/[categoria]/page.tsx`

- **Tipo:** Server Component (Async)
- **GeraStaticParams:** Lista todas as categorias
- **Dados carregados:**
  - `getCategoryWithSubcategories(slug)` - Categoria + subcategorias + calculators
- **Features:**
  - Hero com cor da categoria
  - Grid de subcategorias
  - Lista de calculadoras por subcategoria
  - Badges de complexidade
  - Schema.org CollectionPage

### Rota de Calculadora (`/[categoria]/[subcategoria]/[calculo]`)

**Arquivo:** `src/app/[categoria]/[subcategoria]/[calculo]/page.tsx`

- **Tipo:** Server Component (Async)
- **GeraStaticParams:** Lista todas as calculadoras
- **Dados carregados:**
  - `getCalculatorWithContext(slug)` - Calculator + category + subcategory + related
- **SEO:**
  - `generateCalculatorSEO(calculator)` - Gera title/description
  - `generateMetadata()` - Meta tags + OpenGraph + Twitter
  - JSON-LD schemas (Article, BreadcrumbList, WebApplication, FinancialProduct, Dataset, HowTo, FAQPage)

### Rota de Busca (`/busca`)

**Arquivo:** `src/app/busca/page.tsx`

- **Tipo:** Server Component (Async)
- **Parâmetros:** `?q=termo`
- **Dados carregados:**
  - `getAllCalculators()` - Todas
  - Filtro por name, description, keywords

---

# 4. MOTOR DE CÁLCULO (FORMULA ENGINE)

## 4.1 Arquitetura

O sistema possui **DOIS** motores de cálculo idênticos:

1. **Servidor:** `src/lib/formula-engine.ts` (para SSR/server-side)
2. **Cliente:** `src/components/calculator/CalculatorWidget.tsx` (Client Component)

## 4.2 Estrutura do Formula Engine

```typescript
interface Variable {
  id: string;           // ID único (ex: "preco", "percentual")
  label: string;       // Label exibido (ex: "Preço original")
  type: "number" | "text" | "select" | "date";
  unit?: string;       // Unidade (ex: "R$", "%")
  placeholder?: string;
  default?: number | string;  // Valor padrão
  min?: number;
  max?: number;
  options?: { value: string; label: string }[]; // Para type="select"
}

interface CalculationResult {
  success: boolean;
  result?: Record<string, number | string>;
  error?: string;
  steps?: string[];
}
```

## 4.3 Processo de Avaliação

```typescript
evaluateFormula(formula: string, variables: Record<string, number | string>) {
  // 1. Preparar helpers matemáticos
  const mathHelpers = {
    PI, E, sqrt, pow, abs, log, ln, log2, 
    ceil, floor, round, sin, cos, tan, max, min
  };
  
  // 2. Injetar variáveis do usuário
  const vars = { ...mathHelpers, ...userInputs };
  
  // 3. Processar if-else para operador ternário
  let processed = formula.replace(ifElsePattern, ...);
  
  // 4. Executar fórmula com new Function()
  const fn = new Function(...keys, formula);
  const results = fn(...values);
  
  // 5. Filtrar resultados inválidos
  // 6. Retornar resultados
}
```

## 4.4 Funções Helper Disponíveis

### Matemáticas
```typescript
PI, E
sqrt(x), pow(x, y), abs(x)
log(x), ln(x), log2(x)
ceil(x), floor(x), round(x)
sin(x), cos(x), tan(x)
max(...args), min(...args)
```

### Financeiras
```typescript
calcular_ir_progressivo(base)          // IRPF 2024
calcular_inss(salario)                // INSS 2024
calcular_ir(base)                     // IR (alias)
calcular_inss_progressivo(salario)     // INSS progressivo
```

### Saúde
```typescript
calcular_tmb(sexo, peso, altura_cm, idade)
calcular_gordura(sexo, altura, cintura, pescoco, quadril)
calcular_peso_ideal(sexo, altura)
calcular_idade_gestacional(data_ultima_menstruacao)
calcular_data_parto(data_ultima_menstruacao)
calcular_ovulacao(data_ultima_menstruacao, duracao_ciclo?)
```

### Matemáticas Avançadas
```typescript
calcular_mmc(numerosStr)  // "2,4,6" → 12
calcular_mdc(numerosStr)  // "12,18" → 6
soma(arr)                 // [1,2,3] → 6
```

###Datas
```typescript
calcular_idade_exata(dataNascimento, dataAtual?)
calcular_diferenca_datas(dataInicial, dataFinal)
```

### Simples Nacional
```typescript
calcular_simples_nacional(faturamento_mes, rbt12, anexo)
// Anexos: I, II, III, IV, V
calcular_das_mei(tipo_atividade)
// Tipo: "comercio", "servicos", "ambos"
```

## 4.5 Formatação de Resultados

```typescript
function formatResultValue(key, value) {
  // Percentuais (variacao, roi, roas, dy, margem, markup, aliquota...)
  if (key.includes("variacao") || key.includes("roi") || ...)
    return "12,34%"
  
  // Monetários (M, montante, parcela, juros, total, valor, inss, fgts...)
  if (key.includes("montante") || key.includes("parcela") || ...)
    return "R$ 1.234,56"
  
  // Notação científica (valores < 1e-10)
  if (Math.abs(value) < 1e-10)
    return "3,31 × 10⁻¹⁹ J"
  
  // Padrão: 2 decimais
  return "12,34"
}
```

---

# 5. COMPONENTES

## 5.1 CalculatorWidget (CLIENT)

**Arquivo:** `src/components/calculator/CalculatorWidget.tsx`
**Linhas:** 714

### Props
```typescript
interface CalculatorWidgetProps {
  formula: string;           // Fórmula de cálculo
  variables: Variable[];      // Array de variáveis
  formulaDisplay?: string;  // Fórmula formatada
  calculoSlug?: string;     // Slug para tracking
  categoriaSlug?: string;    // Categoria para tracking
  subcategoriaSlug?: string;// Subcategoria para tracking
}
```

### Estados Internos
```typescript
const [values, setValues] = useState<Record<string, string>>({})  // Valores dos inputs
const [results, setResults] = useState<ResultEntry[] | null>(null) // Resultados
const [error, setError] = useState<string | null>(null)           // Erro
const [calculated, setCalculated] = useState(false)              // Flag cálculo
const [copied, setCopied] = useState(false)                     // Flag copy
```

### Funções Principais

1. **evaluateClientFormula()** - Avalia fórmula no browser
2. **formatResultValue()** - Formata resultado para display
3. **formatResultLabel()** - Gera label amigável
4. **handleCalculate()** - Dispara cálculo
5. **handleCopy()** - Copia resultado

## 5.2 CalculatorTracker (CLIENT)

**Arquivo:** `src/components/calculator/CalculatorTracker.tsx`

Envia eventos para Google Tag Manager:

- `calculadora_visualizada` - Quando página carrega
- `resultado_calculado` - Quando usuário faz cálculo
- `campo_alterado` - Quando usuário modifica input

```typescript
// Uso
<CalculatorTracker 
  calculadoraNome="juros-compostos"
  calculadoraCategoria="financas-pessoais"
  calculadoraSubcategoria="juros-investimentos"
/>
```

## 5.3 ErrorReportButton (CLIENT)

**Arquivo:** `src/components/calculator/ErrorReportButton.tsx`

Botão que abre modal para reportar erro. Envia POST para `/api/report-error`.

## 5.4 ShareButton (CLIENT)

**Arquivo:** `src/components/calculator/ShareButton.tsx`

Botão para compartilhar calculadora (Web Share API + fallback clipboard).

## 5.5 Header (CLIENT)

**Arquivo:** `src/components/layout/Header.tsx`

### Features
- Logo com brand identity
- Busca em tempo real (mínimo 2 caracteres)
- Dropdown com resultados (máx 6)
- Navegação desktop
- Menu mobile toggle
- Sincronizado com `getAllCalculators()`

### Estados
```typescript
const [menuOpen, setMenuOpen] = useState(false)
const [searchOpen, setSearchOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState("")
```

## 5.6 Footer

**Arquivo:** `src/components/layout/Footer.tsx`

- Links de categorias
- Calculadoras populares
- Links institucionais
- Aviso legal

## 5.7 LatestCalculatorsCarousel (CLIENT)

**Arquivo:** `src/components/home/LatestCalculatorsCarousel.tsx`

Carrossel horizontal com as 8 calculadoras mais recentes.

### Props
```typescript
interface LatestCalculatorsCarouselProps {
  calculators: Array<{
    name: string;
    slug: string;
    categorySlug: string;
    categoryName: string;
    subcategorySlug: string;
    subcategoryName: string;
    categoryIcon: string;
  }>;
}
```

### Configurações
- **Desktop:** 4 cards visíveis
- **Tablet:** 2 cards visíveis
- **Mobile:** 1 card visível
- **Autoplay:** 4 segundos
- **Navegação:** Setas esquerda/direita

---

# 6. CAMADA DE DADOS (LIB/DATA.TS)

## 6.1 Funções de Acesso

```typescript
// Categorias
getAllCategories(): Category[]
getCategoryBySlug(slug: string): Category | null
getCategoriesWithCount(): Category[]

// Subcategorias
getSubcategoriesByCategory(categoryId: number): Subcategory[]
getSubcategoryBySlug(categoryId: number, slug: string): Subcategory | null

// Calculadoras
getCalculatorsByCategory(categoryId: number): Calculator[]
getCalculatorsBySubcategory(subcategoryId: number): Calculator[]
getCalculatorBySlug(slug: string): Calculator | null
getRelatedCalculators(slugs: string[]): Calculator[]
getAllCalculators(): Calculator[]
getLatestCalculators(limit: number = 8): Calculator[]

// Contexto
getCategoryWithSubcategories(slug: string): {...}
getCalculatorWithContext(slug: string): {...}

// Helpers internos
getCategoryByCategoryId(id: number): Category | null
getSubcategoryById(id: number): Subcategory | null
```

---

# 7. SEO

## 7.1 SEO Generator

**Arquivo:** `src/lib/seo-generator.ts`

```typescript
interface SEOMetadata {
  title: string;
  description: string;
}

function generateCalculatorSEO(calculator: Calculator): SEOMetadata {
  // Se meta_title existe, usa
  // Se contém "CalcuLabs", remove duplicação
  // Se não tem "CalcuLabs", adiciona " | CalcuLabs"
  // Se não existe, gera: "{title} Online | CalcuLabs"
  
  // Se meta_description existe, usa
  // Se não existe, gera: "Use nossa {keyword}. Calcule rapidamente..."
}
```

## 7.2 Meta Tags por Página

### Home
- Title: "CalcuLabs | Calculadoras Online Gratuitas"
- Description: "Mais de 5.000 calculadoras online gratuitas..."
- OG: WebSite + SearchAction

### Categoria
- Title: "Calculadoras de {nome} | CalcuLabs"
- Description: "{n} calculadoras de {nome}..."

### Calculadora
- Title: seo.title (custom ou gerado)
- Description: seo.description (custom ou gerado)
- Keywords: Do JSON
- Canonical: URL completa
- OG: Article
- Twitter: summary_large_image

## 7.3 Schema.org

### Calculadora (JSON-LD)
```typescript
schemas = [
  Article,           // Principal
  BreadcrumbList,    // Navegação
  WebApplication,    // Identifica como app
  FinancialProduct,  // Se financeira
  Dataset,           // Dados de saída
  HowTo,             // Passos (se existirem)
  FAQPage            // FAQs (se existirem)
]
```

---

# 8. API ROUTES

## 8.1 /api/report-error

**Arquivo:** `src/app/api/report-error/route.ts`

**Método:** POST
**Body:**
```json
{
  "calculatorName": "string",
  "errorDescription": "string"
}
```

**Comportamento:**
1. Valida campos obrigatórios
2. Se SMTP configurado → envia email
3. Se não → log no console (dev)

**Variáveis de Ambiente:**
```env
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
REPORT_FROM_EMAIL
REPORT_TO_EMAIL
```

## 8.2 /api/seed

**Arquivo:** `src/app/api/seed/route.ts`

Executa seed do banco de dados (não usado atualmente).

---

# 9. ANALYTICS

## 9.1 Módulo Analytics

**Arquivo:** `src/lib/analytics.ts`

```typescript
function track(event: string, parameters: Record<string, any>) {
  // Verifica se client-side
  if (typeof window === "undefined") return;
  
  // Push para dataLayer do GTM
  window.dataLayer.push({ event, ...parameters });
}
```

## 9.2 Google Tag Manager

**Container ID:** GTM-WCJ4FLF7

**Arquivo:** `src/app/layout.tsx`

```tsx
<GoogleTagManager gtmId="GTM-WCJ4FLF7" />
```

## 9.3 Eventos Rastreados

| Evento | Quando | Parâmetros |
|--------|--------|-------------|
| calculadora_visualizada | Page load | calculadora_nome, calculadora_categoria, calculadora_subcategoria |
| resultado_calculado | Cálculo executado | calculadora_nome, calculadora_categoria, calculadora_subcategoria |
| campo_alterado | Input modificado | campo_nome, calculadora_nome, calculadora_categoria, calculadora_subcategoria |

---

# 10. INFRAESTRUTURA

## 10.1 Deploy

| Ambiente | URL | Plataforma |
|----------|-----|------------|
| Produção | https://www.calculabs.com.br | Vercel |
| Desenvolvimento | Local (bun dev) | - |

## 10.2 Repositórios

| Remote | URL |
|--------|-----|
| origin | https://builder.kiloapps.io/apps/d6e26f10-c5ca-4a2f-86eb-2bf7ed6fbd9a.git |
| github | https://github.com/calculabs-adm/calculabs.git |

## 10.3 Variáveis de Ambiente

```env
# Obrigatório
NEXT_PUBLIC_SITE_URL=https://www.calculabs.com.br

# Opcional (Report Error)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
REPORT_FROM_EMAIL=
REPORT_TO_EMAIL=

# Opcional (Banco)
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

---

# 11. INVENTÁRIO COMPLETO

## 11.1 Categorias

| ID | Nome | Slug | Ícone | Cor | Calculadoras |
|----|------|------|-------|------|--------------|
| 6 | Finanças Pessoais | financas-pessoais | 💰 | #10b981 | 20 |
| 7 | Trabalhista e Tributário | trabalhista-tributario | ⚖️ | #f59e0b | 10 |
| 8 | Matemática | matematica | 📐 | #6366f1 | 14 |
| 9 | Saúde | saude | 🏥 | #ef4444 | 8 |
| 10 | Utilitários | utilitarios | 🔧 | #8b5cf6 | 4 |
| 11 | Física | fisica | ⚛️ | #0ea5e9 | 1 |

## 11.2 Subcategorias

| ID | Category | Nome | Slug |
|----|----------|------|------|
| 13 | 6 | Juros e Investimentos | juros-investimentos |
| 14 | 6 | Financiamentos e Empréstimos | financiamentos-emprestimos |
| 17 | 7 | Trabalhista | trabalhista |
| 19 | 8 | Matemática Básica | basica |
| 20 | 8 | Álgebra | algebra |
| 21 | 8 | Geometria | geometria |
| 22 | 9 | Corpo e Metabolismo | corpo-metabolismo |
| 23 | 10 | Conversores | conversores |
| 24 | 10 | Datas | datas |
| 25 | 9 | Gravidez | gravidez |
| 26 | 11 | Quântica | quantica |

## 11.3 Calculadoras

(Ver lista completa no arquivo: Inventário será gerado automaticamente)

---

# 12. FLUXO COMPLETO DO SISTEMA

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. REQUISIÇÃO HTTP                                                  │
│ URL: /financas-pessoais/juros-investimentos/juros-compostos          │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. NEXT.JS ROUTER                                                   │
│ - Identifica rota: [categoria]=[categoria]                           │
│                     [subcategoria]=[subcategoria]                     │
│                     [calculo]=[slug]                                  │
│ - Server Component executa                                           │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. getCalculatorWithContext(slug)                                    │
│ - getCalculatorBySlug() → calculators.json                           │
│ - getCategoryByCategoryId() → categories.json                        │
│ - getSubcategoryById() → subcategories.json                          │
│ - getRelatedCalculators() → related_slugs                           │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. generateMetadata()                                                │
│ - generateCalculatorSEO() → {title, description}                    │
│ - canonical URL                                                      │
│ - OpenGraph + Twitter cards                                          │
│ - JSON-LD schemas                                                    │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. SERVER COMPONENT RENDERIZA                                        │
│ HTML + JSON-LD                                                       │
│   - Header (Client - busca)                                         │
│   - Breadcrumb                                                       │
│   - CalculatorWidget (Client)                                        │
│     ├─ Parse variables JSON                                         │
│     ├─ Render form inputs                                            │
│     └─ Client-side formula engine                                   │
│   - Fórmula display                                                  │
│   - Steps (HowTo)                                                   │
│   - Example                                                          │
│   - Applications                                                     │
│   - Curiosity (Você Sabia?)                                         │
│   - FAQs (FAQPage)                                                   │
│   - Related calculators                                              │
│   - Footer                                                           │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. CLIENTE RECEBE HTML                                              │
│ - React hydration                                                   │
│ - CalculatorWidget inicializa estados                                │
│ - Valores default são populados                                      │
│ - Tracker dispara "calculadora_visualizada"                          │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. USUÁRIO INTERAGE                                                │
│ - Altera input                                                      │
│ - Tracker dispara "campo_alterado"                                  │
│ - Clica em "Calcular"                                               │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 8. evaluateClientFormula()                                          │
│ - Parse fórmula                                                     │
│ - Inject user variables                                             │
│ - Executa com Math helpers                                          │
│ - Processa if-else → ternary                                       │
│ - Retorna resultados                                                │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 9. formatResultValue()                                             │
│ - Identifica tipo (currency/percent/scientific/default)             │
│ - Formata para display                                              │
│ - Exibe resultado                                                   │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 10. ANALYTICS                                                       │
│ - Tracker dispara "resultado_calculado"                             │
└──────────────────────────────────────────────────────────────────────┘
```

---

# 13. PROBLEMAS E RISCOS

## 13.1 Alto Severidade

| # | Problema | Impacto | Local |
|---|----------|---------|-------|
| 1 | **eval() via Function constructor** | Risco XSS | formula-engine.ts, CalculatorWidget.tsx |
| 2 | **Banco schema definido mas não usado** | Duplicação dados | src/db/ vs src/data/ |
| 3 | **ID 98 ausente** | Inconsistência | calculators.json |

## 13.2 Média Severidade

| # | Problema | Impacto | Local |
|---|----------|---------|-------|
| 1 | API sem rate limiting | Abuso | /api/report-error |
| 2 | Variáveis default inconsistentes | UX | Nem todas calculadoras |
| 3 | Nenhum sistema de cache | Performance | - |

## 13.3 Baixa Severidade

| # | Problema | Impacto | Local |
|---|----------|---------|-------|
| 1 | Descrição "50+ calculadoras" | Outdated | stats bar |
| 2 | Search em client carrega tudo | Memory | Header.tsx |

---

# 14. SEGURANÇA

## 14.1 Medidas Implementadas

✅ React escaping automático  
✅ Type coercion em eval  
✅ Sanitização de inputs (number parsing)  
✅ Headers de segurança via Vercel  
✅ CSP via Next.js  

## 14.2 Vulnerabilidades Potenciais

⚠️ **Formula Engine** usa `new Function()` que permite execução de código arbitrário. Embora seja isolado ao escopo, representa risco se:
- Usuário consegue injetar fórmula maliciosa
- Dados JSON são comprometidos

**Mitigação recomendada:**
- Validar fórmula contra whitelist de operações
- Usar parser de expressão matemática seguro (ex: mathjs parse)

---

# 15. TESTES E QUALIDADE

## 15.1 Comandos Disponíveis

```bash
bun typecheck    # Verificação TypeScript
bun lint         # ESLint
bun build       # Build produção
bun dev         # Desenvolvimento
```

## 15.2 Status Atual

```
$ bun typecheck
$ tsc --noEmit
✅ Pass

$ bun lint
$ eslint
✅ Pass
```

---

*Documento gerado automaticamente em 14/03/2026*
*Análise baseada em código fonte completo do projeto*
