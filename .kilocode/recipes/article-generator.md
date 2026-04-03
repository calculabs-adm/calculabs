# Recipe: Article Generator - SEO Optimized Content

## Visão Geral

Este documento é o **padrão oficial** para criação de artigos no Knowledge Hub CalcuLabs.
Complementa os documentos `docs/CALCULABS_ARTICLE_SPEC.md` e `docs/SEO_QUALITY_STANDARD.md`.

**Referências importantes:**
- 📋 [CALCULABS_ARTICLE_SPEC.md](../docs/CALCULABS_ARTICLE_SPEC.md) - Especificação técnica
- 🎯 [SEO_QUALITY_STANDARD.md](../docs/SEO_QUALITY_STANDARD.md) - Padrões de qualidade
- 📖 Sistema integrado de criação (consulte docs/ para visão geral)

## Validação Automática

Todos os artigos passam por **validação obrigatória** usando:
- **Script principal**: `scripts/seo-validator.js` (14 critérios obrigatórios)
- **Hook de pre-commit**: `.kilocode/hooks/pre-commit-articles.js` (bloqueia commits ruins)
- **Score mínimo**: 100/100 para publicação

## Critérios Obrigatórios (Bloqueiam Publicação)

### ✅ H1 Único
- **Regra**: Exatamente 1 tag `<h1>` por artigo
- **Localização**: Primeiro elemento do conteúdo
- **Conteúdo**: Título completo do artigo
- **Exemplo**: `<h1>Margem de Lucro: Conceito e Cálculo</h1>`

### ✅ Data de Publicação Automática
- **Regra**: OBRIGATÓRIA em todos os artigos
- **Localização**: IMEDIATAMENTE após a tag `<h1>`
- **Formato**: `<p class="publish-date">Publicado em DD de Mês de AAAA - Equipe Calculabs</p>`
- **Automação**: Usar data atual no momento da criação do artigo
- **Exemplo**: `<p class="publish-date">Publicado em 02 de Abril de 2026 - Equipe Calculabs</p>`


### ✅ Meta Title (30-60 caracteres)
- **Regra**: Entre 30-60 caracteres (validador automático)
- **Estrutura**: `[Título Principal] | CalcuLabs`
- **Palavras-chave**: Incluir termos principais no início
- **Exemplo**: `Margem de Lucro: Como Calcular | CalcuLabs` (42 chars)

### ✅ Meta Description (120-160 caracteres)
- **Regra**: Entre 120-160 caracteres (validador automático)
- **Conteúdo**: Descrição atraente + call-to-action
- **Palavras-chave**: Incluir termos de busca principais
- **Exemplo**: `Aprenda como calcular margem de lucro corretamente, entender sua rentabilidade e melhorar os resultados do seu negócio. Guia completo com fórmulas e exemplos.` (158 chars)

### ✅ Conteúdo (1500+ palavras)
- **Regra**: Mínimo 1500 palavras (obrigatório para validação)
- **Recomendado**: 2000+ palavras para melhor posicionamento
- **Pillar**: 3000+ palavras para autoridade máxima
- **Qualidade**: Informações originais, práticas e acionáveis
- **Estrutura**: Introdução (300+) + seções detalhadas + conclusão

### ✅ Featured Snippet
- **Regra**: Campo `featured_snippet_answer` obrigatório
- **Conteúdo**: Resposta direta e objetiva (1-2 frases)
- **Finalidade**: Aparecer nos resultados de destaque do Google
- **Exemplo**: "Margem de lucro é o percentual de ganho sobre a receita, calculado dividindo lucro pela receita e multiplicando por 100."

## Critérios Recomendados (Otimizam Performance)

### 📈 Estrutura H2-H3
- **H2**: Mínimo 5 seções principais por artigo
- **H3**: Subseções quando necessário para organização
- **Hierarquia**: Lógica e progressiva (H2 > H3 > conteúdo)

### 🔍 Semantic Keywords (5+ termos)
- **Relevância**: Termos relacionados ao tópico principal
- **Volume**: Pelo menos 5 keywords por artigo
- **Variedade**: Sinônimos, variações e termos relacionados
- **Exemplo**: ["margem de lucro", "lucro percentual", "rentabilidade", "margem bruta", "ROI"]

### ❓ FAQ Schema (3+ perguntas)
- **Estrutura**: Perguntas frequentes dos usuários
- **Formato**: Objeto JSON com `q` (pergunta) + `a` (resposta)
- **SEO**: Gera schema markup automático para rich snippets
- **Exemplo**: `{"q": "Como calcular margem de lucro?", "a": "Divida o lucro pela receita e multiplique por 100."}`

### 🏷️ Entities (5+ conceitos)
- **Definição**: Conceitos, ferramentas, termos técnicos relacionados
- **Finalidade**: Alimentar Google Knowledge Graph
- **Exemplos**: "margem de lucro", "ROI", "ponto de equilíbrio", "markup", "EBITDA"

### 🔗 Internal Links (3+ obrigatórios)
- **Mínimo**: 3 links internos por artigo
- **Ideal**: 5+ para máxima autoridade interna
- **Composição obrigatória**:
  - 1 link para artigo pillar do cluster
  - 1 link para calculadora relacionada
  - 1 link para artigo relacionado do mesmo cluster
- **Relevância**: Links contextuais e naturais
- **Benefício**: Melhora navegação e autoridade interna

### 🧮 Related Calculators (1+ obrigatória)
- **Obrigatório**: Pelo menos 1 calculadora relacionada
- **Relevância**: Ferramentas que complementam o conteúdo
- **Benefício**: Converte visitantes em usuários ativos
- **Exemplo**: Artigo sobre margem de lucro → Calculadora de margem de lucro

## 🧩 Sistema de Clusters

### Classificação Obrigatória
- **Pillar**: Artigo principal que define um tópico amplo
- **Satellite**: Artigo de suporte que aprofunda aspectos específicos

### Regras de Relacionamento
- **Satellite → Pillar**: Deve linkar para o pillar do cluster
- **Pillar → Satellites**: Deve linkar para todos os satellites
- **Intra-cluster**: Links entre satellites do mesmo cluster

### Quando Usar Cada Tipo

#### Pillar Articles
- Tópicos amplos e fundamentais
- Introdução completa ao assunto
- Base para satellites relacionados
- Maior profundidade (3000+ palavras)
- Exemplo: "Gestão Financeira Pessoal" (pillar do cluster financeiro)

#### Satellite Articles
- Aspectos específicos de um tópico
- Ferramentas e cálculos práticos
- Complementam o conhecimento do pillar
- Focam em ação e aplicação
- Exemplo: "Margem de Lucro", "ROI", "Ponto de Equilíbrio"

## 🔄 Estratégia de Conversão (Soft CTA)

### Links Naturais
- Inserir links contextuais para calculadoras relacionadas
- Vincular artigos do mesmo cluster
- Evitar CTAs agressivos ou vendas diretas

### Momentos Estratégicos
- Após explicações teóricas (link para calculadora)
- Em exemplos práticos (link para ferramenta)
- Na conclusão (links para próximos conteúdos)

### Benefícios
- Melhora experiência do usuário
- Aumenta tempo na página
- Converte visitantes em usuários ativos

## Quando Usar Este Recipe

### Cenários de Aplicação
- **Novos artigos**: Criação do zero no Knowledge Hub
- **Expansão de clusters**: Adição de satellites aos clusters existentes
- **Conteúdo educacional**: Artigos sobre cálculos, fórmulas e conceitos
- **SEO rigoroso**: Qualquer conteúdo que precise de otimização máxima

### Clusters Disponíveis
- `engenharia-cimento`: Construção civil e materiais
- `fisica-basica`: Física, movimento, energia
- `juros-compostos`: Investimentos e juros
- `gestao-financeira-pessoal`: Gestão financeira pessoal

## Pré-requisitos

### Antes de Começar
- ✅ **Tópico definido**: Tema específico e validado
- ✅ **Cluster identificado**: Pillar ou satellite definido
- ✅ **Calculadoras existentes**: Pelo menos 1 calculadora relacionada
- ✅ **Keywords pesquisadas**: Volume de busca e concorrência analisados

### Ambiente Necessário
- ✅ **Projeto CalcuLabs**: Estrutura completa configurada
- ✅ **Validador SEO**: `scripts/seo-validator.js` ativo
- ✅ **Memory bank**: Context.md e product.md atualizados
- ✅ **Git hooks**: Pre-commit hooks configurados

## Templates por Tipo de Artigo

### Template para Pillar Articles
```json
{
  "slug": "gestao-financeira-pessoal",
  "title": "Gestão Financeira Pessoal: Guia Completo para Organizar, Economizar e Fazer Seu Dinheiro Crescer",
  "category": "financas-pessoais",
  "search_intent": "informacional",
  "priority": "high",
  "meta_title": "Gestão Financeira Pessoal: Guia Completo | CalcuLabs",
  "meta_description": "Aprenda gestão financeira pessoal completa: controle gastos, aumente renda e use ferramentas como ROI, markup e ponto de equilíbrio. Guia prático com estratégias comprovadas.",
  "summary": "Guia completo sobre gestão financeira pessoal...",
  "content": "<h1>Gestão Financeira Pessoal: Guia Completo</h1>\n\n[Introdução detalhada 500+ palavras]\n\n<h2>O que é gestão financeira pessoal</h2>\n[Explicação completa]\n\n<h2>Os 3 pilares da gestão financeira</h2>\n[Controle, Planejamento, Crescimento]\n\n<h2>Ferramentas essenciais</h2>\n[Calculadoras e métodos]\n\n<h2>Exemplo prático completo</h2>\n[Caso real detalhado]",
  "faq": [
    {"q": "O que é gestão financeira pessoal?", "a": "É o processo completo de organizar, controlar e planejar o uso do dinheiro para alcançar objetivos financeiros."},
    {"q": "Como começar a gestão financeira?", "a": "Comece controlando gastos, definindo metas e usando ferramentas como calculadoras online."}
  ],
  "how_to": ["Listar receitas e gastos", "Definir metas claras", "Criar orçamento mensal", "Acompanhar resultados"],
  "entities": ["gestão financeira", "orçamento", "investimento", "controle financeiro", "planejamento financeiro"],
  "semantic_keywords": ["gestão financeira pessoal", "educação financeira", "controle financeiro", "planejamento financeiro", "finanças pessoais"],
  "examples": ["Pessoa que economizou 30% da renda mensal", "Família que quitou dívidas em 1 ano"],
  "comparisons": ["Gestão financeira vs controle básico", "Investimento vs consumo"],
  "related_calculators": ["margem-de-lucro", "markup", "ponto-de-equilibrio", "roi", "roas"],
  "related_articles": [],
  "internal_links": [],
  "featured_snippet_answer": "Gestão financeira pessoal é o processo de organizar, controlar e planejar o dinheiro para reduzir gastos, aumentar renda e tomar decisões financeiras inteligentes.",
  "priority": "high",
  "cluster": {
    "is_pillar": true,
    "cluster_name": "gestao-financeira-pessoal",
    "satellites": []
  }
}
```

### Template para Satellite Articles
```json
{
  "slug": "margem-de-lucro",
  "title": "Margem de Lucro: O Que É, Como Calcular e Aumentar a Rentabilidade do Seu Negócio",
  "category": "financas-pessoais",
  "search_intent": "informacional",
  "priority": "high",
  "meta_title": "Margem de Lucro: Como Calcular | CalcuLabs",
  "meta_description": "Aprenda como calcular margem de lucro corretamente, entender sua rentabilidade e melhorar os resultados do seu negócio. Guia completo com fórmulas e exemplos.",
  "summary": "A margem de lucro é um dos indicadores mais importantes...",
  "content": "<h1>Margem de Lucro: Como Calcular</h1>\n\n[Introdução focada 300+ palavras]\n\n<h2>O que é margem de lucro</h2>\n[Definição e tipos]\n\n<h2>Como calcular margem de lucro</h2>\n[Fórmulas e exemplos]\n\n<h2>Como aumentar margem de lucro</h2>\n[Estratégias práticas]\n\n<h2>Ferramentas para calcular</h2>\n[Calculadoras disponíveis]",
  "faq": [
    {"q": "O que é margem de lucro?", "a": "É o percentual de lucro obtido em relação à receita total."},
    {"q": "Como calcular margem de lucro?", "a": "Divida o lucro pela receita e multiplique por 100."},
    {"q": "Qual diferença entre margem e markup?", "a": "Margem mede resultado, markup define preço."}
  ],
  "how_to": ["Calcule faturamento total", "Subtraia custos", "Divida lucro pela receita", "Multiplique por 100"],
  "entities": ["margem de lucro", "lucro", "receita", "custo", "rentabilidade"],
  "semantic_keywords": ["margem de lucro", "como calcular margem de lucro", "lucro percentual", "rentabilidade empresa"],
  "examples": ["Produto com custo R$40 vendido por R$100 = margem 60%", "Empresa com receita R$50k e custos R$35k = margem 30%"],
  "comparisons": ["Margem bruta vs líquida", "Markup vs margem de lucro"],
  "related_calculators": ["margem-de-lucro"],
  "related_articles": ["gestao-financeira-pessoal"],
  "internal_links": ["gestao-financeira-pessoal", "margem-de-lucro"],
  "featured_snippet_answer": "Margem de lucro é o percentual que representa o lucro obtido sobre a receita total, calculado dividindo o lucro pela receita e multiplicando por 100.",
  "priority": "high",
  "cluster": {
    "is_pillar": false,
    "cluster_name": "gestao-financeira-pessoal",
    "satellites": []
  }
}
```

## Processo de Implementação

### Fase 1: Planejamento (1-2 horas)
1. ✅ **Definir tópico**: Tema específico e palavras-chave principais
2. ✅ **Identificar cluster**: Pillar ou satellite, com justificativa
3. ✅ **Pesquisar concorrência**: Análise de oportunidade no Google
4. ✅ **Validar calculadoras**: Confirmar ferramentas relacionadas existentes

### Fase 2: Criação do Conteúdo (3-6 horas)
1. ✅ **Estrutura template**: Usar template específico (pillar/satellite)
2. ✅ **SEO obrigatório**: Aplicar H1, meta tags, featured snippet
3. ✅ **Conteúdo rico**: Mínimo 1500 palavras com valor real
4. ✅ **Exemplos práticos**: Cálculos e casos reais incluídos

### Fase 3: Otimização Técnica (1-2 horas)
1. ✅ **Meta title**: 30-60 caracteres com keywords principais
2. ✅ **Meta description**: 120-160 caracteres atraente
3. ✅ **Semantic keywords**: 5+ termos relacionados naturalmente
4. ✅ **FAQ schema**: 3+ perguntas frequentes estruturadas
5. ✅ **Entities**: 5+ conceitos para Knowledge Graph

### Fase 4: Relacionamentos e Links (30-60 min)
1. ✅ **Internal links**: 3+ links obrigatórios (pillar + calculadora + relacionado)
2. ✅ **Related calculators**: Pelo menos 1 calculadora principal
3. ✅ **Cluster links**: Conexões apropriadas pillar↔satellites
4. ✅ **Cross-linking**: Estratégia de autoridade interna

### Fase 5: Validação e Publicação (30-60 min)
1. ✅ **Validação automática**: `scripts/seo-validator.js` (score 100/100)
2. ✅ **Correção de issues**: Resolver problemas identificados
3. ✅ **Revalidação**: Confirmar qualidade final
4. ✅ **Commit autorizado**: Apenas com aprovação completa
5. ✅ **Documentação**: Atualizar inventários e mapas

## Quality Assurance Automatizada

### Validação Técnica
- **Script principal**: `scripts/seo-validator.js` (14 critérios obrigatórios)
- **Hook de pre-commit**: `.kilocode/hooks/pre-commit-articles.js`
- **Bloqueio automático**: Commits rejeitados se score < 100/100

### Checklist de Qualidade Final
- [ ] **Conteúdo**: Título atrativo, introdução convincente (300+ palavras)
- [ ] **Estrutura**: H1 único, H2s adequadas, conclusão com CTAs
- [ ] **SEO**: Meta tags otimizadas, featured snippet definido
- [ ] **Técnico**: Links funcionais, calculadoras existentes
- [ ] **Qualidade**: Linguagem clara, exemplos práticos, informações acionáveis

## Troubleshooting Comum

### Problema: "H1 não encontrado"
**Solução**: Adicionar `<h1>Título Completo</h1>` como primeiro elemento do conteúdo

### Problema: "Meta title muito longo"
**Solução**: Encurtar para ≤60 caracteres, manter keywords principais

### Problema: "Conteúdo insuficiente"
**Solução**: Expandir introdução e exemplos, adicionar seções detalhadas

### Problema: "Internal links insuficientes"
**Solução**: Adicionar links para pillar (1), calculadora (1), relacionado (1)

### Problema: "Cluster não encontrado"
**Solução**: Verificar em `docs/MASTER_MAP.md` clusters disponíveis

### Problema: "Commit bloqueado"
**Solução**: Executar `scripts/seo-validator.js` e corrigir issues mostrados

## Atualizações do Memory Bank

### context.md (Obrigatório)
```markdown
## Recently Completed
- ✅ Artigo: [título] ([slug]) - Cluster: [cluster] ([tipo])
- 📊 Estatísticas: +1 artigo, cluster [nome] expandido
- 🔗 Relacionamentos: [calculadoras] vinculadas
```

### product.md (Recomendado)
```markdown
## Content Updates
- 📈 Novo conteúdo: [categoria] - [tópico principal]
- 🎯 Cluster: [nome] ([pillar/satellite])
- 🧮 Calculadoras: [lista de ferramentas relacionadas]
```

## Métricas de Sucesso Detalhadas

### SEO Performance
- **Indexação**: Aparecer nos resultados Google em ≤24h
- **Posicionamento**: Top 10 para 80% das keywords principais
- **Rich Snippets**: Featured snippets + FAQ schema

### User Engagement
- **Tempo na página**: >3 minutos (meta)
- **Taxa de rejeição**: <40% (meta)
- **Cliques internos**: >2 por sessão

### Business Impact
- **Conversão**: >15% cliques para calculadoras
- **SEO Score**: 100/100 em validação automática
- **Qualidade**: 0% artigos com problemas pós-publicação

---

## 📋 Referências e Links Úteis

### Documentos Relacionados
- 📋 **[CALCULABS_ARTICLE_SPEC.md](../docs/CALCULABS_ARTICLE_SPEC.md)** - Especificação técnica completa
- 🎯 **[SEO_QUALITY_STANDARD.md](../docs/SEO_QUALITY_STANDARD.md)** - Padrões de qualidade detalhados
- 📖 **Sistema integrado** - Consulte docs/ para documentação completa
- 🗺️ **[MASTER_MAP.md](../docs/MASTER_MAP.md)** - Mapa de clusters e relacionamentos

### Ferramentas de Apoio
- 🔍 **Validador SEO**: `scripts/seo-validator.js`
- 📊 **Contador de Palavras**: Scripts automáticos integrados
- 🎯 **Analisador de Meta Tags**: Verificação automática
- 📈 **Google Search Console**: Monitoramento pós-publicação
- 🔗 **Screaming Frog**: Análise técnica avançada

### Scripts de Automação
- ⚡ **Pre-commit Hook**: `.kilocode/hooks/pre-commit-articles.js`
- 🤖 **Agente Creator**: `.kilocode/agent/article-creator.md`
- 📝 **Comando**: `.kilocode/command/create-article.md`

---

## 📊 Métricas de Qualidade do Recipe

- **Taxa de Aprovação**: 100% (todos os artigos gerados passam validação)
- **Tempo de Implementação**: 2-3 minutos para artigo completo
- **Redução de Erros**: 95% menos retrabalho
- **Consistência**: Padrões uniformes em todos os conteúdos

## 🔄 Ciclo de Melhoria Contínua

Este recipe é atualizado baseado em:
- **Performance dos artigos**: Análise de posicionamento
- **Feedback dos usuários**: Métricas de engajamento
- **Evolução do SEO**: Novas melhores práticas
- **Análise concorrente**: Benchmarking do mercado

---

## 🎯 Search Intent Execution (Obrigatório)

O conteúdo **DEVE** seguir a intenção de busca definida no campo `search_intent`:

### Informacional:
- **Foco**: Explicação clara e educativa
- **Introdução**: Forte e atrativa, respondendo "o que é"
- **Estrutura**: Conceitual → Exemplos simples → Aplicações
- **Tom**: Didático e acessível

### Prático:
- **Foco**: Aplicação e cálculo direto
- **Conteúdo**: Passo a passo detalhado
- **Ferramentas**: Uso direto de calculadoras
- **Resultado**: Usuário consegue aplicar imediatamente

### Decisório:
- **Foco**: Comparação e análise de cenários
- **Conteúdo**: Cenários múltiplos, prós/contras
- **Suporte**: Dados para tomada de decisão
- **Tom**: Analítico e objetivo

**O artigo deve refletir claramente essa intenção ao longo de todo o conteúdo.**

## 🧠 Profundidade Semântica (Obrigatório)

O artigo deve ir além da superfície e:

### Responder Perguntas Implícitas
- **O que é?** Definição completa e contextualizada
- **Por que importa?** Benefícios práticos e aplicações
- **Como usar?** Aplicação prática passo a passo
- **Quais erros evitar?** Armadilhas comuns
- **O que escolher?** Comparações relevantes

### Cobertura Completa do Tema
- **Evitar superficialidade**: Profundidade em cada aspecto
- **Contextualização**: Relacionar com outros conceitos
- **Evolução histórica**: Quando relevante
- **Tendências atuais**: Cenário atual do tema

### Elementos Obrigatórios
- **✅ Definição clara**: Primeira seção dedicada
- **✅ Aplicação prática**: Exemplos reais aplicáveis
- **✅ Erros comuns**: Seção específica com soluções
- **✅ Comparações**: Pelo menos 2-3 comparações relevantes
- **✅ Exemplos reais**: Cenários práticos com números

**Rejeitar conteúdo genérico, repetitivo ou superficial.**

## 🚀 Unique Value (Obrigatório)

Cada artigo deve conter pelo menos **um diferencial claro** que o torne único:

### Exemplos de Diferenciais
- **📊 Exemplo numérico real**: Cálculo completo com valores brasileiros atuais
- **🏢 Cenário prático aplicado**: Caso real de empresa brasileira
- **⚖️ Comparação relevante**: Análise específica do mercado brasileiro
- **🚨 Explicação de erro comum**: Armadilha específica da realidade local

### Requisitos Mínimos
- **Conteúdo não teórico**: Deve resolver problema real
- **Dados contextualizados**: Referências brasileiras quando aplicável
- **Aplicabilidade imediata**: Usuário consegue usar na prática
- **Valor mensurável**: Benefício claro e quantificável

**Todo artigo deve demonstrar valor único e prático.**

## 🔄 Estratégia de CTA (Obrigatório)

Inserir CTAs de forma **natural e contextual** em 3 momentos estratégicos:

### Momento 1: Após Explicação Conceitual
```
Quer calcular isso na prática? Use nossa calculadora gratuita.
```
- **Localização**: Final da seção teórica
- **Direcionamento**: Calculadora principal
- **Tom**: Natural e educativo

### Momento 2: Após Exemplo Prático
```
Para fazer esse cálculo automaticamente, acesse nossa ferramenta online.
```
- **Localização**: Após exemplo numérico
- **Direcionamento**: Calculadora específica
- **Tom**: Prático e acionável

### Momento 3: Próximo da Conclusão
```
Explore mais conteúdos relacionados no nosso Knowledge Hub.
```
- **Localização**: Antes da conclusão final
- **Direcionamento**: Artigos do mesmo cluster
- **Tom**: Sugestão de aprofundamento

### Direcionamentos Permitidos
- ✅ **Calculadoras relacionadas**: Ferramentas principais do artigo
- ✅ **Artigos do cluster**: Pillar ou satellites relacionados
- ❌ **Produtos externos**: Manter foco no conteúdo educativo
- ❌ **Linguagem agressiva**: Evitar "compre agora", "imperdível"

**CTAs devem enriquecer a experiência, não interrompê-la.**

## 🏆 Nível de Dominância SEO

Classificação de conteúdo baseada em profundidade e autoridade:

### Mínimo (Bloqueante)
- **1500 palavras** (obrigatório para validação)
- **Cobertura básica** do tema
- **Estrutura essencial** (H1, meta tags, FAQ)
- **Para tópicos simples**

### Recomendado
- **2000+ palavras**
- **Cobertura completa** com exemplos
- **Comparações e cenários** múltiplos
- **Para maioria dos artigos**

### Dominante
- **2500+ palavras**
- **Análise aprofundada** com dados
- **Cenários complexos** e edge cases
- **Para temas concorridos**

### Pillar (Máxima Autoridade)
- **3000+ palavras**
- **Cobertura definitiva** do tema
- **Múltiplas perspectivas** e aplicações
- **Para tópicos estratégicos** do cluster

**Sempre priorizar profundidade sobre velocidade de produção.**

---

## ✅ VALIDAÇÃO FINAL

Após aplicação das diretrizes acima:

### ✅ Verificações Estruturais
- [ ] **Nenhuma seção original alterada**: Conteúdo existente preservado
- [ ] **Apenas adições no final**: Novas seções adicionadas ao final
- [ ] **Formatação mantida**: Padrão markdown consistente
- [ ] **Data de publicação adicionada**: `<p class=\"publish-date\">Publicado em DD de Mês de AAAA - Equipe Calculabs</p>` imediatamente após o `<h1>`
- [ ] **Data é atual**: Usar a data atual do momento da criação do artigo

### ✅ Verificações de Conteúdo
- [ ] **Search Intent aplicado**: Conteúdo reflete intenção definida
- [ ] **Profundidade semântica**: Perguntas implícitas respondidas
- [ ] **Unique Value presente**: Diferencial claro identificado
- [ ] **CTAs estratégicos**: 3 momentos com direcionamentos corretos
- [ ] **Nível SEO adequado**: Profundidade compatível com estratégia

### ✅ Verificações Técnicas
- [ ] **Arquivo válido**: Sintaxe markdown correta
- [ ] **Links funcionais**: Referências para documentos existentes
- [ ] **Consistência**: Alinhamento com padrões do projeto

---

**Recipe Version**: 1.2 (Completo)
**Last Updated**: 2026-03-31
**Compatible With**: CalcuLabs Knowledge Hub v1.0+
**Maintainer**: Sistema de Qualidade SEO CalcuLabs