# Master Map Visual — Diagramas do Sistema

Diagramas em texto estruturado representando clusters e relações.

---

## Visão Geral do Sistema

```
CALCULABS KNOWLEDGE HUB
│
├── [C] engenharia-cimento ✅ COMPLETO (1P + 6S)
│   ├── [P] quantidade-de-cimento-por-m2
│   ├── [S] quantos-sacos-de-cimento-por-m2
│   ├── [S] traco-de-concreto-proporcao
│   ├── [S] consumo-de-cimento-por-tipo-de-obra
│   ├── [S] cimento-para-laje
│   ├── [S] cimento-para-piso
│   ├── [S] cimento-para-fundacao
│   ├── [⚡] quantidade-cimento
│   ├── [⚡] quantidade-tijolos
│   └── [⚡] consumo-tinta-m2
│
├── [C] fisica-basica ⚠️ INICIAL (1P + 0S)
│   ├── [P] forca-energia-e-trabalho
│   ├── [⚡] forca-lei-de-newton
│   ├── [⚡] energia-cinetica
│   ├── [⚡] trabalho-forca-distancia
│   └── [⚡] velocidade-media
│
├── [C] juros-compostos ⚠️ INICIAL (1P + 1S)
│   ├── [P] juros-compostos-guia-completo
│   ├── [S] juros-simples-vs-compostos
│   ├── [⚡] juros-compostos
│   ├── [⚡] juros-simples
│   └── [⚡] rendimento-cdb
│
├── [C] gestao-financeira-pessoal ⚠️ CRESCENDO (1P + 1S) ←EXPANDINDO
│   ├── [P] gestao-financeira-pessoal
│   ├── [S] margem-de-lucro ←NOVO
│   ├── [⚡] margem-de-lucro
│   ├── [⚡] markup
│   ├── [⚡] ponto-de-equilibrio
│   ├── [⚡] roi
│   └── [⚡] roas
│
└── [SEM CLUSTER] 55 calculadoras sem artigo
    ├── Finanças Pessoais: 15
    ├── Trabalhista/Tributário: 10
    ├── Matemática: 18
    ├── Saúde: 8
    └── Utilitários: 4
```

**Legenda:**
- `[C]` = Cluster
- `[P]` = Pillar (artigo principal)
- `[S]` = Satellite (artigo de suporte)
- `[⚡]` = Calculadora
- `✅` = Cluster completo
- `⚠️` = Cluster com oportunidade de expansão
- `NOVO` = Criado na última atualização

---

## Fluxo Artigo → Calculadora

### Cluster engenharia-cimento

```
[ARTIGO] quantidade-de-cimento-por-m2 (pillar)
  ├─→ [⚡] quantidade-cimento
  ├─→ [⚡] quantidade-tijolos
  ├─→ [⚡] consumo-tinta-m2
  └─→ [ARTIGO] quantidade-de-cimento-por-m2 (próprio)

[ARTIGO] quantos-sacos-de-cimento-por-m2 (satellite)
  ├─→ [⚡] quantidade-cimento
  └─→ [ARTIGO] quantidade-de-cimento-por-m2

[ARTIGO] traco-de-concreto-proporcao (satellite)
  ├─→ [⚡] quantidade-cimento
  └─→ [ARTIGO] quantidade-de-cimento-por-m2

[ARTIGO] consumo-de-cimento-por-tipo-de-obra (satellite)
  ├─→ [⚡] quantidade-cimento
  ├─→ [⚡] quantidade-tijolos
  └─→ [ARTIGO] quantidade-de-cimento-por-m2

[ARTIGO] cimento-para-laje (satellite) ←NOVO
  ├─→ [⚡] quantidade-cimento
  └─→ [ARTIGO] quantidade-de-cimento-por-m2

[ARTIGO] cimento-para-piso (satellite)
  ├─→ [⚡] quantidade-cimento
  └─→ [ARTIGO] quantidade-de-cimento-por-m2

[ARTIGO] cimento-para-fundacao (satellite) ←NOVO
  ├─→ [⚡] quantidade-cimento
  └─→ [ARTIGO] quantidade-de-cimento-por-m2
```

### Cluster fisica-basica

```
[ARTIGO] forca-energia-e-trabalho (pillar)
  ├─→ [⚡] forca-lei-de-newton
  ├─→ [⚡] energia-cinetica
  ├─→ [⚡] trabalho-forca-distancia
  └─→ [⚡] velocidade-media
```

### Cluster juros-compostos

```
[ARTIGO] juros-compostos-guia-completo (pillar)
  ├─→ [⚡] juros-compostos
  ├─→ [⚡] rendimento-cdb
  └─→ [ARTIGO] juros-simples-vs-compostos

[ARTIGO] juros-simples-vs-compostos (satellite)
  ├─→ [⚡] juros-compostos
  ├─→ [⚡] juros-simples
  └─→ [ARTIGO] juros-compostos-guia-completo
```

### Cluster gestao-financeira-pessoal ←EXPANDINDO

```
[ARTIGO] gestao-financeira-pessoal (pillar) ←NOVO
  ├─→ [⚡] margem-de-lucro
  ├─→ [⚡] markup
  ├─→ [⚡] ponto-de-equilibrio
  ├─→ [⚡] roi
  ├─→ [⚡] roas
  └─→ [ARTIGO] juros-compostos-guia-completo

[ARTIGO] margem-de-lucro (satellite) ←NOVO
  ├─→ [⚡] margem-de-lucro
  ├─→ [⚡] markup
  ├─→ [⚡] ponto-de-equilibrio
  ├─→ [⚡] roi
  └─→ [ARTIGO] gestao-financeira-pessoal
```

---

## Fluxo Calculadora → Artigo (relação reversa)

```
[⚡] quantidade-cimento ← [7 artigos]
[⚡] quantidade-tijolos ← [3 artigos]
[⚡] consumo-tinta-m2   ← [2 artigos]
[⚡] forca-lei-newton   ← [1 artigo]
[⚡] energia-cinetica   ← [1 artigo]
[⚡] trabalho-f-d       ← [1 artigo]
[⚡] velocidade-media   ← [0 artigos]
[⚡] juros-compostos    ← [2 artigos]
[⚡] juros-simples      ← [1 artigo]
[⚡] rendimento-cdb     ← [1 artigo]
[⚡] margem-lucro       ← [2 artigos]
[⚡] markup             ← [1 artigo]
[⚡] ponto-equilibrio   ← [1 artigo]
[⚡] roi                ← [1 artigo]
[⚡] roas               ← [1 artigo]
```

---

## Mapa de Crescimento Sugerido

```
PRIORIDADE ALTA (engenharia-cimento) ✅ CONCLUÍDO
  ├── [S] cimento-para-laje ← ✅ CRIADO
  ├── [S] cimento-para-piso ← ✅ CRIADO
  └── [S] cimento-para-fundacao ← ✅ CRIADO

PRIORIDADE ALTA (gestao-financeira-pessoal) ←EXPANDINDO
  ├── [S] margem-de-lucro ← ✅ CRIADO
  ├── [S] investimentos-basicos ← criar
  ├── [S] reserva-de-emergencia ← criar
  └── [S] quitacao-dividas ← criar

PRIORIDADE MÉDIA (fisica-basica)
  ├── [S] velocidade-e-aceleracao ← criar
  ├── [S] gravidade-e-peso ← criar
  └── [S] pressao-na-fisica ← criar

PRIORIDADE BAIXA (juros-compostos)
  ├── [S] rendimento-tesouro-direto ← criar
  └── [S] investimentos-longo-prazo ← criar

PRIORIDADE FUTURA
  ├── [C] matematica-escolar ← novo cluster
  ├── [C] saude-e-fitness ← novo cluster
  └── [C] financiamentos ← novo cluster
```
