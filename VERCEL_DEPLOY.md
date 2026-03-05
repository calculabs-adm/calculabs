# CalcuLabs - Deployment Guide

## Como Publicar na Vercel

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Conta no [Turso DB](https://turso.tech) (banco de dados SQLite na nuvem)

### Passo 1: Criar Banco de Dados no Turso
```bash
# Install Turso CLI (Mac/Linux)
curl -sSfL https://get.tur.so/install | bash

# Login
turso auth signup

# Criar banco
turso db create calculabs

# Obter URL do banco
turso db url calculabs
```

### Passo 2: Executar Migrações no Turso
```bash
# Obter URL
TURSO_DB_URL="libsql://calculabs.turso.io"

# Exportar variável
export TURSO_DATABASE_URL=$TURSO_DB_URL

# Criar tabelas (você pode precisar ajustar o script de migração)
```

### Passo 3: Deploy na Vercel

**Opção A: Via CLI**
```bash
# Install Vercel CLI globalmente
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Opção B: Via GitHub**
1. Fazer push do código para GitHub
2. Ir para https://vercel.com
3. Importar projeto do GitHub
4. Configurar variáveis de ambiente:
   - `TURSO_DATABASE_URL` = URL do banco Turso
   - `TURSO_AUTH_TOKEN` = Token de autenticação Turso

### Variáveis de Ambiente Necessárias
| Variável | Descrição |
|----------|-----------|
| `TURSO_DATABASE_URL` | URL do banco libsql (ex: libsql://calculabs.turso.io) |
| `TURSO_AUTH_TOKEN` | Token de autenticação do Turso |

### Desenvolvimento Local
```bash
# Instalar dependências
bun install

# Executar migrações
bun run db:migrate

# Popular banco (se necessário)
bun run db:seed

# Iniciar servidor dev
bun dev
```

## Status Atual
- ✅ Build local funciona
- ✅ Código preparado para Turso DB
- ⏳ Deploy na Vercel precisa ser feito manualmente
