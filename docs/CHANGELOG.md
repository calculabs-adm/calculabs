# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

- fix: busca unificada em `/busca` agora indexa calculadoras e artigos do Knowledge Hub, com resultados tipados, links corretos por tipo e texto de UX/SEO alinhado ao comportamento real.
- refactor: implement GTM globally in layout.tsx using next/script for 100% page coverage, removing consent-dependent loading that was causing missing tags on some pages.
- LCP critical fix: lazy-loaded `CookieConsent` component with `ssr: false` to prevent cookie banner from being LCP candidate, reducing LCP from 5.3s baseline by removing server-side render impact.
- Preconnect optimization: added preconnect for GTM and AdSense domains in document head to reduce third-party loading latency.
- Browserslist tuning: updated to target only last 2 versions of major browsers (Chrome, Edge, Safari, Firefox) to eliminate unnecessary polyfills and reduce JS bundle size.
- Core Web Vitals optimization pass: migrated `Header` to Server Component (removed global `use client` hydration path), preserving search via GET form and dedicated `/busca` route to reduce initial JS/TBT and improve above-the-fold render timing.
- Font and third-party loading tuning: set `display: "swap"` on `next/font` declarations and moved Microsoft Clarity script strategy from `afterInteractive` to `lazyOnload` with `dns-prefetch` to avoid impacting initial paint/LCP.
- Performance optimization: Updated TypeScript target to ES2020, added modern browserslist config, preconnect for third-party scripts (Clarity), reducing polyfills and improving Core Web Vitals LCP scores
- Added Microsoft Clarity tracking script globally to all pages using Next.js Script component with afterInteractive strategy for optimal performance and no SEO impact
- **Published Knowledge Hub article: `mediana`** (Mediana: O Que É, Como Calcular e Exemplos Práticos) - category: matematica, cluster: matematica-basica (satellite). Related calculators: media-aritmetica, media-ponderada, nota-minima-para-passar. Related articles: media-aritmetica, media-ponderada. Objetivo: expandir cluster matematica-basica, fortalecer relação com média aritmética e ponderada, aumentar autoridade educacional.
- **Published Knowledge Hub article: `media-ponderada`** (Média Ponderada: O Que É, Como Calcular e Quando Usar) - category: matematica, cluster: matematica-basica (satellite). Related calculators: media-ponderada, media-aritmetica, nota-minima-para-passar. Related articles: porcentagem. Objetivo: expandir cluster matematica-basica, fortalecer relação com media-aritmetica e aumentar autoridade matemática.
- **Published Knowledge Hub article: `media-aritmetica`** (Média Aritmética: O Que É, Como Calcular e Exemplos Práticos) - category: matematica, cluster: matematica-basica (satellite). Related calculators: media-aritmetica, media-ponderada, nota-minima-para-passar. Related articles: porcentagem, regra-de-tres. Objetivo: expandir cluster matematica-basica, aumentar cobertura de matemática básica e gerar tráfego orgânico massivo.
- Added E-E-A-T authority block ("## Sobre o conteúdo") to all 39 Knowledge Hub articles before FAQ section to improve trust signals and AdSense approval chances.
- **Published Knowledge Hub article: `taxa-metabolica-basal`** (Taxa Metabólica Basal: O Que É, Como Calcular e Quantas Calorias Seu Corpo Gasta em Repouso) - category: saude, cluster: saude-imc (satellite). Related calculators: taxa-metabolica-basal, calorias-diarias, imc, peso-ideal. Related articles: imc, peso-ideal, calorias-diarias. Objetivo: conectar IMC → Peso Ideal → TMB → Calorias Diárias para fortalecer cluster saúde e maximizar tempo de permanência.
- **Published Knowledge Hub article: `calorias-diarias`** (Calorias Diárias: Quantas Calorias Você Deve Consumir por Dia) - category: saude, cluster: saude-imc (satellite). Related calculators: calorias-diarias, taxa-metabolica-basal. Related articles: imc, peso-ideal. Objetivo: completar base metabólica do cluster saúde para aumentar autoridade e aprovação AdSense.
- **Published Knowledge Hub article: `financiamento-imobiliario`** (Financiamento Imobiliário: Como Funciona, Como Calcular e Como Escolher o Melhor) - category: financas-pessoais, cluster: gestao-financeira-pessoal (satellite). Related calculators: financiamento-imobiliario. Objetivo: completar cluster gestão financeira com conteúdo de alto valor sobre maior investimento da vida.
- **Published Knowledge Hub article: `ferias-proporcionais`** (Férias Proporcionais: Como Calcular, Quem Tem Direito e Quanto Você Deve Receber) - category: trabalhista-tributario, cluster: trabalhista (satellite). Related calculators: ferias-proporcionais, rescisao-trabalhista, decimo-terceiro, fgts. Objetivo: fechar cluster trabalhista, cobrir todas verbas principais e aumentar autoridade temática.
- **Published Knowledge Hub article: `decimo-terceiro`** (Décimo Terceiro Salário: Como Calcular, Quem Tem Direito e Quando Receber) - category: trabalhista-tributario, cluster: trabalhista (satellite). Related calculators: decimo-terceiro, rescisao-trabalhista, fgts, ferias-proporcionais. Objetivo: expandir cluster trabalhista, explicar direito mais esperado do ano e conectar com cálculos práticos.
- **Published Knowledge Hub article: `fgts`** (FGTS: O Que É, Como Funciona, Como Calcular e Quando Você Pode Sacar) - category: trabalhista-tributario, cluster: trabalhista (satellite). Related calculators: fgts, rescisao-trabalhista, decimo-terceiro, ferias-proporcionais. Objetivo: expandir cluster trabalhista, explicar direito fundamental e conectar com cálculos práticos.
- **Published Knowledge Hub article: `rescisao-trabalhista`** (Rescisão Trabalhista: Como Calcular, Tipos de Demissão e Seus Direitos) - category: trabalhista-tributario, cluster: trabalhista (pillar). Related calculators: rescisao-trabalhista, fgts, decimo-terceiro, ferias-proporcionais. Objetivo: criar base do cluster trabalhista, aumentar valor percebido e chances de aprovação AdSense.
- **Published Knowledge Hub article: `guia-gestao-financeira`** (Guia Completo de Gestão Financeira: Organize Seu Dinheiro e Construa Patrimônio) - category: financas-pessoais, cluster: gestao-financeira-pessoal (pillar). Related calculators: roi, margem-de-lucro, ponto-de-equilibrio, markup. Internal links: gestao-financeira-pessoal, fluxo-de-caixa, roi, margem-de-lucro. Página atribuída a /financas-pessoais/gestao-financeira.
- **Published Knowledge Hub article: `porcentagem`** (Porcentagem: O Que É, Como Calcular e Aplicações Práticas no Dia a Dia) - category: matematica, cluster: matematica-basica (pillar). Related calculators: juros-simples, juros-compostos. Related articles: juros-simples-vs-compostos, gestao-financeira-pessoal. 2462 words, validator passed.
- **Published Knowledge Hub article: `regra-de-tres`** (Regra de Três: Como Calcular, Tipos e Aplicações Práticas) - category: matematica, cluster: matematica-basica (satellite). Related calculators: juros-simples, juros-compostos. Related articles: porcentagem, variacao-percentual. 2150+ words, validator passed.
- Expanded energia-na-fisica article with "Exemplo prático completo de energia na física" section - detailed calculation with car scenario for better user retention
- Expanded energia-na-fisica article with new section "Principais erros ao entender energia na física" for better SEO depth and AdSense approval
- Added Calculadora de Energia Potencial (id: 126) in Ciência > Física with formula Ep = m · g · h
- Added Calculadora de Densidade (id: 125) in Ciência > Física with formula ρ = m / V
- Added Calculadora de Pressão (id: 124) in Ciência > Física with formula P = F / A
- Added Calculadora de Potência (id: 123) in Ciência > Física with formula P = T / t
- Fixed Calculadora de Pressão availability issue
- Published Knowledge Hub article: impulso-e-quantidade-de-movimento (Impulso e Quantidade de Movimento: O Que É, Fórmulas e Aplicações na Física) - category: ciencia, cluster: fisica-basica (satellite)
- Published Knowledge Hub article: pressao-atmosferica (Pressão Atmosférica: O Que É, Como Funciona e Exemplos no Dia a Dia) - category: ciencia, cluster: fisica-basica (satellite)
- Published Knowledge Hub article: potencia-na-fisica (Potência na Física: O Que É, Fórmula, Como Calcular e Aplicações Práticas)
- **Segurança e Testes Avançados**: Implementação completa de framework de testes e hardening de segurança
  - ✅ **Jest Testing Framework**: Configurado com React Testing Library, testes unitários para funções críticas
  - ✅ **Headers de Segurança**: CSP, HSTS, X-Frame-Options, Content-Type-Options implementados
  - ✅ **Logging Estruturado**: Winston logger com rotação de logs para produção
  - ✅ **Sanitização de Inputs**: Utilitários avançados para XSS prevention, validação de email, rate limiting
  - ✅ **Hardening de APIs**: Rate limiting, sanitização, logging estruturado nas APIs de tracking e error reporting
  - ✅ **Configuração de Produção**: Headers de segurança aplicados globalmente via next.config.ts
- **Auditoria Completa do Projeto**: Concluída verificação abrangente de código e funcionalidades
  - ✅ Correções críticas: Resolvidos erros de linting (setState em useEffect), links HTML incorretos, configurações Turbopack
  - ✅ Funcionalidades validadas: Todas as rotas críticas (71 calculadoras, 22 artigos, páginas institucionais) respondendo corretamente
  - ✅ Segurança: Vulnerabilidades reduzidas de 7 para 4 (restantes são dev-only)
  - ✅ Build e TypeScript: Sem erros em produção e desenvolvimento
- Fixed 500 errors on calculator routes: Updated hardcoded URLs and fallbacks from www.calculabs.com.br to calculabs.com.br after domain change
- Fixed 500 error in calculator pages: Added null check for related_calculators property before calling includes() in relatedArticles filter
- Published "Pressão na Física" article (pressao-na-fisica) in Ciência > Física - comprehensive guide covering pressure definition, formula P=F/A, hydrostatics, practical applications (2847 words)
- Published "Velocidade e Aceleração" article (velocidade-e-aceleracao) in Ciência > Física - comprehensive guide covering MRU, MRUV, calculations, and practical applications (2522 words)
- Fixed Lei da Gravitação Universal de Newton calculator - added scientific notation for very large results (>= 1e15)
- Added Lei da Gravitação Universal de Newton calculator (id 122) in Ciência > Física
- Added CALCULABS_CREATION_SYSTEM.md with strict guidelines for calculator creation and validation
- Enhanced carousel navigation buttons with blue styling and shadows for better visibility
- Added articles carousel on home page displaying latest published articles with auto-scroll and navigation controls
- Fixed ARTICLE_WHITELIST to include slugs for 4 new articles: fluxo-de-caixa, despesas-fixas-e-variaveis, capital-de-giro, roi

### Added
- Artigo Knowledge Hub: `markup` (Markup: O Que É, Como Calcular e Definir o Preço de Venda Correto)
  - Categoria: financas-pessoais, Cluster: gestao-financeira-pessoal (satellite)
  - Whitelist: 13 artigos publicados
  - Cluster gestao-financeira-pessoal com 3 satellites
- Artigo Knowledge Hub: `margem-de-lucro` (Margem de Lucro: O Que É, Como Calcular e Aumentar a Rentabilidade do Seu Negócio)
  - Categoria: financas-pessoais, Cluster: gestao-financeira-pessoal (satellite)
  - Whitelist: 12 artigos publicados
  - Expansão do cluster gestão financeira pessoal
- Artigo Knowledge Hub: `gestao-financeira-pessoal` (Gestão Financeira Pessoal: Guia Completo para Organizar, Economizar e Fazer Seu Dinheiro Crescer)
  - Categoria: financas-pessoais, Cluster: gestao-financeira-pessoal (pillar)
  - Whitelist: 11 artigos publicados
  - Novo cluster de gestão financeira com 5 calculadoras relacionadas

### Fixed

### Changed

### Removed

## [1.1.0] - 2026-03-31

### Added
- Páginas institucionais: `/sobre`, `/contato`, `/privacidade`, `/termos`
  - Sobre a CalcuLabs: missão, valores, funcionalidades
  - Contato: e-mail, reportar erros, solicitar calculadoras
  - Política de Privacidade: LGPD, cookies, Google AdSense, direitos do usuário
  - Termos de Uso: uso permitido, precisão dos cálculos, limitação de responsabilidade
  - Sitemap atualizado com as 4 páginas institucionais (prioridade 0.3-0.5)
- Sistema de mapeamento global: `docs/MASTER_MAP.md` (clusters, artigos, calculadoras, relações)
- Diagramas visuais: `docs/MASTER_MAP_VISUAL.md` (fluxos, crescimento sugerido)
- Seção "Mapa do Sistema" adicionada em `docs/ARCHITECTURE.md`
- Artigo Knowledge Hub: `cimento-para-piso` (Cimento para Piso)
  - Categoria: engenharia-construcao, Cluster: engenharia-cimento (satellite)
  - Whitelist: 9 artigos publicados
- Artigo Knowledge Hub: `cimento-para-laje` (Cimento para Laje)
  - Categoria: engenharia-construcao, Cluster: engenharia-cimento (satellite)
  - Whitelist: 8 artigos publicados
- Artigo Knowledge Hub: `forca-energia-e-trabalho` (Força, Energia e Trabalho)
  - Categoria: ciencia, Cluster: fisica-basica (pillar)
- Artigo Knowledge Hub: `consumo-de-cimento-por-tipo-de-obra`
  - Categoria: engenharia-construcao, Cluster: engenharia-cimento (satellite)
- Artigo Knowledge Hub: `traco-de-concreto-proporcao`
  - Categoria: engenharia-construcao, Cluster: engenharia-cimento (satellite)
- Calculadora: `trabalho-forca-distancia` (ID 120, Ciência/Física)
- Calculadora: `energia-cinetica` (ID 119, Ciência/Física)
- Calculadora: `forca-lei-de-newton` (ID 118, Ciência/Física)
- Componente `PreAdTransition` — bloco de transição UX
- Componente `AdBlock` — monetização AdSense V1
- AdBlock inserido nas páginas de calculadora (2 posições: meio e final)
- Renderização de artigos Knowledge Hub na rota `/conhecimento/[slug]` (SSG)
- Sistema Knowledge Hub completo: spec, inventário, validador CLI

### Fixed
- Calculadora `energia-do-foton`: category_id corrigido de 11 (inexistente) para 14 (Ciência)
- Subcategoria `quantica` (id: 26): category_id corrigido de 11 para 14

### Changed
- Refatoração de legibilidade: classe `.calc-content` aplicada ao conteúdo textual
- ReadingBreak contextual com função `getReadingBreakText()` por categoria

## [1.0.0] - 2026-03-26

### Changed
- Rollback completo para commit b3411f0
- Removido Supabase (dependências, código, variáveis de ambiente)
- Removidos painel admin, sistema de monetização com toggle, e tracking com persistência em banco
- Projeto restaurado ao estado estável base (JSON static data, SQLite/Turso, GTM, SMTP)

### Added
- Sistema de documentação viva em `/docs/`
  - `SYSTEM_OVERVIEW.md` — Visão geral do sistema
  - `ARCHITECTURE.md` — Arquitetura e estrutura
  - `FEATURES.md` — Funcionalidades ativas
  - `MONETIZATION.md` — Estado da monetização
  - `CHANGELOG.md` — Este arquivo
  - `master_inventory-calculators.md` — Inventário completo das 66 calculadoras

---

## Regras deste CHANGELOG

- Toda alteração no código DEVE ter entrada aqui
- Formato: `### Added/Changed/Removed/Fixed` por versão
- Data no formato YYYY-MM-DD
- Descrição curta e técnica do que foi alterado e motivo

---

## [Pre-rollback] — Histórico (commits removidos)

Os commits entre b3411f0 e 29dc94c foram removidos no rollback. Funcionalidades que existiam nesse período:

- Supabase integration (tracking persistence, auth, settings)
- Admin panel (login, dashboard, monetization toggles, performance metrics)
- AdBlock component (AdSense rendering)
- MonetizationBlock / MonetizationContainer (ads positioning)
- Settings API (Supabase CRUD)
- Tracking with database persistence
- Revenue calculation (RPM, EPC)
- XLSX export for calculator inventory

Essas funcionalidades precisarão ser recriadas do zero sem Supabase, usando Drizzle/Turso.
