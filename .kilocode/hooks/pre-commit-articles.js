#!/usr/bin/env node

/**
 * Git Pre-commit Hook - Article Quality Assurance
 * Ensures all article modifications follow quality standards
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import validators
const SEOValidator = require('../scripts/seo-validator');

function main() {
  console.log('🔍 PRE-COMMIT HOOK: Verificando qualidade de artigos...\n');

  try {
    // Check if articles.json was modified
    const modifiedFiles = getModifiedFiles();

    if (!modifiedFiles.includes('src/data/articles.json')) {
      console.log('✅ Nenhum artigo modificado - pulando validação.');
      return;
    }

    console.log('📄 Detectada modificação em articles.json');
    console.log('🚀 Executando validação completa...\n');

    // Run full validation
    const validator = new SEOValidator();
    const results = validator.validateAllArticles();

    // Display results
    console.log('\n📊 RESULTADO DA VALIDAÇÃO:');
    console.log(`✅ Aprovados: ${results.passed}`);
    console.log(`❌ Reprovados: ${results.failed}`);
    console.log(`🎯 Taxa de sucesso: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%\n`);

    if (results.failed > 0) {
      console.log('❌ FALHA: Artigos com problemas críticos detectados!\n');
      console.log('📋 PROBLEMAS ENCONTRADOS:');

      results.issues.forEach(issue => {
        console.log(`\n📄 ${issue.slug}:`);
        issue.issues.forEach(problem => {
          console.log(`   ❌ ${problem}`);
        });
      });

      console.log('\n💡 SOLUÇÕES:');
      console.log('1. Execute: node scripts/seo-validator.js para detalhes completos');
      console.log('2. Use: node scripts/seo-fixes.js para correções automáticas');
      console.log('3. Consulte: docs/SEO_QUALITY_STANDARD.md para padrões');
      console.log('4. Aplique recipe: .kilocode/recipes/article-generator.md\n');

      console.log('🚫 COMMIT BLOQUEADO: Corrija os problemas antes de commitar.');
      process.exit(1);
    }

    console.log('✅ SUCESSO: Todos os artigos atendem aos padrões de qualidade!');
    console.log('🎉 Commit autorizado - qualidade garantida.');

  } catch (error) {
    console.error('❌ ERRO na validação:', error.message);
    console.log('\n🔧 Execute manualmente: node scripts/seo-validator.js');
    process.exit(1);
  }
}

function getModifiedFiles() {
  try {
    return execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
