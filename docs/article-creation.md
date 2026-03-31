CALCULABS_ARTICLE_CREATION_SPEC (PADRÃO OFICIAL)
================================================================
REGRA DE OURO

Este documento define o padrão único e obrigatório para criação de artigos no Knowledge Hub do CalcuLabs.

Nenhuma criação de artigo deve ocorrer fora deste padrão.

Nenhuma regra pode ser interpretada.
Toda execução deve ser literal.

Toda solicitação deve conter a estrutura completa abaixo.

================================================================
OBJETIVO

Garantir:

Padronização total dos artigos
Compatibilidade com Article Spec V1
Zero retrabalho
Escala previsível
================================================================
REGRA CRÍTICA

O ChatGPT é responsável por:

Gerar TODO o conteúdo do artigo
Garantir que a spec esteja 100% válida

O Kilo NÃO deve:

Criar conteúdo
Alterar conteúdo
Resumir conteúdo
Corrigir conteúdo

O Kilo deve apenas:

Inserir o artigo no sistema
Atualizar arquivos necessários
Validar estrutura
================================================================
FORMATO DE SOLICITAÇÃO (ENVIADO AO KILO)

CALCULABS_ARTICLE_SPECIFICATION

Solicitação de criação de novo artigo:

IDENTIFICAÇÃO

slug
[slug-em-kebab-case]

title
[título do artigo]

category
[slug da categoria existente]

search_intent
informacional | comercial | navegacional

priority
low | medium | high

SEO

meta_title
[título SEO]

meta_description
[descrição SEO]

ESTRUTURA DE CONTEÚDO

summary
[mínimo 200 caracteres]

content
[HTML completo com mínimo 2500 palavras]

BLOCOS OBRIGATÓRIOS

faq
[
{ "q": "", "a": "" },
{ "q": "", "a": "" },
{ "q": "", "a": "" }
]

how_to
[
"",
"",
""
]

entities
[
"",
"",
""
]

semantic_keywords
[
"",
"",
"",
"",
""
]

examples
[
""
]

comparisons
[
""
]

RELACIONAMENTOS

related_calculators
[
"slug-existente",
"slug-existente"
]

related_articles
[
"slug-existente"
]

internal_links
[
"slug-existente",
"slug-existente"
]

FEATURED SNIPPET

featured_snippet_answer
[máx 300 caracteres]

CLUSTER

cluster
{
"is_pillar": false,
"cluster_name": "[nome-do-cluster]",
"satellites": []
}

================================================================
REGRAS DE VALIDAÇÃO (OBRIGATÓRIAS)

O artigo DEVE atender 100% da CALCULABS_ARTICLE_SPEC.md.

Validações obrigatórias:

Todos os campos presentes
Slug único e em kebab-case
Summary ≥ 200 caracteres
Content ≥ 2500 palavras
Content com HTML válido
Content com pelo menos 2 links internos reais (href)
FAQ com mínimo 3 itens
How_to com mínimo 3 itens
Semantic_keywords com mínimo 5 itens
Related_calculators com mínimo 2 válidos
Related_articles com mínimo 1 válido
Internal_links com mínimo 2 válidos
Featured_snippet_answer ≤ 300 caracteres

Se qualquer regra falhar:

→ A criação é inválida

================================================================
PROCESSO DE IMPLEMENTAÇÃO (KILO)

O Kilo deve executar EXATAMENTE:

Adicionar o artigo em:
src/data/articles.json
Atualizar whitelist:
src/lib/data.ts
Atualizar inventário:
docs/master_inventory-articles.md
Atualizar changelog:
docs/CHANGELOG.md
Atualizar memória interna:
.kilocode/rules/memory-bank/context.md
================================================================
VALIDAÇÃO FINAL

Executar:

bun run src/lib/validate-article.ts [slug]

Critério:

100% aprovado
Sem erros
Sem warnings críticos
================================================================
REGRAS FINAIS
Não adaptar a estrutura
Não omitir campos
Não criar campos novos
Não alterar nomes de campos
Não inserir valores nulos
Não inserir conteúdo parcial
================================================================
MODO DE SAÍDA (OBRIGATÓRIO)

A resposta deve ser:

Em texto bruto
100% copiável
Sem blocos especiais
Sem ocultação de conteúdo

CHECK FINAL (ANTES DE EXECUTAR)

[ ] Estrutura completa
[ ] Todos os campos preenchidos
[ ] Conteúdo com 2500+ palavras
[ ] Links internos válidos
[ ] Slugs corretos
[ ] Compatível com validate-article

Se qualquer item falhar:

→ NÃO EXECUTAR