import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategoryWithSubcategories, getAllCategories } from "@/lib/data";

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const data = await getCategoryWithSubcategories(categoria);
  if (!data) return { title: "Categoria não encontrada" };

  const totalCalcs = data.subcategories.reduce(
    (acc, sub) => acc + sub.calculators.length,
    0
  );

  return {
    title: `Calculadoras de ${data.name} | CalcuLabs`,
    description: `${totalCalcs} calculadoras de ${data.name} online e gratuitas. ${data.description}`,
    alternates: { canonical: `/${data.slug}` },
    openGraph: {
      title: `Calculadoras de ${data.name}`,
      description: data.description ?? "",
      url: `/${data.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const data = await getCategoryWithSubcategories(categoria);

  if (!data) notFound();

  const totalCalcs = data.subcategories.reduce(
    (acc, sub) => acc + sub.calculators.length,
    0
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Calculadoras de ${data.name}`,
    description: data.description,
    url: `https://portaldocalculo.com.br/${data.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://portaldocalculo.com.br" },
        { "@type": "ListItem", position: 2, name: data.name, item: `https://portaldocalculo.com.br/${data.slug}` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="border-b border-slate-200"
        style={{ background: `linear-gradient(135deg, ${data.color}10 0%, ${data.color}05 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
            <Link href="/">Início</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">{data.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${data.color}20` }}
            >
              {data.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Calculadoras de {data.name}
              </h1>
              <p className="text-slate-600 mt-2 text-lg">{data.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <span
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${data.color}15`, color: data.color ?? "#2563eb" }}
                >
                  {totalCalcs} calculadora{totalCalcs !== 1 ? "s" : ""}
                </span>
                <span className="text-sm text-slate-500">
                  {data.subcategories.length} subcategoria{data.subcategories.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {data.subcategories.map((sub) => (
          <section key={sub.id} className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{sub.name}</h2>
                {sub.description && (
                  <p className="text-slate-500 text-sm mt-1">{sub.description}</p>
                )}
              </div>
              <span className="text-sm text-slate-400">
                {sub.calculators.length} calculadora{sub.calculators.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sub.calculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/${data.slug}/${sub.slug}/${calc.slug}`}
                  className="calc-card group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors leading-tight">
                      {calc.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        calc.complexity === "basico"
                          ? "badge-basico"
                          : calc.complexity === "tecnico"
                          ? "badge-tecnico"
                          : "badge-avancado"
                      }`}
                    >
                      {calc.complexity === "basico"
                        ? "Básico"
                        : calc.complexity === "tecnico"
                        ? "Técnico"
                        : "Avançado"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {calc.description}
                  </p>
                  <div className="mt-3 text-xs text-blue-600 font-medium group-hover:underline">
                    Calcular →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
