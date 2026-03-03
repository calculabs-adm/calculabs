import { db } from "@/db";
import { categories, subcategories, calculators } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export type Category = typeof categories.$inferSelect;
export type Subcategory = typeof subcategories.$inferSelect;
export type Calculator = typeof calculators.$inferSelect;

export async function getAllCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(categories.order);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function getSubcategoriesByCategory(categoryId: number): Promise<Subcategory[]> {
  return db
    .select()
    .from(subcategories)
    .where(eq(subcategories.categoryId, categoryId))
    .orderBy(subcategories.order);
}

export async function getSubcategoryBySlug(
  categoryId: number,
  slug: string
): Promise<Subcategory | null> {
  const result = await db
    .select()
    .from(subcategories)
    .where(and(eq(subcategories.categoryId, categoryId), eq(subcategories.slug, slug)))
    .limit(1);
  return result[0] ?? null;
}

export async function getCalculatorsByCategory(categoryId: number): Promise<Calculator[]> {
  return db
    .select()
    .from(calculators)
    .where(and(eq(calculators.categoryId, categoryId), eq(calculators.isActive, true)))
    .orderBy(calculators.name);
}

export async function getCalculatorsBySubcategory(subcategoryId: number): Promise<Calculator[]> {
  return db
    .select()
    .from(calculators)
    .where(and(eq(calculators.subcategoryId, subcategoryId), eq(calculators.isActive, true)))
    .orderBy(calculators.name);
}

export async function getCalculatorBySlug(slug: string): Promise<Calculator | null> {
  const result = await db
    .select()
    .from(calculators)
    .where(and(eq(calculators.slug, slug), eq(calculators.isActive, true)))
    .limit(1);
  return result[0] ?? null;
}

export async function getRelatedCalculators(slugs: string[]): Promise<Calculator[]> {
  if (slugs.length === 0) return [];
  const results = await Promise.all(
    slugs.slice(0, 6).map((slug) => getCalculatorBySlug(slug))
  );
  return results.filter((c): c is Calculator => c !== null);
}

export async function getAllCalculators(): Promise<Calculator[]> {
  return db
    .select()
    .from(calculators)
    .where(eq(calculators.isActive, true))
    .orderBy(calculators.name);
}

export async function getCategoryWithSubcategories(slug: string) {
  const category = await getCategoryBySlug(slug);
  if (!category) return null;
  const subs = await getSubcategoriesByCategory(category.id);
  const subsWithCalcs = await Promise.all(
    subs.map(async (sub) => {
      const calcs = await getCalculatorsBySubcategory(sub.id);
      return { ...sub, calculators: calcs };
    })
  );
  return { ...category, subcategories: subsWithCalcs };
}

export async function getCalculatorWithContext(slug: string) {
  const calculator = await getCalculatorBySlug(slug);
  if (!calculator) return null;

  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, calculator.categoryId))
    .limit(1)
    .then((r) => r[0] ?? null);

  const subcategory = calculator.subcategoryId
    ? await db
        .select()
        .from(subcategories)
        .where(eq(subcategories.id, calculator.subcategoryId))
        .limit(1)
        .then((r) => r[0] ?? null)
    : null;

  const relatedSlugs: string[] = calculator.relatedSlugs
    ? JSON.parse(calculator.relatedSlugs)
    : [];
  const related = await getRelatedCalculators(relatedSlugs);

  return { calculator, category, subcategory, related };
}

export async function getCategoriesWithCount() {
  const cats = await getAllCategories();
  const result = await Promise.all(
    cats.map(async (cat) => {
      const calcs = await getCalculatorsByCategory(cat.id);
      return { ...cat, calculatorCount: calcs.length };
    })
  );
  return result;
}
