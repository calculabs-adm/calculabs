# Monetização

## Status Atual

**Nenhuma integração de monetização ativa.** O rollback para commit b3411f0 removeu todas as implementações anteriores de monetização (AdSense, controles de toggle, painel admin).

## Estrutura Existe

Cada calculadora no `calculators.json` possui o campo `monetization_type` com valores possíveis:

| Valor | Significado |
|-------|------------|
| `ads` | Anúncios (AdSense) |
| `affiliate` | Links de afiliado |
| `leads` | Captura de leads |
| `pro` | Versão premium |

Este campo está definido no schema mas **não é utilizado em nenhum componente** no estado atual.

## Config Legada (não funcional)

Existe em `src/config/ads.ts` uma configuração hardcoded que **não é utilizada por nenhum componente**:

```ts
export const ADS_ENABLED = false as const
export const MONETIZATION_CONFIG = {
  adsEnabled: true,
  affiliateEnabled: false
}
```

Este arquivo pode ser removido em limpeza futura.

## O que foi removido no rollback

As seguintes funcionalidades existiam antes do rollback e precisam ser recriadas do zero:

1. **Componente AdBlock** (`src/components/ads/AdBlock.tsx`) — Renderização de anúncios AdSense
2. **Componente MonetizationBlock** (`src/components/calculator/MonetizationBlock.tsx`) — Container de monetização por posição (top/middle/bottom)
3. **MonetizationContainer** / **MonetizationWrapper** — Roteamento de tipo de monetização
4. **Painel Admin** — Login, dashboard, configurações, toggle de ads/afiliados
5. **API de Settings** — Persistência de configurações no Supabase
6. **Sistema de Tracking com DB** — Eventos persistidos no Supabase

## Próximos Passos

Para reativar monetização:

1. Definir estratégia de monetização (AdSense, afiliados, ou ambos)
2. Criar componente `AdBlock` que lê configuração do banco
3. Criar tabela `settings` no schema Drizzle (não Supabase)
4. Criar API de settings (`/api/admin/settings`)
5. Criar painel admin com autenticação própria
6. Documentar aqui

## Última Atualização

2026-03-26 — Documentação criada pós-rollback. Monetização inativa.
