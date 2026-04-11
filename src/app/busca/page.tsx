import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllCalculators,
  getArticleBySlug,
  getCategoryByCategoryId,
  getPublishedArticleSlugs,
  getSubcategoryById,
} from "@/lib/data";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

type SearchResult = {
  id: string;
  type: "calculator" | "article";
  title: string;
  description: string;
  href: string;
  badge: string;
};

export const metadata: Metadata = {
  title: "Buscar | CalcuLabs",
  description:
    "Encontre calculadoras e artigos do Knowledge Hub para resolver dúvidas e tomar melhores decisões.",
};

function includesQuery(value: string | null | undefined, query: string) {
  if (!value) return false;
  return value.toLowerCase().includes(query);
}

export default async function BuscaPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const normalizedQuery = (q ?? "").trim().toLowerCase();

  const calculators = getAllCalculators();
  const calculatorByResultId = new Map(calculators.map((calc) => [`calculator-${calc.slug}`, calc]));

  const calculatorResults: SearchResult[] = calculators.map((calc) => {
    const category = getCategoryByCategoryId(calc.category_id);
    const subcategory = calc.subcategory_id
      ? getSubcategoryById(calc.subcategory_id)
      : null;

    return {
      id: `calculator-${calc.slug}`,
      type: "calculator",
      title: calc.name,
      description: calc.description,
      href: `/${category?.slug ?? ""}/${subcategory?.slug ?? ""}/${calc.slug}`,
      badge: "Calculadora",
    };
  });

  const articles = getPublishedArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is NonNullable<typeof article> => article !== null);

  const articleBySlug = new Map(articles.map((article) => [article.slug, article]));

  const articleResults: SearchResult[] = articles.map((article) => ({
    id: `article-${article.slug}`,
    type: "article",
    title: article.title,
    description: article.summary,
    href: `/conhecimento/${article.slug}`,
    badge: "Artigo",
  }));

  const allResults = [...calculatorResults, ...articleResults];

  const results = normalizedQuery
    ? allResults.filter((item) => {
        if (item.type === "calculator") {
          const calculator = calculatorByResultId.get(item.id);
          return (
            includesQuery(item.title, normalizedQuery) ||
            includesQuery(item.description, normalizedQuery) ||
            includesQuery(calculator?.keywords, normalizedQuery)
          );
        }

        const articleSlug = item.id.replace("article-", "");
        const article = articleBySlug.get(articleSlug);

        return (
          includesQuery(item.title, normalizedQuery) ||
          includesQuery(item.description, normalizedQuery) ||
          (article?.semantic_keywords.some((keyword) => includesQuery(keyword, normalizedQuery)) ?? false) ||
          (article?.entities.some((entity) => includesQuery(entity, normalizedQuery)) ?? false)
        );
      })
    : allResults;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Início
        </Link>
        <span>/</span>
        <span className="text-slate-800">Busca</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {normalizedQuery ? `Resultados para "${q?.trim()}"` : "Buscar no CalcuLabs"}
        </h1>
        <p className="text-slate-600">
          {results.length} {results.length === 1 ? "resultado encontrado" : "resultados encontrados"}
        </p>
      </div>

      <form className="mb-8" action="/busca" method="get">
        <div className="relative">
          <input
            type="search"
            name="q"
            defaultValue={q || ""}
            placeholder="Buscar calculadoras e artigos..."
            className="w-full px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  {item.type === "calculator" ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 mb-1">{item.title}</h2>
                  <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                  <span className="inline-block mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.badge}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Nenhum resultado encontrado</h2>
          <p className="text-slate-500">Tente outro termo ou navegue pelas categorias e artigos.</p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Link
              href="/matematica"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Matemática
            </Link>
            <Link
              href="/financas-pessoais"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Finanças
            </Link>
            <Link
              href="/conhecimento"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Knowledge Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
