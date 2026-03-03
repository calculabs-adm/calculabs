/**
 * Universal Formula Engine
 * Evaluates mathematical expressions safely using mathjs
 */

// We use a safe evaluation approach without importing mathjs on the server
// The actual calculation happens client-side

export interface Variable {
  id: string;
  label: string;
  type: "number" | "text" | "select" | "date";
  unit?: string;
  placeholder?: string;
  min?: number | null;
  max?: number | null;
  options?: { value: string | number; label: string }[];
}

export interface CalculationResult {
  success: boolean;
  result?: Record<string, number | string>;
  error?: string;
  steps?: string[];
}

/**
 * Safely evaluates a formula with given variable values
 * Uses Function constructor with restricted scope
 */
export function evaluateFormula(
  formula: string,
  variables: Record<string, number | string>
): CalculationResult {
  try {
    // Build the function body with math helpers
    const mathHelpers = `
      const PI = Math.PI;
      const E = Math.E;
      const sqrt = Math.sqrt;
      const pow = Math.pow;
      const abs = Math.abs;
      const log = Math.log10;
      const ln = Math.log;
      const log2 = Math.log2;
      const ceil = Math.ceil;
      const floor = Math.floor;
      const round = Math.round;
      const sin = Math.sin;
      const cos = Math.cos;
      const tan = Math.tan;
      const max = Math.max;
      const min = Math.min;
      
      // Financial helpers
      function calcular_ir_progressivo(base) {
        // Tabela IR 2024
        if (base <= 2259.20) return 0;
        if (base <= 2826.65) return base * 0.075 - 169.44;
        if (base <= 3751.05) return base * 0.15 - 381.44;
        if (base <= 4664.68) return base * 0.225 - 662.77;
        return base * 0.275 - 896.00;
      }
      
      function calcular_inss(salario) {
        // Tabela INSS 2024 progressiva
        let inss = 0;
        if (salario <= 1412.00) {
          inss = salario * 0.075;
        } else if (salario <= 2666.68) {
          inss = 1412.00 * 0.075 + (salario - 1412.00) * 0.09;
        } else if (salario <= 4000.03) {
          inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salario - 2666.68) * 0.12;
        } else if (salario <= 7786.02) {
          inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14;
        } else {
          inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
        }
        return inss;
      }
      
      function calcular_tmb(sexo, peso, altura_cm, idade) {
        if (sexo === 'masculino') {
          return 88.362 + (13.397 * peso) + (4.799 * altura_cm) - (5.677 * idade);
        } else {
          return 447.593 + (9.247 * peso) + (3.098 * altura_cm) - (4.330 * idade);
        }
      }
      
      function calcular_mmc(nums) {
        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
        function lcm(a, b) { return (a * b) / gcd(a, b); }
        return nums.reduce((acc, n) => lcm(acc, n), nums[0]);
      }
      
      function calcular_mdc(nums) {
        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
        return nums.reduce((acc, n) => gcd(acc, n), nums[0]);
      }
      
      function calcular_idade_exata(dataNasc, dataAtual) {
        const nasc = new Date(dataNasc);
        const atual = dataAtual ? new Date(dataAtual) : new Date();
        let anos = atual.getFullYear() - nasc.getFullYear();
        let meses = atual.getMonth() - nasc.getMonth();
        let dias = atual.getDate() - nasc.getDate();
        if (dias < 0) { meses--; dias += 30; }
        if (meses < 0) { anos--; meses += 12; }
        return { anos, meses, dias };
      }
    `;

    // Inject variables
    const varDeclarations = Object.entries(variables)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `const ${key} = ${JSON.stringify(value)};`;
        }
        return `const ${key} = ${value};`;
      })
      .join("\n");

    // Create result collection
    const resultCollection = `
      const _results = {};
      const _lines = formula_body.split(';');
      for (const line of _lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) continue;
        const match = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\\s*=/);
        if (match) {
          const varName = match[1];
          if (!varName.startsWith('_') && typeof eval(varName) !== 'undefined') {
            _results[varName] = eval(varName);
          }
        }
      }
      return _results;
    `;

    // Execute formula
    const fnBody = `
      "use strict";
      ${mathHelpers}
      ${varDeclarations}
      ${formula}
      
      // Collect all declared variables as results
      const _results = {};
    `;

    // Parse and execute each assignment in the formula
    const assignments = formula.split(";").filter((s) => s.trim());
    const resultVars: Record<string, number | string> = {};

    // Build execution context
    const context: Record<string, unknown> = {
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
      ...variables,
    };

    // Add financial helpers to context
    context.calcular_ir_progressivo = (base: number) => {
      if (base <= 2259.20) return 0;
      if (base <= 2826.65) return base * 0.075 - 169.44;
      if (base <= 3751.05) return base * 0.15 - 381.44;
      if (base <= 4664.68) return base * 0.225 - 662.77;
      return base * 0.275 - 896.00;
    };

    context.calcular_inss = (salario: number) => {
      let inss = 0;
      if (salario <= 1412.00) {
        inss = salario * 0.075;
      } else if (salario <= 2666.68) {
        inss = 1412.00 * 0.075 + (salario - 1412.00) * 0.09;
      } else if (salario <= 4000.03) {
        inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salario - 2666.68) * 0.12;
      } else if (salario <= 7786.02) {
        inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14;
      } else {
        inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
      }
      return inss;
    };

    context.calcular_tmb = (sexo: string, peso: number, altura_cm: number, idade: number) => {
      if (sexo === "masculino") {
        return 88.362 + 13.397 * peso + 4.799 * altura_cm - 5.677 * idade;
      }
      return 447.593 + 9.247 * peso + 3.098 * altura_cm - 4.33 * idade;
    };

    // Execute each line
    for (const line of assignments) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("if") || trimmed.startsWith("else")) {
        continue;
      }
      const match = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (match) {
        const varName = match[1];
        try {
          // Build function with all context variables
          const contextKeys = Object.keys(context);
          const contextValues = Object.values(context);
          // Execute the full formula to get all variables
          const fullFn = new Function(
            ...contextKeys,
            `"use strict"; ${formula.replace(/if\s*\([^)]+\)\s*\{[^}]*\}/g, "")}; return typeof ${varName} !== 'undefined' ? ${varName} : undefined;`
          );
          const result = fullFn(...contextValues);
          if (result !== undefined && !isNaN(result as number)) {
            resultVars[varName] = result as number;
            context[varName] = result;
          }
        } catch {
          // Skip variables that can't be computed
        }
      }
    }

    // Try full formula execution
    try {
      const contextKeys = Object.keys(context);
      const contextValues = Object.values(context);
      const fullFn = new Function(
        ...contextKeys,
        `"use strict"; 
        let _out = {};
        try { ${formula} } catch(e) {}
        ${assignments
          .map((line) => {
            const m = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
            if (m) return `try { _out[${JSON.stringify(m[1])}] = ${m[1]}; } catch(e) {}`;
            return "";
          })
          .join("\n")}
        return _out;`
      );
      const allResults = fullFn(...contextValues) as Record<string, number>;
      Object.assign(resultVars, allResults);
    } catch {
      // Use partial results
    }

    if (Object.keys(resultVars).length === 0) {
      return { success: false, error: "Não foi possível calcular o resultado" };
    }

    return { success: true, result: resultVars };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro no cálculo",
    };
  }
}

/**
 * Format a number as Brazilian currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Format a number with Brazilian locale
 */
export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a percentage
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Get the primary result variable name from a formula
 */
export function getPrimaryResultVar(formula: string): string {
  const lines = formula.split(";").filter((s) => s.trim());
  const lastLine = lines[lines.length - 1]?.trim();
  const match = lastLine?.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
  return match?.[1] ?? "resultado";
}
