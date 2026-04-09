import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da CalcuLabs. Saiba como coletamos, usamos e protegemos suas informações ao utilizar nossas calculadoras online.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">
        Política de Privacidade
      </h1>
      <p className="text-sm text-slate-500 mb-10">
        Última atualização: 30 de março de 2026
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          1. Informações Gerais
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A CalcuLabs (&quot;nós&quot;, &quot;nosso&quot;) opera o site{" "}
          <strong>calculabs.com.br</strong>. Esta Política de Privacidade
          descreve como coletamos, usamos e protegemos suas informações ao utilizar
          nosso site e nossas calculadoras online.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Ao utilizar a CalcuLabs, você concorda com as práticas descritas nesta
          política. Se não concordar com algum ponto, recomendamos que não utilize
          o site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          2. Informações que Coletamos
        </h2>

        <h3 className="text-lg font-medium text-slate-900 mb-2">
          2.1 Dados fornecidos por você
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A CalcuLabs não exige cadastro para uso das calculadoras. Os valores
          inseridos nas calculadoras são processados localmente no seu navegador e
          <strong> não são enviados nem armazenados em nossos servidores</strong>.
        </p>

        <h3 className="text-lg font-medium text-slate-900 mb-2">
          2.2 Dados coletados automaticamente
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Quando você visita nosso site, podemos coletar automaticamente:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1 mb-4">
          <li>Endereço IP (anonimizado quando possível)</li>
          <li>Tipo de navegador e sistema operacional</li>
          <li>Páginas visitadas e tempo de permanência</li>
          <li>Origem do acesso (referrer)</li>
          <li>Dados de interação com as calculadoras (para melhorar o serviço)</li>
        </ul>

        <h3 className="text-lg font-medium text-slate-900 mb-2">
          2.3 Cookies e tecnologias similares
        </h3>
        <p className="text-slate-700 leading-relaxed">
          Utilizamos cookies e tecnologias similares para melhorar sua experiência,
          analisar o uso do site e exibir anúncios relevantes. Você pode gerenciar
          as preferências de cookies nas configurações do seu navegador.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          3. Como Usamos suas Informações
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          Utilizamos as informações coletadas para:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Fornecer e melhorar nossas calculadoras e funcionalidades</li>
          <li>Analisar o uso do site para otimizar a experiência do usuário</li>
          <li>Exibir anúncios relevantes através de parceiros de publicidade</li>
          <li>Detectar e prevenir fraudes e abusos</li>
          <li>Cumprir obrigações legais</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          4. Compartilhamento de Informações
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          Não vendemos suas informações pessoais. Podemos compartilhar dados com:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            <strong>Google Analytics:</strong> Para análise de acesso e uso do site
          </li>
          <li>
            <strong>Google AdSense:</strong> Para exibição de anúncios relevantes
          </li>
          <li>
            <strong>Prestadores de serviço:</strong> Que nos auxiliam na operação do
            site, sob acordos de confidencialidade
          </li>
          <li>
            <strong>Autoridades legais:</strong> Quando exigido por lei ou ordem
            judicial
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          5. Google AdSense e Publicidade
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google
          pode usar cookies para exibir anúncios com base nas suas visitas anteriores
          ao nosso site e a outros sites na internet.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Você pode desativar a publicidade personalizada acessando as{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Configurações de anúncios do Google
          </a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          6. Segurança dos Dados
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Implementamos medidas de segurança técnicas e organizacionais para
          proteger suas informações contra acesso não autorizado, alteração,
          divulgação ou destruição. No nenhum método de transmissão pela internet é
          100% seguro, e não podemos garantir segurança absoluta.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          7. Seus Direitos (LGPD)
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o
          direito de:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Confirmar a existência de tratamento de dados</li>
          <li>Acessar seus dados pessoais</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
          <li>Revogar o consentimento a qualquer momento</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mt-4">
          Para exercer esses direitos, entre em contato pelo e-mail{" "}
          <a
            href="mailto:contato@calculabs.com.br"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            contato@calculabs.com.br
          </a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          8. Alterações nesta Política
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Podemos atualizar esta Política de Privacidade periodicamente. A data da
          última atualização será sempre indicada no topo desta página.
          Recomendamos que você revise esta política regularmente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          9. Contato
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Se você tiver dúvidas sobre esta Política de Privacidade, entre em
          contato pelo e-mail{" "}
          <a
            href="mailto:contato@calculabs.com.br"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            contato@calculabs.com.br
          </a>.
        </p>
      </section>
    </div>
  );
}
