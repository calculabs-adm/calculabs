import type { Calculator } from "./data";

export interface SEOMetadata {
  title: string;
  description: string;
}

export function generateCalculatorSEO(calculator: Calculator): SEOMetadata {
  let keywords: string[] = [];
  
  if (calculator.keywords) {
    try {
      keywords = JSON.parse(calculator.keywords);
    } catch {
      keywords = [];
    }
  }

  const title = calculator.meta_title 
    ? calculator.meta_title 
    : `${calculator.title} Online | CalcuLabs`;

  let description: string;
  if (calculator.meta_description) {
    description = calculator.meta_description;
  } else {
    const firstKeyword = keywords[0] || calculator.title;
    description = `Use nossa ${firstKeyword}. Calcule rapidamente com a ferramenta online gratuita do CalcuLabs.`;
  }

  return { title, description };
}