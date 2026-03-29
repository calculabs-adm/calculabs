import type { Metadata } from "next";
import Link from "next/link";
import { getArticleBySlug, getPublishedArticleSlugs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artigos e Guias | CalcuLabs",
  description:
    "Explore nossos guias completos sobre finanças, engenharia, matemática e mais.",
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

const PAGE_SIZE = 6;

export default async function ConhecimentoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const slugs = getPublishedArticleSlugs();
  const allArticles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean);

  const highlights = allArticles
    .filter((a) => a!.priority === "high")
    .slice(0, 3);

  const highlightedSlugs = new Set(highlights.map((a) => a!.slug));
  const gridArticles = allArticles.filter(
    (a) => !highlightedSlugs.has(a!.slug),
  );

  const totalPages = Math.max(1, Math.ceil(gridArticles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageArticles = gridArticles.slice(start, start + PAGE_SIZE);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Knowledge Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Conhecimento
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Guias completos para você aprender, entender e aplicar conceitos na
              prática.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${allArticles.length}`, label: "Artigos" },
              { value: `${highlights.length}`, label: "Em Destaque" },
              { value: "100%", label: "Gratuito" },
              { value: "Prático", label: "Passo a passo" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {allArticles.length === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Em breve novos conteúdos</h2>
            <p className="text-slate-500">Estamos preparando guias completos para você.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured articles */}
          {highlights.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Artigos em destaque</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highlights.map((article) => (
                  <Link
                    key={article!.slug}
                    href={`/conhecimento/${article!.slug}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                        Destaque
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                      {article!.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {truncate(article!.summary, 160)}
                    </p>
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center gap-1">
                      Ler artigo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Grid section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Todos os artigos</h2>
            </div>

            {pageArticles.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-500">Nenhum artigo nesta página.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageArticles.map((article) => (
                  <Link
                    key={article!.slug}
                    href={`/conhecimento/${article!.slug}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                  >
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                      {article!.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {truncate(article!.summary, 140)}
                    </p>
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center gap-1">
                      Ler artigo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-3 mt-12">
                {safePage > 1 && (
                  <Link
                    href={`/conhecimento?page=${safePage - 1}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Anterior
                  </Link>
                )}
                <span className="px-4 py-2 text-sm text-slate-500">
                  Página {safePage} de {totalPages}
                </span>
                {safePage < totalPages && (
                  <Link
                    href={`/conhecimento?page=${safePage + 1}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 border border-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-all"
                  >
                    Próximo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </nav>
            )}
          </section>
        </>
      )}
    </>
  );
}
