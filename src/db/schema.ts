import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const subcategories = sqliteTable("subcategories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const calculators = sqliteTable("calculators", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  subcategoryId: integer("subcategory_id").references(() => subcategories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  introduction: text("introduction").notNull(),
  formula: text("formula").notNull(),
  formulaDisplay: text("formula_display"),
  variables: text("variables").notNull(), // JSON string
  steps: text("steps"), // JSON string - step by step explanation
  example: text("example"), // JSON string - worked example
  applications: text("applications"), // JSON string - real world applications
  curiosity: text("curiosity"), // JSON string - educational curiosity content
  faqs: text("faqs"), // JSON string - FAQ items
  relatedSlugs: text("related_slugs"), // JSON string - array of slugs
  keywords: text("keywords"), // JSON string - SEO keywords array
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  complexity: text("complexity").notNull().default("basico"), // basico, tecnico, avancado
  monetizationType: text("monetization_type").default("ads"), // ads, affiliate, leads, pro
  authorName: text("author_name"),
  authorBio: text("author_bio"),
  sources: text("sources"), // JSON string
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  viewCount: integer("view_count").default(0),
});
