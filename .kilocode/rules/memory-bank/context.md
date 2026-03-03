# Active Context: Portal do Cálculo

## Current State

**Project Status**: 🚀 Portal do Cálculo - MVP Implementado

O projeto foi transformado de um template Next.js em um portal completo de calculadoras online.

## Recently Completed

- [x] Instalação de dependências: drizzle-orm, @kilocode/app-builder-db, mathjs, drizzle-kit
- [x] Schema do banco de dados com 3 tabelas: categories, subcategories, calculators
- [x] Migrações geradas com drizzle-kit
- [x] Seed com 50 calculadoras completas (fórmulas, variáveis, FAQs, exemplos, SEO)
- [x] Motor universal de fórmulas (src/lib/formula-engine.ts)
- [x] Camada de acesso a dados (src/lib/data.ts)
- [x] Layout raiz com SEO global, Open Graph, metadados em pt-BR
- [x] Header responsivo com navegação por categorias
- [x] Footer com links de categorias e calculadoras populares
- [x] Estilos globais com Tailwind CSS (design system completo)
- [x] Página inicial (home) com hero, grid de categorias, calculadoras populares
- [x] Página de categoria (/[categoria]) com subcategorias e calculadoras
- [x] Página de calculadora individual (/[categoria]/[subcategoria]/[calculo])
- [x] Componente interativo CalculatorWidget (client-side)
- [x] Sitemap automático (src/app/sitemap.ts)
- [x] Robots.txt (src/app/robots.ts)
- [x] Página 404 personalizada
- [x] JSON-LD estruturado (Article, FAQPage, BreadcrumbList, WebSite)
- [x] Breadcrumbs em todas as páginas
- [x] TypeScript sem erros, lint sem warnings

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page com hero e grid de categorias | ✅ Ready |
| `src/app/layout.tsx` | Root layout com SEO global | ✅ Ready |
| `src/app/[categoria]/page.tsx` | Página de categoria | ✅ Ready |
| `src/app/[categoria]/[subcategoria]/[calculo]/page.tsx` | Página de calculadora | ✅ Ready |
| `src/app/sitemap.ts` | Sitemap automático | ✅ Ready |
| `src/app/robots.ts` | Robots.txt | ✅ Ready |
| `src/components/layout/Header.tsx` | Header responsivo | ✅ Ready |
| `src/components/layout/Footer.tsx` | Footer com links | ✅ Ready |
| `src/components/calculator/CalculatorWidget.tsx` | Widget interativo | ✅ Ready |
| `src/db/schema.ts` | Schema do banco | ✅ Ready |
| `src/db/seed.ts` | 50 calculadoras iniciais | ✅ Ready |
| `src/lib/formula-engine.ts` | Motor de fórmulas | ✅ Ready |
| `src/lib/data.ts` | Acesso a dados | ✅ Ready |

## Categories Implemented

1. **Finanças Pessoais** (21 calculadoras)
   - Juros e Investimentos: Juros compostos, simples, CDB, Tesouro Direto, Poupança, Dividend Yield, Aposentadoria
   - Financiamentos: Imobiliário, Veículo, Empréstimo, Parcelamento, SAC, Price, Amortização
   - Gestão Financeira: ROI, ROAS, Margem de Lucro, Markup, Ponto de Equilíbrio
   - Impostos: IRPF

2. **Trabalhista e Tributário** (10 calculadoras)
   - Trabalhista: Rescisão, INSS, FGTS, 13º Salário, Férias, Hora Extra, Comissão
   - Tributário: Simples Nacional, DAS MEI, ICMS

3. **Matemática** (9 calculadoras)
   - Básica: Porcentagem, Regra de Três, Média Aritmética, MMC, MDC
   - Álgebra: Equação 1º Grau, Equação 2º Grau (Bhaskara)
   - Geometria: Área do Círculo, Área do Triângulo, Volume do Cilindro

4. **Saúde** (5 calculadoras)
   - Corpo e Metabolismo: IMC, TMB, Calorias Diárias, % Gordura Corporal, Peso Ideal

5. **Utilitários** (5 calculadoras)
   - Conversores: Moeda, Celsius/Fahrenheit, Kg/Libras
   - Datas: Diferença entre Datas, Idade Exata

## URL Structure

```
/                                    → Home
/[categoria]                         → Categoria (ex: /matematica)
/[categoria]/[subcategoria]/[calculo] → Calculadora (ex: /matematica/algebra/equacao-2-grau)
/sitemap.xml                         → Sitemap automático
/robots.txt                          → Robots
```

## SEO Features

- Meta title e description únicos por página
- Canonical URLs configurados
- Open Graph e Twitter Cards
- JSON-LD: WebSite, Article, FAQPage, BreadcrumbList
- Sitemap automático com todas as calculadoras
- Robots.txt configurado
- lang="pt-BR" no HTML
- Breadcrumbs visuais e estruturados

## Session History

| Date | Changes |
|------|---------|
| 2026-03-03 | Portal do Cálculo criado do zero com 50 calculadoras, banco de dados, SEO completo |
