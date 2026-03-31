# Active Context: CalcuLabs

## Recently Completed

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

**Project Status**: 🚀 CalcuLabs - Versão 1.1.0

Portal brasileiro de calculadoras online gratuitas com 69 calculadoras em 8 categorias e 9 artigos do Knowledge Hub.

## Current Structure

| Component | Status |
|-----------|--------|
| Calculadoras | 69 |
| Categorias | 8 |
| Subcategorias | 17 |
| Artigos publicados | 9 |
| Clusters | 3 |
| Páginas institucionais | 4 (/sobre, /contato, /privacidade, /termos) |

## Knowledge Hub

| Cluster | Pilar | Satélites | Status |
|---------|-------|-----------|--------|
| engenharia-cimento | 1 | 5 | Completo |
| fisica-basica | 1 | 0 | Em expansão |
| juros-compostos | 1 | 1 | Em expansão |

## Session History

| Date | Changes |
|------|---------|
| 2026-03-03 | Portal do Cálculo criado com 50 calculadoras |
| 2026-03-26 | v1.0.0 - Rollback para estado estável (sem Supabase) |
| 2026-03-29 | Sistema de tracking dual (GTM + API), cluster engenharia-cimento concluído |
| 2026-03-30 | Páginas institucionais, Knowledge Hub implementado |
| 2026-03-31 | v1.1.0 - Artigos cimento-para-laje e cimento-para-piso publicados |