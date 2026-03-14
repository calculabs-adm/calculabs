# CALCULABS SYSTEM DOSSIER

**Data de Geração:** 14/03/2026  
**Versão do Sistema:** Em produção  
**Total de Calculadoras:** 60 (57 ativas)

---

## 1. ARQUITETURA DO PROJETO

### 1.1 Estrutura de Diretórios

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [categoria]/       # Páginas de categoria
│   │   ├── [categoria]/[subcategoria]/[calculo]/  # Página de calculadora
│   │   ├── api/               # API Routes
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── sitemap.ts         # Sitemap dinâmico
│   │   ├── robots.ts          # Robots.txt
│   │   └── busca/             # Página de busca
│   │
│   ├── components/
│   │   ├── calculator/        # Componentes da calculadora
│   │   │   ├── CalculatorWidget.tsx    # Widget principal de cálculo
│   │   │   ├── CalculatorTracker.tsx   # Tracking de eventos
│   │   │   ├── ErrorReportButton.tsx  # Botão de reportar erro
│   │   │   └── ShareButton.tsx        # Botão de compartilhar
│   │   │
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Header.tsx     # Cabeçalho
│   │   │   └── Footer.tsx     # Rodapé
│   │   │
│   │   └── home/
│   │       └── LatestCalculatorsCarousel.tsx  # Carrossel de últimas calculadoras
│   │
│   ├── data/                  # Arquivos de dados JSON
│   │   ├── calculators.json   # Dados das calculadoras
│   │   ├── categories.json    # Categorias
│   │   └── subcategories.json # Subcategorias
│   │
│   ├── lib/                   # Utilitários
│   │   ├── data.ts            # Camada de acesso a dados
│   │   ├── formula-engine.ts  # Motor de cálculo
│   │   ├── analytics.ts       # Tracking analytics
│   │   └── seo-generator.ts   # Gerador de SEO
│   │
│   └── db/                    # Banco de dados (Drizzle ORM)
│       ├── index.ts
│       ├── schema.ts
│       ├── seed.ts
│       └── migrate.ts
│
├── public/                    # Arquivos estáticos
├── .env.example               # Exemplo de variáveis de ambiente
├── package.json               # Dependências
├── next.config.ts             # Configuração Next.js
├── tsconfig.json              # Configuração TypeScript
├── drizzle.config.ts          # Configuração Drizzle
└── tailwind.config.*          # Configuração Tailwind
```

### 1.2 Organização do Frontend

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Fonte:** Geist (Sans + Mono)
- **Idioma:** pt-BR

---

## 2. ESTRUTURA DE DADOS

### 2.1 Categories (src/data/categories.json)

```typescript
type Category = {
  id: number;           // ID único
  name: string;         // Nome (ex: "Matemática")
  slug: string;         // URL slug (ex: "matematica")
  description: string;  // Descrição
  icon: string;         // Emoji do ícone (ex: "📐")
  color: string;        // Cor hex (ex: "#6366f1")
  order: number;        // Ordem de exibição
  created_at: number;   // Timestamp Unix
}
```

### 2.2 Subcategories (src/data/subcategories.json)

```typescript
type Subcategory = {
  id: number;           // ID único
  category_id: number;   // FK para categoria
  name: string;         // Nome (ex: "Matemática Básica")
  slug: string;         // URL slug (ex: "basica")
  description: string;  // Descrição
  order: number;       // Ordem de exibição
  created_at: number;   // Timestamp Unix
}
```

### 2.3 Calculators (src/data/calculators.json)

```typescript
type Calculator = {
  id: number;              // ID único
  category_id: number;     // FK para categoria
  subcategory_id: number;  // FK para subcategoria
  name: string;            // Nome curto (ex: "Juros Compostos")
  slug: string;            // URL slug (ex: "juros-compostos")
  title: string;           // Título completo (ex: "Calculadora de Juros Compostos")
  description: string;     // Descrição curta
  introduction: string;    // Introdução detalhada
  formula: string;         // Fórmula de cálculo
  formula_display: string; // Fórmula para exibição
  variables: string;       // JSON array de variáveis
  steps: string;           // JSON array de passos
  example: string;         // JSON object de exemplo
  applications: string;    // JSON array de aplicações
  curiosity: string;      // HTML da seção "Você Sabia?"
  faqs: string;           // JSON array de FAQs
  related_slugs: string;   // JSON array de slugs relacionados
  keywords: string;        // JSON array de keywords SEO
  meta_title: string;     // Meta title customizado
  meta_description: string;// Meta description customizado
  complexity: string;     // "basico" | "tecnico" | "avancado"
  monetization_type: string; // Tipo de monetização
  author_name: string;    // Nome do autor
  author_bio: string;     // Bio do autor
  sources: string;        // Fontes/referências
  updated_at: number;     // Timestamp de atualização
  created_at: number;     // Timestamp de criação
  is_active: number;      // 0 = inativo, 1 = ativo
  view_count: number;     // Contador de visualizações
}
```

### 2.4 Estrutura de Variáveis

```typescript
type Variable = {
  id: string;           // ID da variável (ex: "preco")
  label: string;        // Label (ex: "Preço original")
  type: "number" | "text" | "select" | "date";
  unit?: string;        // Unidade (ex: "R$", "%")
  placeholder?: string; // Placeholder
  default?: number | string; // Valor padrão
  min?: number;         // Valor mínimo
  max?: number;         // Valor máximo
  options?: { value: string; label: string }[]; // Opções para select
}
```

### 2.5 Relacionamentos

```
Categoria (1) ─────< Subcategoria (N)
Subcategoria (1) ─< Calculadora (N)
```

---

## 3. SISTEMA DE GERAÇÃO DE PÁGINAS

### 3.1 Roteamento

O sistema utiliza **Next.js App Router** com rotas dinâmicas:

```
/[categoria]/[subcategoria]/[calculo]
```

### 3.2 Fluxo de Carregamento

1. Usuário acessa URL: `/matematica/basica/porcentagem`
2. Next.js identifica rota dinâmica `[categoria]/[subcategoria]/[calculo]`
3. `getCalculatorWithContext(slug)` busca dados no JSON
4. `generateMetadata()` gera meta tags SEO
5. Componentes renderizam a interface

### 3.3 Componente Principal

**Arquivo:** `src/app/[categoria]/[subcategoria]/[calculo]/page.tsx`

- **Tipo:** Server Component (Async)
- **Dados:** Busca calculator, category, subcategory, related
- **Renderização:**
  - Breadcrumb
  - CalculatorWidget (client)
  - Fórmula
  - Passos (steps)
  - Exemplo
  - Aplicações
  - Curiosidade ("Você Sabia?")
  - FAQs
  - Autor
  - Calculadoras relacionadas

---

## 4. CALCULATION ENGINE

### 4.1 Como a Fórmula é Executada

**Arquivo:** `src/lib/formula-engine.ts`

O motor de cálculo utiliza uma abordagem de avaliação segura usando `Function` constructor.

```typescript
evaluateFormula(formula: string, variables: Record<string, number | string>)
```

### 4.2 Processo de Cálculo

1. **Parsing:** Fórmula é parseada linha a linha
2. **Variáveis injetadas:** Valores do formulário são injetados no contexto
3. **Helpers matemática:** Funções Math.* disponíveis (sqrt, pow, abs, log, etc.)
4. **Helpers especializados:**
   - `calcular_ir_progressivo()` - Imposto de renda
   - `calcular_inss()` - INSS
   - `calcular_tmb()` - Taxa metabólica basal
   - `calcular_gordura()` - Gordura corporal
   - `calcular_peso_ideal()` - Peso ideal
   - `calcular_mmc()` - Mínimo múltiplo comum
   - `calcular_mdc()` - Máximo divisor comum
   - `calcular_idade_exata()` - Idade exata
   - `calcular_idade_gestacional()` - Idade gestacional
   - `calcular_data_parto()` - Data prevista do parto
   - `calcular_ovulacao()` - Período de ovulação

### 4.3 Tratamento de Resultados

**Arquivo:** `src/components/calculator/CalculatorWidget.tsx`

```typescript
function formatResultValue(key, value) {
  // Currency: valores monetários → R$ 1.234,56
  // Percent: valores com % → 12,34%
  // Scientific: valores < 1e-10 → 3.31 × 10⁻¹⁹ J
  // Default: 2 decimais → 12,34
}
```

### 4.4 Validação e Tratamento de Erros

- Try/catch em todas as evaluações
- Verificação de `isNaN()` antes de exibir
- Fallback para "Não foi possível calcular o resultado"
- Limites de input (min/max) nas variáveis

---

## 5. COMPONENTES DO SISTEMA

### 5.1 Lista de Componentes

| Componente | Arquivo | Função |
|-----------|---------|--------|
| CalculatorWidget | `components/calculator/CalculatorWidget.tsx` | Widget principal de cálculo (Client) |
| CalculatorTracker | `components/calculator/CalculatorTracker.tsx` | Tracking de visualização |
| ErrorReportButton | `components/calculator/ErrorReportButton.tsx` | Botão de reportar erro |
| ShareButton | `components/calculator/ShareButton.tsx` | Botão de compartilhar |
| Header | `components/layout/Header.tsx` | Navegação principal |
| Footer | `components/layout/Footer.tsx` | Rodapé com links |
| LatestCalculatorsCarousel | `components/home/LatestCalculatorsCarousel.tsx` | Carrossel home |

### 5.2 CalculatorWidget

- **Tipo:** Client Component ("use client")
- **Props:**
  - `formula`: string - Fórmula de cálculo
  - `variables`: Variable[] - Array de variáveis
  - `formulaDisplay`: string - Fórmula para exibição
  - `calculoSlug`: string - Slug da calculadora
  - `categoriaSlug`: string - Slug da categoria
  - `subcategoriaSlug`: string - Slug da subcategoria

---

## 6. FEATURES IMPLEMENTADAS

### 6.1 Status: IMPLEMENTADO ✅

| Feature | Status | Descrição |
|---------|--------|-----------|
| Calculadoras dinâmicas | ✅ | Motor de fórmulas universal |
| Seção "Você Sabia?" | ✅ | HTML curiosity em cada calculadora |
| FAQ | ✅ | Seção de perguntas frequentes |
| Carrossel de recentes | ✅ | 8 últimas calculadoras na home |
| Interlinking | ✅ | Calculadoras relacionadas |
| Analytics GTM | ✅ | Google Tag Manager + dataLayer |
| SEO meta tags | ✅ | Title, description, og:*, twitter:* |
| Sitemap dinâmico | ✅ | Gera todas as URLs automaticamente |
| Schema Markup | ✅ | Article, FAQPage, BreadcrumbList, WebApplication, HowTo, Dataset, FinancialProduct |
| Notação científica | ✅ | Valores < 1e-10 exibidos em notação científica |
| Error reporting | ✅ | Botão para reportar erros |
| Compartilhamento | ✅ | Botão para compartilhar |
| Breadcrumbs | ✅ | Navegação estruturada |
| Validação de inputs | ✅ | min/max, type checking |
| Responsive design | ✅ | Mobile-first Tailwind |

### 6.2 Status: PARCIAL 🔄

| Feature | Status | Descrição |
|---------|--------|-----------|
| Banco de dados | 🔄 | Schema existe mas dados vêm do JSON |
| Busca | 🔄 | Página existe mas busca simples |

### 6.3 Status: NÃO IMPLEMENTADO ❌

| Feature | Status |
|---------|--------|
| Sistema de curtidas | ❌ |
| Comentários | ❌ |
| Avaliações | ❌ |
| Histórico de cálculos | ❌ |
| Login/usuários | ❌ |
| Modo offline (PWA) | ❌ |
| Dark mode | ❌ |

---

## 7. SISTEMA DE SEO

### 7.1 Meta Tags

- **Title:** Template dinâmico (página + " | CalcuLabs")
- **Description:** Dinâmico por página
- **Canonical:** URL canônica definida
- **OpenGraph:** title, description, image, url, type
- **Twitter Card:** summary_large_image
- **Keywords:** Em cada calculadora

### 7.2 SEO Generator

**Arquivo:** `src/lib/seo-generator.ts`

Gera fallback automático quando meta_title/meta_description não definidos:

```typescript
generateCalculatorSEO(calculator) → { title, description }
```

- **Title fallback:** `{calculator.title} Online | CalcuLabs`
- **Description fallback:** `Use nossa {keyword}. Calcule rapidamente...`

### 7.3 Structured Data

Schemas JSON-LD implementados:
- Article
- BreadcrumbList
- WebApplication
- FinancialProduct (finanças)
- Dataset
- HowTo
- FAQPage

### 7.4 Arquivos SEO

- **Sitemap:** `/sitemap.xml` - URLs dinâmicas
- **Robots:** `/robots.txt` - Regras deindexação

---

## 8. SEGURANÇA

### 8.1 Análise

| Aspecto | Status | Observação |
|---------|--------|------------|
| Sanitização inputs | ✅ | Variáveis são parseadas como number/string |
| XSS prevention | ✅ | React escapa HTML por padrão |
| eval() limitado | ✅ | Função construtor com escopo restrito |
| API protection | ⚠️ | Nenhuma autenticação (endpoint público) |

### 8.2 Riscos Potenciais

1. **Formula Engine:** Usa `eval()` internamente - risco moderado mas isolado
2. **API Routes:** `/api/report-error` exposta sem rate limiting
3. **Banco de dados:** Schema existe mas não está em uso (dados em JSON)

---

## 9. PERFORMANCE

### 9.1 Métricas

| Aspecto | Status |
|---------|--------|
| Framework | Next.js 16 (App Router) |
| Rendering | SSR + Client hydration |
| Bundle | tree-shaking ativo |
| Images | Otimização via next/image |
| Fontes | Google Fonts otimizadas (next/font) |

### 9.2 Otimizações

- Static Generation (SSG) para calculadoras
- Componentes client-only onde necessário
- Lazy loading não implementado explicitamente

---

## 10. DEPLOY E INFRAESTRUTURA

### 10.1 Pipeline

```
Desenvolvimento → Git (origin + github) → Vercel
```

### 10.2 Repositórios

- **Principal:** `https://builder.kiloapps.io/apps/d6e26f10-c5ca-4a2f-86eb-2bf7ed6fbd9a.git`
- **GitHub:** `https://github.com/calculabs-adm/calculabs.git`

### 10.3 Hospedagem

- **Vercel:** https://www.calculabs.com.br (configurado)

### 10.4 Variáveis de Ambiente

```env
NEXT_PUBLIC_SITE_URL=https://www.calculabs.com.br
# SMTP (para API de report-error)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

## 11. ESTRUTURA VISUAL

### 11.1 Layout

- **Container:** max-w-7xl (1280px)
- **Grid:** Tailwind CSS
- **Responsividade:** Mobile-first (sm, md, lg, xl)

### 11.2 Componentes UI

- Cards com borda sutil
- Botões com hover states
- Formulários com labels claros
- Tipografia: Geist Sans/Mono
- Cores: Sistema de cores Tailwind (slate, blue, emerald, etc.)

### 11.3 Cores por Categoria

| Categoria | Cor |
|-----------|-----|
| Finanças Pessoais | #10b981 (emerald) |
| Trabalhista e Tributário | #f59e0b (amber) |
| Matemática | #6366f1 (indigo) |
| Saúde | #ef4444 (red) |
| Utilitários | #8b5cf6 (violet) |
| Física | #0ea5e9 (sky) |

---

## 12. INVENTÁRIO COMPLETO DE CALCULADORAS

### 12.1 Resumo

| Categoria | Subcategorias | Calculadoras |
|-----------|---------------|--------------|
| Finanças Pessoais | 4 | 20 |
| Trabalhista e Tributário | 2 | 10 |
| Matemática | 3 | 14 |
| Saúde | 2 | 8 |
| Utilitários | 2 | 4 |
| Física | 1 | 1 |
| **TOTAL** | **14** | **57** |

### 12.2 Lista Completa

| ID | Categoria | Subcategoria | Nome | URL |
|----|-----------|--------------|------|-----|
| 51 | Finanças Pessoais | Juros e Investimentos | Juros Compostos | /financas-pessoais/juros-investimentos/juros-compostos |
| 52 | Finanças Pessoais | Juros e Investimentos | Juros Simples | /financas-pessoais/juros-investimentos/juros-simples |
| 53 | Finanças Pessoais | Juros e Investimentos | Rendimento CDB | /financas-pessoais/juros-investimentos/rendimento-cdb |
| 54 | Finanças Pessoais | Juros e Investimentos | Rendimento Tesouro Direto | /financas-pessoais/juros-investimentos/rendimento-tesouro-direto |
| 55 | Finanças Pessoais | Juros e Investimentos | Rendimento Poupança | /financas-pessoais/juros-investimentos/rendimento-poupanca |
| 56 | Finanças Pessoais | Juros e Investimentos | Dividend Yield | /financas-pessoais/juros-investimentos/dividend-yield |
| 57 | Finanças Pessoais | Juros e Investimentos | Simulação de Aposentadoria | /financas-pessoais/juros-investimentos/simulacao-aposentadoria |
| 58 | Finanças Pessoais | Financiamentos e Empréstimos | Financiamento Imobiliário | /financas-pessoais/financiamentos-emprestimos/financiamento-imobiliario |
| 59 | Finanças Pessoais | Financiamentos e Empréstimos | Financiamento de Veículo | /financas-pessoais/financiamentos-emprestimos/financiamento-veiculo |
| 60 | Finanças Pessoais | Financiamentos e Empréstimos | Empréstimo Pessoal | /financas-pessoais/financiamentos-emprestimos/emprestimo-pessoal |
| 61 | Finanças Pessoais | Financiamentos e Empréstimos | Simulação de Parcelamento | /financas-pessoais/financiamentos-emprestimos/simulacao-parcelamento |
| 62 | Finanças Pessoais | Financiamentos e Empréstimos | Tabela SAC | /financas-pessoais/financiamentos-emprestimos/tabela-sac |
| 63 | Finanças Pessoais | Financiamentos e Empréstimos | Tabela Price | /financas-pessoais/financiamentos-emprestimos/tabela-price |
| 64 | Finanças Pessoais | Financiamentos e Empréstimos | Amortização de Financiamento | /financas-pessoais/financiamentos-emprestimos/amortizacao-financiamento |
| 65 | Finanças Pessoais | Gestão Financeira | ROI | /financas-pessoais/gestao-financeira/roi |
| 66 | Finanças Pessoais | Gestão Financeira | ROAS | /financas-pessoais/gestao-financeira/roas |
| 67 | Finanças Pessoais | Gestão Financeira | Margem de Lucro | /financas-pessoais/gestao-financeira/margem-de-lucro |
| 68 | Finanças Pessoais | Gestão Financeira | Markup | /financas-pessoais/gestao-financeira/markup |
| 69 | Finanças Pessoais | Gestão Financeira | Ponto de Equilíbrio | /financas-pessoais/gestao-financeira/ponto-de-equilibrio |
| 70 | Finanças Pessoais | Impostos | Imposto de Renda IRPF | /financas-pessoais/impostos/imposto-de-renda-irpf |
| 71 | Trabalhista e Tributário | Trabalhista | Rescisão Trabalhista | /trabalhista-tributario/trabalhista/rescisao-trabalhista |
| 72 | Trabalhista e Tributário | Trabalhista | INSS | /trabalhista-tributario/trabalhista/inss |
| 73 | Trabalhista e Tributário | Trabalhista | FGTS | /trabalhista-tributario/trabalhista/fgts |
| 74 | Trabalhista e Tributário | Trabalhista | 13º Salário | /trabalhista-tributario/trabalhista/decimo-terceiro |
| 75 | Trabalhista e Tributário | Trabalhista | Férias Proporcionais | /trabalhista-tributario/trabalhista/ferias-proporcionais |
| 76 | Trabalhista e Tributário | Trabalhista | Hora Extra | /trabalhista-tributario/trabalhista/hora-extra |
| 77 | Trabalhista e Tributário | Trabalhista | Cálculo de Comissão | /trabalhista-tributario/trabalhista/calculo-de-comissao |
| 78 | Trabalhista e Tributário | Tributário | Simples Nacional | /trabalhista-tributario/tributario/simples-nacional |
| 79 | Trabalhista e Tributário | Tributário | DAS MEI | /trabalhista-tributario/tributario/das-mei |
| 80 | Trabalhista e Tributário | Tributário | ICMS | /trabalhista-tributario/tributario/icms |
| 81 | Matemática | Matemática Básica | Porcentagem | /matematica/basica/porcentagem |
| 82 | Matemática | Matemática Básica | Regra de Três | /matematica/basica/regra-de-tres |
| 83 | Matemática | Matemática Básica | Média Aritmética | /matematica/basica/media-aritmetica |
| 84 | Matemática | Matemática Básica | MMC | /matematica/basica/mmc |
| 85 | Matemática | Matemática Básica | MDC | /matematica/basica/mdc |
| 86 | Matemática | Álgebra | Equação do 1º Grau | /matematica/algebra/equacao-1-grau |
| 87 | Matemática | Álgebra | Equação do 2º Grau (Bhaskara) | /matematica/algebra/equacao-2-grau |
| 88 | Matemática | Geometria | Área do Círculo | /matematica/geometria/area-do-circulo |
| 89 | Matemática | Geometria | Área do Triângulo | /matematica/geometria/area-do-triangulo |
| 90 | Matemática | Geometria | Volume do Cilindro | /matematica/geometria/volume-do-cilindro |
| 91 | Saúde | Corpo e Metabolismo | IMC | /saude/corpo-metabolismo/imc |
| 92 | Saúde | Corpo e Metabolismo | Taxa Metabólica Basal | /saude/corpo-metabolismo/taxa-metabolica-basal |
| 93 | Saúde | Corpo e Metabolismo | Calorias Diárias | /saude/corpo-metabolismo/calorias-diarias |
| 94 | Saúde | Corpo e Metabolismo | Percentual de Gordura Corporal | /saude/corpo-metabolismo/percentual-de-gordura-corporal |
| 95 | Saúde | Corpo e Metabolismo | Peso Ideal | /saude/corpo-metabolismo/peso-ideal |
| 96 | Utilitários | Conversores | Conversor de Moeda | /utilitarios/conversores/conversor-de-moeda |
| 97 | Utilitários | Conversores | Conversor Kg para Libras | /utilitarios/conversores/conversor-kg-libras |
| 99 | Utilitários | Datas | Cálculo de Diferença entre Datas | /utilitarios/datas/diferenca-entre-datas |
| 100 | Utilitários | Datas | Cálculo de Idade Exata | /utilitarios/datas/calculo-de-idade-exata |
| 101 | Saúde | Gravidez | Idade Gestacional | /saude/gravidez/idade-gestacional |
| 102 | Saúde | Gravidez | Data do Parto | /saude/gravidez/data-parto |
| 103 | Saúde | Gravidez | Ovulação | /saude/gravidez/ovulacao |
| 104 | Matemática | Matemática Básica | Média Ponderada | /matematica/basica/media-ponderada |
| 105 | Matemática | Matemática Básica | Variação Percentual | /matematica/basica/variacao-percentual |
| 106 | Matemática | Matemática Básica | Porcentagem de Desconto | /matematica/basica/porcentagem-desconto |
| 107 | Matemática | Matemática Básica | Aumento Percentual | /matematica/basica/aumento-percentual |
| 108 | Matemática | Matemática Básica | Preço Original com Desconto | /matematica/basica/preco-original-com-desconto |
| 109 | Matemática | Matemática Básica | Desconto em Valor | /matematica/basica/desconto-em-valor |
| 110 | Matemática | Matemática Básica | Nota Mínima para Passar | /matematica/basica/nota-minima-para-passar |
| 111 | Física | Quântica | Energia do Fóton | /fisica/quantica/energia-do-foton |

---

## 13. MAPA DO FLUXO DO SISTEMA

```
┌─────────────────────────────────────────────────────────────┐
│ USUÁRIO ACESSA URL                                         │
│ /matematica/basica/porcentagem                             │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ NEXT.JS ROUTER                                            │
│ Identifica: categoria=matematica, subcategoria=basica,   │
│ calculo=porcentagem                                       │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ getCalculatorWithContext(slug)                            │
│ - Busca calculator no calculators.json                    │
│ - Busca category e subcategory                            │
│ - Busca calculators relacionadas                          │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ generateMetadata()                                        │
│ - Gera SEO title/description/twitter cards                │
│ - Gera canonical URL                                       │
│ - Gera JSON-LD schemas                                    │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ SERVER COMPONENT RENDERIZA                                │
│ - Header, Footer                                          │
│ - Breadcrumb                                              │
│ - CalculatorWidget (Client)                              │
│ - Fórmula, Steps, Example                                │
│ - Applications, Curiosity, FAQs                           │
│ - Related calculators                                     │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ USUÁRIO PREENCHE FORMULÁRIO                               │
│ CalculatorWidget (Client Component)                        │
│ - Variáveis com default values                            │
│ - Input validation (min/max)                              │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ evaluateFormula()                                         │
│ - Parse fórmula                                           │
│ - Injeta variáveis                                        │
│ - Executa com Math helpers                                │
│ - Retorna resultados                                      │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ formatResultValue()                                        │
│ - Currency → R$ 1.234,56                                   │
│ - Percent → 12,34%                                         │
│ - Scientific → 3.31 × 10⁻¹⁹ J                            │
│ - Default → 12,34                                         │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ RESULTADO EXIBIDO                                         │
│ - Cards de resultado                                      │
│ - Tracker dispara evento "resultado_calculado"            │
└─────────────────────────────────────────────────────────────┘
```

---

## 14. PROBLEMAS ENCONTRADOS

### 14.1 Inconsistências

1. **ID 98 ausente:** Inventário pula de 97 para 99
2. **Dados duplicados:** JSON + Banco (schema existe mas não usado)
3. **Valores default:** Nem todas calculadoras têm `default` nas variáveis

### 14.2 Riscos Técnicos

1. **Formula Engine:** Uso de `eval()` via `Function` constructor - risco potencial
2. **API sem autenticação:** `/api/report-error` exposta
3. **Monetização:** Campo existe mas não implementado

### 14.3 Melhorias Recomendadas

1. Implementar banco de dados SQLite (schema pronto)
2. Adicionar rate limiting em APIs
3. Adicionar sistema de cache (Redis)
4. Implementar PWA
5. Adicionar dark mode
6. Sistema de usuário/login
7. Histórico de cálculos por usuário

---

## 15. DEPENDÊNCIAS

```json
{
  "dependencies": {
    "next": "^16.1.3",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "tailwindcss": "^4.1.17",
    "drizzle-orm": "^0.45.1",
    "better-sqlite3": "^12.6.2",
    "@libsql/client": "^0.17.0",
    "mathjs": "^15.1.1",
    "nodemailer": "^8.0.1",
    "@next/third-parties": "^16.1.6"
  }
}
```

---

## 16. EQUIPE E CONTATO

- **Desenvolvedor:** Kilo Code (AI)
- **Repositório GitHub:** calculabs-adm/calculabs
- **Hospedagem:** Vercel
- **Domínio:** calculabs.com.br

---

*Documento gerado automaticamente em 14/03/2026*
