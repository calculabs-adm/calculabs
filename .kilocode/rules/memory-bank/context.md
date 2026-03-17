# Active Context: CalcuLabs

## Recently Completed

- [x] Add automatic SEO generator for calculators: Created src/lib/seo-generator.ts with generateCalculatorSEO() function that generates meta_title and meta_description as fallback when not manually defined. Title format: "{calculator.title} Online | CalcuLabs". Description format: "Use nossa {keyword}. Calcule rapidamente com a ferramenta online gratuita do CalcuLabs." Integrated in generateMetadata() of calculator pages.
- [x] Add curiosity sections to 13º Salário, Férias Proporcionais, and Hora Extra calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit c31d3b7).
- [x] Add curiosity sections to MDC, Equação 1º Grau, Equação 2º Grau, Área do Círculo, and Área do Triângulo calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit 21d8c69).
- [x] Add curiosity sections to Porcentagem, Regra de Três, Média Aritmética, MMC, and MDC calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit 1ac7f88).
- [x] Add curiosity sections to Comissão, Simples Nacional, DAS MEI, and ICMS calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit b7e6325).
- [x] Add curiosity sections to Rescisão Trabalhista, INSS, and FGTS calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit 989554d).
- [x] Add curiosity sections to Markup, Ponto de Equilíbrio, and IRPF calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit e0eafa1).
- [x] Add curiosity sections to ROI, ROAS, and Margem de Lucro calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, practical insights, and professor explanation. Pushed to GitHub (commit ca53fbf).
- [x] Add curiosity sections to Tabela SAC and Amortização de Financiamento calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, comparison, practical insights, and professor explanation. Pushed to GitHub (commit b3350d9).
- [x] Add curiosity sections to Empréstimo Pessoal and Simulação de Parcelamento calculators: Added comprehensive HTML content with history, real-world applications, formula explanation, comparison, practical insights, and professor explanation. Pushed to GitHub (commit 08aaf67).
- [x] Add curiosity section to Financiamento Imobiliário calculator: Added comprehensive HTML content with history, real-world applications, formula explanation, comparison, practical insights, and professor explanation. Pushed to GitHub (commit a9f2be8).
- [x] Add curiosity sections to 5 financial calculators: Rendimento CDB, Tesouro Direto, Poupança, Dividend Yield, and Simulação de Aposentadoria. Each with comprehensive HTML content including history, real-world applications, formula explanation, comparison, practical insights, and challenge exercises.
- [x] Add curiosity section to Juros Simples calculator: Added comprehensive HTML content with history, real-world applications, formula explanation, comparison with compound interest, practical insights, and a challenge exercise. Pushed to GitHub (commit 6356354).
- [x] Add curiosity sections to 4 calculators: Juros Compostos, Juros Simples, Tabela Price, ROI. Pushed to GitHub (commit 69affc2).
- [x] Improve Você Sabia section with blue brand colors: altered gradient from amber/orange to blue/cyan, updated h2, h3, and strong colors to match brand blue palette
- [x] Push para GitHub: commit 5353f22 enviado para github.com/calculabs-adm/calculabs.git (curiosity section to calculator pages)
- [x] Fix calculadora Idade Exata (/utilitarios/datas/calculo-de-idade-exata): resultado era uma string "34 anos, 9 meses e 18 dias" mas o filtro de resultados usava !isNaN(Number(v)) que retornava false para strings, removendo o resultado. Corrigido o filtro para aceitar strings: `typeof v === 'string' || !isNaN(Number(v))`. Também atualizado formatResultValue para aceitar string | number e adicionado label 'idade'.
- [x] Fix calculadora Porcentagem (/matematica/basica/porcentagem): fórmula corrigida para usar variáveis corretas (valor1, valor2, tipo_calculo) em vez de variáveis indefinidas (percentual, valor, valor_final, valor_inicial). Widget atualizado para filtrar zeros quando há resultados não-zero.
- [x] Fix calculadora Taxa Metabólica Basal (/saude/corpo-metabolismo/taxa-metabolica-basal): fórmula usava variável 'altura_cm' (não definida) e não selecionava resultado por sexo. Corrigida para usar calcular_tmb(sexo, peso, altura, idade).
- [x] Sistema de reporte de erros: alterado texto de "Reportar problema" para "Reportar erro" em todas as calculadoras. Criado componente ErrorReportButton com popup/modal para formulário. Criada API route /api/report-error para envio de emails via nodemailer. Requer configuração SMTP em .env.local.
- [x] Add WebApplication JSON-LD schema: schema adicionado nas páginas de calculadora para identificar como ferramentas interativas. applicationCategory: FinanceApplication.
- [x] Add HowTo JSON-LD schema: schema adicionado para passos passo a passo das calculadoras. Usa dados existentes do campo 'steps'. Gera rich results HowToStep na SERP.
- [x] Improve HowTo schema SEO: alterado campo 'name' de "Passo X" genérico para usar o texto real do passo (stepText), melhorando a descrição nos resultados de busca do Google.
- [x] Add totalTime to HowTo schema: adicionado campo "totalTime": "PT1S" para indicar que o cálculo leva ~1 segundo. Melhora a qualidade do Rich Result no Google.
- [x] Improve HowTo schema with inLanguage, tool, and totalTime PT1M: adicionado inLanguage: "pt-BR", tool: HowToTool apontando para a calculadora, e totalTime alterado para "PT1M" para melhor semântica SEO.
- [x] Add Google Tag Manager: adicionado componente GoogleTagManager no layout global com gtmId GTM-WCJ4FLF7 para tracking em todas as páginas.
- [x] Add analytics tracking layer: criado módulo src/lib/analytics.ts com função track() para enviar eventos ao dataLayer do GTM
- [x] Add calculator view tracking: implementado evento "calculadora_visualizada" que envia calculadora_nome, calculadora_categoria e calculadora_subcategoria ao GTM
- [x] Add calculation execution tracking: implementado evento "resultado_calculado" que dispara quando o usuário executa um cálculo com sucesso. Envia calculadora_nome, calculadora_categoria e calculadora_subcategoria ao GTM para medir uso real das calculadoras no GA4.
- [x] Add intent tracking (campo_alterado): implementado evento "campo_alterado" que dispara quando o usuário modifica um campo de entrada da calculadora. Envia campo_nome, calculadora_nome, calculadora_categoria e calculadora_subcategoria ao GTM para analisar padrões de uso das calculadoras.
- [x] Add Média Ponderada calculator (id: 104): adicionada nova calculadora em Matemática Básica com fórmula de média ponderada, variáveis, steps, example, applications, curiosity, FAQs, keywords, meta title e description
- [x] Fix Média Ponderada: adicionados valores padrão (default) nas variáveis de entrada (valor1=8, peso1=2, valor2=6, peso2=1) e melhorada seção curiosity com estrutura HTML semântica (h2, h3, ul, listas)
- [x] Apply new mobile layout to all calculators: removed isMobileExperiment flag, calculator widget now always appears first on mobile (order-1), formula section now always visible on mobile. UX improvement applied to all calculators, not just equacao-2-grau. Pushed to origin (commit 873f813).

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
| `src/app/api/report-error/route.ts` | API para envio de emails de erro | ✅ Ready |
| `src/components/calculator/ErrorReportButton.tsx` | Botão de reporte de erro com popup | ✅ Ready |

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

6. **Engenharia e Construção** (1 calculadora)
   - Materiais de Construção: Quantidade de Cimento

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
| Taxa Metabólica Basal | Usava variável 'altura_cm' (não definida) e não selecionava resultado por sexo | Fórmula corrigida para usar calcular_tmb(sexo, peso, altura, idade) |
| Percentual de Gordura Corporal | Calculava gordura_homem e gordura_mulher mas não retornava resultado único | Adicionada função calcular_gordura() que retorna resultado baseado no sexo |
| Peso Ideal | Usava variável 'altura_cm' (não definida) e não selecionava resultado por sexo | Adicionada função calcular_peso_ideal() que retorna resultado baseado no sexo |

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
| 2026-03-05 | Diagnóstico: push para GitHub não funciona automaticamente. O `origin` aponta para servidor interno Kilo Code (builder.kiloapps.io), não para GitHub. Solução documentada em VERCEL_DEPLOY.md: configurar GitHub PAT token para push direto ao GitHub. |
| 2026-03-06 | GitHub PAT configurado com sucesso: remote `github` adicionado com token de autenticação. Históricos divergentes integrados via merge. Push realizado para ambos os remotes (origin e github/main). A partir de agora, `git push github main` funciona automaticamente nesta sessão. |
| 2026-03-06 | Fix Taxa Metabólica Basal: fórmula usava variável 'altura_cm' (não definida) e não selecionava resultado por sexo. Corrigida para usar calcular_tmb(sexo, peso, altura, idade). |
| 2026-03-06 | Fix Percentual de Gordura Corporal: calculava gordura_homem e gordura_mulher mas não retornava resultado único. Adicionada função calcular_gordura() que retorna resultado baseado no sexo. |
| 2026-03-06 | Fix Taxa Metabólica Basal: fórmula usava variável 'altura_cm' (não definida) e não selecionava resultado por sexo. Corrigida para usar calcular_tmb(sexo, peso, altura, idade). |
| 2026-03-06 | Fix Peso Ideal: fórmula usava variável 'altura_cm' (não definida) e não retornava resultado único. Adicionada função calcular_peso_ideal() que retorna resultado baseado no sexo. Push para origin e github. |
| 2026-03-06 | Fix Idade Exata: função calcular_idade_exata não tratava caso data_atual fosse undefined. Corrigido para usar data atual como fallback quando data_atual não for informada. Push para origin e github. |
| 2026-03-06 | Fix Idade Exata (2ª vez): fórmula passava data_atual como undefined para função. Removido data_atual da fórmula em calculators.json e seed.ts - agora usa apenas calcular_idade_exata(data_nascimento). Push para origin e github. |
| 2026-03-06 | Sistema de reporte de erros: alterado texto para "Reportar erro" em todas as calculadoras. Criado componente ErrorReportButton com popup/modal. Criada API route /api/report-error para envio de emails via nodemailer. Requer configuracao SMTP em .env.local.
| 2026-03-06 | Add WebApplication JSON-LD schema: schema adicionado nas páginas de calculadora para identificar como ferramentas interativas. applicationCategory: FinanceApplication. Push para origin e github.
| 2026-03-06 | Add HowTo JSON-LD schema: schema adicionado para passos passo a passo das calculadoras. Usa dados existentes do campo 'steps'. Push para origin e github.
| 2026-03-07 | Push para GitHub: commit 5353f22 enviado para github.com/calculabs-adm/calculabs.git (curiosity section to calculator pages)
| 2026-03-07 | Revert brand identity: reverted ∑ icon and blue color scheme changes - user preferred original design
| 2026-03-07 | Add Google Tag Manager: adicionado componente @next/third-parties/google no layout global para tracking com GTM-WCJ4FLF7 |
| 2026-03-10 | Add curiosity section to Juros Simples calculator with comprehensive HTML content including history, formula explanation, comparison with compound interest, practical insights, and challenge exercise. Pushed to GitHub (commit 6356354). |
| 2026-03-10 | Add curiosity sections to 5 financial calculators: Rendimento CDB, Tesouro Direto, Poupança, Dividend Yield, Simulação de Aposentadoria. Committed and pushed to origin.
| 2026-03-12 | Add automatic SEO generator: created src/lib/seo-generator.ts with generateCalculatorSEO() function for fallback meta tags. Integrated in calculator page generateMetadata().
| 2026-03-15 | Add new category "Engenharia e Construção" (id: 12) with subcategory "Materiais de Construção" (id: 27). Added new calculator "Quantidade de Cimento" (id: 112) to calculators.json.
| 2026-03-17 | Add new calculator "Perímetro do Círculo" (id: 116) to Mathematics > Geometry category. Formula: C = 2πr, with variables, steps, example, applications, curiosity section, and FAQs.
