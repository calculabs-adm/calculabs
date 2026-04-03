import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, getPublishedArticleSlugs, getCalculatorBySlug, getCategoryByCategoryId, getSubcategoryById } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calculabs.com.br";

  return {
    title: article.meta_title,
    description: article.meta_description,
    alternates: {
      canonical: `${siteUrl}/conhecimento/${article.slug}`,
    },
    openGraph: {
      title: article.meta_title,
      description: article.meta_description,
      url: `${siteUrl}/conhecimento/${article.slug}`,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedCalculators = (article.related_calculators ?? [])
    .map((cs) => {
      const calc = getCalculatorBySlug(cs);
      if (!calc) return null;
      const cat = getCategoryByCategoryId(calc.category_id);
      const sub = calc.subcategory_id ? getSubcategoryById(calc.subcategory_id) : null;
      return { calc, cat, sub };
    })
    .filter(Boolean) as Array<{ calc: { slug: string; name: string; description: string | null }; cat: { slug: string } | null; sub: { slug: string } | null }>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calculabs.com.br";

  const faqSchema = article.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: `${siteUrl}/conhecimento/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/conhecimento/${article.slug}`,
    },
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {article.title}
            </h1>
            {article.publishedAt && (
              <p className="text-sm text-slate-500 mb-4">
                Publicado em {new Date(article.publishedAt + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} - Equipe Calculabs
              </p>
            )}
            <p className="text-lg text-slate-600 leading-relaxed">
              {article.summary}
            </p>
          </header>

          <div
            className="calc-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Perguntas Frequentes
              </h2>
              <div className="space-y-6">
                {article.faq.map((item, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {item.q}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {relatedCalculators.length > 0 && (
            <section className="mt-12 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Calcule agora com base neste conteúdo
              </h2>
              <p className="text-slate-500 mb-6">
                Use nossas ferramentas para aplicar o que você aprendeu e obter resultados exatos para sua obra.
              </p>
              <div className="space-y-3">
                {relatedCalculators.map(({ calc, cat, sub }) => (
                  <Link
                    key={calc.slug}
                    href={`/${cat?.slug ?? "#"}/${sub?.slug ?? "#"}/${calc.slug}`}
                    className="group flex items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5 truncate">
                          {calc.description || calc.name}
                        </p>
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-100 transition-colors">
                      Calcular agora
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
