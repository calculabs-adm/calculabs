# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
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
