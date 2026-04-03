import type { MetadataRoute } from "next";
import { getAllCategories, getSubcategoriesByCategory, getAllCalculators, getPublishedArticleSlugs } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calculabs.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  // Home
  urls.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Categories
  const cats = await getAllCategories();
  for (const cat of cats) {
    urls.push({
      url: `${siteUrl}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // All calculators
  const calcs = await getAllCalculators();
  for (const calc of calcs) {
    // Get category and subcategory slugs
    const cat = cats.find((c) => c.id === calc.category_id);
    if (!cat) continue;

    let subSlug = "";
    if (calc.subcategory_id) {
      const subs = await getSubcategoriesByCategory(cat.id);
      const sub = subs.find((s) => s.id === calc.subcategory_id);
      subSlug = sub?.slug ?? "";
    }

    if (subSlug) {
      urls.push({
        url: `${siteUrl}/${cat.slug}/${subSlug}/${calc.slug}`,
        lastModified: calc.updated_at ? new Date(calc.updated_at * 1000) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Articles (Knowledge Hub)
  const articleSlugs = getPublishedArticleSlugs();
  for (const slug of articleSlugs) {
    urls.push({
      url: `${siteUrl}/conhecimento/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Institutional pages
  const institutionalPages = [
    { slug: "sobre", priority: 0.5 },
    { slug: "contato", priority: 0.5 },
    { slug: "privacidade", priority: 0.3 },
    { slug: "termos", priority: 0.3 },
  ];
  for (const page of institutionalPages) {
    urls.push({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: page.priority,
    });
  }

  return urls;
}
