# Master Map Visual — Diagramas do Sistema

Diagramas em texto estruturado representando clusters e relações.

---

## Visão Geral do Sistema

```
CALCULABS KNOWLEDGE HUB
│
├── [C] engenharia-cimento ✅ COMPLETO
│   ├── [P] quantidade-de-cimento-por-m2
│   ├── [S] quantos-sacos-de-cimento-por-m2
│   ├── [S] traco-de-concreto-proporcao
│   ├── [S] consumo-de-cimento-por-tipo-de-obra
│   ├── [⚡] quantidade-cimento
│   ├── [⚡] quantidade-tijolos
│   └── [⚡] consumo-tinta-m2
│
├── [C] fisica-basica ⚠️ INICIAL
│   ├── [P] forca-energia-e-trabalho
│   ├── [⚡] forca-lei-de-newton
│   ├── [⚡] energia-cinetica
│   └── [⚡] trabalho-forca-distancia
│
├── [C] juros-compostos ⚠️ INICIAL
│   ├── [P] juros-compostos-guia-completo
│   ├── [S] juros-simples-vs-compostos
│   ├── [⚡] juros-compostos
│   ├── [⚡] juros-simples
│   └── [⚡] rendimento-cdb
│
└── [SEM CLUSTER] 60 calculadoras sem artigo
    ├── Finanças Pessoais: 20
    ├── Trabalhista/Tributário: 10
    ├── Matemática: 18
    ├── Saúde: 8
    ├── Utilitários: 4
    └── (outras: 0)
```

**Legenda:**
- `[C]` = Cluster
- `[P]` = Pillar (artigo principal)
- `[S]` = Satellite (artigo de suporte)
- `[⚡]` = Calculadora
- `✅` = Cluster completo
- `⚠️` = Cluster com oportunidade de expansão

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
```

### Cluster fisica-basica

```
[ARTIGO] forca-energia-e-trabalho (pillar)
  ├─→ [⚡] forca-lei-de-newton
  ├─→ [⚡] energia-cinetica
  └─→ [⚡] trabalho-forca-distancia
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

---

## Fluxo Calculadora → Artigo (relação reversa)

```
[⚡] quantidade-cimento ← [4 artigos]
[⚡] quantidade-tijolos ← [2 artigos]
[⚡] consumo-tinta-m2   ← [1 artigo]
[⚡] forca-lei-newton   ← [1 artigo]
[⚡] energia-cinetica   ← [1 artigo]
[⚡] trabalho-f-d       ← [1 artigo]
[⚡] juros-compostos    ← [2 artigos]
[⚡] juros-simples      ← [1 artigo]
[⚡] rendimento-cdb     ← [1 artigo]
```

---

## Mapa de Crescimento Sugerido

```
PRIORIDADE ALTA (engenharia-cimento)
  ├── [S] cimento-para-laje ← criar
  ├── [S] cimento-para-piso ← criar
  └── [S] cimento-para-fundacao ← criar

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
