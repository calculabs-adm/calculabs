import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getCalculatorWithContext,
  getAllCalculators,
  getCategoryBySlug,
  getSubcategoryBySlug,
} from "@/lib/data";
import CalculatorWidget from "@/components/calculator/CalculatorWidget";
import type { Variable } from "@/lib/formula-engine";

interface Props {
  params: Promise<{
    categoria: string;
    subcategoria: string;
    calculo: string;
  }>;
}

export async function generateStaticParams() {
  const calcs = await getAllCalculators();
  return calcs.map((c) => ({
    categoria: "", // Will be resolved dynamically
    subcategoria: "",
    calculo: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { calculo } = await params;
  const data = await getCalculatorWithContext(calculo);
  if (!data) return { title: "Calculadora não encontrada" };

  const { calculator, category, subcategory } = data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calculabs.com.br";
  const canonicalUrl = `${siteUrl}/${category?.slug}/${subcategory?.slug}/${calculator.slug}`;

  return {
    title: calculator.meta_title,
    description: calculator.meta_description,
    keywords: calculator.keywords ? JSON.parse(calculator.keywords) : [],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: calculator.meta_title,
      description: calculator.meta_description,
      url: canonicalUrl,
      type: "article",
      modifiedTime: calculator.updated_at ? new Date(calculator.updated_at * 1000).toISOString() : undefined,
    },
    other: {
      "article:modified_time": calculator.updated_at ? new Date(calculator.updated_at * 1000).toISOString() : "",
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { calculo } = await params;
  const data = await getCalculatorWithContext(calculo);

  if (!data) notFound();

  const { calculator, category, subcategory, related } = data;

  const variables: Variable[] = calculator.variables
    ? JSON.parse(calculator.variables)
    : [];

  const steps: string[] = calculator.steps ? JSON.parse(calculator.steps) : [];

  const example: {
    title: string;
    inputs: Record<string, unknown>;
    result: string;
    explanation: string;
  } | null = calculator.example ? JSON.parse(calculator.example) : null;

  const applications: string[] = calculator.applications
    ? JSON.parse(calculator.applications)
    : [];

  const faqs: { q: string; a: string }[] = calculator.faqs
    ? JSON.parse(calculator.faqs)
    : [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calculabs.com.br";
  const canonicalUrl = `${siteUrl}/${category?.slug}/${subcategory?.slug}/${calculator.slug}`;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: calculator.title,
    description: calculator.description,
    url: canonicalUrl,
    dateModified: calculator.updated_at ? new Date(calculator.updated_at * 1000).toISOString() : undefined,
    author: {
      "@type": "Organization",
      name: calculator.author_name ?? "CalcuLabs",
    },
    publisher: {
      "@type": "Organization",
      name: "CalcuLabs",
      url: siteUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: category?.name,
          item: `${siteUrl}/${category?.slug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: subcategory?.name,
          item: `${siteUrl}/${category?.slug}/${subcategory?.slug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: calculator.name,
          item: canonicalUrl,
        },
      ],
    },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  const complexityLabel =
    calculator.complexity === "basico"
      ? "Básico"
      : calculator.complexity === "tecnico"
      ? "Técnico"
      : "Avançado";

  const complexityClass =
    calculator.complexity === "basico"
      ? "badge-basico"
      : calculator.complexity === "tecnico"
      ? "badge-tecnico"
      : "badge-avancado";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Início</Link>
            <span>/</span>
            <Link href={`/${category?.slug}`}>{category?.name}</Link>
            <span>/</span>
            <Link href={`/${category?.slug}/${subcategory?.slug}`}>
              {subcategory?.name}
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">{calculator.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${complexityClass}`}>
                  {complexityLabel}
                </span>
                {calculator.updated_at && (
                  <span className="text-xs text-slate-400">
                    Atualizado em{" "}
                    {new Date(calculator.updated_at * 1000).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {calculator.title}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                {calculator.introduction}
              </p>
            </div>

            {/* Formula */}
            {calculator.formula_display && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  📐 Fórmula
                </h2>
                <div className="formula-display">
                  {calculator.formula_display}
                </div>
              </div>
            )}

            {/* Steps */}
            {steps.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  📋 Como Calcular (Passo a Passo)
                </h2>
                <ol className="space-y-3">
                  {steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Example */}
            {example && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  💡 Exemplo Prático
                </h2>
                <h3 className="font-semibold text-slate-800 mb-3">{example.title}</h3>
                <div className="bg-white border border-slate-200 rounded-xl p-4 mb-3">
                  <p className="font-mono text-sm text-slate-700">{example.result}</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {example.explanation}
                </p>
              </div>
            )}

            {/* Applications */}
            {applications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  🎯 Aplicações Práticas
                </h2>
                <ul className="space-y-2">
                  {applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-blue-500 mt-1 flex-shrink-0">✓</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  ❓ Perguntas Frequentes
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <span className="font-semibold text-slate-800 text-sm">
                          {faq.q}
                        </span>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0">
                          ▼
                        </span>
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {calculator.author_name && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                  {calculator.author_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    {calculator.author_name}
                  </p>
                  {calculator.author_bio && (
                    <p className="text-slate-500 text-xs mt-0.5">{calculator.author_bio}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calculator widget */}
            <div className="sticky top-20">
              <CalculatorWidget
                formula={calculator.formula}
                variables={variables}
                formulaDisplay={calculator.formula_display ?? undefined}
              />

              {/* Related calculators */}
              {related.length > 0 && (
                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                    🔗 Calculadoras Relacionadas
                  </h3>
                  <div className="space-y-2">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/${category?.slug}/${subcategory?.slug}/${rel.slug}`}
                        className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                        <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">
                          {rel.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-amber-700 leading-relaxed">
                  <strong>⚠️ Aviso:</strong> Esta calculadora é para fins informativos.
                  Para decisões importantes, consulte um profissional especializado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
