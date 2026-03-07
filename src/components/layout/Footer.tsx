import Link from "next/link";

export default function Footer() {
  const categories = [
    { href: "/matematica", label: "Matemática" },
    { href: "/financas-pessoais", label: "Finanças Pessoais" },
    { href: "/trabalhista-tributario", label: "Trabalhista e Tributário" },
    { href: "/saude", label: "Saúde" },
    { href: "/utilitarios", label: "Utilitários" },
  ];

  const popularCalcs = [
    { href: "/financas-pessoais/juros-investimentos/juros-compostos", label: "Juros Compostos" },
    { href: "/financas-pessoais/financiamentos-emprestimos/financiamento-imobiliario", label: "Financiamento Imobiliário" },
    { href: "/trabalhista-tributario/trabalhista/rescisao-trabalhista", label: "Rescisão Trabalhista" },
    { href: "/saude/corpo-metabolismo/imc", label: "Calculadora de IMC" },
    { href: "/matematica/algebra/equacao-2-grau", label: "Equação do 2º Grau" },
    { href: "/trabalhista-tributario/trabalhista/inss", label: "Calculadora de INSS" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                CL
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none block">
                  CalcuLabs
                </span>
                <span className="text-xs text-slate-400 leading-none">
                  Calculadoras Online
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              O maior portal de calculadoras online do Brasil. Mais de 5.000 calculadoras
              gratuitas para estudantes, profissionais e empresas.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Calculadoras Populares
            </h3>
            <ul className="space-y-2">
              {popularCalcs.map((calc) => (
                <li key={calc.href}>
                  <Link
                    href={calc.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {calc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Informações
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Sobre a CalcuLabs
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-400">
                <strong className="text-slate-300">Aviso:</strong> As calculadoras são para fins
                informativos. Consulte um profissional para decisões importantes.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CalcuLabs. Todos os direitos reservados.
          </p>
          <p className="text-sm text-slate-500">
            Feito com ❤️ por amantes da ciência.
          </p>
        </div>
      </div>
    </footer>
  );
}
