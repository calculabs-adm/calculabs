# System Overview

## O que é

CalcuLabs é um portal brasileiro de calculadoras online gratuitas. Disponibiliza 75 calculadoras organizadas em 8 categorias e 17 subcategorias, cobrindo finanças, matemática, saúde, engenharia, astronomia e ciências. Inclui Knowledge Hub com 41 artigos em 7 clusters.

**URL:** https://calculabs.com.br

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Linguagem | TypeScript 5.9 |
| ORM | Drizzle ORM |
| DB Local | SQLite (better-sqlite3) |
| DB Produção | Turso (libsql) |
| Deploy | Vercel |
| Analytics | Google Tag Manager |
| Email | nodemailer (SMTP) |

## Dados

O conteúdo das calculadoras está armazenado em arquivos JSON estáticos em `src/data/`:

- `categories.json` — 8 categorias
- `subcategories.json` — 17 subcategorias
- `calculators.json` — 71 calculadoras
- `articles.json` — 23 artigos do Knowledge Hub

O banco de dados (SQLite/Turso) existe mas é usado para seeding e features futuras. A leitura em runtime usa os JSONs.

## Cálculos

Todas as fórmulas são avaliadas client-side via `src/lib/formula-engine.ts`. O engine usa `Function` constructor com escopo restrito de 30+ funções auxiliares (matemática, finanças, saúde, gravidez, astronomia, impostos).

## Integrações

- Google Tag Manager (GTM-WCJ4FLF7)
- SMTP para reporte de erros
- Turso DB para produção
- Vercel para deploy

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|------------|-----------|
| `SMTP_HOST` | Não | Servidor SMTP |
| `SMTP_PORT` | Não | Porta SMTP |
| `SMTP_USER` | Não | Usuário SMTP |
| `SMTP_PASS` | Não | Senha SMTP |
| `REPORT_FROM_EMAIL` | Não | Email remetente |
| `REPORT_TO_EMAIL` | Não | Email destinatário |
| `TURSO_DATABASE_URL` | Produção | URL do banco Turso |
| `TURSO_AUTH_TOKEN` | Produção | Token de autenticação Turso |
| `NEXT_PUBLIC_SITE_URL` | Não | URL do site (default: calculabs.com.br) |
| `SEED_SECRET_KEY` | Não | Chave do endpoint /api/seed |

## Knowledge Hub System

Sistema de governança de artigos com spec rígida (`docs/CALCULABS_ARTICLE_SPEC.md`).

| Componente | Arquivo | Função |
|-----------|---------|--------|
| Spec | `docs/CALCULABS_ARTICLE_SPEC.md` | Especificação oficial dos artigos |
| Inventário | `docs/master_inventory-articles.md` | Controle de artigos (planejado → publicado) |
| Dados | `src/data/articles.json` | Array de artigos validados |
| Validador | `src/lib/validate-article.ts` | CLI de validação estrutural |

Execução: `bun run src/lib/validate-article.ts [slug]`

## Páginas Institucionais

- `/sobre` — Sobre a CalcuLabs (missão, valores, funcionalidades)
- `/contato` — Contato e reporte de erros
- `/privacidade` — Política de Privacidade (LGPD)
- `/termos` — Termos de Uso

## Busca

A rota `/busca` executa busca unificada em dois conjuntos de dados estáticos:
- Calculadoras (`src/data/calculators.json`): nome, descrição e keywords
- Artigos (`src/data/articles.json` via whitelist): título, resumo, semantic_keywords e entities

Os resultados são tipados por conteúdo (calculadora/artigo), com destino de navegação específico por tipo.

## Última Atualização

2026-04-11 — Correção da busca: `/busca` passou a retornar calculadoras + artigos do Knowledge Hub, com UX/meta alinhadas ao comportamento real e estado vazio genérico de resultados.
2026-04-10 — LCP fix: CookieConsent lazy-loaded (ssr: false) para remover banner como candidato LCP, preconnect para GTM/AdSense, browserslist otimizado para reduzir polyfills. Header convertido para Server Component (menos JS inicial), fontes com `display: swap`, Clarity em `lazyOnload` e ajustes de carregamento para reduzir impacto em LCP/CLS.
2026-04-09 — Atualização: 75 calculadoras, 42 artigos publicados, Knowledge Hub expandido com artigo sobre mediana no cluster matematica-basica.
