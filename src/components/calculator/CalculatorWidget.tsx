"use client";

import { useState, useCallback } from "react";
import type { Variable } from "@/lib/formula-engine";

interface CalculatorWidgetProps {
  formula: string;
  variables: Variable[];
  formulaDisplay?: string;
}

interface ResultEntry {
  key: string;
  value: number | string;
}

// Client-side formula evaluator
function evaluateClientFormula(
  formula: string,
  vars: Record<string, number | string>
): { success: boolean; results: ResultEntry[]; error?: string } {
  try {
    const mathHelpers = {
      PI: Math.PI,
      E: Math.E,
      sqrt: Math.sqrt,
      pow: Math.pow,
      abs: Math.abs,
      log: Math.log10,
      ln: Math.log,
      log2: Math.log2,
      ceil: Math.ceil,
      floor: Math.floor,
      round: Math.round,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      max: Math.max,
      min: Math.min,
      calcular_ir_progressivo: (base: number) => {
        if (base <= 2259.20) return 0;
        if (base <= 2826.65) return base * 0.075 - 169.44;
        if (base <= 3751.05) return base * 0.15 - 381.44;
        if (base <= 4664.68) return base * 0.225 - 662.77;
        return base * 0.275 - 896.00;
      },
      calcular_inss: (salario: number) => {
        let inss = 0;
        if (salario <= 1412.00) inss = salario * 0.075;
        else if (salario <= 2666.68) inss = 1412.00 * 0.075 + (salario - 1412.00) * 0.09;
        else if (salario <= 4000.03) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salario - 2666.68) * 0.12;
        else if (salario <= 7786.02) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14;
        else inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
        return inss;
      },
      calcular_inss_progressivo: (salario: number) => {
        let inss = 0;
        if (salario <= 1412.00) inss = salario * 0.075;
        else if (salario <= 2666.68) inss = 1412.00 * 0.075 + (salario - 1412.00) * 0.09;
        else if (salario <= 4000.03) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salario - 2666.68) * 0.12;
        else if (salario <= 7786.02) inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14;
        else inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
        return inss;
      },
      calcular_ir: (base: number) => {
        if (base <= 2259.20) return 0;
        if (base <= 2826.65) return base * 0.075 - 169.44;
        if (base <= 3751.05) return base * 0.15 - 381.44;
        if (base <= 4664.68) return base * 0.225 - 662.77;
        return base * 0.275 - 896.00;
      },
      soma: (arr: number[]) => arr.reduce((a, b) => a + b, 0),
      calcular_tmb: (sexo: string, peso: number, altura_cm: number, idade: number) => {
        if (sexo === "masculino") return 88.362 + 13.397 * peso + 4.799 * altura_cm - 5.677 * idade;
        return 447.593 + 9.247 * peso + 3.098 * altura_cm - 4.33 * idade;
      },
      calcular_gordura: (sexo: string, altura: number, cintura: number, pescoco: number, quadril: number) => {
        if (sexo === "masculino") return 495 / (1.0324 - 0.19077 * Math.log10(cintura - pescoco) + 0.15456 * Math.log10(altura)) - 450;
        return 495 / (1.29579 - 0.35004 * Math.log10(cintura + quadril - pescoco) + 0.22100 * Math.log10(altura)) - 450;
      },
      calcular_peso_ideal: (sexo: string, altura: number) => {
        if (sexo === "masculino") return 50 + 2.3 * ((altura - 152.4) / 2.54);
        return 45.5 + 2.3 * ((altura - 152.4) / 2.54);
      },
      calcular_mdc: (numerosStr: string) => {
        const numeros = numerosStr.split(",").map((n) => Math.abs(parseInt(n.trim(), 10))).filter((n) => !isNaN(n) && n > 0);
        if (numeros.length === 0) return 0;
        if (numeros.length === 1) return numeros[0];
        
        // Algoritmo de Euclides
        const mdc2 = (a: number, b: number): number => b === 0 ? a : mdc2(b, a % b);
        
        let resultado = numeros[0];
        for (let i = 1; i < numeros.length; i++) {
          resultado = mdc2(resultado, numeros[i]);
        }
        return resultado;
      },
      calcular_mmc: (numerosStr: string) => {
        const numeros = numerosStr.split(",").map((n) => Math.abs(parseInt(n.trim(), 10))).filter((n) => !isNaN(n) && n > 0);
        if (numeros.length === 0) return 0;
        if (numeros.length === 1) return numeros[0];
        
        // MMC(a,b) = |a*b| / MDC(a,b)
        const mdc2 = (a: number, b: number): number => b === 0 ? a : mdc2(b, a % b);
        
        let resultado = numeros[0];
        for (let i = 1; i < numeros.length; i++) {
          resultado = (resultado * numeros[i]) / mdc2(resultado, numeros[i]);
        }
        return Math.round(resultado);
      },
      calcular_idade_exata: (dataNascimento: string, dataAtual?: string) => {
        const nasc = new Date(dataNascimento);
        const atual = dataAtual ? new Date(dataAtual) : new Date();
        let anos = atual.getFullYear() - nasc.getFullYear();
        let meses = atual.getMonth() - nasc.getMonth();
        let dias = atual.getDate() - nasc.getDate();
        
        if (dias < 0) {
          meses--;
          const ultimoDiaMes = new Date(atual.getFullYear(), atual.getMonth(), 0).getDate();
          dias += ultimoDiaMes;
        }
        if (meses < 0) {
          anos--;
          meses += 12;
        }
        
        return `${anos} anos, ${meses} meses e ${dias} dias`;
      },
      calcular_diferenca_datas: (dataInicial: string, dataFinal: string) => {
        const ini = new Date(dataInicial);
        const fim = new Date(dataFinal);
        const diffMs = fim.getTime() - ini.getTime();
        return diffMs / (1000 * 60 * 60 * 24);
      },
      calcular_simples_nacional: (faturamento_mes: number, rbt12: number, anexo: string) => {
        // Simplified calculation based on 2024 Simples Nacional tables
        const tables: Record<string, { aliq: number; parc: number }[]> = {
          I: [ // Comércio
            { aliq: 4.0, parc: 0 },      // até 180k
            { aliq: 7.3, parc: 5940 },   // 180k-360k
            { aliq: 10.5, parc: 17160 },  // 360k-720k
            { aliq: 14.6, parc: 45660 },  // 720k-1.8M
            { aliq: 19.0, parc: 125640 }, // 1.8M-3.6M
            { aliq: 22.0, parc: 233040 }, // 3.6M-4.8M
          ],
          II: [ // Indústria
            { aliq: 4.5, parc: 0 },       // até 180k
            { aliq: 7.8, parc: 5940 },    // 180k-360k
            { aliq: 10.5, parc: 13860 },  // 360k-720k
            { aliq: 14.7, parc: 45000 },  // 720k-1.8M
            { aliq: 19.0, parc: 120150 }, // 1.8M-3.6M
            { aliq: 22.5, parc: 226500 }, // 3.6M-4.8M
          ],
          III: [ // Serviços (locação)
            { aliq: 6.0, parc: 0 },       // até 180k
            { aliq: 8.21, parc: 3960 },  // 180k-360k
            { aliq: 10.26, parc: 11880 }, // 360k-720k
            { aliq: 14.10, parc: 37800 }, // 720k-1.8M
            { aliq: 19.14, parc: 151200 }, // 1.8M-3.6M
            { aliq: 22.0, parc: 283800 }, // 3.6M-4.8M
          ],
          IV: [ // Serviços (construção)
            { aliq: 6.0, parc: 0 },       // até 180k
            { aliq: 8.21, parc: 3960 },  // 180k-360k
            { aliq: 10.26, parc: 11880 }, // 360k-720k
            { aliq: 14.10, parc: 37800 }, // 720k-1.8M
            { aliq: 19.14, parc: 151200 }, // 1.8M-3.6M
            { aliq: 22.0, parc: 283800 }, // 3.6M-4.8M
          ],
          V: [ // Serviços (TI)
            { aliq: 6.0, parc: 0 },       // até 180k
            { aliq: 8.21, parc: 3960 },  // 180k-360k
            { aliq: 10.26, parc: 11880 }, // 360k-720k
            { aliq: 14.10, parc: 37800 }, // 720k-1.8M
            { aliq: 19.14, parc: 151200 }, // 1.8M-3.6M
            { aliq: 22.0, parc: 283800 }, // 3.6M-4.8M
          ],
        };
        
        const table = tables[anexo] || tables['I'];
        let aliq = 6.0;
        let parc = 0;
        
        if (rbt12 <= 180000) { aliq = table[0].aliq; parc = table[0].parc; }
        else if (rbt12 <= 360000) { aliq = table[1].aliq; parc = table[1].parc; }
        else if (rbt12 <= 720000) { aliq = table[2].aliq; parc = table[2].parc; }
        else if (rbt12 <= 1800000) { aliq = table[3].aliq; parc = table[3].parc; }
        else if (rbt12 <= 3600000) { aliq = table[4].aliq; parc = table[4].parc; }
        else { aliq = table[5].aliq; parc = table[5].parc; }
        
        const aliquota_efetiva = (rbt12 * aliq / 100 - parc) / rbt12 * 100;
        return faturamento_mes * aliquota_efetiva / 100;
      },
      calcular_das_mei: (tipo_atividade: string) => {
        const inss = 75.60; // 5% do salário mínimo
        let iss = 0;
        let icms = 0;
        
        if (tipo_atividade === 'servicos' || tipo_atividade === 'ambos') {
          iss = 5.00;
        }
        if (tipo_atividade === 'comercio' || tipo_atividade === 'ambos') {
          icms = 1.00;
        }
        
        return inss + iss + icms;
      },
    };

    const allVars = { ...mathHelpers, ...vars };
    const keys = Object.keys(allVars);
    const values = Object.values(allVars);

    // Process if-else statements in formula
    const ifElsePattern = /if\s*\(([^)]+)\)\s*\{([^}]+)\}\s*else\s*\{([^}]+)\}/g;
    
    // Replace if-else with ternary operator for execution
    let processedFormula = formula.replace(ifElsePattern, (match, condition, ifBlock, elseBlock) => {
      // Extract variable from if block
      const ifAssignMatch = ifBlock.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (ifAssignMatch) {
        const varName = ifAssignMatch[1];
        const ifValue = ifBlock.trim().substring(ifBlock.indexOf('=') + 1).trim();
        const elseValue = elseBlock.trim().substring(elseBlock.indexOf('=') + 1).trim();
        return `${varName} = (${condition}) ? (${ifValue}) : (${elseValue});`;
      }
      return match;
    });

    // Build function that executes formula and returns all assigned variables
    const assignments = processedFormula.split(";").filter((s) => s.trim());
    const resultVarNames: string[] = [];

    for (const line of assignments) {
      const match = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (match && !match[1].startsWith("_")) {
        resultVarNames.push(match[1]);
      }
    }

    // Declare all result variables
    const varDeclarations = resultVarNames.map((v) => `var ${v};`).join(" ");

    const returnStatements = resultVarNames
      .map((v) => `try { _r[${JSON.stringify(v)}] = ${v}; } catch(e) {}`)
      .join("\n");

    const fnBody = `
      var _r = {};
      try {
        ${varDeclarations}
        ${processedFormula}
      } catch(e) {}
      ${returnStatements}
      return _r;
    `;

    const fn = new Function(...keys, fnBody);
    const rawResults = fn(...values) as Record<string, number | string>;

    const allResults: ResultEntry[] = Object.entries(rawResults)
      .filter(([, v]) => v !== undefined && v !== null && (typeof v === "string" || !isNaN(Number(v))))
      .map(([k, v]) => ({ key: k, value: typeof v === "number" ? v : v }));

    // If there are non-zero results, filter out zeros to avoid showing irrelevant conditional results
    const hasNonZero = allResults.some((r) => (r.value as number) !== 0);
    const results = hasNonZero
      ? allResults.filter((r) => (r.value as number) !== 0)
      : allResults;

    if (results.length === 0) {
      return { success: false, results: [], error: "Não foi possível calcular" };
    }

    return { success: true, results };
  } catch (err) {
    return {
      success: false,
      results: [],
      error: err instanceof Error ? err.message : "Erro no cálculo",
    };
  }
}

function formatResultValue(key: string, value: number | string): string {
  // If value is already a string (like age result), return it directly
  if (typeof value === "string") return value;
  // Currency-related keys
  const currencyKeys = [
    "M", "montante", "parcela", "juros", "total", "valor", "saldo", "rendimento",
    "resultado", "lucro", "custo", "receita", "das", "inss", "ir", "fgts", "multa",
    "aviso", "ferias", "decimo", "comissao", "renda", "salario", "patrimonio",
    "aporte", "deposito", "amortizacao", "preco", "markup_valor",
  ];

  const percentKeys = [
    "roi", "roas", "dy", "margem", "markup", "aliquota", "gordura", "imc",
    "percentual", "taxa", "rendimento_percentual",
  ];

  const lowerKey = key.toLowerCase();

  if (percentKeys.some((k) => lowerKey.includes(k))) {
    return `${value.toFixed(2).replace(".", ",")}%`;
  }

  if (currencyKeys.some((k) => lowerKey.includes(k))) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  // Default: format with 2 decimal places
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(2).replace(".", ",");
}

function formatResultLabel(key: string): string {
  const labels: Record<string, string> = {
    M: "Montante Final",
    J: "Juros",
    juros: "Juros",
    montante: "Montante Final",
    parcela: "Valor da Parcela",
    total_pago: "Total Pago",
    total_juros: "Total em Juros",
    roi: "ROI",
    roas: "ROAS",
    dy: "Dividend Yield",
    margem_bruta: "Margem Bruta",
    margem_liquida: "Margem Líquida",
    margem_operacional: "Margem Operacional",
    ponto_equilibrio_unidades: "Ponto de Equilíbrio (unidades)",
    ponto_equilibrio_receita: "Receita Mínima",
    imc: "IMC",
    tmb: "Taxa Metabólica Basal",
    tmb_homem: "TMB (Masculino)",
    tmb_mulher: "TMB (Feminino)",
    get: "Gasto Energético Total",
    calorias_objetivo: "Calorias para seu Objetivo",
    gordura: "Percentual de Gordura Corporal",
    gordura_homem: "% Gordura Corporal",
    gordura_mulher: "% Gordura Corporal",
    peso_ideal_homem: "Peso Ideal (Masculino)",
    peso_ideal_mulher: "Peso Ideal (Feminino)",
    peso_ideal: "Peso Ideal",
    valor_convertido: "Valor Convertido",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",
    libras: "Libras (lb)",
    gramas: "Gramas (g)",
    area: "Área",
    perimetro: "Perímetro",
    diametro: "Diâmetro",
    volume: "Volume",
    area_total: "Área Total",
    area_lateral: "Área Lateral",
    area_base_altura: "Área",
    x: "Solução (x)",
    x1: "Raiz x₁",
    x2: "Raiz x₂",
    delta: "Discriminante (Δ)",
    inss: "INSS",
    ir_mensal: "IR Mensal",
    salario_liquido: "Salário Líquido",
    rendimento_bruto: "Rendimento Bruto",
    rendimento_liquido: "Rendimento Líquido",
    das: "DAS",
    das_mei: "DAS MEI",
    icms: "ICMS",
    comissao: "Comissão",
    hora_extra_50: "Hora Extra (50%)",
    hora_extra_100: "Hora Extra (100%)",
    total_horas_extras: "Total Horas Extras",
    decimo_terceiro_bruto: "13º Salário Bruto",
    decimo_terceiro_liquido: "13º Salário Líquido",
    total_ferias: "Total Férias",
    ferias_brutas: "Férias Brutas",
    adicional_tercio: "Adicional 1/3",
    patrimonio_necessario: "Patrimônio Necessário",
    aporte_mensal: "Aporte Mensal Necessário",
    media: "Média",
    mmc: "MMC",
    mdc: "MDC",
    preco_venda: "Preço de Venda",
    markup: "Markup",
    diferenca_dias: "Diferença em Dias",
    idade: "Idade Exata",
    resultado_percentual: "Resultado",
    resultado_valor: "Resultado",
    variacao_percentual: "Variação Percentual",
  };

  return labels[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function CalculatorWidget({
  formula,
  variables,
  formulaDisplay,
}: CalculatorWidgetProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const v of variables) {
      if (v.type === "select" && v.options?.[0]) {
        initial[v.id] = String(v.options[0].value);
      } else if (v.placeholder) {
        initial[v.id] = v.placeholder;
      } else {
        initial[v.id] = "";
      }
    }
    return initial;
  });

  const [results, setResults] = useState<ResultEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setCalculated(false);
  }, []);

  const handleCalculate = useCallback(() => {
    const numericVars: Record<string, number | string> = {};
    for (const v of variables) {
      const raw = values[v.id] ?? "";
      if (v.type === "number") {
        const num = parseFloat(raw.replace(",", "."));
        if (isNaN(num)) {
          setError(`Por favor, informe um valor válido para "${v.label}"`);
          return;
        }
        numericVars[v.id] = num;
      } else if (v.type === "select") {
        const numVal = parseFloat(String(raw));
        numericVars[v.id] = isNaN(numVal) ? raw : numVal;
      } else {
        numericVars[v.id] = raw;
      }
    }

    const { success, results: res, error: err } = evaluateClientFormula(formula, numericVars);

    if (success && res.length > 0) {
      setResults(res);
      setError(null);
      setCalculated(true);
    } else {
      setError(err ?? "Erro ao calcular");
      setResults(null);
    }
  }, [formula, variables, values]);

  const handleReset = useCallback(() => {
    const initial: Record<string, string> = {};
    for (const v of variables) {
      if (v.type === "select" && v.options?.[0]) {
        initial[v.id] = String(v.options[0].value);
      } else {
        initial[v.id] = "";
      }
    }
    setValues(initial);
    setResults(null);
    setError(null);
    setCalculated(false);
  }, [variables]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="!text-white font-bold text-lg">🧮 Calculadora</h2>
        {formulaDisplay && (
          <p className="text-blue-100 text-sm mt-1 font-mono">{formulaDisplay}</p>
        )}
      </div>

      <div className="p-6">
        {/* Inputs */}
        <div className="space-y-4 mb-6">
          {variables.map((variable) => (
            <div key={variable.id}>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {variable.label}
                {variable.unit && (
                  <span className="ml-1 text-slate-400 font-normal">({variable.unit})</span>
                )}
              </label>

              {variable.type === "select" ? (
                <select
                  value={values[variable.id] ?? ""}
                  onChange={(e) => handleChange(variable.id, e.target.value)}
                  className="calc-input"
                >
                  {variable.options?.map((opt) => (
                    <option key={String(opt.value)} value={String(opt.value)}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : variable.type === "date" ? (
                <input
                  type="date"
                  value={values[variable.id] ?? ""}
                  onChange={(e) => handleChange(variable.id, e.target.value)}
                  className="calc-input"
                />
              ) : variable.type === "text" ? (
                <input
                  type="text"
                  value={values[variable.id] ?? ""}
                  onChange={(e) => handleChange(variable.id, e.target.value)}
                  placeholder={variable.placeholder}
                  className="calc-input"
                />
              ) : (
                <input
                  type="number"
                  value={values[variable.id] ?? ""}
                  onChange={(e) => handleChange(variable.id, e.target.value)}
                  placeholder={variable.placeholder}
                  min={variable.min ?? undefined}
                  max={variable.max ?? undefined}
                  step="any"
                  className="calc-input"
                />
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleCalculate}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-base"
          >
            Calcular
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors"
          >
            Limpar
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-700 text-sm font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Results */}
        {calculated && results && results.length > 0 && (
          <div className="result-box animate-fade-in">
            <h3 className="font-bold text-blue-900 text-base mb-4 flex items-center gap-2">
              <span className="text-xl">✅</span> Resultado
            </h3>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div
                  key={r.key}
                  className={`flex items-center justify-between gap-4 ${
                    i === 0 ? "pb-3 border-b border-blue-200" : ""
                  }`}
                >
                  <span className={`text-sm ${i === 0 ? "font-semibold text-blue-800" : "text-blue-700"}`}>
                    {formatResultLabel(r.key)}
                  </span>
                  <span
                    className={`font-bold tabular-nums ${
                      i === 0 ? "text-2xl text-blue-900" : "text-lg text-blue-800"
                    }`}
                  >
                    {formatResultValue(r.key, r.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
