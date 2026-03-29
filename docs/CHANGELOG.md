# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Artigo Knowledge Hub: `traco-de-concreto-proporcao` (Traço de Concreto: Proporção Ideal para Cada Tipo de Obra)
  - Categoria: engenharia-construcao, Cluster: engenharia-cimento (satellite)
  - Whitelist atualizada: 3 artigos publicados
- Renderização de artigos Knowledge Hub (MVP)
  - Rota: `/conhecimento/[slug]` (SSG)
  - Whitelist: `quantidade-de-cimento-por-m2`, `quantos-sacos-de-cimento-por-m2`, `traco-de-concreto-proporcao`
  - Artigos fora da whitelist retornam 404
  - SEO: meta_title, meta_description, canonical, OpenGraph
  - JSON-LD: Article + FAQPage schemas
  - Sitemap atualizado com 2 URLs de artigos
  - Funções em `src/lib/data.ts`: `getArticleBySlug()`, `getPublishedArticleSlugs()`
- Sistema Knowledge Hub (governança de artigos)
  - Spec oficial: `docs/CALCULABS_ARTICLE_SPEC.md` — estrutura JSON, regras de validação, regras de inventário
  - Inventário: `docs/master_inventory-articles.md` — controle de artigos (ID, Slug, Title, Cluster, Tipo, Status, Priority)
  - Dados: `src/data/articles.json` — 2 artigos iniciais (juros-compostos-guia-completo, juros-simples-vs-compostos)
  - Validador CLI: `src/lib/validate-article.ts` — `bun run src/lib/validate-article.ts [slug]`
  - Valida: estrutura completa, mínimos (FAQ 3+, how_to 3+, semantic_keywords 5+, related_calculators 2+, related_articles 1+, internal_links 2+), consistência de slugs, conteúdo HTML com links
  - Sem frontend, sem rotas, sem componentes — apenas dados e validação
- Componente `PreAdTransition` (`src/components/ui/PreAdTransition.tsx`) — bloco de transição UX antes do anúncio final
  - Texto dinâmico por categoria (financas-pessoais, trabalhista-tributario, matematica, saude, default)
  - CSS em `globals.css` (`.pre-ad-transition`: fundo claro, bordas sutis, centralizado)
  - Inserido imediatamente antes do AdBlock final na página de calculadora
  - Máximo 1 por página
- AdBlock inserido nas páginas de calculadora (`src/app/[categoria]/[subcategoria]/[calculo]/page.tsx`)
  - Posição 1 (meio): após CalculatorWidget (mobile + desktop)
  - Posição 2 (final): após todo conteúdo, antes do footer (mobile + desktop)
  - Máximo de 2 anúncios por página

### Changed
- Refatoração de legibilidade: classe `.calc-content` aplicada ao conteúdo textual das páginas de calculadora
  - CSS em `globals.css` com padrão fixo (max-width 720px, font-size 16px, line-height 1.75)
  - Wrapper aplicado em: Fórmula, Steps, Exemplo, Aplicações, Curiosidade, FAQ, Autor
  - Aplicado em ambos layouts (mobile + desktop)

### Added
- Componente `ReadingBreak` (`src/components/ui/ReadingBreak.tsx`) — interrupção visual para retenção
  - CSS em `globals.css` (`.reading-break`: fundo slate, borda azul esquerda)
  - Inserido após seção Fórmula em ambos layouts (mobile + desktop)
  - Máximo 1 por página
  - Texto padrão: "Entender este conceito é essencial para tomar decisões financeiras mais inteligentes."

### Removed
- `ReadingBreak` removido das páginas de calculadora — texto financeiro não era adequado para calculadoras não-financeiras (ex: IMC). Componente mantido em `src/components/ui/ReadingBreak.tsx` para uso futuro com texto contextual por categoria.

### Added
- ReadingBreak contextual reinserido nas páginas de calculadora
  - Função `getReadingBreakText()` com texto por categoria (finanças, trabalho, matemática, saúde, engenharia, default)
  - Inserido após seção "Exemplo Prático" em ambos layouts (mobile + desktop)
  - Máximo 1 por página
  - Não inserido dentro de `dangerouslySetInnerHTML`
  - 1 bloco por layout (total 1 por página, renderizado conforme viewport)
- Componente `AdBlock` (`src/components/ads/AdBlock.tsx`) — base de monetização AdSense V1
  - Slot padrão: 2277544742
  - Client: ca-pub-2809409030893528
  - Responsivo com min-height 250px
  - Label "Publicidade" discreto
  - Carregamento client-side com ref para evitar push duplicado
  - Componente isolado — não inserido em nenhuma página

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

---

## Regras deste CHANGELOG

- Toda alteração no código DEVE ter entrada aqui
- Formato: `### Added/Changed/Removed/Fixed` por versão
- Data no formato YYYY-MM-DD
- Descrição curta e técnica do que foi alterado e motivo
