# Command: create-article

Comando personalizado para criação automática de artigos seguindo padrões de qualidade SEO.

## Usage

```bash
/create-article [slug] [title] [category] [cluster]
```

## Parameters

- `slug`: URL-friendly identifier (required)
- `title`: Complete article title (required)
- `category`: Content category (financas-pessoais|ciencia|engenharia-construcao) (required)
- `cluster`: Target cluster name (required)

## Examples

```bash
/create-article roi-investimento "ROI: Como Calcular Retorno sobre Investimento" financas-pessoais gestao-financeira-pessoal
/create-article velocidade-media "Velocidade Média: Conceito e Cálculo" ciencia fisica-basica
/create-article consumo-tinta "Consumo de Tinta por m²: Como Calcular" engenharia-construcao engenharia-cimento
```

## What It Does

1. **Loads Recipe**: Automatically loads `.kilocode/recipes/article-generator.md`
2. **Loads Agent**: Uses `article-creator` agent for content generation
3. **Validates Input**: Checks if cluster exists and parameters are valid
4. **Generates Content**: Creates complete article following SEO standards
5. **Quality Check**: Runs automatic validation (blocks if fails)
6. **Prepares for Commit**: Ready for git commit with quality guarantee

## Integration

### Automatic Recipe Usage
The command automatically applies the article generator recipe without manual intervention.

### Agent Behavior
Uses the article-creator agent which enforces:
- SEO-first content creation
- Quality gate validation
- Cluster consistency
- Calculator integration

### Pre-commit Hook
The pre-commit hook will validate the generated article before allowing commits.

## Quality Assurance

### Automatic Validation
- SEO score validation (must be 100/100)
- Content length check (1500+ words)
- Structure validation (H1, meta tags, etc.)
- Relationship validation (calculators, links)

### Error Prevention
- Blocks creation if cluster doesn't exist
- Validates slug format and uniqueness
- Ensures calculator relationships are valid
- Prevents publication of low-quality content

## Output

1. Complete article JSON in `src/data/articles.json`
2. Quality validation report
3. Suggestions for related content (if applicable)
4. Ready-to-commit status

## Dependencies

- Recipe: `.kilocode/recipes/article-generator.md`
- Agent: `.kilocode/agent/article-creator.md`
- Validator: `scripts/seo-validator.js`
- Hook: `.kilocode/hooks/pre-commit-articles.js`

---

**Command Version**: 1.0
**Requires Recipe**: article-generator.md
**Requires Agent**: article-creator
**Last Updated**: 2026-03-31