# Technical Context: CalcuLabs

## Technology Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.x    | React framework with App Router |
| React        | 19.x    | UI library                      |
| TypeScript   | 5.9.x   | Type-safe JavaScript            |
| Tailwind CSS | 4.x     | Utility-first CSS              |
| Bun          | Latest  | Package manager & runtime       |
| Drizzle ORM  | Latest  | ORM for database                |
| SQLite       | -       | Local database (better-sqlite3)  |
| Turso        | -       | Production database (libsql)     |

## Development Environment

### Prerequisites

- Bun installed
- Node.js 20+

### Commands

```bash
bun install        # Install dependencies
bun dev            # Start dev server (handled by sandbox)
bun build          # Production build
bun lint           # Run ESLint
bun typecheck      # Run TypeScript type checking
bun run src/lib/validate-calculator.ts [slug]  # Validate calculator
bun run src/lib/validate-article.ts [slug]     # Validate article
```

## Key Dependencies

### Production Dependencies

```json
{
  "next": "^16.1.3",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "@libsql/client": "^0.14.0",
  "better-sqlite3": "^11.0.0",
  "drizzle-orm": "^0.30.0",
  "nodemailer": "^6.9.0"
}
```

### Dev Dependencies

```json
{
  "typescript": "^5.9.3",
  "@types/node": "^24.10.2",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@types/better-sqlite3": "^7.6.0",
  "@types/nodemailer": "^6.4.0",
  "@tailwindcss/postcss": "^4.1.17",
  "tailwindcss": "^4.1.17",
  "eslint": "^9.39.1",
  "eslint-config-next": "^16.0.0",
  "drizzle-kit": "^0.20.0"
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | No | SMTP server |
| `SMTP_PORT` | No | SMTP port |
| `SMTP_USER` | No | SMTP user |
| `SMTP_PASS` | No | SMTP password |
| `REPORT_FROM_EMAIL` | No | From email |
| `REPORT_TO_EMAIL` | No | To email |
| `TURSO_DATABASE_URL` | Production | Turso database URL |
| `TURSO_AUTH_TOKEN` | Production | Turso auth token |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL |
| `SEED_SECRET_KEY` | No | Seed endpoint key |

## Tracking System

### Core Module

- Location: `src/lib/analytics.ts`

### Functions

- `track(event, params)` - Sends to GTM (do not modify)
- `trackEvent(event, params)` - Primary function (GTM + API)

### Implemented Events

- `calculadora_visualizada`
- `campo_alterado` (debounced 300ms)
- `resultado_calculado`
- `resultado_copiado`

### Rules

- Always use `trackEvent()` for new tracking
- Never call GTM directly outside analytics.ts
- Fail silently if API fails