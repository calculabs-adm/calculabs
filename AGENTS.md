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
