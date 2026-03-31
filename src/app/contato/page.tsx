import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a CalcuLabs. Envie sugestões, reporte erros ou tire suas dúvidas sobre nossas calculadoras online.",
  alternates: {
    canonical: "/contato",
  },
};

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Contato</h1>
      <p className="text-lg text-slate-600 mb-10">
        Estamos aqui para ajudar. Entre em contato conosco.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-2xl mb-3">📧</div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">E-mail</h2>
          <p className="text-slate-700 mb-2">
            Para dúvidas, sugestões ou parcerias:
          </p>
          <a
            href="mailto:contato@calculabs.com.br"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            contato@calculabs.com.br
          </a>
        </div>

        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-2xl mb-3">🐛</div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Reportar Erro
          </h2>
          <p className="text-slate-700 mb-2">
            Encontrou um erro em alguma calculadora?
          </p>
          <p className="text-slate-700">
            Use o botão <strong>&quot;Reportar erro&quot;</strong> que aparece no rodapé de
            cada calculadora, ou envie um e-mail detalhado para{" "}
            <a
              href="mailto:contato@calculabs.com.br"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              contato@calculabs.com.br
            </a>
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Tempo de Resposta
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Respondemos a todas as mensagens em até <strong>48 horas úteis</strong>.
          Mensagens sobre erros em calculadoras recebem prioridade e geralmente são
          respondidas em até 24 horas.
        </p>
      </section>

      <section className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          Precisa de algo específico?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-slate-900 mb-1">
              Solicitar Nova Calculadora
            </h3>
            <p className="text-sm text-slate-600">
              Tem uma ideia de calculadora que gostaria de ver na CalcuLabs? Envie
              sua sugestão por e-mail e avaliaremos a viabilidade.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 mb-1">Parcerias</h3>
            <p className="text-sm text-slate-600">
              Interessado em parcerias de conteúdo, integração ou publicidade? Entre
              em contato pelo e-mail acima.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
