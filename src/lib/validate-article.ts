/**
 * Article Validator
 * Validates articles against CALCULABS_ARTICLE_SPEC.md
 *
 * Usage: bun run src/lib/validate-article.ts [slug]
 * If no slug provided, validates all articles
 */

import fs from 'fs';
import path from 'path';

interface FAQ {
  q: string;
  a: string;
}

interface Article {
  slug: string;
  title: string;
  category: string;
  meta_title: string;
  meta_description: string;
  search_intent: string;
  summary: string;
  content: string;
  faq: FAQ[];
  how_to: string[];
  entities: string[];
  semantic_keywords: string[];
  examples: string[];
  comparisons: string[];
  related_calculators: string[];
  related_articles: string[];
  internal_links: string[];
  featured_snippet_answer: string;
  priority: string;
  cluster: {
    is_pillar: boolean;
    cluster_name: string;
    satellites: string[];
  };
}

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  slug: string;
  passed: boolean;
  errors: ValidationError[];
}

const VALID_SEARCH_INTENTS = ['informacional', 'comercial', 'navegacional'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];
const REQUIRED_FIELDS: (keyof Article)[] = [
  'slug', 'title', 'category', 'meta_title', 'meta_description',
  'search_intent', 'summary', 'content', 'faq', 'how_to',
  'entities', 'semantic_keywords', 'examples', 'comparisons',
  'related_calculators', 'related_articles', 'internal_links',
  'featured_snippet_answer', 'priority', 'cluster'
];

function loadArticles(): Article[] {
  const data = fs.readFileSync('src/data/articles.json', 'utf-8');
  return JSON.parse(data);
}

function loadCalculatorSlugs(): string[] {
  const data = fs.readFileSync('src/data/calculators.json', 'utf-8');
  const calculators = JSON.parse(data);
  return calculators.map((c: { slug: string }) => c.slug);
}

function loadCategorySlugs(): string[] {
  const data = fs.readFileSync('src/data/categories.json', 'utf-8');
  const categories = JSON.parse(data);
  return categories.map((c: { slug: string }) => c.slug);
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return 0;
  return text.split(' ').length;
}

function hasInternalLinks(html: string): boolean {
  return /href\s*=\s*["'][^"']*["']/i.test(html);
}

function validateArticle(
  article: Article,
  allArticles: Article[],
  calculatorSlugs: string[],
  categorySlugs: string[]
): ValidationResult {
  const errors: ValidationError[] = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (article[field] === undefined || article[field] === null) {
      errors.push({ field, message: `Campo obrigatório ausente: ${field}` });
    }
  }

  if (errors.length > 0) {
    return { slug: article.slug || 'UNKNOWN', passed: false, errors };
  }

  // Slug
  if (!article.slug || article.slug.trim() === '') {
    errors.push({ field: 'slug', message: 'Slug não pode ser vazio' });
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(article.slug)) {
    errors.push({ field: 'slug', message: 'Slug deve ser kebab-case (ex: meu-artigo)' });
  }

  // Slug uniqueness
  const duplicateSlugs = allArticles.filter(a => a.slug === article.slug);
  if (duplicateSlugs.length > 1) {
    errors.push({ field: 'slug', message: `Slug duplicado: ${article.slug}` });
  }

  // Title
  if (!article.title || article.title.trim() === '') {
    errors.push({ field: 'title', message: 'Title não pode ser vazio' });
  }

  // Category
  if (!article.category || article.category.trim() === '') {
    errors.push({ field: 'category', message: 'Category não pode ser vazio' });
  } else if (!categorySlugs.includes(article.category)) {
    errors.push({ field: 'category', message: `Category slug não existe: ${article.category}` });
  }

  // Meta title
  if (!article.meta_title || article.meta_title.trim() === '') {
    errors.push({ field: 'meta_title', message: 'Meta title não pode ser vazio' });
  }

  // Meta description
  if (!article.meta_description || article.meta_description.trim() === '') {
    errors.push({ field: 'meta_description', message: 'Meta description não pode ser vazio' });
  }

  // Search intent
  if (!VALID_SEARCH_INTENTS.includes(article.search_intent)) {
    errors.push({ field: 'search_intent', message: `Search intent inválido: ${article.search_intent}. Deve ser: ${VALID_SEARCH_INTENTS.join(', ')}` });
  }

  // Summary
  if (!article.summary || article.summary.trim() === '') {
    errors.push({ field: 'summary', message: 'Summary não pode ser vazio' });
  } else if (article.summary.length < 200) {
    errors.push({ field: 'summary', message: `Summary deve ter no mínimo 200 caracteres. Atual: ${article.summary.length}` });
  }

  // Content
  if (!article.content || article.content.trim() === '') {
    errors.push({ field: 'content', message: 'Content não pode ser vazio' });
  } else {
    const wordCount = countWords(article.content);
    if (wordCount < 1500) {
      errors.push({ field: 'content', message: `Content deve ter no mínimo 1500 palavras. Atual: ${wordCount}` });
    }
    if (!hasInternalLinks(article.content)) {
      errors.push({ field: 'content', message: 'Content deve conter pelo menos 2 links internos (atributo href)' });
    }
  }

  // FAQ
  if (!Array.isArray(article.faq) || article.faq.length < 3) {
    errors.push({ field: 'faq', message: `FAQ deve ter no mínimo 3 itens. Atual: ${Array.isArray(article.faq) ? article.faq.length : 0}` });
  } else {
    for (let i = 0; i < article.faq.length; i++) {
      if (!article.faq[i].q || article.faq[i].q.trim() === '') {
        errors.push({ field: `faq[${i}].q`, message: `FAQ[${i}].q não pode ser vazio` });
      }
      if (!article.faq[i].a || article.faq[i].a.trim() === '') {
        errors.push({ field: `faq[${i}].a`, message: `FAQ[${i}].a não pode ser vazio` });
      }
    }
  }

  // How to
  if (!Array.isArray(article.how_to) || article.how_to.length < 3) {
    errors.push({ field: 'how_to', message: `How to deve ter no mínimo 3 itens. Atual: ${Array.isArray(article.how_to) ? article.how_to.length : 0}` });
  } else {
    for (let i = 0; i < article.how_to.length; i++) {
      if (!article.how_to[i] || article.how_to[i].trim() === '') {
        errors.push({ field: `how_to[${i}]`, message: `How to[${i}] não pode ser vazio` });
      }
    }
  }

  // Entities
  if (!Array.isArray(article.entities) || article.entities.length === 0) {
    errors.push({ field: 'entities', message: 'Entities não pode ser vazio' });
  }

  // Semantic keywords
  if (!Array.isArray(article.semantic_keywords) || article.semantic_keywords.length < 5) {
    errors.push({ field: 'semantic_keywords', message: `Semantic keywords deve ter no mínimo 5 itens. Atual: ${Array.isArray(article.semantic_keywords) ? article.semantic_keywords.length : 0}` });
  } else {
    for (let i = 0; i < article.semantic_keywords.length; i++) {
      if (!article.semantic_keywords[i] || article.semantic_keywords[i].trim() === '') {
        errors.push({ field: `semantic_keywords[${i}]`, message: `Semantic keyword[${i}] não pode ser vazio` });
      }
    }
  }

  // Examples
  if (!Array.isArray(article.examples) || article.examples.length === 0) {
    errors.push({ field: 'examples', message: 'Examples não pode ser vazio' });
  }

  // Comparisons
  if (!Array.isArray(article.comparisons) || article.comparisons.length === 0) {
    errors.push({ field: 'comparisons', message: 'Comparisons não pode ser vazio' });
  }

  // Related calculators
  if (!Array.isArray(article.related_calculators) || article.related_calculators.length < 2) {
    errors.push({ field: 'related_calculators', message: `Related calculators deve ter no mínimo 2 itens. Atual: ${Array.isArray(article.related_calculators) ? article.related_calculators.length : 0}` });
  } else {
    for (const slug of article.related_calculators) {
      if (!calculatorSlugs.includes(slug)) {
        errors.push({ field: 'related_calculators', message: `Calculator slug não existe: ${slug}` });
      }
    }
  }

  // Related articles
  if (!Array.isArray(article.related_articles) || article.related_articles.length < 1) {
    errors.push({ field: 'related_articles', message: `Related articles deve ter no mínimo 1 item. Atual: ${Array.isArray(article.related_articles) ? article.related_articles.length : 0}` });
  } else {
    const otherArticleSlugs = allArticles.filter(a => a.slug !== article.slug).map(a => a.slug);
    for (const slug of article.related_articles) {
      if (!otherArticleSlugs.includes(slug)) {
        errors.push({ field: 'related_articles', message: `Article slug não existe: ${slug}` });
      }
    }
  }

  // Internal links
  if (!Array.isArray(article.internal_links) || article.internal_links.length < 2) {
    errors.push({ field: 'internal_links', message: `Internal links deve ter no mínimo 2 itens. Atual: ${Array.isArray(article.internal_links) ? article.internal_links.length : 0}` });
  } else {
    const allValidSlugs = [...calculatorSlugs, ...allArticles.map(a => a.slug)];
    for (const slug of article.internal_links) {
      if (!allValidSlugs.includes(slug)) {
        errors.push({ field: 'internal_links', message: `Internal link slug não existe (nem em calculators, nem em articles): ${slug}` });
      }
    }
  }

  // Featured snippet answer
  if (!article.featured_snippet_answer || article.featured_snippet_answer.trim() === '') {
    errors.push({ field: 'featured_snippet_answer', message: 'Featured snippet answer não pode ser vazio' });
  } else if (article.featured_snippet_answer.length > 300) {
    errors.push({ field: 'featured_snippet_answer', message: `Featured snippet answer deve ter no máximo 300 caracteres. Atual: ${article.featured_snippet_answer.length}` });
  }

  // Priority
  if (!VALID_PRIORITIES.includes(article.priority)) {
    errors.push({ field: 'priority', message: `Priority inválida: ${article.priority}. Deve ser: ${VALID_PRIORITIES.join(', ')}` });
  }

  // Cluster
  if (!article.cluster || typeof article.cluster !== 'object') {
    errors.push({ field: 'cluster', message: 'Cluster é obrigatório e deve ser um objeto' });
  } else {
    if (typeof article.cluster.is_pillar !== 'boolean') {
      errors.push({ field: 'cluster.is_pillar', message: 'Cluster.is_pillar deve ser boolean' });
    }
    if (!article.cluster.cluster_name || article.cluster.cluster_name.trim() === '') {
      errors.push({ field: 'cluster.cluster_name', message: 'Cluster.cluster_name não pode ser vazio' });
    }
    if (!Array.isArray(article.cluster.satellites)) {
      errors.push({ field: 'cluster.satellites', message: 'Cluster.satellites deve ser um array' });
    }
  }

  return {
    slug: article.slug,
    passed: errors.length === 0,
    errors
  };
}

function main() {
  const args = process.argv.slice(2);
  const targetSlug = args[0];

  console.log(`
╔════════════════════════════════════════════════════════════╗
║              CALCULABS ARTICLE VALIDATOR                   ║
╚════════════════════════════════════════════════════════════╝
  `);

  const articles = loadArticles();
  const calculatorSlugs = loadCalculatorSlugs();
  const categorySlugs = loadCategorySlugs();

  let toTest: Article[];
  if (targetSlug) {
    toTest = articles.filter(a => a.slug === targetSlug);
    if (toTest.length === 0) {
      console.error(`❌ Article not found: ${targetSlug}`);
      process.exit(1);
    }
  } else {
    toTest = articles;
  }

  console.log(`Found ${toTest.length} article(s) to validate\n`);

  let passed = 0;
  let failed = 0;

  for (const article of toTest) {
    const result = validateArticle(article, articles, calculatorSlugs, categorySlugs);

    if (result.passed) {
      console.log(`  ✅ ${result.slug}`);
      passed++;
    } else {
      console.log(`  ❌ ${result.slug}`);
      for (const error of result.errors) {
        console.log(`     → [${error.field}] ${error.message}`);
      }
      failed++;
    }
  }

  console.log(`
╔════════════════════════════════════════════════════════════╗
║                      TEST SUMMARY                          ║
╚════════════════════════════════════════════════════════════╝
  ✅ Passed:  ${passed}
  ❌ Failed:  ${failed}
  📊 Total:   ${passed + failed}
`);

  if (failed > 0) {
    console.log(`\n⚠️  Some articles failed validation!`);
    process.exit(1);
  } else {
    console.log(`\n✅ All articles passed validation!`);
    process.exit(0);
  }
}

main();
