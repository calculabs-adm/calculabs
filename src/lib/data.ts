import categoriesData from "@/data/categories.json";
import subcategoriesData from "@/data/subcategories.json";
import calculatorsData from "@/data/calculators.json";
import articlesData from "@/data/articles.json";

export type Article = {
  slug: string;
  title: string;
  category: string;
  meta_title: string;
  meta_description: string;
  search_intent: string;
  summary: string;
  content: string;
  faq: Array<{ q: string; a: string }>;
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
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  order: number;
  created_at: number;
};

export type Subcategory = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  created_at: number;
};

export type Calculator = {
  id: number;
  category_id: number;
  subcategory_id: number | null;
  name: string;
  slug: string;
  title: string;
  description: string;
  introduction: string;
  formula: string;
  formula_display: string | null;
  variables: string;
  steps: string | null;
  example: string | null;
  applications: string | null;
  curiosity: string | null;
  faqs: string | null;
  related_slugs: string | null;
  keywords: string | null;
  meta_title: string;
  meta_description: string;
  complexity: string;
  monetization_type: string | null;
  author_name: string | null;
  author_bio: string | null;
  sources: string | null;
  updated_at: number;
  created_at: number;
  is_active: number;
  view_count: number;
};

// Cast the imported data
const categories = categoriesData as Category[];
const subcategories = subcategoriesData as Subcategory[];
const calculators = calculatorsData as Calculator[];

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getSubcategoriesByCategory(categoryId: number): Subcategory[] {
  return subcategories
    .filter((s) => s.category_id === categoryId)
    .sort((a, b) => a.order - b.order);
}

export function getSubcategoryBySlug(
  categoryId: number,
  slug: string
): Subcategory | null {
  return subcategories.find(
    (s) => s.category_id === categoryId && s.slug === slug
  ) ?? null;
}

export function getCalculatorsByCategory(categoryId: number): Calculator[] {
  return calculators
    .filter((c) => c.category_id === categoryId && c.is_active)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCalculatorsBySubcategory(subcategoryId: number): Calculator[] {
  return calculators
    .filter((c) => c.subcategory_id === subcategoryId && c.is_active)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCalculatorBySlug(slug: string): Calculator | null {
  return calculators.find((c) => c.slug === slug && c.is_active) ?? null;
}

export function getRelatedCalculators(slugs: string[]): Calculator[] {
  if (slugs.length === 0) return [];
  return slugs
    .slice(0, 6)
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is Calculator => c !== null);
}

export function getAllCalculators(): Calculator[] {
  return calculators.filter((c) => c.is_active);
}

export function getCategoryWithSubcategories(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;
  const subs = getSubcategoriesByCategory(category.id);
  const subsWithCalcs = subs.map((sub) => {
    const calcs = getCalculatorsBySubcategory(sub.id);
    return { ...sub, calculators: calcs };
  });
  return { ...category, subcategories: subsWithCalcs };
}

export function getCalculatorWithContext(slug: string) {
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) return null;

  const category = getCategoryByCategoryId(calculator.category_id);
  
  const subcategory = calculator.subcategory_id
    ? getSubcategoryById(calculator.subcategory_id)
    : null;

  const relatedSlugs: string[] = calculator.related_slugs
    ? JSON.parse(calculator.related_slugs)
    : [];
  const related = getRelatedCalculators(relatedSlugs);

  return { calculator, category, subcategory, related };
}

function getCategoryByCategoryId(id: number): Category | null {
  return categories.find((c) => c.id === id) ?? null;
}

function getSubcategoryById(id: number): Subcategory | null {
  return subcategories.find((s) => s.id === id) ?? null;
}

export { getCategoryByCategoryId, getSubcategoryById };

export function getCategoriesWithCount() {
  const cats = getAllCategories();
  return cats.map((cat) => {
    const calcs = getCalculatorsByCategory(cat.id);
    return { ...cat, calculatorCount: calcs.length };
  });
}

export function getLatestCalculators(limit: number = 8) {
  const activeCalculators = calculators.filter((c) => c.is_active);
  const sorted = [...activeCalculators].sort((a, b) => b.id - a.id);
  return sorted.slice(0, limit).map((calc) => {
    const category = categories.find((cat) => cat.id === calc.category_id);
    const subcategory = calc.subcategory_id
      ? subcategories.find((sub) => sub.id === calc.subcategory_id)
      : null;
    return {
      ...calc,
      categorySlug: category?.slug ?? "",
      categoryName: category?.name ?? "",
      subcategorySlug: subcategory?.slug ?? "",
      subcategoryName: subcategory?.name ?? "",
      categoryIcon: category?.icon ?? "📊",
    };
  });
}

// Article whitelist — only these slugs are renderable
const ARTICLE_WHITELIST = [
  "quantidade-de-cimento-por-m2",
  "quantos-sacos-de-cimento-por-m2",
  "traco-de-concreto-proporcao",
];

const articles = articlesData as Article[];

export function getArticleBySlug(slug: string): Article | null {
  if (!ARTICLE_WHITELIST.includes(slug)) return null;
  return articles.find((a) => a.slug === slug) ?? null;
}

export function getPublishedArticleSlugs(): string[] {
  return ARTICLE_WHITELIST;
}
