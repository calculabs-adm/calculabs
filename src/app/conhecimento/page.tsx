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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Conhecimento</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Guias completos para você aprender, entender e aplicar conceitos na
          prática.
        </p>
      </header>

      {allArticles.length === 0 ? (
        <p className="text-slate-500">Em breve novos conteúdos.</p>
      ) : (
        <>
          {highlights.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Artigos em destaque
              </h2>
              <div className="space-y-8">
                {highlights.map((article) => (
                  <article key={article!.slug}>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      <Link
                        href={`/conhecimento/${article!.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {article!.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      {truncate(article!.summary, 160)}
                    </p>
                    <Link
                      href={`/conhecimento/${article!.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Ler artigo
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Todos os artigos
            </h2>

            {pageArticles.length === 0 ? (
              <p className="text-slate-500">Em breve novos conteúdos.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageArticles.map((article) => (
                  <article
                    key={article!.slug}
                    className="border border-slate-200 rounded-lg p-5"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      <Link
                        href={`/conhecimento/${article!.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {article!.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      {truncate(article!.summary, 140)}
                    </p>
                    <Link
                      href={`/conhecimento/${article!.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Ler artigo
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex justify-center gap-4 mt-10">
                {safePage > 1 && (
                  <Link
                    href={`/conhecimento?page=${safePage - 1}`}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Anterior
                  </Link>
                )}
                {safePage < totalPages && (
                  <Link
                    href={`/conhecimento?page=${safePage + 1}`}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Próximo
                  </Link>
                )}
              </nav>
            )}
          </section>
        </>
      )}
    </div>
  );
}
