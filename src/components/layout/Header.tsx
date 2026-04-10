import Link from "next/link";

const PRIMARY_NAV = [
  { href: "/matematica", label: "Matemática" },
  { href: "/financas-pessoais", label: "Finanças" },
  { href: "/trabalhista-tributario", label: "Trabalhista" },
  { href: "/saude", label: "Saúde" },
  { href: "/utilitarios", label: "Utilitários" },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
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

          <form action="/busca" method="get" className="hidden md:block flex-1 max-w-xl">
            <label htmlFor="header-search" className="sr-only">
              Buscar calculadoras e artigos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="header-search"
                type="search"
                name="q"
                placeholder="Buscar calculadoras e artigos..."
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
          </form>

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

          <Link
            href="/busca"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md flex-shrink-0"
            aria-label="Abrir busca"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
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
