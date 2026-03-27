# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
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
