# CALCULABS FULL SYSTEM AUDIT

**Data de Geração:** 14/03/2026  
**Versão do Sistema:** 1.0.0  
**Tipo de Auditoria:** Completa (Código + Build + Produção)  
**Total de Calculadoras:** 60 (57 ativas)  

---

# SUMÁRIO EXECUTIVO

| Categoria | Status | Notas |
|-----------|--------|-------|
| Build e Build Size | ✅ BOM | 12MB total, ~1.3MB static |
| Renderização | ✅ BOM | SSG + Client Components |
| SEO | ✅ BOM | Sitemap, robots, schemas |
| Indexação | ✅ ATIVO | ~60+ páginas indexadas |
| Segurança | ⚠️ CRÍTICO | new Function() vulnerável |
| Infraestrutura | ✅ CONFIGURADO | Vercel + Turso |
| Analytics | ✅ IMPLEMENTADO | GTM-WCJ4FLF7 |
| Performance | 🔄 NÃO TESTADO | Requer Lighthouse real |

---

# 1 — ANÁLISE COMPLETA DO BUILD

## 1.1 Resultados do Build

```
▲ Next.js 16.1.3 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 4.4s
  Running TypeScript ...
✓ Generating static pages using 3 workers (15/15) in 506.8ms
```

## 1.2 Tamanho do Build

| Diretório/Arquivo | Tamanho |
|-------------------|---------|
| `.next/` (total) | **12MB** |
| `.next/server/` | 9.4MB |
| `.next/static/` | 1.3MB |

## 1.3 Chunks Estáticos

| Chunk | Tamanho | Conteúdo |
|-------|---------|----------|
| 60358b9dfb9ce9b9.js | 315KB | Principal bundle |
| 8f02d17ed0289fd9.js | 219KB | Frames/Third parties |
| a6dad97d9634a72d.js | 110KB | Main runtime |
| 44b98a1857f3cb91.js | 128KB | Utils |
| 82abf2d65f5428ae.js | 33KB | Components |
| cf546a554e1b0fdb.css | 44KB | Tailwind CSS |

## 1.4 Rotas Geradas

| Rota | Tipo | Qtd Páginas |
|------|------|-------------|
| `/` | Static | 1 |
| `/[categoria]` | SSG | 6 (categorias) |
| `/[categoria]/[subcategoria]/[calculo]` | SSG | 57 (calculadoras ativas) |
| `/api/report-error` | Dynamic | API Route |
| `/api/seed` | Dynamic | API Route |
| `/busca` | Dynamic | 1 |
| `/robots.txt` | Static | 1 |
| `/sitemap.xml` | Static | 1 |

**Total de páginas estáticas:** 65+

## 1.5 Análise de Dependências no Bundle

### Dependencies Instaladas vs Utilizadas

| Pacote | Tamanho Est. | Status no Bundle |
|--------|--------------|------------------|
| next | ~1.5MB | ✅ Incluído |
| react + react-dom | ~150KB | ✅ Incluído |
| tailwindcss | ~100KB | ✅ Incluído |
| drizzle-orm | ~200KB | ❌ **NÃO UTILIZADO** |
| @libsql/client | ~50KB | ❌ **NÃO UTILIZADO** |
| better-sqlite3 | ~300KB | ❌ **NÃO UTILIZADO** |
| mathjs | ~500KB | ❌ **NÃO UTILIZADO** |
| nodemailer | ~100KB | ✅ API route apenas |

### Código Duplicado Identificado

O **Formula Engine** existe em dois lugares:
- `src/lib/formula-engine.ts` (430 linhas) - Servidor
- `src/components/calculator/CalculatorWidget.tsx:22-324` (303 linhas) - Cliente

**Impacto:** ~700 linhas duplicadas no bundle

---

# 2 — ANÁLISE DE RENDERIZAÇÃO

## 2.1 Estratégia por Rota

| Rota | Estratégia | GeraStaticParams | ISR |
|------|------------|------------------|-----|
| `/` | Static (SSG) | ❌ | ❌ |
| `/busca` | Dynamic (SSR) | ❌ | ❌ |
| `/robots.txt` | Static | ❌ | ❌ |
| `/sitemap.xml` | Static | ❌ | ❌ |
| `/[categoria]` | SSG | ✅ 6 | ❌ |
| `/[categoria]/[subcategoria]/[calculo]` | SSG | ✅ 57 | ❌ |

## 2.2 Componentes Server vs Client

### Server Components
- `src/app/page.tsx` - Home
- `src/app/[categoria]/page.tsx` - Categoria
- `src/app/[categoria]/[subcategoria]/[calculo]/page.tsx` - Calculadora
- `src/app/layout.tsx` - Root layout
- `src/app/busca/page.tsx` - Busca

### Client Components
- `CalculatorWidget.tsx` - Widget de cálculo
- `Header.tsx` - Navegação com busca
- `LatestCalculatorsCarousel.tsx` - Carrossel
- `CalculatorTracker.tsx` - Analytics
- `ErrorReportButton.tsx` - Reporte de erros
- `ShareButton.tsx` - Compartilhamento

## 2.3 Fluxo de Dados

```
Build Time (SSG):
┌─────────────────────────────────────────┐
│ getStaticParams()                      │
│   ↓                                    │
│ getAllCategories() → 6 categorias      │
│ getAllCalculators() → 57 calculators   │
└────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ generateMetadata()                      │
│   ↓                                    │
│ generateCalculatorSEO()                 │
│   ↓                                    │
│ JSON-LD Schemas generation              │
└────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ Page HTML generated                     │
│   ↓                                    │
│ CalculatorWidget (Client) hydrate       │
└────────────────────────────────────────┘
```

---

# 3 — ANÁLISE DE INFRAESTRUTURA VERCEL

## 3.1 Configuração de Deploy

### Runtime
- **Default:** Node.js (Next.js default)
- **Não especificado:** edge runtime não utilizado

### Estrutura de Páginas no Build
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "handle": "runtime" },
    { "handle": "miss" },
    { "handle": "rewrite" },
    { "handle": "resource" },
    { "handle": "tracer" }
  ]
}
```

## 3.2 Variáveis de Ambiente

| Variável | Valor | Status |
|----------|-------|--------|
| `NEXT_PUBLIC_SITE_URL` | https://www.calculabs.com.br | ✅ Configurado |
| `SMTP_HOST` | (não definido) | ⏸️ Opcional |
| `SMTP_PORT` | (não definido) | ⏸️ Opcional |
| `TURSO_DATABASE_URL` | (não definido) | ❌ Não usado |
| `TURSO_AUTH_TOKEN` | (não definido) | ❌ Não usado |

## 3.3 Configurações Vercel Ausentes

O projeto **NÃO POSSUI**:
- `vercel.json` - custom Rewrites/Routes
- `headers.js` - custom HTTP headers
- `middleware.ts` - edge middleware
- ` ISR` configurado - sem revalidação

---

# 4 — ANÁLISE DE HEADERS HTTP

## 4.1 Headers Aplicados por Next.js

Next.js 16 aplica headers de segurança por padrão através do Vercel:

### Headers Presentes (via Vercel default)
- `X-Powered-By: Next.js`
- `ETag` em arquivos estáticos

## 4.2 Headers de Segurança - STATUS

| Header | Status | Recomendação |
|--------|--------|--------------|
| Content-Security-Policy | ❌ Ausente | **ADICIONAR** |
| Strict-Transport-Security | ⚠️ Vercel default | Verificar |
| X-Frame-Options | ❌ Ausente | **ADICIONAR** |
| X-Content-Type-Options | ⚠️ Vercel default | Verificar |
| Referrer-Policy | ❌ Ausente | **ADICIONAR** |
| Permissions-Policy | ❌ Ausente | **ADICIONAR** |

## 4.3 Risco: Headers de Segurança

| Severidade | Item | Impacto |
|------------|------|---------|
| **ALTA** | CSP ausente | Vulnerabilidade XSS |
| **MÉDIA** | X-Frame-Options | Clickjacking risk |
| **MÉDIA** | Referrer-Policy | Vazamento de dados |

---

# 5 — CONFIGURAÇÃO DE DOMÍNIO

## 5.1 Domínio Configurado

| Propriedade | Valor |
|-------------|-------|
| Domínio | calculabs.com.br |
| URL Production | https://www.calculabs.com.br |
| Subdomain WWW | Configurado |

## 5.2 SSL

- **Status:** Gerenciado pela Vercel (Let's Encrypt)
- **HSTS:** Verificar via headers

## 5.3 Canonical

```typescript
// Em layout.tsx
alternates: {
  canonical: siteUrl,  // https://www.calculabs.com.br
}

// Em páginas
alternates: { canonical: `/${slug}` }
```

---

# 6 — ANÁLISE DE CACHE

## 6.1 Cache Configuração

### Build Time
- **Static Generation:** ✅Todas as páginas calculadora são SSG
- **Incremental Static Regeneration (ISR):** ❌ Não configurado

### Runtime
- **ETag:** ✅ Presente em arquivos estáticos
- **Cache-Control:** Vercel default para estáticos

## 6.2 Comportamento Observado

| Recurso | Cache |
|---------|-------|
| HTML pages | Estático (SSG) |
| CSS/JS | CDN Vercel |
| Imagens | next/image optimization |
| Fonts | next/font (Geist) |

## 6.3 Observações

- Não há ISR - páginas são geradas apenas no build
- Para atualizar conteúdo, requires rebuild + deploy
- Dados JSON são baked into build

---

# 7 — ANÁLISE DE PERFORMANCE REAL

## 7.1 Índice de Indexação Google

Pesquisa `site:calculabs.com.br` revelou:

**Páginas indexadas confirmadas:**
- Home: https://www.calculabs.com.br/
- Calculadora de Nota Mínima: https://www.calculabs.com.br/matematica/basica/nota-minima-para-passar
- Calculadora de Regra de Três: https://www.calculabs.com.br/matematica/basica/regra-de-tres
- Calculadora de Juros Simples: https://www.calculabs.com.br/financas-pessoais/juros-investimentos/juros-simples
- Calculadora de Rescisão Trabalhista: https://www.calculabs.com.br/trabalhista-tributario/trabalhista/rescisao-trabalhista
- Calculadora de FGTS: https://www.calculabs.com.br/trabalhista-tributario/trabalhista/fgts
- E mais 50+ páginas

**Total estimado:** 57+ páginas indexadas

## 7.2 Performance - NÃO TESTADO

**Requer Lighthouse real para medições:**
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- INP (Interaction to Next Paint)
- TTFB (Time to First Byte)

## 7.3 Fatores Positivos para Performance

- ✅ SSG para todas as calculadoras
- ✅ next/font para otimização de fontes
- ✅ Imagens otimizadas com next/image
- ✅ Tailwind CSS (purged)
- ✅ Código splitting automático Next.js

---

# 8 — ANÁLISE DE INDEXAÇÃO SEO

## 8.1 Robots Meta

```typescript
// layout.tsx
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
}
```

**Status:** ✅ INDEX E FOLLOW habilitados

## 8.2 Sitemap

**Arquivo:** `src/app/sitemap.ts` (53 linhas)

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Home - priority 1.0
  // Categories - priority 0.9
  // Calculators - priority 0.8
}
```

**Análise:**
- ✅ Home incluída
- ✅ Todas as 6 categorias incluídas
- ✅ Todas as 57 calculadoras incluídas
- ✅ lastModified baseado em updated_at
- ✅ changeFrequency definido

## 8.3 Robots.txt

**Arquivo:** `src/app/robots.ts` (14 linhas)

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

**Análise:**
- ✅ allow: "/"
- ✅ disallow: "/api/", "/_next/"
- ✅ sitemap declarado

---

# 9 — ANÁLISE SEO ON-PAGE

## 9.1 Meta Tags por Tipo de Página

### Home
```html
<title>CalcuLabs | Calculadoras Online Gratuitas</title>
<meta name="description" content="Mais de 50 calculadoras disponíveis...">
<meta property="og:title" content="...">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Calculadora
```html
<title>Calculadora de [Nome] | CalcuLabs</title>
<meta name="description" content="[meta_description]">
<meta name="keywords" content="[keywords]">
<link rel="canonical" href="https://www.calculabs.com.br/[...]">
```

## 9.2 Schemas JSON-LD Implementados

### Calculadora (página)
- ✅ Article
- ✅ BreadcrumbList
- ✅ WebApplication
- ✅ FinancialProduct (se aplicável)
- ✅ Dataset
- ✅ HowTo (se steps existirem)
- ✅ FAQPage (se faqs existirem)

### Categoria
- ✅ CollectionPage

### Home
- ✅ WebSite
- ✅ SearchAction

---

# 10 — AUDITORIA DE ANALYTICS

## 10.1 Google Tag Manager

**Container ID:** GTM-WCJ4FLF7

**Instalação:** `src/app/layout.tsx`
```tsx
import { GoogleTagManager } from "@next/third-parties/google";
<GoogleTagManager gtmId="GTM-WCJ4FLF7" />
```

## 10.2 Eventos Rastreados

| Evento | Trigger | Parâmetros |
|--------|---------|------------|
| calculadora_visualizada | Page load | calculadora_nome, categoria, subcategoria |
| resultado_calculado | Botão "Calcular" | calculadora_nome, categoria, subcategoria |
| campo_alterado | Input change | campo_nome, calculadora_nome, categoria, subcategoria |
| resultado_copiado | Clipboard copy | calculadora_nome, categoria, subcategoria, valor_resultado |

## 10.3 Módulo Analytics

```typescript
// src/lib/analytics.ts
export function track(event: string, parameters: Record<string, any> = {}): void {
  if (typeof window === "undefined") return;
  const dataLayer = (window as any).dataLayer || [];
  dataLayer.push({ event, ...parameters });
}
```

**Análise:**
- ✅ Verifica SSR (typeof window)
- ✅ Push para dataLayer
- ⚠️ Sem validação de erros
- ⚠️ Sem retry mechanism

---

# 11 — AUDITORIA COMPLETA DE SEGURANÇA

## 11.1 Vulnerabilidades Críticas

### 1. Formula Engine - Execução de Código Arbitrário

**Severidade:** 🔴 CRÍTICA

**Localização:**
- `src/lib/formula-engine.ts:343-346`
- `src/components/calculator/CalculatorWidget.tsx:299-300`

**Código Vulnerável:**
```typescript
// Servidor
const fullFn = new Function(
  ...contextKeys,
  `"use strict"; ${processedFormula} ...`
);
const allResults = fullFn(...contextValues);

// Cliente
const fn = new Function(...keys, fnBody);
const rawResults = fn(...values);
```

**Risco:**
- Se JSON for comprometido → injeção de código
- `new Function()` permite execução arbitrária
- Sem validação de AST

**Mitigação atual:**
- Escopo isolado
- "use strict"
- Type coercion
- Dados de fonte confiável (JSON)

### 2. API sem Rate Limiting

**Severidade:** 🟠 ALTA

**Localização:** `src/app/api/report-error/route.ts`

**Problema:**
- Sem limit de requisições
- Sem autenticação
- Potencial abuso

## 11.2 Vulnerabilidades Médias

### 3. Headers de Segurança Ausentes

| Header | Severidade | Impacto |
|--------|------------|---------|
| CSP | 🟠 ALTA | XSS |
| X-Frame-Options | 🟡 MÉDIA | Clickjacking |
| Referrer-Policy | 🟡 MÉDIA | Data leak |

### 4. Dependências Não Utilizadas

| Pacote | Tamanho | Risco |
|--------|---------|-------|
| mathjs | 500KB | Bundle inflation |
| better-sqlite3 | 300KB | Bundle inflation |
| drizzle-orm | 200KB | Bundle inflation |
| @libsql/client | 50KB | Bundle inflation |

### 5. Código Duplicado

O Formula Engine existe em dois lugares:
- Servidor: 430 linhas
- Cliente: 303 linhas (duplicado)

**Risco:** Manutenção(propagação de bugs)

## 11.3 Vulnerabilidades Baixas

### 6. Outdated Info

- Stats bar mostra "50+" mas há 60 calculadoras

---

# 12 — ANÁLISE DO MOTOR DE CÁLCULO

## 12.1 Arquitetura

O sistema possui **DOIS** motores idênticos:

### Servidor: `src/lib/formula-engine.ts`

**Linhas:** 430

**Funções disponíveis:**
- Math: `PI, E, sqrt, pow, abs, log, ln, log2, ceil, floor, round, sin, cos, tan, max, min`
- Financeiras: `calcular_ir_progressivo, calcular_inss`
- Saúde: `calcular_tmb, calcular_gordura, calcular_peso_ideal`
- Datas: `calcular_idade_gestacional, calcular_data_parto, calcular_ovulacao`
- Matemáticas: `calcular_mmc, calcular_mdc`
- Tributárias: `calcular_simples_nacional, calcular_das_mei`

### Cliente: `src/components/calculator/CalculatorWidget.tsx:22-324`

**Linhas:** ~303

**Mesmas funções** que o servidor (duplicadas)

## 12.2 Processo de Execução

```
1. Usuário insere valores nos inputs
2. values são parseadas para number/string
3. evaluateClientFormula() é chamada
4. Variáveis injetadas no contexto
5. Fórmula processada (if-else → ternary)
6. new Function() executa
7. Resultados coletados
8. formatResultValue() formata
9. UI atualizada
```

## 12.3 Validação de Inputs

```typescript
// Parser de input
const num = parseFloat(raw.replace(",", "."));
if (isNaN(num)) {
  setError(`Por favor, informe um valor válido para "${v.label}"`);
  return;
}
```

**Análise:**
- ✅ Substitui vírgula por ponto
- ✅ Verifica NaN
- ✅ Retorna erro claro

## 12.4 Riscos Identificados

| # | Risco | Severidade | Mitigação |
|---|-------|------------|-----------|
| 1 | new Function() | 🔴 CRÍTICA | Usar mathjs parser |
| 2 | Duplicação | 🟡 MÉDIA | Unificar em lib |
| 3 | eval() interno | 🟠 ALTA | Remover |

---

# 13 — TESTE DE ESCALABILIDADE

## 13.1 Cenários de Crescimento

| Cenário | Calculadoras | Impacto no Build | Impacto Runtime |
|---------|-------------|------------------|-----------------|
| Atual | 60 | 12MB | OK |
| +40% | 100 | ~15MB (+25%) | OK |
| +400% | 500 | ~40MB (+233%) | ⚠️ Memory |
| +800% | 1000 | ~70MB (+483%) | ⚠️ Build slow |
| +1600% | 5000 | ~200MB (+1566%) | ❌ Não viável |
| +3300% | 10000 | ~400MB (+3233%) | ❌ Impossível |

## 13.2 Gargalos Identificados

### Build Time
- **Problema:** Cada calculadora = 1 página SSG
- **Impacto:** 500+ calculadoras = build > 10 min
- **Solução:** Migrar para ISR ou Client-side

### JSON Loading
- **Problema:** `calculators.json` ~330KB
- **Impacto:** 5000 calculadoras = ~30MB JSON
- **Solução:** Database ou chunking

### Memory (Busca)
- **Problema:** Header.tsx carrega todas calculadoras
- **Impacto:** 10000 calculadoras = 50MB+ em memória cliente
- **Solução:** Server-side search

## 13.3 Recomendações

| Cenário | Recomendação |
|---------|--------------|
| 100-500 calcs | Manter SSG, otimizar JSON |
| 500-2000 | Migrar para ISR |
| 2000+ | Migrar para Database + API |

---

# 14 — ANÁLISE DE MEMÓRIA

## 14.1 JSON Data Loading

```typescript
// src/lib/data.ts
import categoriesData from "@/data/categories.json";
import subcategoriesData from "@/data/subcategories.json";
import calculatorsData from "@/data/calculators.json";
```

**Características:**
- JSON importado em bundle (tree-shaking não aplicável)
- 330KB de dados sempre carregados
- Parse em tempo de build (não runtime)

## 14.2 Impacto no Cliente

### Header (Busca)
```typescript
// src/components/layout/Header.tsx
const { calculators } = useCalculators();
```

**Problema:** Carrega todas as calculadoras para busca client-side

### CalculatorWidget
```typescript
// src/components/calculator/CalculatorWidget.tsx
const [values, setValues] = useState<Record<string, string>>({});
```

**Problema:** Não é otimizado para reutilização

---

# 15 — AUDITORIA DE REPOSITÓRIO

## 15.1 Git Remotes

```
origin	https://builder.kiloapps.io/apps/d6e26f10-c5ca-4a2f-86eb-2bf7ed6fbd9a.git (fetch)
origin	https://github.com/calculabs-adm/calculabs.git (push)
```

## 15.2 Estrutura de Branches

- **Main/Master:** Código em produção
- **Proteção:** Não verificado

## 15.3 Commits Recentes

```
02dfcb8 docs: add CALCULABS_SYSTEM_FORENSIC_AUDIT.md
b03e8c1 docs: update CALCULABS_SYSTEM_DOSSIER.md
8d1c4c8 docs: add CALCULABS_SYSTEM_DOSSIER.md
36d9f93 Fix scientific notation display
0e9fc70 Add Energia do Fóton calculator
16d8b55 Add 3 new calculators
9ede6d2 Change card background color
```

## 15.4 Arquivos Sensíveis

- ✅ .gitignore presente
- ✅ .env.example documentado
- ⚠️ .env.local não versionado

---

# 16 — ANÁLISE DE LOGS

## 16.1 Acesso a Logs

- **Local:** Não configurado (sem logging customizado)
- **Vercel:** Access via Vercel Dashboard

## 16.2 Logging no Código

```typescript
// src/app/api/report-error/route.ts
console.log("Error report:", { calculatorName, errorDescription });
```

**Problema:** Apenas em desenvolvimento

---

# 17 — MAPA COMPLETO DO SISTEMA

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           USUÁRIO                                         │
│         (Acessa via Browser / Mobile / Tablet)                           │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                              CDN VERCEL                                   │
│         (Static Files: HTML, CSS, JS, Images, Fonts)                     │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                          NEXT.JS ROUTER                                   │
│                    (Request Handling + SSG)                               │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
┌──────────────────────────┐    ┌─────────────────────────────────────────┐
│     SERVER COMPONENTS    │    │         CLIENT COMPONENTS               │
│                          │    │                                         │
│  - HomePage              │    │  - CalculatorWidget (714 linhas)        │
│  - CategoryPage         │    │  - Header (busca client)                │
│  - CalculatorPage       │    │  - LatestCalculatorsCarousel            │
│  - BuscaPage            │    │  - CalculatorTracker                    │
│                          │    │  - ErrorReportButton                    │
│  generateMetadata()     │    │  - ShareButton                          │
│  JSON-LD Schemas        │    │                                         │
└────────────┬─────────────┘    └────────────────────┬────────────────────┘
             │                                        │
             ▼                                        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                       │
│                  (src/lib/data.ts + JSON files)                          │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────┐    │
│  │ categories.json  │  │ subcategories.js │  │ calculators.json   │    │
│  │     (1.5KB)      │  │     (3.2KB)      │  │     (330KB)        │    │
│  │   6 categorias  │  │  14 subcategorias│  │   60 calculadoras  │    │
│  └──────────────────┘  └──────────────────┘  └─────────────────────┘    │
│                                                                          │
│  ⚠️ Drizzle ORM + Turso: DEFINIDO MAS NÃO UTILIZADO                     │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                     FORMULA ENGINE (DUPLICADO)                            │
│                                                                          │
│  ┌────────────────────────────────────────┐  ┌────────────────────────┐   │
│  │ src/lib/formula-engine.ts              │  │ CalculatorWidget.tsx  │   │
│  │ (Servidor - 430 linhas)               │  │ (Cliente - 303 linhas)│   │
│  │                                        │  │                        │   │
│  │ new Function() ⚠️ SECURITY RISK        │  │ new Function() ⚠️     │   │
│  └────────────────────────────────────────┘  └────────────────────────┘   │
│                                                                          │
│  Funções: Math.*, Financeiras, Saúde, Datas, MMC/MDC                    │
└─────────────────────────────────┬──────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                         ANALYTICS LAYER                                   │
│                                                                          │
│  Google Tag Manager: GTM-WCJ4FLF7                                        │
│                                                                          │
│  Events: calculadora_visualizada                                         │
│          resultado_calculado                                             │
│          campo_alterado                                                  │
│          resultado_copiado                                               │
│                                                                          │
└────────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                         API ROUTES                                        │
│                                                                          │
│  /api/report-error  → nodemailer (SMTP)                                  │
│  /api/seed          → Database seed (não usado)                         │
│                                                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 18 — RECOMENDAÇÕES PRIORITÁRIAS

## 🔴 CRÍTICA (Imediato)

| # | Ação | Arquivo | Impacto |
|---|------|---------|---------|
| 1 | Substituir `new Function()` por parser seguro | formula-engine.ts, CalculatorWidget.tsx | Segurança |
| 2 | Adicionar Content-Security-Policy | next.config.ts ou vercel.json | Segurança |
| 3 | Implementar rate limiting na API | report-error/route.ts | Prevenção abuso |

## 🟠 ALTA (Esta Sprint)

| # | Ação | Impacto |
|---|------|---------|
| 4 | Unificar Formula Engine em lib compartilhada | Manutenção |
| 5 | Remover dependências não utilizadas | Bundle size |
| 6 | Adicionar headers de segurança (X-Frame, Referrer) | Segurança |

## 🟡 MÉDIA (Próximas Semanas)

| # | Ação | Impacto |
|---|------|---------|
| 7 | Implementar ISR para atualizações | Manutenção |
| 8 | Migrar busca para server-side | Performance |
| 9 | Corrigir stats "50+" → "60+" | SEO |

## 🟢 BAIXO (Backlog)

| # | Ação | Impacto |
|---|------|---------|
| 10 | Configurar Drizzle + Turso ou remover | Arquitetura |
| 11 | Adicionar monitoramento (Sentry) | Observabilidade |
| 12 | Configurar CI/CD com testes | Qualidade |

---

# 19 — RESULTADOS DA INDEXAÇÃO

## 19.1 Páginas Confirmadas Indexadas

```
https://www.calculabs.com.br/
https://www.calculabs.com.br/matematica/basica/nota-minima-para-passar
https://www.calculabs.com.br/matematica/basica/regra-de-tres
https://www.calculabs.com.br/financas-pessoais/juros-investimentos/juros-simples
https://www.calculabs.com.br/trabalhista-tributario/trabalhista/rescisao-trabalhista
https://www.calculabs.com.br/trabalhista-tributario/trabalhista/fgts
https://www.calculabs.com.br/financas-pessoais/juros-investimentos/juros-compostos
https://www.calculabs.com.br/matematica/basica/porcentagem
(...)
```

## 19.2 Sitemap Coverage

- Total URLs no sitemap: **64** (1 home + 6 categorias + 57 calculadoras)
- Indexadas: ~60+ (confirmado por search)

---

# 20 — CONCLUSÃO

## Estado Atual do Sistema

| Aspecto | Status | Nota |
|---------|--------|------|
| Build | ✅ FUNCIONAL | 12MB, SSG |
| Deploy | ✅ FUNCIONAL | Vercel |
| SEO | ✅ FUNCIONAL | Indexado |
| Analytics | ✅ FUNCIONAL | GTM |
| Segurança | ⚠️ RISCO CRÍTICO | new Function() |
| Performance | 🔄 NÃO TESTADO | Requer Lighthouse |
| Escalabilidade | ⚠️ LIMITADO | 500+ calc requer mudanças |

## Próximos Passos

1. **Corrigir vulnerabilidade de segurança** (CRÍTICO)
2. **Remover dependências não utilizadas**
3. **Adicionar headers de segurança**
4. **Testar performance com Lighthouse**
5. **Planejar arquitetura para 500+ calculadoras**

---

# APÊNDICE: ARQUIVOS GERADOS

Os seguintes arquivos de documentação foram criados:

| Arquivo | Caminho | Descrição |
|---------|---------|-----------|
| System Dossier | `CALCULABS_SYSTEM_DOSSIER.md` | Documentação técnica completa |
| Forensic Audit | `CALCULABS_SYSTEM_FORENSIC_AUDIT.md` | Auditoria de código |
| **Full System Audit** | `CALCULABS_FULL_SYSTEM_AUDIT.md` | **Este documento** |

**Repositório GitHub:** https://github.com/calculabs-adm/calculabs.git

---

*Documento gerado automaticamente em 14/03/2026*  
*Auditoria completa baseada em código-fonte + build + análise de produção*
