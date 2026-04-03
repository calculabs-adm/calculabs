import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso da CalcuLabs. Conheça as regras e condições para utilização das nossas calculadoras online gratuitas.",
  alternates: {
    canonical: "/termos",
  },
};

export default function TermosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Termos de Uso</h1>
      <p className="text-sm text-slate-500 mb-10">
        Última atualização: 30 de março de 2026
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          1. Aceitação dos Termos
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ao acessar e utilizar o site <strong>www.calculabs.com.br</strong> e suas
          calculadoras online, você concorda com estes Termos de Uso. Se você não
          concordar com algum destes termos, não utilize o site.
        </p>
        <p className="text-slate-700 leading-relaxed">
          A CalcuLabs reserva-se o direito de alterar estes Termos de Uso a
          qualquer momento. As alterações entram em vigor imediatamente após a
          publicação nesta página.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          2. Descrição do Serviço
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A CalcuLabs é um portal de calculadoras online gratuitas que oferece
          ferramentas de cálculo em diversas áreas, incluindo finanças, matemática,
          saúde, engenharia, física e utilitários diversos.
        </p>
        <p className="text-slate-700 leading-relaxed">
          O serviço é fornecido &quot;como está&quot; e pode ser modificado, suspenso ou
          descontinuado a qualquer momento, sem aviso prévio.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          3. Uso Permitido
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          Você pode utilizar a CalcuLabs para:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1 mb-4">
          <li>Realizar cálculos pessoais, acadêmicos ou profissionais</li>
          <li>Consultar artigos e guias explicativos</li>
          <li>Compartilhar links do site com outras pessoas</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-3">
          Você <strong>não</strong> pode:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Utilizar o site para fins ilegais ou não autorizados</li>
          <li>
            Reproduzir, copiar ou redistribuir o conteúdo do site sem autorização
          </li>
          <li>
            Tentar acessar áreas restritas do site ou de nossos servidores
          </li>
          <li>
            Utilizar robôs, crawlers ou outros meios automatizados para acessar o
            site de forma excessiva
          </li>
          <li>
            Interferir no funcionamento normal do site ou sobrecarregar nossa
            infraestrutura
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          4. Precisão dos Cálculos
        </h2>
        <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 mb-4">
          <p className="text-slate-700 leading-relaxed">
            <strong className="text-amber-800">Aviso importante:</strong> As
            calculadoras da CalcuLabs são ferramentas de caráter{" "}
            <strong>informativo e educacional</strong>. Os resultados são gerados
            com base em fórmulas matemáticas e dados fornecidos pelo usuário, mas{" "}
            <strong>não substituem</strong> a orientação de profissionais
            qualificados.
          </p>
        </div>
        <p className="text-slate-700 leading-relaxed mb-3">
          Especialmente nas áreas de:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            <strong>Finanças:</strong> Consulte um contador, advogado ou
            planejador financeiro para decisões que envolvam dinheiro
          </li>
          <li>
            <strong>Saúde:</strong> Consulte um médico ou nutricionista antes de
            tomar decisões baseadas em nossas calculadoras de saúde
          </li>
          <li>
            <strong>Engenharia:</strong> Consulte um engenheiro para projetos que
            exijam cálculos estruturais precisos
          </li>
          <li>
            <strong>Trabalhista:</strong> Consulte um advogado trabalhista para
            questões jurídicas
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          5. Propriedade Intelectual
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Todo o conteúdo do site CalcuLabs, incluindo textos, gráficos, logos,
          ícones, imagens, códigos e a compilação de todo o conteúdo, é de
          propriedade da CalcuLabs ou de seus licenciadores e está protegido pelas
          leis de direitos autorais brasileiras e internacionais.
        </p>
        <p className="text-slate-700 leading-relaxed">
          As fórmulas matemáticas e científicas utilizadas nas calculadoras são de
          domínio público, porém a implementação, interface e conteúdo editorial
          são de propriedade da CalcuLabs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          6. Limitação de Responsabilidade
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A CalcuLabs não se responsabiliza por:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Decisões tomadas com base nos resultados de nossas calculadoras
          </li>
          <li>
            Danos diretos, indiretos, incidentais ou consequentes decorrentes do
            uso do site
          </li>
          <li>
            Interrupções, erros ou falhas no funcionamento do site
          </li>
          <li>
            Perda de dados ou lucros cessantes
          </li>
          <li>
            Ações de terceiros, incluindo anunciantes e parceiros
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          7. Publicidade
        </h2>
        <p className="text-slate-700 leading-relaxed">
          O site CalcuLabs pode exibir anúncios de terceiros, incluindo através do
          Google AdSense. Esses anunciantes podem coletar informações sobre suas
          visitas ao nosso site e a outros sites para oferecer anúncios relevantes.
          A CalcuLabs não controla as práticas de coleta de dados desses
          anunciantes. Consulte nossa{" "}
          <Link
            href="/privacidade"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Política de Privacidade
          </Link>{" "}
          para mais informações.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          8. Links Externos
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Nosso site pode conter links para sites de terceiros. Não somos
          responsáveis pelo conteúdo, políticas de privacidade ou práticas desses
          sites externos. Recomendamos que você leia os termos e políticas de
          privacidade de qualquer site que visite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          9. Lei Aplicável e Foro
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Estes Termos de Uso são regidos pelas leis da República Federativa do
          Brasil. Qualquer disputa será resolvida no foro da comarca do domicílio
          do usuário, conforme o Código de Defesa do Consumidor (Lei nº 8.078/90).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          10. Contato
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Se você tiver dúvidas sobre estes Termos de Uso, entre em contato pelo
          e-mail{" "}
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
