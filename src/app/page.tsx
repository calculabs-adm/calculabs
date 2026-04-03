import Link from "next/link";
import { getCategoriesWithCount, getLatestCalculators, getPublishedArticleSlugs, getArticleBySlug, type Article } from "@/lib/data";
import LatestCalculatorsCarousel from "@/components/home/LatestCalculatorsCarousel";
import LatestArticlesCarousel from "@/components/home/LatestArticlesCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CalcuLabs | Calculadoras Online Gratuitas",
  description:
    "Mais de 5.000 calculadoras online gratuitas organizadas por categorias. Matemática, Finanças, Saúde, Engenharia, Trabalhista e muito mais. Rápido, simples e didático.",
  alternates: {
    canonical: "/",
  },
};

const featuredCalculators = [
  {
    name: "Juros Compostos",
    href: "/financas-pessoais/juros-investimentos/juros-compostos",
    icon: "📈",
    desc: "Calcule o rendimento de investimentos",
  },
  {
    name: "IMC",
    href: "/saude/corpo-metabolismo/imc",
    icon: "⚖️",
    desc: "Índice de Massa Corporal",
  },
  {
    name: "Rescisão Trabalhista",
    href: "/trabalhista-tributario/trabalhista/rescisao-trabalhista",
    icon: "📋",
    desc: "Calcule verbas rescisórias",
  },
  {
    name: "Financiamento Imobiliário",
    href: "/financas-pessoais/financiamentos-emprestimos/financiamento-imobiliario",
    icon: "🏠",
    desc: "Simule parcelas do financiamento",
  },
  {
    name: "Bhaskara",
    href: "/matematica/algebra/equacao-2-grau",
    icon: "📐",
    desc: "Equação do 2º grau passo a passo",
  },
  {
    name: "INSS",
    href: "/trabalhista-tributario/trabalhista/inss",
    icon: "🏛️",
    desc: "Tabela progressiva 2024",
  },
];

export default async function HomePage() {
  const categories = await getCategoriesWithCount();
  const latestCalculators = getLatestCalculators(8);

  const allArticles = getPublishedArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<Article> => a !== null);
  const highPriority = allArticles.filter((a) => a.priority === "high");
  const latestArticles = [
    ...highPriority,
    ...allArticles.filter((a) => a.priority !== "high"),
  ].slice(0, 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CalcuLabs",
    url: "https://calculabs.com.br",
    description: "CalcuLabs com mais de 5.000 calculadoras online gratuitas",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://calculabs.com.br/busca?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Mais de 50 calculadoras disponíveis</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              CalcuLabs
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Calculadoras online gratuitas para estudantes, profissionais e empresas.
              Simples, rápidas e didáticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="#categorias"
                className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg"
              >
                Ver Calculadoras
              </Link>
              <Link
                href="/financas-pessoais/juros-investimentos/juros-compostos"
                className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-lg"
              >
                Calculadora Popular →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Calculadoras" },
              { value: "5", label: "Categorias" },
              { value: "100%", label: "Gratuito" },
              { value: "Rápido", label: "Resultado imediato" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest calculators carousel */}
      {latestCalculators.length > 0 && (
        <LatestCalculatorsCarousel calculators={latestCalculators} />
      )}

      {/* Featured calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">⭐ Calculadoras Populares</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredCalculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="calc-card text-center group"
            >
              <div className="text-3xl mb-2">{calc.icon}</div>
              <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                {calc.name}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-tight">{calc.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Explore por Categoria
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Encontre a calculadora certa para cada situação. Organizadas por área de conhecimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        color: cat.color ?? "#2563eb",
                      }}
                    >
                      {cat.calculatorCount} calculadora{cat.calculatorCount !== 1 ? "s" : ""}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
                      Ver todas →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Como Funciona</h2>
            <p className="text-slate-600 text-lg">Simples, rápido e didático</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "🔍",
                title: "Escolha a Calculadora",
                desc: "Navegue pelas categorias ou use a busca para encontrar a calculadora que precisa.",
              },
              {
                step: "2",
                icon: "✏️",
                title: "Insira os Dados",
                desc: "Preencha os campos com seus valores. Cada campo tem descrição clara e exemplos.",
              },
              {
                step: "3",
                icon: "✅",
                title: "Obtenha o Resultado",
                desc: "Veja o resultado instantaneamente com explicação detalhada e fórmula utilizada.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            O Portal de Calculadoras Online Mais Completo do Brasil
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            O <strong>CalcuLabs</strong> é a plataforma mais completa de calculadoras online
            gratuitas do Brasil. Reunimos em um único lugar calculadoras para todas as necessidades:
            desde operações matemáticas básicas até cálculos financeiros complexos, passando por
            saúde, engenharia, direito trabalhista e muito mais.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Cada calculadora foi desenvolvida com foco na <strong>didática e precisão</strong>.
            Além do resultado, você encontra a fórmula utilizada, explicação passo a passo,
            exemplos práticos e respostas para as dúvidas mais frequentes.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Nossa plataforma é utilizada por estudantes do ensino fundamental ao universitário,
            profissionais de diversas áreas, contadores, engenheiros, médicos e qualquer pessoa
            que precise de cálculos precisos e confiáveis no dia a dia.
          </p>
        </div>
      </section>

      {/* Knowledge Hub Carousel */}
      {latestArticles.length > 0 && (
        <LatestArticlesCarousel articles={latestArticles} />
      )}
    </>
  );
}
