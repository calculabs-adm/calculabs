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

  let title: string;
  if (calculator.meta_title) {
    title = calculator.meta_title;
    if (title.includes("CalcuLabs")) {
      const parts = title.split("|");
      const filteredParts = parts.filter(p => !p.trim().toLowerCase().includes("calculabs"));
      title = filteredParts.join(" | ").trim();
    }
    if (!title.includes("CalcuLabs")) {
      title = `${title} | CalcuLabs`;
    }
  } else {
    title = `${calculator.title} Online | CalcuLabs`;
  }

  let description: string;
  if (calculator.meta_description) {
    description = calculator.meta_description;
  } else {
    const firstKeyword = keywords[0] || calculator.title;
    description = `Use nossa ${firstKeyword}. Calcule rapidamente com a ferramenta online gratuita do CalcuLabs.`;
  }

  return { title, description };
}