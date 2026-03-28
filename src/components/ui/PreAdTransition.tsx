function getPreAdText(categorySlug: string): string {
  switch (categorySlug) {
    case "financas-pessoais":
      return "Agora que você já entendeu o cálculo, vale a pena explorar opções reais para aplicar esse conhecimento na prática.";

    case "trabalhista-tributario":
      return "Com esse cálculo em mãos, você pode verificar soluções e serviços que ajudam a garantir seus direitos.";

    case "matematica":
      return "Com esse conceito dominado, você pode explorar outras ferramentas que facilitam cálculos no dia a dia.";

    case "saude":
      return "Com esse resultado, você pode buscar orientações e ferramentas para melhorar sua saúde.";

    default:
      return "Agora que você já entendeu o cálculo, vale a pena explorar soluções relacionadas.";
  }
}

export default function PreAdTransition({ categorySlug }: { categorySlug: string }) {
  return (
    <div className="pre-ad-transition">
      <p>{getPreAdText(categorySlug)}</p>
    </div>
  );
}
