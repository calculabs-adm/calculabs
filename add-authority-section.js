const fs = require('fs');

const articlesPath = 'src/data/articles.json';

// Read the articles file
const articlesData = fs.readFileSync(articlesPath, 'utf8');
let articles = JSON.parse(articlesData);

// Add the authority section to each article's content
articles = articles.map(article => {
  if (article.content && !article.content.includes('## Sobre o conteúdo')) {
    // Add the authority section at the end of the content HTML
    article.content += `

## Sobre o conteúdo

Conteúdo desenvolvido pela equipe CalcuLabs, especializada na criação de ferramentas e materiais educativos para cálculos práticos do dia a dia.

Este artigo foi revisado para garantir precisão das informações e clareza na aplicação dos conceitos apresentados.

Nosso objetivo é transformar cálculos complexos em soluções simples, acessíveis e confiáveis.`;
  }
  return article;
});

// Write back to file
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

console.log('Authority section added to all articles successfully!');