const fs = require('fs');

/**
 * SEO Quality Validator for CalcuLabs Articles
 * Ensures all articles meet SEO standards before publication
 */

class SEOValidator {
  constructor() {
    this.articles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
  }

  validateArticle(slug) {
    const article = this.articles.find(a => a.slug === slug);
    if (!article) {
      throw new Error(`Article "${slug}" not found`);
    }

    const results = {
      slug,
      passed: true,
      issues: [],
      warnings: [],
      score: 100
    };

    // Critical SEO checks
    this.checkH1Structure(article, results);
    this.checkMetaTags(article, results);
    this.checkContentQuality(article, results);
    this.checkSEOElements(article, results);
    this.checkTechnicalSEO(article, results);

    // Calculate final score
    results.score = Math.max(0, 100 - (results.issues.length * 10) - (results.warnings.length * 2));

    return results;
  }

  checkH1Structure(article, results) {
    const h1Count = (article.content.match(/<h1[^>]*>/g) || []).length;
    if (h1Count !== 1) {
      results.issues.push(`H1 structure: Found ${h1Count}, required 1`);
      results.passed = false;
    }
  }

  checkMetaTags(article, results) {
    // Meta title
    const titleLen = article.meta_title.length;
    if (titleLen > 60) {
      results.issues.push(`Meta title too long: ${titleLen} chars (max 60)`);
      results.passed = false;
    } else if (titleLen < 30) {
      results.warnings.push(`Meta title short: ${titleLen} chars (recommended 50-60)`);
    }

    // Meta description
    const descLen = article.meta_description.length;
    if (descLen < 120 || descLen > 160) {
      results.issues.push(`Meta description length: ${descLen} chars (required 120-160)`);
      results.passed = false;
    }
  }

  checkContentQuality(article, results) {
    const text = article.content.replace(/<[^>]+>/g, ' ');
    const words = text.split(/\s+/).filter(w => w.length > 0).length;

    if (words < 1500) {
      results.issues.push(`Content too short: ${words} words (minimum 1500)`);
      results.passed = false;
    }

    // Check H2 structure
    const h2Count = (article.content.match(/<h2[^>]*>/g) || []).length;
    if (h2Count < 5) {
      results.warnings.push(`Few H2 sections: ${h2Count} (recommended 5+)`);
    }
  }

  checkSEOElements(article, results) {
    // Featured snippet
    if (!article.featured_snippet_answer) {
      results.issues.push('Missing featured snippet answer');
      results.passed = false;
    }

    // FAQ
    if (!article.faq || article.faq.length < 3) {
      results.warnings.push(`FAQ insufficient: ${article.faq?.length || 0} questions (recommended 3+)`);
    }

    // Semantic keywords
    if (!article.semantic_keywords || article.semantic_keywords.length < 5) {
      results.warnings.push(`Few semantic keywords: ${article.semantic_keywords?.length || 0} (recommended 5+)`);
    }

    // Entities
    if (!article.entities || article.entities.length < 5) {
      results.warnings.push(`Few entities: ${article.entities?.length || 0} (recommended 5+)`);
    }
  }

  checkTechnicalSEO(article, results) {
    // URL friendly
    const urlFriendly = /^[a-z0-9-]+$/.test(article.slug) && article.slug.length <= 60;
    if (!urlFriendly) {
      results.issues.push('URL not SEO-friendly');
      results.passed = false;
    }

    // Internal links
    if (!article.internal_links || article.internal_links.length < 1) {
      results.warnings.push('No internal links');
    }

    // Related calculators
    if (!article.related_calculators || article.related_calculators.length < 1) {
      results.warnings.push('No related calculators');
    }
  }

  validateAllArticles() {
    console.log('🔍 VALIDANDO TODOS OS ARTIGOS DO SITE');
    console.log('=====================================\n');

    const summary = {
      total: this.articles.length,
      passed: 0,
      failed: 0,
      issues: []
    };

    this.articles.forEach(article => {
      const result = this.validateArticle(article.slug);

      if (result.passed) {
        summary.passed++;
        console.log(`✅ ${article.slug}: OK (${result.score}/100)`);
      } else {
        summary.failed++;
        summary.issues.push({ slug: article.slug, issues: result.issues });
        console.log(`❌ ${article.slug}: FAILED (${result.score}/100)`);
        result.issues.forEach(issue => console.log(`   - ${issue}`));
      }
    });

    console.log('\n📊 RESUMO FINAL:');
    console.log(`✅ Aprovados: ${summary.passed}`);
    console.log(`❌ Reprovados: ${summary.failed}`);
    console.log(`🎯 Taxa de sucesso: ${Math.round((summary.passed / summary.total) * 100)}%`);

    return summary;
  }
}

// Export for use in other scripts
module.exports = SEOValidator;

// Run validation if called directly
if (require.main === module) {
  const validator = new SEOValidator();
  validator.validateAllArticles();
}
