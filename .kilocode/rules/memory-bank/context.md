# Active Context: CalcuLabs

## Current State

**Project Status**: 🚀 CalcuLabs - MVP Implementado

O projeto foi transformado de um template Next.js em um portal completo de calculadoras online.

## Recently Completed

- [x] Push para GitHub: projeto completo enviado para https://github.com/calculabs-adm/calculabs.git
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
- [x] Fix domain: atualizados todos os referências de 'portaldocalculo.com.br' para 'www.calculabs.com.br'
- [x] Fix formula engine: adicionado suporte a if-else nas fórmulas (converte para operador ternário)
- [x] Fix header logo: cor do texto "CalcuLabs" alterada de branco (text-white) para preto (text-slate-900)
- [x] Fix amortização de financiamento: corrigida fórmula para calcular corretamente a economia de juros e redução do prazo
- [x] Remove database files from git tracking: arquivos `*.db`, `*.db-shm`, `*.db-wal` removidos do versionamento (respeitando `.gitignore`)
- [x] Fix amortização de financiamento: corrigida fórmula - adicionado cálculo da parcela e todas as variáveis intermediárias (i, parcela, saldo_atual, saldo_apos_amortizacao, novo_prazo, economia_juros)

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
| `src/app/api/seed/route.ts` | API para executar seed do banco | ✅ Ready |

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

## Calculadoras Corrigidas

As seguintes calculadoras foram corrigidas para funcionar corretamente:

| Calculadora | Problema | Correção |
|------------|----------|----------|
| Hora Extra | Usava variáveis não definidas (dias_mes, horas_dia) | Fórmula corrigida para usar 220 horas padrão |
| Média Aritmética | Usava variáveis não definidas (soma_valores, quantidade) | Fórmula corrigida para calcular a média corretamente |
| Simples Nacional | Usava variáveis não definidas (aliquota_nominal, parcela_deduzir) | Adicionada função calcular_simples_nacional |
| DAS MEI | Usava variáveis não definidas (inss_mei, iss_mei, icms_mei) | Adicionada função calcular_das_mei |
| IRPF | Usava variável não definida (deducoes) | Fórmula corrigida para calcular deduções corretamente |
| Calorias Diárias | Usava variáveis não definidas (fator_atividade, ajuste_objetivo) | Fórmula corrigida para usar nivel_atividade e objetivo |
| Tabela SAC | Usava saldo_devedor sem inicialização | Fórmula corrigida para inicializar saldo_devedor |
| MMC/MDC | Já estavam funcionando | Verificadas e OK |
| Diferença entre Datas | Já estava corrigida | Verificada e OK |
| Idade Exata | Já estava corrigida | Verificada e OK |
| Financiamento de Veículo | Usava valor_financiado não calculado | Fórmula corrigida para calcular valor_financiado = valor_veiculo - entrada |
| Amortização de Financiamento | Fórmula de novo_prazo estava matematicamente incorreta | Corrigida para usar fórmula correta de anuidade: n = -ln(1 - (PV×i)/PMT) / ln(1+i) |

## Session History

| Date | Changes |
|------|---------|
| 2026-03-03 | Portal do Cálculo criado do zero com 50 calculadoras, banco de dados, SEO completo |
| 2026-03-03 | Fix crítico: banco de dados migrado de @kilocode/app-builder-db (proxy remoto) para @libsql/client (SQLite local). Adicionado serverExternalPackages no next.config.ts. Migrações e seed executados com sucesso. |
| 2026-03-03 | Rename from 'Portal do Cálculo' to 'CalcuLabs' for domain calculabs.com.br |
| 2026-03-03 | Fix domain: updated all hardcoded 'portaldocalculo.com.br' references to 'www.calculabs.com.br' |
| 2026-03-03 | Fix calculators: added missing helper functions (calcular_inss_progressivo, calcular_ir, calcular_simples_nacional, calcular_das_mei, soma), fixed formulas (Hora Extra, Média Aritmética, Simples Nacional, DAS MEI, IRPF, Calorias Diárias, Tabela SAC) |
| 2026-03-04 | Add report problem link to disclaimer on all calculator pages with mailto to contato@calculabs.com.br |
| 2026-03-04 | Fix Financiamento de Veículo calculator - calculate valor_financiado first before computing parcela |
| 2026-03-05 | Push para GitHub: projeto completo enviado para https://github.com/calculabs-adm/calculabs.git. Fluxo Kilo Code → GitHub → Vercel configurado.
| 2026-03-05 | Fix Financiamento de Veículo: corrigida fórmula para calcular valor_financiado = valor_veiculo - entrada antes de calcular a parcela |
| 2026-03-05 | Fix Amortização de Financiamento: corrigida fórmula para calcular parcela, saldo_atual, saldo_apos_amortizacao e novo_prazo corretamente |
| 2026-03-05 | Fix header logo: cor do texto "CalcuLabs" alterada de branco (text-white) para preto (text-slate-900) no Header.tsx |
| 2026-03-05 | Fix Amortização de Financiamento: corrigida fórmula para calcular corretamente economia_juros, reducao_prazo e variáveis intermediárias |
| 2026-03-05 | Fix Amortização de Financiamento (novamente): corrigida fórmula de novo_prazo para usar fórmula correta de anuidade com tratamento de edge cases |
| 2026-03-05 | Remove database files from git tracking: arquivos `portal-calculo.db`, `portal-calculo.db-shm`, `portal-calculo.db-wal` removidos do versionamento para respeitar `.gitignore` |
| 2026-03-05 | Add /api/seed endpoint: rota POST protegida por secret key para executar o seed do banco via HTTP. Uso: `POST /api/seed?key=calculabs-seed-2024` ou header `x-seed-key` |
| 2026-03-05 | Fix Amortização de Financiamento: corrigida fórmula para calcular `parcela`, `saldo_atual`, `saldo_apos_amortizacao`, `novo_prazo` e `economia_juros` na ordem correta com tratamento de edge cases |
