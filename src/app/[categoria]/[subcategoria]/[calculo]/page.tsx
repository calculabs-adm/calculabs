import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getCalculatorWithContext,
  getAllCalculators,
  getCategoryBySlug,
  getSubcategoryBySlug,
} from "@/lib/data";
import { generateCalculatorSEO } from "@/lib/seo-generator";
import CalculatorWidget from "@/components/calculator/CalculatorWidget";
import CalculatorTracker from "@/components/calculator/CalculatorTracker";
import ErrorReportButton from "@/components/calculator/ErrorReportButton";
import ShareButton from "@/components/calculator/ShareButton";
import AdBlock from "@/components/ads/AdBlock";
import PreAdTransition from "@/components/ui/PreAdTransition";
import ReadingBreak from "@/components/ui/ReadingBreak";
import type { Variable } from "@/lib/formula-engine";

interface Props {
  params: Promise<{
    categoria: string;
    subcategoria: string;
    calculo: string;
  }>;
}

interface CalculatorData {
  calculator: {
    id: number;
    slug: string;
    name: string;
    title: string;
    description: string;
    introduction: string;
    formula: string;
    formula_display: string | null;
    variables: string;
    steps: string | null;
    example: string | null;
    applications: string | null;
    curiosity: string | null;
    faqs: string | null;
    keywords: string | null;
    meta_title: string;
    meta_description: string;
    complexity: string | null;
    author_name: string | null;
    author_bio: string | null;
    updated_at: number | null;
  };
  category: {
    id: number;
    slug: string;
    name: string;
  } | null;
  subcategory: {
    id: number;
    slug: string;
    name: string;
  } | null;
  related: Array<{
    id: number;
    slug: string;
    name: string;
  }>;
}

interface CategoryData {
  id: number;
  slug: string;
  name: string;
}

interface SubcategoryData {
  id: number;
  slug: string;
  name: string;
}

// Financial categories for FinancialProduct schema
const FINANCIAL_CATEGORIES = [
  "financas-pessoais",
  "trabalhista-tributario"
];

const FINANCIAL_SUBCATEGORIES = [
  "juros-investimentos",
  "financiamentos-emprestimos",
  "gestao-financeira",
  "impostos",
  "trabalhista",
  "tributario"
];

function getReadingBreakText(categorySlug: string): string {
  switch (categorySlug) {
    case "financas-pessoais":
      return "Entender esse cálculo pode evitar decisões financeiras ruins e melhorar seus resultados no longo prazo.";
    case "trabalhista-tributario":
      return "Esse tipo de cálculo pode impactar diretamente seus direitos e valores a receber.";
    case "matematica":
      return "Dominar esse conceito facilita diversos outros cálculos no dia a dia.";
    case "saude":
      return "Esse cálculo ajuda a tomar decisões mais conscientes sobre sua saúde.";
    case "engenharia-construcao":
      return "Esse tipo de cálculo evita erros e desperdícios em projetos.";
    default:
      return "Compreender esse cálculo pode ajudar em diversas situações práticas.";
  }
}

// Check if calculator is financial
function isFinancialCalculator(
  category: CategoryData | null,
  subcategory: SubcategoryData | null
): boolean {
  if (!category || !subcategory) return false;
  return (
    FINANCIAL_CATEGORIES.includes(category.slug) ||
    FINANCIAL_SUBCATEGORIES.includes(subcategory.slug)
  );
}

// Generate all JSON-LD schemas for a calculator
function generateSchemas(
  calculator: CalculatorData["calculator"],
  category: CategoryData | null,
  subcategory: SubcategoryData | null,
  siteUrl: string,
  canonicalUrl: string,
  steps: string[],
  faqs: { q: string; a: string }[],
  variables: Variable[]
) {
  const schemas: Record<string, unknown>[] = [];

  // 1. Article schema (main)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: calculator.title,
    description: calculator.description,
    url: canonicalUrl,
    dateModified: calculator.updated_at
      ? new Date(calculator.updated_at * 1000).toISOString()
      : undefined,
    author: {
      "@type": "Organization",
      name: calculator.author_name ?? "CalcuLabs",
    },
    publisher: {
      "@type": "Organization",
      name: "CalcuLabs",
      url: siteUrl,
    },
  });

  // 2. BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
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
  });

  // 3. WebApplication schema (all calculators)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    description: calculator.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    url: canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    provider: {
      "@type": "Organization",
      name: "CalcuLabs",
      url: siteUrl,
    },
  });

  // 4. FinancialProduct schema (only for financial calculators)
  if (isFinancialCalculator(category, subcategory)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: `Calculadora de ${calculator.name}`,
      description: calculator.description,
      url: canonicalUrl,
      provider: {
        "@type": "Organization",
        name: "CalcuLabs",
        url: siteUrl,
      },
      termsOfService: `${siteUrl}/termos-de-uso`,
    });
  }

  // 5. Dataset schema (all calculators - describes the data generated)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Dados da Calculadora: ${calculator.name}`,
    description: `Dataset contendo os parâmetros de entrada e resultados da calculadora de ${calculator.name}. ${calculator.description}`,
    url: canonicalUrl,
    creator: {
      "@type": "Organization",
      name: "CalcuLabs",
      url: siteUrl,
    },
    datePublished: calculator.updated_at
      ? new Date(calculator.updated_at * 1000).toISOString()
      : new Date().toISOString(),
    dateModified: calculator.updated_at
      ? new Date(calculator.updated_at * 1000).toISOString()
      : new Date().toISOString(),
    variableMeasured: [
      ...variables.map((v) => ({
        "@type": "PropertyValue",
        name: v.label,
        description: v.label,
      })),
      {
        "@type": "PropertyValue",
        name: "Resultado",
        description: `Resultado do cálculo de ${calculator.name}`,
      },
    ],
    citation: [
      {
        "@type": "CreativeWork",
        name: calculator.name,
        url: canonicalUrl,
      },
    ],
  });

  // 6. HowTo schema (if steps exist)
  if (steps.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      inLanguage: "pt-BR",
      name: `Como calcular ${calculator.name}`,
      description: calculator.description,
      url: canonicalUrl,
      totalTime: "PT1M",
      tool: {
        "@type": "HowToTool",
        name: calculator.name,
        url: canonicalUrl,
      },
      step: steps.map((stepText) => ({
        "@type": "HowToStep",
        name: stepText,
        text: stepText,
      })),
    });
  }

  // 7. FAQPage schema (if FAQs exist)
  if (faqs.length > 0) {
    schemas.push({
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
    });
  }

  return schemas;
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

  const seo = generateCalculatorSEO(calculator);

  return {
    title: seo.title,
    description: seo.description,
    keywords: calculator.keywords ? JSON.parse(calculator.keywords) : [],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      type: "article",
      modifiedTime: calculator.updated_at ? new Date(calculator.updated_at * 1000).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    other: {
      "article:modified_time": calculator.updated_at ? new Date(calculator.updated_at * 1000).toISOString() : "",
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { calculo, categoria: categoriaSlug, subcategoria: subcategoriaSlug } = await params;
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

  const curiosity: string | null = calculator.curiosity || null;

  const faqs: { q: string; a: string }[] = calculator.faqs
    ? JSON.parse(calculator.faqs)
    : [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calculabs.com.br";
  const canonicalUrl = `${siteUrl}/${category?.slug}/${subcategory?.slug}/${calculator.slug}`;

  // Generate all JSON-LD schemas using centralized function
  const schemas = generateSchemas(
    calculator,
    category,
    subcategory,
    siteUrl,
    canonicalUrl,
    steps,
    faqs,
    variables
  );

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
      {/* Analytics tracker - sends event to GTM dataLayer */}
      <CalculatorTracker
        calculadoraNome={calculator.slug}
        calculadoraCategoria={categoriaSlug}
        calculadoraSubcategoria={subcategoriaSlug}
      />

      {/* JSON-LD schemas - generated by centralized generateSchemas function */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
        {/* Mobile layout: single container with order control for calculator position */}
        <div className="space-y-8 lg:hidden">
          {/* Title - always first on mobile */}
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

          {/* Calculator Widget - always first on mobile (order-1) */}
          <div className="order-1">
            <CalculatorWidget
              formula={calculator.formula}
              variables={variables}
              formulaDisplay={calculator.formula_display ?? undefined}
              calculoSlug={calculo}
              categoriaSlug={categoriaSlug}
              subcategoriaSlug={subcategoriaSlug}
            />
          </div>

          <AdBlock />

          <div className="calc-content">
          {/* Formula - always visible on mobile */}
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

          <ReadingBreak text={getReadingBreakText(categoriaSlug)} />

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

          {/* Curiosity Section */}
          {curiosity && (
            <div className="bg-[#d5d5d5] rounded-2xl p-6">
              <div
                className="curiosity-content"
                dangerouslySetInnerHTML={{ __html: curiosity }}
              />
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

          {/* Related calculators */}
          {related.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
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
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>⚠️ Aviso:</strong> Esta calculadora é para fins informativos.
              Para decisões importantes, consulte um profissional especializado.
            </p>
            <ErrorReportButton calculatorName={calculator.name} />
            <ShareButton title={calculator.name} description={calculator.description || undefined} />
          </div>
        </div>

        {/* Desktop layout (lg+) - unchanged for all calculators */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            <div className="calc-content">
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

            <ReadingBreak text={getReadingBreakText(categoriaSlug)} />

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

            {/* Curiosity Section */}
            {curiosity && (
              <div className="bg-[#d5d5d5] rounded-2xl p-6">
                <div
                  className="curiosity-content"
                  dangerouslySetInnerHTML={{ __html: curiosity }}
                />
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calculator widget */}
            <div className="sticky top-20">
              <CalculatorWidget
                formula={calculator.formula}
                variables={variables}
                formulaDisplay={calculator.formula_display ?? undefined}
                calculoSlug={calculo}
                categoriaSlug={categoriaSlug}
                subcategoriaSlug={subcategoriaSlug}
              />

              <AdBlock />

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
                <ErrorReportButton calculatorName={calculator.name} />
                <ShareButton title={calculator.name} description={calculator.description || undefined} />
              </div>
            </div>
          </div>
        </div>

        <PreAdTransition categorySlug={categoriaSlug} />
        <AdBlock />
      </div>
    </>
  );
}
