"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAllCalculators, getCategoryByCategoryId, getSubcategoryById, getPublishedArticleSlugs, getArticleBySlug, type Calculator } from "@/lib/data";

// Transform calculator and article data for search
function useSearchData() {
  return useMemo(() => {
    const calcs = getAllCalculators();
    const calculatorData = calcs.map((calc: Calculator) => {
      const category = getCategoryByCategoryId(calc.category_id);
      const subcategory = calc.subcategory_id
        ? getSubcategoryById(calc.subcategory_id)
        : null;
      return {
        name: calc.name,
        slug: calc.slug,
        category: category?.slug || "",
        subcategory: subcategory?.slug || "",
        type: "calculator" as const,
      };
    });

    // Get articles from the data functions
    const articles = getPublishedArticleSlugs()
      .map(slug => getArticleBySlug(slug))
      .filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => a !== null)
      .map(article => ({
        name: article.title,
        slug: article.slug,
        category: article.category,
        subcategory: "",
        type: "article" as const,
      }));

    return [...calculatorData, ...articles];
  }, []);
}

const PRIMARY_NAV = [
  { href: "/matematica", label: "Matemática" },
  { href: "/financas-pessoais", label: "Finanças" },
  { href: "/trabalhista-tributario", label: "Trabalhista" },
  { href: "/saude", label: "Saúde" },
  { href: "/utilitarios", label: "Utilitários" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchData = useSearchData();

  // Filtrar calculadoras e artigos baseado na busca
  const searchResults = searchQuery.length >= 2
    ? searchData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  // Fechar busca ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectItem = (item: { name: string; slug: string; category: string; subcategory: string; type: "calculator" | "article" }) => {
    if (item.type === "calculator") {
      router.push(`/${item.category}/${item.subcategory}/${item.slug}`);
    } else {
      router.push(`/conhecimento/${item.slug}`);
    }
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-blue-700 transition-colors">
              ∑
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-slate-900 text-lg leading-none block">
                CalcuLabs
              </span>
              <span className="text-xs text-slate-500 leading-none">
                Calculadoras Online
              </span>
            </div>
          </Link>

          {/* Barra de Busca Prominente */}
          <div ref={searchRef} className="relative flex-1 max-w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Buscar calculadoras e artigos..."
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>

            {/* Dropdown de Sugestões */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg mt-2 z-50 max-h-96 overflow-y-auto">
                <div className="p-4">
                  <div className="space-y-1">
                    {searchResults.map((item, index) => (
                      <button
                        key={`${item.type}-${item.slug}`}
                        onClick={() => handleSelectItem(item)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                      >
                        <div className="flex-shrink-0">
                          {item.type === "calculator" ? (
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 capitalize">
                            {item.type === "calculator" ? "Calculadora" : "Artigo"} • {item.category.replace("-", " ")}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Link para busca completa */}
                  <div className="border-t border-slate-200 mt-4 pt-4">
                    <Link
                      href={`/busca?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Ver todos os resultados
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile search button */}
            <Link
              href="/busca"
              className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
              aria-label="Abrir busca"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0" aria-label="Navegação principal">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <details className="md:hidden border-t border-slate-200">
          <summary className="list-none py-3 text-sm font-medium text-slate-700 cursor-pointer select-none flex items-center justify-between">
            Navegação rápida
            <span className="text-slate-400">▼</span>
          </summary>
          <div className="pb-3 space-y-1">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
