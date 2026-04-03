const fs = require('fs');

// Ler o arquivo
let content = fs.readFileSync('src/data/articles.json', 'utf8');

// Tentar parsear para identificar o problema
try {
  JSON.parse(content);
  console.log('JSON é válido');
} catch (e) {
  console.log('Erro encontrado:', e.message);
  console.log('Posição aproximada:', e.message.match(/position (\d+)/)?.[1]);

  // Vamos tentar corrigir escapando caracteres problemáticos
  content = content.replace(/([^\\])\\([^"\\\/bfnrt])/g, '$1\\\\$2'); // Escapar barras invertidas não válidas

  // Reescrever o arquivo
  fs.writeFileSync('src/data/articles.json', content);
  console.log('Arquivo corrigido. Testando novamente...');

  try {
    JSON.parse(content);
    console.log('JSON agora é válido!');
  } catch (e2) {
    console.log('Ainda há erros:', e2.message);
  }
}