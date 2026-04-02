#!/usr/bin/env node

/**
 * Documentation Validator
 * Validates that all documentation files are synchronized with JSON data
 *
 * Usage: node scripts/validate-docs.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  log(colors.red, `❌ ${message}`);
}

function success(message) {
  log(colors.green, `✅ ${message}`);
}

function warning(message) {
  log(colors.yellow, `⚠️ ${message}`);
}

function info(message) {
  log(colors.blue, `ℹ️ ${message}`);
}

// Load JSON data
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    error(`Failed to load ${filePath}: ${e.message}`);
    return null;
  }
}

// Validate calculators inventory
function validateCalculatorInventory() {
  info('Validating calculator inventory...');

  const calculators = loadJSON('src/data/calculators.json');
  if (!calculators) return false;

  const inventoryPath = 'docs/master_inventory-calculators.md';
  const inventory = fs.readFileSync(inventoryPath, 'utf-8');

  // Check total count
  const totalMatch = inventory.match(/Total: (\d+) calculadoras/);
  if (!totalMatch) {
    error('Cannot find total calculators count in inventory');
    return false;
  }

  const inventoryTotal = parseInt(totalMatch[1]);
  const actualTotal = calculators.length;

  if (inventoryTotal !== actualTotal) {
    error(`Calculator inventory total mismatch: inventory=${inventoryTotal}, actual=${actualTotal}`);
    return false;
  }

  success(`Calculator inventory: ${actualTotal} calculators`);
  return true;
}

// Validate articles inventory
function validateArticleInventory() {
  info('Validating article inventory...');

  const articles = loadJSON('src/data/articles.json');
  if (!articles) return false;

  const inventoryPath = 'docs/master_inventory-articles.md';
  const inventory = fs.readFileSync(inventoryPath, 'utf-8');

  // Count articles in inventory (lines starting with | ID |)
  const inventoryLines = inventory.split('\n').filter(line =>
    line.startsWith('| ') && /^\| \d+ \|/.test(line)
  );

  if (inventoryLines.length !== articles.length) {
    error(`Article inventory count mismatch: inventory=${inventoryLines.length}, actual=${articles.length}`);
    return false;
  }

  success(`Article inventory: ${articles.length} articles`);
  return true;
}

// Validate article whitelist
function validateArticleWhitelist() {
  info('Validating article whitelist...');

  const articles = loadJSON('src/data/articles.json');
  const whitelistPath = 'src/lib/data.ts';
  const whitelistContent = fs.readFileSync(whitelistPath, 'utf-8');

  const whitelistMatch = whitelistContent.match(/const ARTICLE_WHITELIST = \[([\s\S]*?)\];/);
  if (!whitelistMatch) {
    error('Cannot find ARTICLE_WHITELIST in data.ts');
    return false;
  }

  const whitelistSlugs = whitelistMatch[1]
    .split(',')
    .map(line => line.trim().replace(/['"]/g, ''))
    .filter(slug => slug && slug !== '');

  const articleSlugs = articles.map(a => a.slug);

  // Check if all articles are in whitelist
  const missingInWhitelist = articleSlugs.filter(slug => !whitelistSlugs.includes(slug));
  if (missingInWhitelist.length > 0) {
    error(`Articles missing from whitelist: ${missingInWhitelist.join(', ')}`);
    return false;
  }

  // Check if whitelist has articles not in JSON
  const extraInWhitelist = whitelistSlugs.filter(slug => !articleSlugs.includes(slug));
  if (extraInWhitelist.length > 0) {
    warning(`Extra articles in whitelist (may be planned): ${extraInWhitelist.join(', ')}`);
  }

  success(`Article whitelist: ${whitelistSlugs.length} articles`);
  return true;
}

// Validate cluster relationships
function validateClusterRelationships() {
  info('Validating cluster relationships...');

  const articles = loadJSON('src/data/articles.json');
  const masterMapPath = 'docs/MASTER_MAP.md';
  const masterMap = fs.readFileSync(masterMapPath, 'utf-8');

  const clusters = {};

  // Count articles by cluster from JSON
  articles.forEach(article => {
    const cluster = article.cluster.cluster_name;
    if (!clusters[cluster]) clusters[cluster] = { pillars: 0, satellites: 0 };
    if (article.cluster.is_pillar) {
      clusters[cluster].pillars++;
    } else {
      clusters[cluster].satellites++;
    }
  });

  // Check each cluster in master map
  let isValid = true;
  Object.keys(clusters).forEach(clusterName => {
    const clusterRegex = new RegExp(`### .*${clusterName}`, 'i');
    if (!clusterRegex.test(masterMap)) {
      error(`Cluster "${clusterName}" not found in MASTER_MAP.md`);
      isValid = false;
    }

    // Check counts
    const clusterSection = masterMap.split(new RegExp(`### .*${clusterName}`, 'i'))[1]?.split('###')[0] || '';
    const articleLines = clusterSection.split('\n').filter(line =>
      line.includes('| **Pillar** |') || line.includes('| Satellite |')
    );

    const expectedArticles = clusters[clusterName].pillars + clusters[clusterName].satellites;
    if (articleLines.length !== expectedArticles) {
      error(`Cluster "${clusterName}" article count mismatch: master_map=${articleLines.length}, actual=${expectedArticles}`);
      isValid = false;
    }
  });

  if (isValid) {
    success('Cluster relationships validated');
  }

  return isValid;
}

// Validate FEATURES.md counts
function validateFeaturesCounts() {
  info('Validating FEATURES.md counts...');

  const calculators = loadJSON('src/data/calculators.json');
  const articles = loadJSON('src/data/articles.json');
  const featuresPath = 'docs/FEATURES.md';
  const features = fs.readFileSync(featuresPath, 'utf-8');

  // Check calculator count
  const calcMatch = features.match(/(\d+) calculadoras em (\d+) categorias/);
  if (calcMatch) {
    const [_, calcCount, catCount] = calcMatch;
    if (parseInt(calcCount) !== calculators.length) {
      error(`FEATURES.md calculator count: ${calcCount} vs actual ${calculators.length}`);
      return false;
    }
  }

  // Check article count
  const articleMatch = features.match(/(\d+) artigos publicados/);
  if (articleMatch) {
    const articleCount = parseInt(articleMatch[1]);
    if (articleCount !== articles.length) {
      error(`FEATURES.md article count: ${articleCount} vs actual ${articles.length}`);
      return false;
    }
  }

  success('FEATURES.md counts validated');
  return true;
}

// Main validation function
function validateDocumentation() {
  info('🧪 Starting documentation validation...\n');

  let allValid = true;

  allValid &= validateCalculatorInventory();
  allValid &= validateArticleInventory();
  allValid &= validateArticleWhitelist();
  allValid &= validateClusterRelationships();
  allValid &= validateFeaturesCounts();

  console.log('\n' + '='.repeat(50));

  if (allValid) {
    success('🎉 All documentation is synchronized!');
    process.exit(0);
  } else {
    error('❌ Documentation validation failed!');
    error('Please update the documentation files to match the JSON data.');
    process.exit(1);
  }
}

// Run validation
validateDocumentation();