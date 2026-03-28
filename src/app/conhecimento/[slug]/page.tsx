import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getPublishedArticleSlugs } from "@/lib/data";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calculabs.com.br";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calculabs.com.br";

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
        </article>
      </div>
    </>
  );
}
