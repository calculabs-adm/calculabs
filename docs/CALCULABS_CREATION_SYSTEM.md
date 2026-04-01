# CALCULABS_CREATION_SYSTEM.md

================================================================
REGRA DE OURO
================================================================
Este documento é a única fonte de verdade.
Nenhuma regra pode existir fora dele.
Nenhuma regra pode ser interpretada.
Toda execução deve ser literal.
Toda solicitação deve ser feita com a expressão "criar nova calculadora".
Caso contrário, a execução não é garantida.

================================================================
1. ESPECIFICAÇÃO DA CALCULADORA
================================================================

CALCULABS_CALCULATOR_SPECIFICATION

Solicitação de criação de nova calculadora:

IDENTIFICAÇÃO DA CALCULADORA

name

slug

title

category

subcategory

complexity

---

SEO

meta_title

meta_description

keywords
[
"",
"",
"",
"",
"",
""
]

---

INTRODUCTION

---

FORMULA

---

FORMULA_DISPLAY

---

VARIÁVEIS

[
{
"id": "",
"label": "",
"type": "",
"unit": "",
"placeholder": "",
"min": 0,
"max": null,
"default": 0
}
]

---

STEPS

Passo 1
Passo 2
Passo 3

---

EXAMPLE

{
"title": "Exemplo prático",
"inputs": {},
"result": "",
"explanation": ""
}

---

APPLICATIONS

---

curiosity

<h2>⭐ Você Sabia?</h2>

---

FAQ

[
{
"q": "",
"a": ""
},
{
"q": "",
"a": ""
},
{
"q": "",
"a": ""
},
{
"q": "",
"a": ""
}
]

---

monetization_type

ads

================================================================
REGRA DE MONETIZAÇÃO (OBRIGATÓRIA)
================================================================

Monetização baseada em categoria e complexidade:

- Básico: ads
- Técnico: affiliate

Essa regra garante equilíbrio e deve ser aplicada em 100% das calculadoras.

================================================================
2. RELACIONAMENTOS E DEPENDÊNCIAS
================================================================

related_slugs

[
"",
"",
""
]

Regras:
- Mínimo 2 calculadoras relacionadas
- Priorizar calculadoras da mesma categoria/subcategoria
- Evitar self-reference

================================================================
3. SEÇÃO EDUCATIVA — "VOCÊ SABIA?"
================================================================
Toda nova calculadora deve ter o bloco curiosity validado como:
"Conteúdo suficiente para ranquear sozinho no Google"
Regras obrigatórias:

- mínimo de 2500 caracteres
- mínimo de 4 parágrafos
- mínimo de 3 blocos temáticos
- mínimo de 1 lista
- incluir obrigatoriamente "Explicação do Professor" como último bloco
- linguagem simples e educativa
- conteúdo diretamente relacionado à calculadora

Estrutura obrigatória:

<h2>⭐ Você Sabia?</h2>

<p>Introdução contextual</p>
<p>Introdução complementar</p>

<h3>Bloco temático</h3>
<p>Conteúdo</p>

<h3>Bloco temático</h3>
<p>Conteúdo</p>

<ul>
<li>Ponto relevante</li>
<li>Ponto relevante</li>
<li>Ponto relevante</li>
</ul>

<h3>Bloco temático</h3>
<p>Conteúdo</p>

<h3>Explicação do Professor</h3>
<p>Explicação didática</p>

----------------------------------------------------------------
Blocos Temáticos Sugeridos (flexível)
----------------------------------------------------------------

- Origem Histórica
- Curiosidade Surpreendente
- Aplicação no Mundo Real
- Insight ou Regra Prática
- A Fórmula Explicada
- Comparação Visual
- Desafio Rápido
- Explicação do Professor (obrigatório)

----------------------------------------------------------------
Diretrizes de Redação
----------------------------------------------------------------

- linguagem clara e acessível
- evitar termos técnicos desnecessários
- foco educacional
- conexão com aplicações reais

================================================================
4. PROCESSO DE CRIAÇÃO (OBRIGATÓRIO)
================================================================

1. Verificar inventário de calculadoras (docs/master_inventory-calculators.md)
2. Não duplicar calculadoras existentes
3. Seguir template obrigatório
4. Gerar conteúdo completo antes da implementação
5. Atualizar arquivos:
   - src/data/calculators.json
   - docs/master_inventory-calculators.md
   - docs/MASTER_MAP.md
6. Validar com CLI: bun run src/lib/validate-calculator.ts [slug]

================================================================
5. MODELO DE SOLICITAÇÃO (KILO)
================================================================

Seguir exatamente o bloco da ESPECIFICAÇÃO DA CALCULADORA

================================================================
6. MODO SPEC STRICT (OBRIGATÓRIO)
================================================================

- Não adaptar o padrão
- Não alterar estrutura
- Não omitir campos
- Não adicionar campos

Validação obrigatória:

- estrutura idêntica
- todos os campos preenchidos
- mínimo 6 keywords relevantes
- fórmula válida (testável em mathjs)
- curiosity com regras completas
- related_slugs válidos

Se falhar:

REFAZER automaticamente

================================================================
REGRA FINAL
================================================================

Nenhuma calculadora deve ser criada fora deste padrão.

================================================================
MODO DE SAÍDA (OBRIGATÓRIA)
================================================================

Toda resposta de criação de nova calculadora deve ser entregue:

- em TEXTO BRUTO (sem blocos especiais como :::writing)
- com conteúdo totalmente visível e copiável
- sem qualquer formatação que esconda partes do conteúdo
- com a seção "curiosity" completamente preenchida

É proibido:

- usar blocos estruturados especiais
- ocultar conteúdo
- resumir conteúdo da seção curiosity

----------------------------------------------------------------
CHECK FINAL (ANTES DE ENTREGAR)
----------------------------------------------------------------

Antes de entregar, validar:

[ ] A resposta pode ser copiada diretamente
[ ] A seção curiosity está visível e completa
[ ] O conteúdo não depende de renderização especial
[ ] Todo o texto está presente na resposta
[ ] Monetização correta conforme categoria/complexidade
[ ] Related_slugs válidos (mínimo 2)
[ ] Keywords relevantes (mínimo 6)

Se qualquer item falhar:

→ REFAZER AUTOMATICAMENTE

================================================================