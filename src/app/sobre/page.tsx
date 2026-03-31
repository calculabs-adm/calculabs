import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre a CalcuLabs",
  description:
    "Conheça a CalcuLabs, o maior portal de calculadoras online gratuitas do Brasil. Nossa missão é democratizar o acesso a ferramentas de cálculo para todos.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">
        Sobre a CalcuLabs
      </h1>
      <p className="text-lg text-slate-600 mb-10">
        O maior portal de calculadoras online do Brasil
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Nossa Missão
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A CalcuLabs nasceu com o objetivo de democratizar o acesso a
          ferramentas de cálculo. Acreditamos que qualquer pessoa, independentemente
          de sua formação ou recursos, deve ter acesso a calculadoras precisas e
          fáceis de usar para tomar decisões mais inteligentes no dia a dia.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Seja para planejar um investimento, calcular materiais de construção,
          entender conceitos de física ou simplesmente resolver uma dúvida
          matemática, a CalcuLabs está aqui para ajudar.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          O Que Oferecemos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl mb-2">🔢</div>
            <h3 className="font-semibold text-slate-900 mb-1">
              5.000+ Calculadoras
            </h3>
            <p className="text-sm text-slate-600">
              Cobrindo finanças, matemática, saúde, engenharia, física e muito
              mais. Uma ferramenta para cada necessidade.
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Artigos Explicativos
            </h3>
            <p className="text-sm text-slate-600">
              Guias completos que explicam conceitos, fórmulas e aplicações
              práticas para que você entenda o cálculo, não apenas o resultado.
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl mb-2">💡</div>
            <h3 className="font-semibold text-slate-900 mb-1">
              100% Gratuito
            </h3>
            <p className="text-sm text-slate-600">
              Todas as calculadoras são gratuitas e não exigem cadastro. Use
              quantas vezes quiser, quando quiser.
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Rápido e Simples
            </h3>
            <p className="text-sm text-slate-600">
              Interface limpa e intuitiva. Resultados instantâneos sem
              complicações. Feito para funcionar em qualquer dispositivo.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Nossos Valores
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <strong className="text-slate-900">Acessibilidade:</strong>{" "}
              <span className="text-slate-700">
                Ferramentas gratuitas e acessíveis para todos, sem barreiras de
                cadastro ou pagamento.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <strong className="text-slate-900">Precisão:</strong>{" "}
              <span className="text-slate-700">
                Fórmulas validadas e testadas para garantir resultados confiáveis
                que você pode usar com segurança.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <strong className="text-slate-900">Educação:</strong>{" "}
              <span className="text-slate-700">
                Além do cálculo, explicamos o porquê. Acreditamos que entender o
                processo é tão importante quanto obter o resultado.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <div>
              <strong className="text-slate-900">Transparência:</strong>{" "}
              <span className="text-slate-700">
                Fórmulas abertas, sem caixas pretas. Você sempre sabe como o
                resultado foi calculado.
              </span>
            </div>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Para Quem é a CalcuLabs
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Nossas calculadoras são usadas por milhares de pessoas todos os dias:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Estudantes que precisam resolver exercícios e entender conceitos</li>
          <li>Profissionais que buscam agilidade em cálculos do dia a dia</li>
          <li>Empreendedores que planejam investimentos e custos</li>
          <li>Profissionais da construção civil que calculam materiais</li>
          <li>Qualquer pessoa que precise de um cálculo rápido e confiável</li>
        </ul>
      </section>

      <section className="p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          Entre em Contato
        </h2>
        <p className="text-slate-700 mb-4">
          Tem sugestões, dúvidas ou encontrou um erro? Adoraríamos ouvir você.
        </p>
        <Link
          href="/contato"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Fale Conosco
        </Link>
      </section>
    </div>
  );
}
