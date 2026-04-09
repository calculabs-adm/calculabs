# Active Context: CalcuLabs

## Recently Completed

- [x] Published Knowledge Hub article: `guia-gestao-financeira` (Guia Completo de Gestão Financeira) - category: financas-pessoais, cluster: gestao-financeira-pessoal (pillar). Related calculators: roi, margem-de-lucro, ponto-de-equilibrio, markup. Internal links: gestao-financeira-pessoal, fluxo-de-caixa, roi, margem-de-lucro. Página atribuída a /financas-pessoais/gestao-financeira.
- [x] Published Knowledge Hub article: `calorias-diarias` (Calorias Diárias: Quantas Calorias Você Deve Consumir por Dia) - category: saude, cluster: saude-imc (satellite). Related calculators: calorias-diarias, taxa-metabolica-basal. Related articles: imc, peso-ideal. Objetivo: completar base metabólica do cluster saúde para aumentar autoridade e aprovação AdSense. 2600+ words, validator passed.
- [x] Published Knowledge Hub article: energia-na-fisica (Energia na Física: Guia Completo com Fórmulas, Tipos e Aplicações Práticas) - category: ciencia, cluster: fisica-basica (satellite). Related calculators: energia-cinetica, calculadora-energia-potencial, calculadora-potencia. Internal links: energia-cinetica, calculadora-energia-potencial, calculadora-potencia. Validator passed (needs content expansion).
- [x] Added Calculadora de Energia Potencial (id: 126) in Ciencia > Fisica with formula Ep = m · g · h, variables: massa (kg), gravidade (m/s²), altura (m). Related calculators: energia-cinetica, forca-lei-de-newton, calculadora-densidade. Validator passed.
- [x] Added Calculadora de Densidade (id: 125) in Ciencia > Fisica with formula ρ = m / V, variables: massa (kg), volume (m³). Related calculators: calculadora-pressao, forca-lei-de-newton, energia-cinetica. Validator passed.
- [x] Added Calculadora de Potência (id: 123) in Ciencia > Fisica with formula P = T / t, variables: trabalho (J), tempo (s). Related calculators: trabalho-forca-distancia, energia-cinetica, forca-lei-de-newton. Validator passed.
- [x] Published Knowledge Hub article: impulso-e-quantidade-de-movimento with comprehensive content (~1980 words), category: ciencia, cluster: fisica-basica (satellite). Related calculators: forca-lei-de-newton, velocidade-media. Internal links: leis-de-newton-explicadas, forca-energia-e-trabalho. Validator passed. 5 FAQs, 5 examples, 3 comparisons.
- [x] Published Knowledge Hub article: pressao-atmosferica with comprehensive content (~2200 words), category: ciencia, cluster: fisica-basica (satellite). Related calculators: forca-lei-de-newton, energia-cinetica. Internal links: pressao-na-fisica, gravidade-e-peso, forca-energia-e-trabalho. Validator passed. 5 FAQs, 5 examples, 3 comparisons.
- [x] Updated Knowledge Hub article: potencia-na-fisica with comprehensive content (~2800 words), category: ciencia, cluster: fisica-basica. Related calculators: trabalho-forca-distancia, energia-cinetica, forca-lei-de-newton. Internal links: forca-energia-e-trabalho, pressao-na-fisica, trabalho-forca-distancia, energia-cinetica, forca-lei-de-newton. Validator passed.
- [x] Fixed 500 errors on calculator routes: Updated hardcoded URLs and fallbacks from www.calculabs.com.br to calculabs.com.br after domain change. Identified and fixed null pointer error in relatedArticles filter. Build successful, deployed to production.
- [x] Published Knowledge Hub article: pressao-na-fisica (Pressão na Física: O Que É, Fórmula, Como Calcular e Aplicações Práticas). Added to articles.json with comprehensive content (~2847 words), category: ciencia, cluster: fisica-basica (satellite). Related calculators: forca-lei-de-newton, energia-cinetica, trabalho-forca-distancia. Internal links: forca-energia-e-trabalho, leis-de-newton-explicadas, energia-cinetica. Validator passed.
- [x] Fixed Lei da Gravitação Universal de Newton calculator - added scientific notation formatting for very large results (>= 1e15)
- [x] Fixed ARTICLE_WHITELIST by adding 4 new article slugs (fluxo-de-caixa, despesas-fixas-e-variaveis, capital-de-giro, roi)
- [x] Validated build generates static HTML pages for new article routes
- [x] Verified production URLs return 404 (deploy pending to make routes accessible)

- [x] Atualizar documentação: CHANGELOG.md, FEATURES.md, SYSTEM_OVERVIEW.md, MASTER_MAP.md, MASTER_MAP_VISUAL.md
- [x] Publish Knowledge Hub article: cimento-para-piso (Cimento para Piso: Quantidade Ideal, Traço Correto e Como Calcular). Added to articles.json with expanded content (~1518 words), registered in ARTICLE_WHITELIST in src/lib/data.ts. Category: engenharia-construcao, Cluster: engenharia-cimento (satellite). Related calculators: quantidade-cimento, quantidade-tijolos, consumo-tinta-m2. Internal links: quantidade-de-cimento-por-m2, traco-de-concreto-proporcao. Validator passed. Whitelist now at 9 articles.
- [x] Create institutional pages: /sobre, /contato, /privacidade, /termos. Pages already linked in Footer but had no routes. Created with Server Components, SEO metadata, and consistent styling. Sitemap updated with 4 new entries (priority 0.3-0.5, yearly frequency).
- [x] Publish Knowledge Hub article: cimento-para-laje (Cimento para Laje: Quantidade Ideal, Traço Correto e Como Calcular). Added to articles.json with expanded content (~1800 words), registered in ARTICLE_WHITELIST in src/lib/data.ts. Category: engenharia-construcao, Cluster: engenharia-cimento (satellite). Related calculators: quantidade-cimento, quantidade-tijolos, consumo-tinta-m2. Internal links: quantidade-de-cimento-por-m2, traco-de-concreto-proporcao. Validator passed. Whitelist now at 8 articles.
- [x] Add new calculator "Velocidade Média" (id: 117) in new category "Ciência" > "Física": Added calculator with formula v = d/t, variables (distancia, tempo), steps, example, applications, curiosity section, FAQs, and SEO metadata
- [x] Add new category "Ciência" (id: 14) with icon 🔬 and color #8b5cf6
- [x] Add new subcategory "Física" (id: 29) under Ciência category
- [x] Sistema de mapeamento global: MASTER_MAP.md e MASTER_MAP_VISUAL.md com 3 clusters e 9 artigos
- [x] Knowledge Hub implementado: rota /conhecimento/[slug], validador CLI, inventário

## Current State

**Segurança Enterprise Implementada**: Framework de testes Jest, headers de segurança CSP/HSTS, logging Winston, sanitização avançada, rate limiting. APIs hardened. Pronto para produção.

**Project Status**: 🚀 CalcuLabs - Versão 1.1.0

Portal brasileiro de calculadoras online gratuitas com 75 calculadoras em 8 categorias e 14 artigos do Knowledge Hub.

## Current Structure

| Component | Status |
|-----------|--------|
| Calculadoras | 75 |
| Categorias | 8 |
| Subcategorias | 17 |
| Artigos publicados | 16 |
| Clusters | 3 |
| Páginas institucionais | 4 (/sobre, /contato, /privacidade, /termos) |

## Knowledge Hub

| Cluster | Pilar | Satélites | Status |
|---------|-------|-----------|--------|
| engenharia-cimento | 1 | 5 | Completo |
| fisica-basica | 1 | 9 | Em expansão |
| juros-compostos | 1 | 1 | Em expansão |
| saude-imc | 1 | 2 | Completo (imc, peso-ideal, calorias-diarias) |
| gestao-financeira-pessoal | 1 | 7 | Completo (gestao-financeira-pessoal, margem-de-lucro, ponto-de-equilibrio, markup, fluxo-de-caixa, despesas-fixas-e-variaveis, capital-de-giro, roi) |

## Session History

| Date | Changes |
|------|---------|
| 2026-04-08 | Artigo guia-gestao-financeira publicado como pilar do cluster gestao-financeira-pessoal. Página /financas-pessoais/gestao-financeira atribuída. |
| 2026-04-08 | Artigo calorias-diarias publicado no cluster saude-imc (satellite) |
| 2026-04-03 | Artigo energia-na-fisica publicado no cluster fisica-basica |
| 2026-04-03 | Calculadora de Energia Potencial adicionada em Ciencia > Fisica |
| 2026-04-03 | Calculadora de Densidade adicionada em Ciencia > Fisica |
| 2026-04-03 | Calculadora de Potencia adicionada em Ciencia > Fisica |
| 2026-04-03 | Artigo impulso-e-quantidade-de-movimento publicado no cluster fisica-basica |
| 2026-04-03 | Artigo pressao-atmosferica publicado no cluster fisica-basica |
| 2026-04-03 | Artigo potencia-na-fisica atualizado no cluster fisica-basica |
| 2026-04-03 | Segurança enterprise implementada - Jest testing, CSP/HSTS headers, Winston logging, input sanitization, API hardening |
| 2026-04-03 | Auditoria completa do projeto concluída - correções de linting, configuração dev server, validação de todas as rotas |
| 2026-04-03 | Correção de erro 500 nas páginas de calculadoras (null pointer em related_calculators) |
| 2026-04-02 | Artigo pressao-na-fisica publicado no cluster fisica-basica |
| 2026-03-03 | Portal do Cálculo criado com 50 calculadoras |
| 2026-03-26 | v1.0.0 - Rollback para estado estável (sem Supabase) |
| 2026-03-29 | Sistema de tracking dual (GTM + API), cluster engenharia-cimento concluído |
| 2026-03-30 | Páginas institucionais, Knowledge Hub implementado |
| 2026-03-31 | v1.1.0 - Artigos cimento-para-laje e cimento-para-piso publicados |