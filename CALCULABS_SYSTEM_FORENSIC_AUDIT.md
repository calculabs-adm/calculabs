# CALCULABS SYSTEM FORENSIC AUDIT

**Data de Geração:** 14/03/2026  
**Versão do Sistema:** 1.0.0  
**Total de Calculadoras:** 60 (57 ativas)  
**Tipo de Auditoria:** Forense Completa  

---

# 1. SUMÁRIO EXECUTIVO

Esta auditoria forense apresenta uma análise técnica aprofundada do projeto CalcuLabs, uma plataforma de calculadoras online desenvolvida com Next.js. O sistema atualmente disponibiliza 60 calculadoras distribuídas em 6 categorias principais, processando fórmulas matemáticas tanto no servidor quanto no cliente.

## Principais Descobertas

| Categoria | Status | Severidade |
|-----------|--------|------------|
| Segurança do Motor de Fórmulas | ⚠️ Risco Identificado | **CRÍTICA** |
| Arquitetura de Dados Duplicada | ⚠️ Dados não utilizados | **ALTA** |
| SEO e Meta Tags | ✅ Implementado | **BOM** |
| Analytics e Tracking | ✅ Implementado | **BOM** |
| Infraestrutura de Deploy | ✅ Configurado | **BOM** |
| Design System | ✅ Consistente | **BOM** |

---

# 2. ESTRUTURA DO PROJETO

## 2.1 Árvore de Diretórios

```
calcuabs/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── [categoria]/
│   │   │   ├── page.tsx                 # Página de categoria
│   │   │   └── [subcategoria]/
│   │   │       └── [calculo]/
│   │   │           └── page.tsx        # Página calculadora (810 linhas)
│   │   │
│   │   ├── api/
│   │   │   ├── report-error/
│   │   │   │   └── route.ts            # API de relatório de erros
│   │   │   └── seed/
│   │   │       └── route.ts            # API de seed
│   │   │
│   │   ├── busca/
│   │   │   └── page.tsx               # Página de busca
│   │   │
│   │   ├── layout.tsx                 # Root layout com GTM
│   │   ├── page.tsx                  # Home page
│   │   ├── sitemap.ts                # Sitemap dinâmico
│   │   ├── robots.ts                 # Robots.txt
│   │   ├── not-found.tsx             # Página 404
│   │   └── globals.css               # Estilos globais
│   │
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── CalculatorWidget.tsx   # Widget principal (714 linhas)
│   │   │   ├── CalculatorTracker.tsx # Tracking analytics
│   │   │   ├── ErrorReportButton.tsx # Botão reportar erro
│   │   │   └── ShareButton.tsx       # Botão compartilhar
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Cabeçalho com busca
│   │   │   └── Footer.tsx            # Rodapé
│   │   │
│   │   └── home/
│   │       └── LatestCalculatorsCarousel.tsx  # Carrossel
│   │
│   ├── data/
│   │   ├── calculators.json         # 60 calculadoras (330KB)
│   │   ├── categories.json           # 6 categorias
│   │   └── subcategories.json        # 14 subcategorias
│   │
│   ├── db/
│   │   ├── index.ts                 # Configuração Drizzle
│   │   ├── schema.ts                # Schema (NÃO UTILIZADO)
│   │   ├── seed.ts                  # Script de seed
│   │   └── migrate.ts               # Migrações
│   │
│   └── lib/
│       ├── data.ts                  # Camada de dados JSON
│       ├── formula-engine.ts        # Motor servidor (430 linhas)
│       ├── analytics.ts             # Tracking GTM
│       └── seo-generator.ts         # Gerador SEO
│
├── package.json                     # Dependências
├── next.config.ts                   # Configuração Next.js
├── tsconfig.json                    # TypeScript config
├── drizzle.config.ts                # Configuração Drizzle
├── postcss.config.mjs               # PostCSS/Tailwind
└── eslint.config.mjs                # ESLint config
```

## 2.2 Análise de Arquivos Críticos

### Arquivos Principais por Tamanho

| Arquivo | Linhas | Propriedade |
|---------|--------|-------------|
| page.tsx (calculadora) | 810 | Página principal |
| CalculatorWidget.tsx | 714 | Componente cliente |
| formula-engine.ts | 430 | Motor de cálculo |
| calculators.json | ~330KB | Dados (60 entries) |
| globals.css | 213 | Estilos |
| header.tsx | ~200 | Navegação |

---

# 3. ANÁLISE DE DEPENDÊNCIAS

## 3.1 Dependencies do package.json

```json
{
  "dependencies": {
    "next": "^16.1.3",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "drizzle-orm": "^0.45.1",
    "@libsql/client": "^0.17.0",
    "better-sqlite3": "^12.6.2",
    "mathjs": "^15.1.1",
    "nodemailer": "^8.0.1",
    "@next/third-parties": "^16.1.6"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.17",
    "@tailwindcss/postcss": "^4.1.17",
    "typescript": "^5.9.3",
    "eslint": "^9.39.1",
    "eslint-config-next": "^16.0.0",
    "drizzle-kit": "^0.31.9"
  }
}
```

## 3.2 Avaliação de Dependências

### Framework Principal

| Pacote | Versão | Status | Observações |
|--------|--------|--------|-------------|
| Next.js | 16.1.3 | ✅ Atual | Versão mais recente |
| React | 19.2.3 | ✅ Atual | Última versão estável |
| TypeScript | 5.9.3 | ✅ Atual | Suporte completo |

### Banco de Dados

| Pacote | Uso Atual | Status | Observações |
|--------|-----------|--------|-------------|
| drizzle-orm | ❌ Não usado | ⚠️ Installed | Schema definido mas não utilizado |
| @libsql/client | ❌ Não usado | ⚠️ Installed | Cliente Turso instalado mas ocioso |
| better-sqlite3 | ❌ Não usado | ⚠️ Installed | SQLite instalado mas não utilizado |

### Utilitários

| Pacote | Uso | Status |
|--------|-----|--------|
| mathjs | ❌ Não usado | Installed mas não utilizado |
| nodemailer | ✅ API report-error | Usado para enviar emails de erro |

## 3.3 Pontos de Atenção

1. **mathjs não utilizado**: O pacote mathjs está nas dependências mas não é usado no código. O motor de fórmulas utiliza implementação nativa com `Math.*` e `new Function()`.

2. **Dependências de banco não utilizadas**: Três pacotes relacionados a banco de dados estão instalados mas não são utilizados:
   - drizzle-orm
   - @libsql/client
   - better-sqlite3

3. **Recomendação**: Remover dependências não utilizadas para reduzir bundle size.

---

# 4. CONFIGURAÇÃO DE FRAMEWORK

## 4.1 next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "nodemailer"],
};

export default nextConfig;
```

**Análise:**
- Configuração mínima e limpa
- Apenas declara pacotes externos para o servidor
- Não há custom webpack config
- Não há image optimization customizado
- Não há redirects/rewrites configurados

## 4.2 tsconfig.json

O projeto utiliza TypeScript com strict mode. Verificações:
- ✅ Strict mode habilitado
- ✅ Path aliases configurados (@/)
- ✅ JSX preservado

## 4.3 ESLint

- ESLint 9.x com eslint-config-next
- Integração nativa Next.js
- Scripts disponíveis: `bun lint`, `bun typecheck`

## 4.4 PostCSS/Tailwind

- Tailwind CSS 4.x com PostCSS
- Configuração mínima (não há tailwind.config.ts, usa CSS-first)
- Variáveis CSS customizadas em globals.css

---

# 5. ANÁLISE DO MOTOR DE FÓRMULAS (CRÍTICO)

## 5.1 Arquitetura Dual

O sistema possui **DOIS** motores de cálculo idênticos em locais diferentes:

### Servidor: `src/lib/formula-engine.ts` (430 linhas)

```typescript
export function evaluateFormula(
  formula: string,
  variables: Record<string, number | string>
): CalculationResult {
  // Linha 32-392
  // Implementação completa com:
  // - Math helpers
  // - Funções financeiras
  // - Funções de saúde
  // - Processamento de if-else
}
```

### Cliente: `src/components/calculator/CalculatorWidget.tsx` (linhas 22-324)

```typescript
function evaluateClientFormula(
  formula: string,
  vars: Record<string, number | string>
): { success: boolean; results: ResultEntry[]; error?: string } {
  // Duplicação do motor de fórmulas
  // Mesma lógica que o servidor
}
```

## 5.2 Análise de Segurança - RISCO CRÍTICO

### Vulnerabilidade: Constructor Function

**Localização:**
- `src/lib/formula-engine.ts`:343-346
- `src/components/calculator/CalculatorWidget.tsx`:299-300

**Código Vulnerável:**

```typescript
// Servidor (formula-engine.ts:343)
const fullFn = new Function(
  ...contextKeys,
  `"use strict"; 
  let _out = {};
  try { ${processedFormula} } catch(e) {}
  ${assignments.map(...).join("\n")}
  return _out;`
);
const allResults = fullFn(...contextValues);

// Cliente (CalculatorWidget.tsx:299)
const fn = new Function(...keys, fnBody);
const rawResults = fn(...values) as Record<string, number | string>;
```

### Análise do Risco

| Aspecto | Avaliação |
|---------|-----------|
| Severidade | **CRÍTICA** |
| Impacto | Execução de código arbitrário |
| Probabilidade | Baixa (dados confiáveis) |
| OWASP | A1 - Injection |

### Fatores Mitigantes Existentes

1. **Escopo isolado**: O `new Function()` é executado em contexto isolado
2. **Type coercion**: Inputs são convertidos para number/string antes da injeção
3. **Sem acesso a globals**: Não expõe `window`, `document`, `fetch`, etc.
4. **Dados confiáveis**: As fórmulas vêm do JSON estático, não de usuário

### Fatores de Risco

1. **Se o JSON for comprometido**: Um atacante que conseguisse modificar o calculators.json poderia injetar código malicioso
2. **Se houver Stored XSS**: Em teoria, fórmulas podem conter código JavaScript arbitrário
3. **Duplicação de código**: Manter dois motores idênticos é propenso a erros

### Recomendação de Mitigação

```typescript
// Opção 1: Usar mathjs para parse seguro
import { parse, evaluate } from 'mathjs';

function safeEvaluate(formula: string, variables: Record<string, number>) {
  const node = parse(formula);
  // Validação prévia do AST
  if (!isSafe(node)) throw new Error('Unsafe formula');
  return evaluate(node, variables);
}

// Opção 2: Whitelist de operações
const ALLOWED_OPS = new Set(['+', '-', '*', '/', 'pow', 'sqrt', 'abs', ...]);
// Validar fórmula contra whitelist antes de executar
```

## 5.3 Funções Disponíveis no Motor

### Helpers Matemáticos (Math.*)

```typescript
PI, E, sqrt, pow, abs, log, ln, log2, 
ceil, floor, round, sin, cos, tan, max, min
```

### Funções Financeiras

```typescript
calcular_ir_progressivo(base)      // IRPF 2024
calcular_inss(salario)             // INSS 2024
calcular_ir(base)                  // Alias IR
calcular_inss_progressivo(salario) // INSS progressivo
```

### Funções de Saúde

```typescript
calcular_tmb(sexo, peso, altura_cm, idade)
calcular_gordura(sexo, altura, cintura, pescoco, quadril)
calcular_peso_ideal(sexo, altura)
calcular_idade_gestacional(data_ultima_menstruacao)
calcular_data_parto(data_ultima_menstruacao)
calcular_ovulacao(data_ultima_menstruacao, duracao_ciclo?)
```

### Funções Matemáticas Avançadas

```typescript
calcular_mmc(numerosStr)   // "2,4,6" → 12
calcular_mdc(numerosStr)    // "12,18" → 6
soma(arr)                  // [1,2,3] → 6
calcular_idade_exata(dataNascimento, dataAtual?)
calcular_diferenca_datas(dataInicial, dataFinal)
```

### Funções Tributárias

```typescript
calcular_simples_nacional(faturamento_mes, rbt12, anexo)
// Anexos: I, II, III, IV, V
calcular_das_mei(tipo_atividade)
// Tipo: "comercio", "servicos", "ambos"
```

## 5.4 Processamento de Fórmulas

### Suporte a if-else

O motor processa estruturas if-else convertendo para operador ternário:

```typescript
// Entrada
if (condicao) { x = valor1 } else { x = valor2 }

// Saída processada
x = (condicao) ? (valor1) : (valor2);
```

### Coleta de Resultados

O motor executa a fórmula e coleta todas as variáveis declaradas:

```typescript
const assignments = formula.split(";").filter((s) => s.trim());
const resultVarNames: string[] = [];

for (const line of assignments) {
  const match = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
  if (match && !match[1].startsWith("_")) {
    resultVarNames.push(match[1]);
  }
}
```

---

# 6. ARQUITETURA DE DADOS

## 6.1 Fonte de Dados Atual

O sistema utiliza **JSON files** como fonte primária:

| Arquivo | Tamanho | Registros |
|---------|---------|-----------|
| calculators.json | 330KB | 60 |
| categories.json | 1.5KB | 6 |
| subcategories.json | 3.2KB | 14 |

## 6.2 Camada de Banco Não Utilizada

### Schema Drizzle Definido (`src/db/schema.ts`)

O projeto possui schema completo definido para Drizzle ORM:

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
  formula: text().notNull(),
  variables: text().notNull(),  // JSON
  isActive: integer("boolean").default(true),
  viewCount: integer().default(0)
  // ... outros campos
})
```

### Análise

| Aspecto | Status |
|---------|--------|
| Schema definido | ✅ Sim |
| migrations/ | ❌ Ausentes |
| Usado no código | ❌ Não |
| Dados no banco | ❌ Não populado |

## 6.3 Problema: Duplicação de Dados

**Problema Identificado:**

O projeto mantém duas fontes de dados:
1. **JSON files** (ativos): `src/data/*.json`
2. **Drizzle + SQLite** (inativos): `src/db/*`

Isso representa:
- Duplicação de código
- Duplicação de manutenção
- Potencial inconsistência
- Bundle size desnecessário

---

# 7. SEO E METADATA

## 7.1 Meta Tags Implementadas

### Home Page

```html
<title>CalcuLabs | Calculadoras Online Gratuitas</title>
<meta name="description" content="Mais de 5.000 calculadoras online gratuitas...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Páginas de Calculadora

- ✅ Title customizável por calculadora
- ✅ Description customizável
- ✅ Keywords do JSON
- ✅ Canonical URL
- ✅ OpenGraph completo
- ✅ Twitter Cards

## 7.2 Schema.org Implementados

O sistema gera automaticamente os seguintes schemas JSON-LD:

| Schema | Contexto |
|--------|----------|
| Article | Conteúdo principal da calculadora |
| BreadcrumbList | Navegação hierárquica |
| WebApplication | Identifica como aplicação |
| FinancialProduct | Calculadoras financeiras |
| Dataset | Dados de saída |
| HowTo | Passos de cálculo (quando disponíveis) |
| FAQPage | FAQs (quando disponíveis) |

## 7.3 SEO Generator

**Arquivo:** `src/lib/seo-generator.ts`

```typescript
function generateCalculatorSEO(calculator: Calculator): SEOMetadata {
  // Se meta_title existe, usa
  // Se contém "CalcuLabs", remove duplicação
  // Se não tem "CalcuLabs", adiciona " | CalcuLabs"
  // Se não existe, gera: "{title} Online | CalcuLabs"
}
```

### Features Implementadas

- ✅ Fallback para titles faltantes
- ✅ Remoção de duplicação "CalcuLabs"
- ✅ Descrições geradas automaticamente
- ✅ Canonical URLs

---

# 8. ANALYTICS E TRACKING

## 8.1 Google Tag Manager

**Container ID:** GTM-WCJ4FLF7

**Arquivo:** `src/app/layout.tsx`

```tsx
<GoogleTagManager gtmId="GTM-WCJ4FLF7" />
```

## 8.2 Eventos Rastreados

| Evento | Trigger | Parâmetros |
|--------|---------|-------------|
| calculadora_visualizada | Page load | calculadora_nome, calculadora_categoria, calculadora_subcategoria |
| resultado_calculado | Clique em calcular | calculadora_nome, calculadora_categoria, calculadora_subcategoria |
| campo_alterado | Input modificado | campo_nome, calculadora_nome, calculadora_categoria, calculadora_subcategoria |
| resultado_copiado | Cópia de resultado | calculadora_nome, calculadora_categoria, calculadora_subcategoria, valor_resultado |

## 8.3 Módulo Analytics

**Arquivo:** `src/lib/analytics.ts`

```typescript
function track(event: string, parameters: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer.push({ event, ...parameters });
}
```

---

# 9. API ROUTES

## 9.1 /api/report-error

**Arquivo:** `src/app/api/report-error/route.ts`

**Método:** POST

**Payload:**
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

**Análise de Segurança:**
- ⚠️ Sem rate limiting
- ⚠️ Sem autenticação
- ✅ Validação de input presente

## 9.2 /api/seed

**Arquivo:** `src/app/api/seed/route.ts`

Executa seed do banco de dados (não utilizado atualmente).

---

# 10. DESIGN SYSTEM

## 10.1 Tailwind CSS 4

O projeto utiliza Tailwind CSS 4.x com configuração mínima (CSS-first):

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #10b981;
  --color-accent: #f59e0b;
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}
```

## 10.2 Componentes de Estilo

### Calculadora

```css
.calc-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.calc-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.result-box {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 2px solid #2563eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
}
```

### Cores por Categoria

| Categoria | Cor | Variável CSS |
|-----------|-----|---------------|
| Finanças Pessoais | #10b981 | cat-financas |
| Trabalhista | #f59e0b | cat-trabalhista |
| Matemática | #6366f1 | cat-matematica |
| Saúde | #ef4444 | cat-saude |
| Utilitários | #8b5cf6 | cat-utilitarios |
| Física | #0ea5e9 | cat-fisica |

---

# 11. INFRAESTRUTURA E DEPLOY

## 11.1 Ambiente

| Ambiente | URL | Plataforma |
|----------|-----|------------|
| Produção | https://www.calculabs.com.br | Vercel |
| Desenvolvimento | Local (bun dev) | - |

## 11.2 Repositórios

| Remote | URL |
|--------|-----|
| origin | https://builder.kiloapps.io/apps/d6e26f10-c5ca-4a2f-86eb-2bf7ed6fbd9a.git |
| github | https://github.com/calculabs-adm/calculabs.git |

## 11.3 Variáveis de Ambiente

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

# Opcional (Banco - não utilizado)
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

## 11.4 Scripts Disponíveis

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "bun run src/db/migrate.ts",
  "db:seed": "bun run src/db/seed.ts"
}
```

---

# 12. PERFORMANCE E ESCALABILIDADE

## 12.1 Análise de Bundle

### Dependencies (安装)

| Pacote | Tamanho Estimado |
|--------|------------------|
| next | ~1.5MB |
| react + react-dom | ~150KB |
| tailwindcss | ~100KB |
| drizzle-orm | ~200KB |
| mathjs | ~500KB (não usado) |

### Bundle Size Real

O build de produção do Next.js 16 compila apenas o código utilizado.

## 12.2 Pontos de Atenção

### Performance

| Aspecto | Status | Observação |
|---------|--------|------------|
| Static Generation | ✅ | getStaticParams em todas as rotas |
| Image Optimization | ✅ | next/image disponível |
| Font Optimization | ✅ | Geist fonts |
| Code Splitting | ✅ | Next.js automático |

### Escalabilidade

| Cenário | Capacidade | Limitação |
|---------|-----------|-----------|
| Calculadoras | 60 atual → 500+ | JSON suporta facilmente |
| Usuários simultâneos | Alta | Vercel autoscale |
| Queries de busca | Média | Carrega todas calculators em memória |

## 12.3 Problemas Identificados

1. **Search em memória**: O componente de busca carrega todas as calculadoras na memória do cliente (`src/components/layout/Header.tsx`)

2. **Sem cache**: Não há sistema de cache implementado

3. **Sem ISR**: As páginas são geradas estaticamente mas não há revalidação periódica

---

# 13. INVENTÁRIO DE CALCULADORAS

## 13.1 Categorias

| ID | Nome | Slug | Ícone | Cor | Calculadoras |
|----|------|------|-------|------|--------------|
| 6 | Finanças Pessoais | financas-pessoais | 💰 | #10b981 | 20 |
| 7 | Trabalhista e Tributário | trabalhista-tributario | ⚖️ | #f59e0b | 10 |
| 8 | Matemática | matematica | 📐 | #6366f1 | 14 |
| 9 | Saúde | saude | 🏥 | #ef4444 | 8 |
| 10 | Utilitários | utilitarios | 🔧 | #8b5cf6 | 4 |
| 11 | Física | fisica | ⚛️ | #0ea5e9 | 1 |

## 13.2 Subcategorias

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

---

# 14. MATRIZ DE RISCOS

## 14.1 Riscos Críticos

| # | Risco | Impacto | Probabilidade | Mitigação |
|---|-------|---------|---------------|-----------|
| 1 | Execução de código via new Function() | Comprometimento total | Baixa | Usar mathjs parser |
| 2 | Dados JSON comprometidos | Injeção de código | Baixa | Validar fórmula + schema |

## 14.2 Riscos Altos

| # | Risco | Impacto | Probabilidade | Mitigação |
|---|-------|---------|---------------|-----------|
| 1 | Schema DB não utilizado | Manutenção duplicada | Alta | Remover ou usar |
| 2 | Dependências não utilizadas | Bundle inflated | Média | Remover packages |
| 3 | API sem rate limiting | Abuso | Média | Implementar rate limit |

## 14.3 Riscos Médios

| # | Risco | Impacto | Probabilidade | Mitigação |
|---|-------|---------|---------------|-----------|
| 1 | Search carrega tudo em memória | Performance mobile | Média | Implementar server search |
| 2 | Duplicação formula engine | Bugs potenciales | Alta | Unificar em uma lib |

## 14.4 Riscos Baixos

| # | Risco | Impacto | Probabilidade | Mitigação |
|---|-------|---------|---------------|-----------|
| 1 | Stats "50+ calculadoras" outdated | Informação incorreta | Alta | Atualizar para 60 |
| 2 | mathjs não utilizado | Bundle desnecessário | Alta | Remover dependência |

---

# 15. RECOMENDAÇÕES

## 15.1 Segurança (Prioridade Alta)

1. **Substituir new Function() por mathjs parser**
   - Implementar validação de AST
   - Whitelist de operações permitidas

2. **Unificar motors de fórmula**
   - Criar lib compartilhada
   - Eliminar duplicação

3. **Adicionar rate limiting na API**
   - Implementar para /api/report-error

## 15.2 Arquitetura (Prioridade Alta)

1. **Decidir sobre banco de dados**
   - Usar Drizzle + Turso, OU
   - Remover completamente

2. **Remover dependências não utilizadas**
   - mathjs
   - better-sqlite3
   - drizzle-orm (se não usar)

## 15.3 Performance (Prioridade Média)

1. **Otimizar busca**
   - Server-side search em vez de client-side
   - Limitar resultados

2. **Implementar ISR**
   - Revalidação periódica de páginas

## 15.4 SEO (Prioridade Baixa)

1. **Atualizar stats bar**
   - Mudar "50+" para "60+"

---

# 16. CONCLUSÃO

O projeto CalcuLabs apresenta uma base sólida com:

✅ Arquitetura Next.js moderna  
✅ SEO completo implementado  
✅ Analytics funcional  
✅ Design system consistente  
✅ 60 calculadoras operacionais  

No entanto, existem problemas críticos que devem ser abordados:

⚠️ **Motor de fórmulas com vulnerabilidade de execução de código**  
⚠️ **Banco de dados definido mas não utilizado**  
⚠️ **Duplicação de código no formula engine**  

A recomendação principal é corrigir a vulnerabilidade de segurança do motor de fórmulas e decidir definitivamente sobre a utilização do banco de dados, eliminando a duplicação de dependências e código.

---

*Documento gerado automaticamente em 14/03/2026*  
*Análise forense baseada em código fonte completo do projeto*  
*Total de arquivos analisados: 15+ arquivos principais*
