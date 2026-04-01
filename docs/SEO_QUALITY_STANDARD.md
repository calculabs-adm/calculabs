# Padrão de Qualidade SEO - CalcuLabs Articles

## Visão Geral

Este documento é complementar ao CALCULABS_ARTICLE_SPEC.md e .kilocode/recipes/article-generator.md.
Todos os artigos devem seguir estes padrões de qualidade.

## Validação Automática

Todos os novos artigos passam por validação automática usando o script `scripts/seo-validator.js`. Artigos que não atendem aos critérios não podem ser publicados.

## Critérios Obrigatórios (Bloqueiam Publicação)

### ✅ H1 Único
- **Regra**: Cada artigo deve ter exatamente 1 tag `<h1>`
- **Localização**: Deve ser o primeiro elemento do conteúdo
- **Conteúdo**: Deve conter o título completo do artigo
- **Exemplo**: `<h1>Título do Artigo</h1>`

### ✅ Meta Title (30-60 caracteres)
- **Regra**: Entre 30 e 60 caracteres
- **Estrutura**: `[Título Principal] | CalcuLabs` ou `[Título Principal]: [Subtítulo]`
- **Palavras-chave**: Incluir termos principais no início
- **Exemplo**: `Margem de Lucro: Como Calcular | CalcuLabs`

### ✅ Meta Description (120-160 caracteres)
- **Regra**: Entre 120 e 160 caracteres
- **Conteúdo**: Descrição atraente + call-to-action
- **Palavras-chave**: Incluir termos de busca principais
- **Exemplo**: `Aprenda como calcular margem de lucro corretamente, entender sua rentabilidade e melhorar os resultados do seu negócio. Guia completo com fórmulas e exemplos.`

### ✅ Conteúdo (1500+ palavras)
- **Regra**: Mínimo: 1500 palavras, Recomendado: 2000+, Pillar: 3000+
- **Qualidade**: Informações originais, práticas e acionáveis
- **Estrutura**: Introdução + seções detalhadas + conclusão

### ✅ Featured Snippet
- **Regra**: Campo `featured_snippet_answer` obrigatório
- **Conteúdo**: Resposta direta e objetiva (1-2 frases)
- **Finalidade**: Aparecer nos resultados de destaque do Google

## Critérios Recomendados (Não Bloqueiam, mas Otimizam)

### 📈 Estrutura H2-H3
- **H2**: Mínimo 5 seções principais
- **H3**: Subseções quando necessário
- **Hierarquia**: Lógica e progressiva

### 🔍 Semantic Keywords (5+)
- **Relevância**: Termos relacionados ao tópico
- **Volume**: Pelo menos 5 keywords por artigo
- **Variedade**: Sinônimos e variações

### ❓ FAQ (3+ perguntas)
- **Estrutura**: Perguntas frequentes dos usuários
- **Formato**: `q` (pergunta) + `a` (resposta objetiva)
- **SEO**: Schema markup automático

### 🏷️ Entities (5+)
- **Definição**: Conceitos, ferramentas, termos técnicos
- **Finalidade**: Google Knowledge Graph
- **Exemplos**: "margem de lucro", "ROI", "ponto de equilíbrio"

### 🔗 Internal Links (1+)
- Internal Links:
- Mínimo: 3
- Ideal: 5+
- Deve incluir:
  - 1 pillar
  - 1 calculadora
  - 1 artigo relacionado
- **Relevância**: Links para artigos relacionados
- **Contexto**: Links naturais dentro do conteúdo
- **Benefício**: Navegação e autoridade interna

### 🧮 Related Calculators
- **Obrigatório**: Pelo menos 1 calculadora relacionada
- **Relevância**: Ferramentas que complementam o artigo
- **Benefício**: Conversão para ferramentas

## Checklist de Qualidade Pré-Publicação

### 📝 Conteúdo
- [ ] Título otimizado para SEO
- [ ] Introdução atrativa (300+ palavras)
- [ ] Seções bem estruturadas com H2/H3
- [ ] Exemplos práticos incluídos
- [ ] Conclusão com call-to-action
- [ ] Linguagem clara e acessível

### 🔍 SEO Técnico
- [ ] H1 único no início
- [ ] Meta title 30-60 caracteres
- [ ] Meta description 120-160 caracteres
- [ ] URL amigável (slug otimizado)
- [ ] Featured snippet definido
- [ ] Palavras-chave semânticas incluídas

### 🏗️ Estrutura
- [ ] FAQ com 3+ perguntas relevantes
- [ ] Entities identificadas
- [ ] Internal links para artigos relacionados
- [ ] Calculadoras relacionadas vinculadas
- [ ] Imagens com alt text (se aplicável)

### ✅ Validação Final
- [ ] Script de validação SEO passou (100/100)
- [ ] Conteúdo revisado por especialista
- [ ] Links internos funcionais
- [ ] Calculadoras relacionadas existem

## Processo de Criação de Novos Artigos

1. **Planejamento**: Definir tópico, palavras-chave, estrutura
2. **Pesquisa**: Analisar concorrência e oportunidades
3. **Escrita**: Seguir estrutura otimizada
4. **Otimização**: Aplicar todos os critérios SEO
5. **Validação**: Executar script de qualidade
6. **Revisão**: Correção de issues identificadas
7. **Publicação**: Commit apenas após 100/100 na validação

## Ferramentas de Apoio

- **Validador SEO**: `scripts/seo-validator.js`
- **Contador de Palavras**: Scripts automáticos
- **Analisador de Meta Tags**: Verificação automática
- **Google Search Console**: Monitoramento pós-publicação

## Métricas de Sucesso

- **Taxa de Aprovação**: 100% nos critérios obrigatórios
- **Posicionamento**: Top 10 para palavras-chave principais
- **Engajamento**: Tempo médio na página > 3 minutos
- **Conversão**: Cliques para calculadoras relacionadas
- **Indexação**: Aparecer nos resultados do Google em 24h

## 🧩 Cluster SEO

- Todo artigo deve pertencer a um cluster
- Classificação obrigatória:
  - pillar
  - satellite
- Satellite deve linkar para o pillar
- Pillar deve linkar para satellites

## 🧩 Cluster SEO

- Todo artigo deve pertencer a um cluster
- Classificação obrigatória:
  - pillar
  - satellite
- Satellite deve linkar para o pillar
- Pillar deve linkar para satellites

## 🔄 Conversão (Soft CTA)

- Inserir links naturais para:
  - calculadoras
  - artigos relacionados
- Evitar CTA agressivo

---

**Última atualização**: 2026-03-31
**Versão**: 1.0
**Responsável**: Sistema de Qualidade SEO CalcuLabs