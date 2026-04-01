#!/usr/bin/env node

/**
 * Pre-commit SEO Quality Check
 * Runs before commits to ensure article quality standards
 */

const fs = require('fs');
const path = require('path');

// Import SEO Validator
const SEOValidator = require('./seo-validator');

function runPreCommitCheck() {
  console.log('🔍 EXECUTANDO VERIFICAÇÃO DE QUALIDADE SEO PRÉ-COMMIT');
  console.log('=====================================================\n');

  try {
    const validator = new SEOValidator();
    const results = validator.validateAllArticles();

    if (results.failed > 0) {
      console.log('\n❌ FALHA: Artigos com problemas críticos detectados!');
      console.log('Os seguintes artigos precisam ser corrigidos:\n');

      results.issues.forEach(issue => {
        console.log(`📄 ${issue.slug}:`);
        issue.issues.forEach(problem => {
          console.log(`   ❌ ${problem}`);
        });
        console.log('');
      });

      console.log('💡 Execute: node scripts/seo-validator.js para detalhes completos');
      console.log('🛠️ Use os scripts em scripts/ para correções automáticas');

      process.exit(1); // Fail the commit
    } else {
      console.log('\n✅ SUCESSO: Todos os artigos atendem aos padrões de qualidade SEO!');
      console.log('🎉 Commit autorizado.');
    }

  } catch (error) {
    console.error('❌ ERRO na validação:', error.message);
    process.exit(1);
  }
}

// Check if articles.json was modified in this commit
function checkModifiedFiles() {
  try {
    const { execSync } = require('child_process');
    const modifiedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    return modifiedFiles.includes('src/data/articles.json');
  } catch (e) {
    return false;
  }
}

// Run only if articles.json was modified
if (checkModifiedFiles()) {
  console.log('📝 Detectada modificação em articles.json - executando validação...');
  runPreCommitCheck();
} else {
  console.log('📝 Nenhuma modificação em artigos detectada - pulando validação.');
}

// Export for use as module
module.exports = { runPreCommitCheck };
