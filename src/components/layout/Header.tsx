"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Lista de calculadoras para busca
const calculators = [
  { name: "Juros Compostos", slug: "juros-compostos", category: "financas-pessoais", subcategory: "juros-investimentos" },
  { name: "Juros Simples", slug: "juros-simples", category: "financas-pessoais", subcategory: "juros-investimentos" },
  { name: "Porcentagem", slug: "porcentagem", category: "matematica", subcategory: "basica" },
  { name: "Regra de Três", slug: "regra-de-tres", category: "matematica", subcategory: "basica" },
  { name: "IMC", slug: "imc", category: "saude", subcategory: "corpo-metabolismo" },
  { name: "TMB", slug: "tmb", category: "saude", subcategory: "corpo-metabolismo" },
  { name: "Rescisão Trabalhista", slug: "rescisao", category: "trabalhista-tributario", subcategory: "trabalhista" },
  { name: "INSS", slug: "inss", category: "trabalhista-tributario", subcategory: "trabalhista" },
  { name: "Equação 2º Grau", slug: "equacao-2-grau", category: "matematica", subcategory: "algebra" },
  { name: "CDB", slug: "cdb", category: "financas-pessoais", subcategory: "juros-investimentos" },
  { name: "Tesouro Direto", slug: "tesouro-direto", category: "financas-pessoais", subcategory: "juros-investimentos" },
  { name: "Poupança", slug: "poupanca", category: "financas-pessoais", subcategory: "juros-investimentos" },
  { name: "Financiamento Imobiliário", slug: "financiamento-imobiliario", category: "financas-pessoais", subcategory: "financiamentos" },
  { name: "Empréstimo", slug: "emprestimo", category: "financas-pessoais", subcategory: "financiamentos" },
  { name: "ROI", slug: "roi", category: "financas-pessoais", subcategory: "gestao-financeira" },
  { name: "Média Aritmética", slug: "media-aritmetica", category: "matematica", subcategory: "basica" },
  { name: "MMC", slug: "mmc", category: "matematica", subcategory: "basica" },
  { name: "MDC", slug: "mdc", category: "matematica", subcategory: "basica" },
  { name: "Conversor de Moeda", slug: "conversor-moeda", category: "utilitarios", subcategory: "conversores" },
  { name: "Calorias Diárias", slug: "calorias-diarias", category: "saude", subcategory: "corpo-metabolismo" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filtrar calculadoras baseado na busca (usando useMemo para evitar setState no effect)
  const searchResults = searchQuery.length >= 2 
    ? calculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleSelectCalc = (calc: typeof calculators[0]) => {
    router.push(`/${calc.category}/${calc.subcategory}/${calc.slug}`);
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
              <span className="font-bold text-white text-lg leading-none block">
                CalcuLabs
              </span>
              <span className="text-xs text-slate-500 leading-none">
                Calculadoras Online
              </span>
            </div>
          </Link>

          {/* Barra de Busca Prominente */}
          <div ref={searchRef} className="relative flex-1 max-w-xl">
            <div className={`relative transition-all duration-200 ${searchOpen ? 'scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar calculadora..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown de Resultados */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                {searchResults.map((calc) => (
                  <button
                    key={calc.slug}
                    onClick={() => handleSelectCalc(calc)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{calc.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{calc.category.replace('-', ' ')}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Sem resultados */}
            {searchOpen && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                <p className="text-slate-500 text-center">Nenhuma calculadora encontrada para &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <Link
              href="/matematica"
              className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Matemática
            </Link>
            <Link
              href="/financas-pessoais"
              className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Finanças
            </Link>
            <Link
              href="/trabalhista-tributario"
              className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Trabalhista
            </Link>
            <Link
              href="/saude"
              className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Saúde
            </Link>
            <Link
              href="/utilitarios"
              className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Utilitários
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md flex-shrink-0"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            {[
              { href: "/matematica", label: "Matemática", icon: "📐" },
              { href: "/financas-pessoais", label: "Finanças Pessoais", icon: "💰" },
              { href: "/trabalhista-tributario", label: "Trabalhista e Tributário", icon: "⚖️" },
              { href: "/saude", label: "Saúde", icon: "🏥" },
              { href: "/utilitarios", label: "Utilitários", icon: "🔧" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
