# Master Map — Sistema de Mapeamento Global

Mapa central do projeto CalcuLabs contendo clusters, artigos, calculadoras e relações.

**Atualizado em:** 2026-03-31
**Total:** 4 clusters, 13 artigos, 69 calculadoras

---

## Clusters

### 1. engenharia-cimento

| Tipo | Slug | Título |
|------|------|--------|
| **Pillar** | `quantidade-de-cimento-por-m2` | Quantidade de Cimento por m²: Guia Completo para Construção |
| Satellite | `quantos-sacos-de-cimento-por-m2` | Quantos Sacos de Cimento por m²? Cálculo Prático |
| Satellite | `traco-de-concreto-proporcao` | Traço de Concreto: Proporção Ideal para Cada Tipo de Obra |
| Satellite | `consumo-de-cimento-por-tipo-de-obra` | Consumo de Cimento por Tipo de Obra: Guia Completo |
| Satellite | `cimento-para-laje` | Cimento para Laje: Quantidade Ideal, Traço Correto e Como Calcular |
| Satellite | `cimento-para-piso` | Cimento para Piso: Quantidade Ideal, Traço Correto e Como Calcular |
| Satellite | `cimento-para-fundacao` | Cimento para Fundação: Quantidade Ideal, Traço Correto e Como Calcular |

**Calculadoras relacionadas:**

| Slug | Nome |
|------|------|
| `quantidade-cimento` | Quantidade de Cimento |
| `quantidade-tijolos` | Quantidade de Tijolos |
| `consumo-tinta-m2` | Consumo de Tinta por m² |

**Status:** Cluster completo (1 pillar + 6 satellites)

---

### 2. fisica-basica

| Tipo | Slug | Título |
|------|------|--------|
| **Pillar** | `forca-energia-e-trabalho` | Força, Energia e Trabalho: Entenda os Conceitos da Física |
| Satellite | — | *(nenhum ainda)* |

**Calculadoras relacionadas:**

| Slug | Nome |
|------|------|
| `forca-lei-de-newton` | Calculadora de Força (Lei de Newton) |
| `energia-cinetica` | Calculadora de Energia Cinética |
| `trabalho-forca-distancia` | Calculadora de Trabalho |
| `velocidade-media` | Velocidade Média |

**Status:** Cluster inicial (1 pillar + 0 satellites). Oportunidade de expansão em aceleração, gravidade, pressão.

---

### 3. juros-compostos

| Tipo | Slug | Título |
|------|------|--------|
| **Pillar** | `juros-compostos-guia-completo` | Guia Completo de Juros Compostos |
| Satellite | `juros-simples-vs-compostos` | Juros Simples vs Compostos: Qual a Diferença? |

**Calculadoras relacionadas:**

| Slug | Nome |
|------|------|
| `juros-compostos` | Juros Compostos |
| `juros-simples` | Juros Simples |
| `rendimento-cdb` | Rendimento CDB |

**Status:** Cluster com 2 artigos. Oportunidade de expansão em renda fixa, tesouro direto, poupança.

---

### 4. gestao-financeira-pessoal

| Tipo | Slug | Título |
|------|------|--------|
| **Pillar** | `gestao-financeira-pessoal` | Gestão Financeira Pessoal: Guia Completo |
| Satellite | `margem-de-lucro` | Margem de Lucro: Como Calcular e Aumentar Rentabilidade |
| Satellite | `markup` | Markup: O Que É, Como Calcular e Definir o Preço de Venda |

**Calculadoras relacionadas:**

| Slug | Nome |
|------|------|
| `margem-de-lucro` | Margem de Lucro |
| `markup` | Markup |
| `ponto-de-equilibrio` | Ponto de Equilíbrio |
| `roi` | ROI |
| `roas` | ROAS |

**Status:** Cluster em crescimento (1 pillar + 2 satellites). Próximos satellites sugeridos: investimentos, aposentadoria, controle de dívidas.

---

## Artigos sem cluster (standalone)

| Slug | Título | Categoria |
|------|--------|-----------|
| — | *(nenhum)* | — |

---

## Calculadoras sem artigo

**Engenharia e Construção (3):**

| Slug | Nome | Artigo relacionado? |
|------|------|---------------------|
| `quantidade-cimento` | Quantidade de Cimento | ✅ 6 artigos |
| `quantidade-tijolos` | Quantidade de Tijolos | ✅ 2 artigos |
| `consumo-tinta-m2` | Consumo de Tinta por m² | ✅ 2 artigos |

**Ciência / Física (4):**

| Slug | Nome | Artigo relacionado? |
|------|------|---------------------|
| `forca-lei-de-newton` | Calculadora de Força | ✅ 1 artigo |
| `energia-cinetica` | Calculadora de Energia Cinética | ✅ 1 artigo |
| `trabalho-forca-distancia` | Calculadora de Trabalho | ✅ 1 artigo |
| `velocidade-media` | Velocidade Média | ❌ Sem artigo |

**Ciência / Quântica (1):**

| Slug | Nome | Artigo relacionado? |
|------|------|---------------------|
| `energia-do-foton` | Energia do Fóton | ❌ Sem artigo |

**Astronomia (1):**

| Slug | Nome | Artigo relacionado? |
|------|------|---------------------|
| `peso-outros-planetas` | Peso em Outros Planetas | ❌ Sem artigo |

**Demais categorias (55):**

| Categoria | Calculadoras | Com artigo? |
|-----------|-------------|-------------|
| Finanças Pessoais | 15 | ✅ 1 artigo |
| Trabalhista e Tributário | 10 | ❌ Nenhuma |
| Matemática | 18 | ❌ Nenhuma |
| Saúde | 8 | ❌ Nenhuma |
| Utilitários | 4 | ❌ Nenhuma |

---

## Regras de Atualização

1. Toda nova calculadora DEVE ser vinculada a um cluster ou marcada como standalone
2. Todo novo artigo DEVE pertencer a um cluster (pillar ou satellite)
3. Toda nova relação artigo↔calculadora DEVE ser registrada aqui
4. O campo `related_calculators` em articles.json deve conter apenas slugs de calculadoras válidas
5. O campo `related_articles` em articles.json deve conter apenas slugs de artigos do mesmo cluster
6. Atualizar este arquivo após cada criação ou alteração de artigo/calculadora
