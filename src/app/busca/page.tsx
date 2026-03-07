import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCalculators, getCategoryByCategoryId, getSubcategoryById } from "@/lib/data";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Buscar Calculadora | CalcuLabs",
  description: "Encontre a calculadora ideal para suas necessidades. Busca em mais de 50 calculadoras online gratuitas.",
};

export default async function BuscaPage({ searchParams }: Props) {
  const { q } = await searchParams;
  
  const allCalculators = getAllCalculators();
  
  // Transformar dados para exibir
  const calculatorsWithCategory = allCalculators.map((calc) => {
    const category = getCategoryByCategoryId(calc.category_id);
    const subcategory = calc.subcategory_id 
      ? getSubcategoryById(calc.subcategory_id) 
      : null;
    return {
      ...calc,
      categorySlug: category?.slug || "",
      categoryName: category?.name || "",
      subcategorySlug: subcategory?.slug || "",
      subcategoryName: subcategory?.name || "",
    };
  });

  // Filtrar se houver query
  const results = q 
    ? calculatorsWithCategory.filter((calc) => 
        calc.name.toLowerCase().includes(q.toLowerCase()) ||
        calc.description.toLowerCase().includes(q.toLowerCase()) ||
        (calc.keywords && calc.keywords.toLowerCase().includes(q.toLowerCase()))
      )
    : calculatorsWithCategory;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span>/</span>
        <span className="text-slate-800">Busca</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {q ? `Resultados para "${q}"` : "Todas as Calculadoras"}
        </h1>
        <p className="text-slate-600">
          {results.length} {results.length === 1 ? "calculadora encontrada" : "calculadoras encontradas"}
        </p>
      </div>

      {/* Search Box */}
      <form className="mb-8">
        <div className="relative">
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Buscar calculadora..."
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

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.categorySlug}/${calc.subcategorySlug}/${calc.slug}`}
              className="block p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 mb-1">{calc.name}</h2>
                  <p className="text-sm text-slate-500 line-clamp-2">{calc.description}</p>
                  <span className="inline-block mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {calc.categoryName}
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
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Nenhuma calculadora encontrada</h2>
          <p className="text-slate-500">Tente buscar por outro termo ou navegue por nossas categorias.</p>
          <div className="flex justify-center gap-4 mt-6">
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
              href="/saude"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Saúde
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
