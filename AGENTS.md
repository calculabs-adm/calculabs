# AGENTS.md — Regras do Projeto

## Documentação Viva (OBRIGATÓRIO)

Toda alteração no código DEVE atualizar a documentação em `/docs/`.

### Arquivos de Documentação

| Arquivo | Quando atualizar |
|---------|-----------------|
| `docs/CHANGELOG.md` | Toda alteração |
| `docs/FEATURES.md` | Alteração em funcionalidades |
| `docs/ARCHITECTURE.md` | Alteração em estrutura, rotas, fluxo |
| `docs/MONETIZATION.md` | Alteração em anúncios, CTA, receita |
| `docs/SYSTEM_OVERVIEW.md` | Alteração em stack, dependências, config |
| `docs/master_inventory-calculators.md` | Criação, alteração ou remoção de calculadora |

### Regras

1. Nenhuma tarefa está concluída sem documentação atualizada
2. CHANGELOG.md sempre recebe entrada para qualquer commit
3. Formato técnico, claro, sem redundância
4. Verificar consistência entre código e docs antes de commit

## Recipes

Quando o usuário solicitar funcionalidades além do template base, verificar recipes em `.kilocode/recipes/`.

| Recipe       | File                                | Quando usar                          |
| ------------ | ----------------------------------- | ------------------------------------ |
| Add Database | `.kilocode/recipes/add-database.md` | Persistência de dados                |

### Como usar

1. Ler o arquivo da recipe
2. Seguir as instruções
3. Atualizar a documentação em `/docs/`
4. Atualizar o memory bank em `.kilocode/rules/memory-bank/`

## Memory Bank

Após cada tarefa, atualizar:

- `.kilocode/rules/memory-bank/context.md` — Estado atual e mudanças recentes
- Outros arquivos do memory bank se arquitetura, stack ou objetivos mudarem

## Validação de Calculadoras (OBRIGATÓRIO)

Após criar ou alterar qualquer calculadora, DEVE rodar a validação:

```bash
bun run src/lib/validate-calculator.ts [slug]
```

### Checklist de Nova Calculadora

Antes de considerar a tarefa concluída, verificar:

1. **Validação CLI passou** — `bun run src/lib/validate-calculator.ts [slug]` retorna ✅
2. **Exemplo prático completo** — campo `example` com:
   - `title` descritivo com valores reais
   - `inputs` preenchidos (não vazios/zero)
   - `result` numérico correto (sem typos)
   - `explanation` com fórmula + valores substituídos (mínimo 30 caracteres)
3. **Rota acessível** — URL `/categoria/subcategoria/slug` retorna 200
4. **Inventário atualizado** — `docs/00-master_inventory-calculators.md` com ID, slug, nome, complexidade, monetização
5. **TypeScript sem erros** — `npx tsc --noEmit`
6. **CHANGELOG atualizado** — entrada na seção `[Unreleased]`

### Validação de Artigos

Após criar ou alterar qualquer artigo, rodar:

```bash
bun run src/lib/validate-article.ts [slug]
```

O validador verifica:
- Conteúdo mínimo de 1500 palavras
- Todos os slugs em `related_articles`, `related_calculators`, `internal_links` existem
- Links HTML apontam para URLs válidas
