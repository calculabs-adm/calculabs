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

### Variáveis do Sistema de Reporte de Erros (Opcionais)
| Variável | Descrição |
|----------|----------|
| `SMTP_HOST` | Servidor SMTP (ex: smtp.umbler.com) |
| `SMTP_PORT` | Porta SMTP (ex: 587) |
| `SMTP_USER` | Usuário SMTP (email) |
| `SMTP_PASS` | Senha SMTP |
| `REPORT_FROM_EMAIL` | Email de remetente (ex: contato@calculabs.com.br) |
| `REPORT_TO_EMAIL` | Email que receberá os relatórios de erro |

> ⚠️ **Importante**: As variáveis acima são necessárias apenas para o sistema de reporte de erros funcionar. Sem elas, o botão "Reportar erro" não enviará emails.

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

---

## ⚠️ Problema: Push para GitHub não funciona automaticamente

### Diagnóstico

O ambiente Kilo Code usa um repositório git interno (`builder.kiloapps.io`) como `origin`. Quando o AI faz `git push origin main`, ele envia para o servidor interno do Kilo Code, **não para o GitHub**.

Para enviar para o GitHub, é necessário um **Personal Access Token (PAT)** do GitHub configurado.

### Solução Permanente: Configurar GitHub Token

**Passo 1: Criar um Personal Access Token no GitHub**
1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione o escopo `repo` (acesso completo a repositórios)
4. Copie o token gerado (começa com `ghp_...`)

**Passo 2: Configurar o token no ambiente**

Antes de cada sessão de trabalho, execute no terminal:
```bash
git remote add github https://SEU_TOKEN@github.com/calculabs-adm/calculabs.git
git push github main
```

Ou configure permanentemente:
```bash
git config --global credential.helper store
echo "https://calculabs-adm:SEU_TOKEN@github.com" >> ~/.git-credentials
git remote add github https://github.com/calculabs-adm/calculabs.git
git push github main
```

**Passo 3: Push para ambos os remotes**
```bash
# Push para o servidor interno do Kilo Code (sempre funciona)
git push origin main

# Push para o GitHub (requer token configurado)
git push github main
```

### Alternativa: Sincronização Manual

Se não quiser configurar o token, você pode sincronizar manualmente:
1. Baixe o código do servidor Kilo Code
2. Faça push para o GitHub via sua máquina local

### Repositório GitHub
- URL: https://github.com/calculabs-adm/calculabs.git
- Branch principal: `main`
