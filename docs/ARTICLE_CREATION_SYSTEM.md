# Sistema de Criação de Artigos - CalcuLabs

## Visão Geral

Sistema automatizado e padronizado para criação de artigos do Knowledge Hub, garantindo qualidade SEO consistente e alta performance nos mecanismos de busca.

## Arquitetura do Sistema

### 1. Recipe Base (`article-generator.md`)
**Local**: `.kilocode/recipes/article-generator.md`
- Template completo com estrutura SEO otimizada
- Padrões obrigatórios e recomendados
- Checklist de qualidade pré-publicação

### 2. Agent Especializado (`article-creator.md`)
**Local**: `.kilocode/agent/article-creator.md`
- Agente personalizado para geração de conteúdo
- Aplicação automática de recipes
- Validação integrada de qualidade

### 3. Comando Personalizado (`create-article.md`)
**Local**: `.kilocode/command/create-article.md`
- Comando direto para criação de artigos
- Interface simplificada para usuários
- Execução completa do workflow

### 4. Validação Automática (`seo-validator.js`)
**Local**: `scripts/seo-validator.js`
- Validador SEO com 14 critérios obrigatórios
- Pontuação automática (0-100)
- Relatório detalhado de problemas

### 5. Hook de Pre-commit (`pre-commit-articles.js`)
**Local**: `.kilocode/hooks/pre-commit-articles.js`
- Bloqueio automático de commits com problemas
- Validação antes de cada modificação
- Garantia de qualidade em produção

## Como Usar

### Método 1: Comando Direto (Recomendado)
```bash
/create-article roi-investimento "ROI: Como Calcular Retorno sobre Investimento" financas-pessoais gestao-financeira-pessoal
```

### Método 2: Agente Especializado
```bash
Use o agente article-creator para criação assistida
```

### Método 3: Recipe Manual
```bash
Consulte .kilocode/recipes/article-generator.md para estrutura completa
```

## Garantias de Qualidade

### SEO Obrigatório (Bloqueia Publicação)
- ✅ H1 único e correto
- ✅ Meta title otimizado (30-60 chars)
- ✅ Meta description atraente (120-160 chars)
- ✅ Conteúdo mínimo 1500 palavras
- ✅ Featured snippet definido
- ✅ URL amigável

### Qualidade Recomendada (Otimiza Performance)
- 📈 Estrutura H2-H3 adequada
- 🔍 5+ semantic keywords
- ❓ 3+ perguntas FAQ
- 🏷️ 5+ entities identificadas
- 🔗 Links internos estratégicos
- 🧮 Calculadoras relacionadas

## Processo de Criação

1. **Definição**: Tópico, cluster e palavras-chave
2. **Execução**: Comando ou agente gera conteúdo completo
3. **Validação**: Verificação automática de qualidade
4. **Correção**: Ajustes automáticos se necessário
5. **Publicação**: Commit apenas com 100/100 na validação

## Monitoramento de Qualidade

### Métricas Automáticas
- **Taxa de Aprovação**: % de artigos que passam na validação
- **Score Médio SEO**: Pontuação média dos artigos
- **Tempo de Criação**: Eficiência do processo
- **Taxa de Erro**: Problemas pós-publicação

### Relatórios Disponíveis
- `scripts/seo-validator.js` - Validação completa
- `scripts/pre-commit-check.js` - Status pré-commit
- `docs/SEO_QUALITY_STANDARD.md` - Padrões detalhados

## Expansão de Clusters

### Clusters Ativos
- `engenharia-cimento` (7 artigos)
- `fisica-basica` (1 artigo)
- `juros-compostos` (2 artigos)
- `gestao-financeira-pessoal` (4 artigos)

### Próximas Expansões
- `fisica-basica`: velocidade, gravidade, pressão
- `juros-compostos`: tesouro direto, poupança
- `gestao-financeira-pessoal`: investimentos, aposentadoria

## Benefícios do Sistema

### Para Criadores de Conteúdo
- **Velocidade**: Criação em minutos vs horas
- **Qualidade**: SEO garantido automaticamente
- **Consistência**: Padrões uniformes
- **Segurança**: Validação impede publicação de conteúdo ruim

### Para o Projeto
- **SEO Forte**: Melhor posicionamento no Google
- **Qualidade Consistente**: Experiência uniforme
- **Escalabilidade**: Criação rápida de novos conteúdos
- **Manutenibilidade**: Sistema auto-sustentável

## Troubleshooting

### Problemas Comuns

**"Recipe not found"**
```
Solução: Verificar se .kilocode/recipes/article-generator.md existe
```

**"Validation failed"**
```
Solução: Executar node scripts/seo-validator.js para detalhes
```

**"Commit blocked"**
```
Solução: Corrigir issues identificados e tentar novamente
```

### Suporte
- Documentação: `docs/SEO_QUALITY_STANDARD.md`
- Validador: `scripts/seo-validator.js`
- Recipe: `.kilocode/recipes/article-generator.md`

---

**Sistema Version**: 1.0
**Status**: ✅ Ativo e Funcional
**Última Atualização**: 2026-03-31