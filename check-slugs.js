// Check published slugs
const fs = require('fs');

// Simulate ARTICLE_WHITELIST
const ARTICLE_WHITELIST = [
  "quantidade-de-cimento-por-m2",
  "quantos-sacos-de-cimento-por-m2",
  "traco-de-concreto-proporcao",
  "consumo-de-cimento-por-tipo-de-obra",
  "forca-energia-e-trabalho",
  "juros-compostos-guia-completo",
  "juros-simples-vs-compostos",
  "cimento-para-laje",
  "cimento-para-piso",
  "cimento-para-fundacao",
  "gestao-financeira-pessoal",
  "margem-de-lucro",
  "markup",
  "ponto-de-equilibrio",
  "fluxo-de-caixa",
  "despesas-fixas-e-variaveis",
  "capital-de-giro",
  "roi",
];

console.log('Total slugs in whitelist:', ARTICLE_WHITELIST.length);
console.log('New articles:');
const newOnes = ARTICLE_WHITELIST.filter(s => ['fluxo-de-caixa', 'despesas-fixas-e-variaveis', 'capital-de-giro', 'roi'].includes(s));
console.log(newOnes);
console.log('All new articles included:', newOnes.length === 4);
