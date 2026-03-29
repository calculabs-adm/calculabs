import type { Metadata } from "next";
import Link from "next/link";
import { getArticleBySlug, getPublishedArticleSlugs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artigos e Guias | CalcuLabs",
  description:
    "Explore nossos guias completos sobre finanças, engenharia, matemática e mais.",
};

export default async function ConhecimentoPage() {
  const slugs = getPublishedArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Conhecimento
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Guias completos para você aprender, entender e aplicar conceitos na
          prática.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-slate-500">Em breve novos conteúdos.</p>
      ) : (
        <div>
          {articles.map((article) => (
            <article
              key={article!.slug}
              className="border-b border-slate-200 pb-6 mb-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                <Link
                  href={`/conhecimento/${article!.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {article!.title}
                </Link>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                {article!.summary.length > 160
                  ? `${article!.summary.slice(0, 160)}...`
                  : article!.summary}
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
    </div>
  );
}
