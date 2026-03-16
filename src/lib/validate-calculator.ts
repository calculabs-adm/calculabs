/**
 * Calculator Validator
 * Automatically validates calculators before deployment
 * 
 * Usage: bun run src/lib/validate-calculator.ts [slug]
 * If no slug provided, validates all calculators
 */

import fs from 'fs';
import path from 'path';

interface Calculator {
  id: number;
  name: string;
  slug: string;
  formula: string;
  formula_display?: string;
  variables: string;
  example: string;
}

interface TestResult {
  passed: boolean;
  input: Record<string, number | string>;
  expected: string;
  calculated: string;
  error?: string;
}

// Load calculator data
function loadCalculators(): Calculator[] {
  const data = fs.readFileSync('src/data/calculators.json', 'utf-8');
  return JSON.parse(data);
}

// Math helpers (same as in CalculatorWidget)
const mathHelpers: Record<string, unknown> = {
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
  calcular_peso_planetas: (peso_terra: number) => {
    const gravidade: Record<string, number> = {
      mercurio: 3.7,
      venus: 8.87,
      terra: 9.81,
      lua: 1.62,
      marte: 3.71,
      jupiter: 24.79,
      saturno: 10.44,
      urano: 8.69,
      netuno: 11.15
    };
    const gravidade_terra = 9.81;
    return {
      mercurio: peso_terra * (gravidade.mercurio / gravidade_terra),
      venus: peso_terra * (gravidade.venus / gravidade_terra),
      terra: peso_terra,
      lua: peso_terra * (gravidade.lua / gravidade_terra),
      marte: peso_terra * (gravidade.marte / gravidade_terra),
      jupiter: peso_terra * (gravidade.jupiter / gravidade_terra),
      saturno: peso_terra * (gravidade.saturno / gravidade_terra),
      urano: peso_terra * (gravidade.urano / gravidade_terra),
      netuno: peso_terra * (gravidade.netuno / gravidade_terra)
    };
  },
  calcular_mmc: (numerosStr: string) => {
    const numeros = numerosStr.split(",").map((n) => Math.abs(parseInt(n.trim(), 10))).filter((n) => !isNaN(n) && n > 0);
    if (numeros.length === 0) return 0;
    if (numeros.length === 1) return numeros[0];
    const mdc2 = (a: number, b: number): number => b === 0 ? a : mdc2(b, a % b);
    let resultado = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
      resultado = (resultado * numeros[i]) / mdc2(resultado, numeros[i]);
    }
    return Math.round(resultado);
  },
  calcular_mdc: (numerosStr: string) => {
    const numeros = numerosStr.split(",").map((n) => Math.abs(parseInt(n.trim(), 10))).filter((n) => !isNaN(n) && n > 0);
    if (numeros.length === 0) return 0;
    if (numeros.length === 1) return numeros[0];
    const mdc2 = (a: number, b: number): number => b === 0 ? a : mdc2(b, a % b);
    let resultado = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
      resultado = mdc2(resultado, numeros[i]);
    }
    return resultado;
  },
  calcular_diferenca_datas: (dataInicial: string, dataFinal: string) => {
    const ini = new Date(dataInicial);
    const fim = new Date(dataFinal);
    const diffMs = fim.getTime() - ini.getTime();
    return diffMs / (1000 * 60 * 60 * 24);
  },
  calcular_idade_exata: (dataNascimento: string) => {
    const nasc = new Date(dataNascimento);
    const atual = new Date();
    let anos = atual.getFullYear() - nasc.getFullYear();
    let meses = atual.getMonth() - nasc.getMonth();
    let dias = atual.getDate() - nasc.getDate();
    if (dias < 0) { meses--; const ultimoDiaMes = new Date(atual.getFullYear(), atual.getMonth(), 0).getDate(); dias += ultimoDiaMes; }
    if (meses < 0) { anos--; meses += 12; }
    return `${anos} anos, ${meses} meses e ${dias} dias`;
  },
  calcular_idade_gestacional: (data_ultima_menstruacao: string) => {
    const dum = new Date(data_ultima_menstruacao);
    const hoje = new Date();
    const diffTime = hoje.getTime() - dum.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(diffDays / 7);
    const diasRestantes = diffDays % 7;
    return semanas + ' semanas e ' + diasRestantes + ' dias';
  },
  calcular_data_parto: (data_ultima_menstruacao: string) => {
    const dum = new Date(data_ultima_menstruacao);
    const dataParto = new Date(dum);
    dataParto.setDate(dataParto.getDate() + 280);
    const dia = String(dataParto.getDate()).padStart(2, '0');
    const mes = String(dataParto.getMonth() + 1).padStart(2, '0');
    const ano = dataParto.getFullYear();
    return dia + '/' + mes + '/' + ano;
  },
  calcular_ovulacao: (data_ultima_menstruacao: string, duracao_ciclo?: number) => {
    const ciclo = duracao_ciclo || 28;
    const dum = new Date(data_ultima_menstruacao);
    const diaOvulacao = dum.getTime() + (ciclo - 14) * 24 * 60 * 60 * 1000;
    const dataOvulacao = new Date(diaOvulacao);
    const diaOv = String(dataOvulacao.getDate()).padStart(2, '0');
    const mesOv = String(dataOvulacao.getMonth() + 1).padStart(2, '0');
    const anoOv = dataOvulacao.getFullYear();
    return diaOv + '/' + mesOv + '/' + anoOv;
  },
  calcular_simples_nacional: (faturamento_mes: number, rbt12: number, anexo: string) => {
    const tables: Record<string, { aliq: number; parc: number }[]> = {
      I: [{ aliq: 4.0, parc: 0 }, { aliq: 7.3, parc: 5940 }, { aliq: 10.5, parc: 17160 }, { aliq: 14.6, parc: 45660 }, { aliq: 19.0, parc: 125640 }, { aliq: 22.0, parc: 233040 }],
      II: [{ aliq: 4.5, parc: 0 }, { aliq: 7.8, parc: 5940 }, { aliq: 10.5, parc: 13860 }, { aliq: 14.7, parc: 45000 }, { aliq: 19.0, parc: 120150 }, { aliq: 22.5, parc: 226500 }],
      III: [{ aliq: 6.0, parc: 0 }, { aliq: 8.21, parc: 3960 }, { aliq: 10.26, parc: 11880 }, { aliq: 14.10, parc: 37800 }, { aliq: 19.14, parc: 151200 }, { aliq: 22.0, parc: 283800 }],
    };
    const table = tables[anexo] || tables['I'];
    let aliq = 6.0, parc = 0;
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
    const inss = 75.60;
    let iss = 0, icms = 0;
    if (tipo_atividade === 'servicos' || tipo_atividade === 'ambos') iss = 5.00;
    if (tipo_atividade === 'comercio' || tipo_atividade === 'ambos') icms = 1.00;
    return inss + iss + icms;
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
};

// Execute formula
function executeFormula(formula: string, vars: Record<string, number | string>): { success: boolean; results: Record<string, unknown>; error?: string } {
  try {
    const allVars = { ...mathHelpers, ...vars };
    const keys = Object.keys(allVars);
    const values = Object.values(allVars);

    // Process if-else statements
    const ifElsePattern = /if\s*\(([^)]+)\)\s*\{([^}]+)\}\s*else\s*\{([^}]+)\}/g;
    let processedFormula = formula.replace(ifElsePattern, (match, condition, ifBlock, elseBlock) => {
      const ifAssignMatch = ifBlock.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (ifAssignMatch) {
        const varName = ifAssignMatch[1];
        const ifValue = ifBlock.trim().substring(ifBlock.indexOf('=') + 1).trim();
        const elseValue = elseBlock.trim().substring(elseBlock.indexOf('=') + 1).trim();
        return `${varName} = (${condition}) ? (${ifValue}) : (${elseValue});`;
      }
      return match;
    });

    const assignments = processedFormula.split(";").filter((s) => s.trim());
    const resultVarNames: string[] = [];

    for (const line of assignments) {
      const match = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (match && !match[1].startsWith("_")) {
        resultVarNames.push(match[1]);
      }
    }

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
      try {
        if (typeof resultado === 'object' && resultado !== null) {
          for (const [key, value] of Object.entries(resultado)) {
            _r[key] = value;
          }
        }
      } catch(e) {}
      return _r;
    `;

    const fn = new Function(...keys, fnBody);
    const rawResults = fn(...values) as Record<string, unknown>;

    // Filter out invalid results
    const results: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rawResults)) {
      if (k !== 'resultado' && v !== undefined && v !== null && (typeof v === 'string' || typeof v === 'number')) {
        results[k] = v;
      }
    }

    if (Object.keys(results).length === 0) {
      return { success: false, results: {}, error: "No results generated" };
    }

    return { success: true, results };
  } catch (err) {
    return { 
      success: false, 
      results: {}, 
      error: err instanceof Error ? err.message : "Unknown error" 
    };
  }
}

// Parse example
function parseExample(exampleStr: string): { inputs: Record<string, number | string>; expected: string } | null {
  try {
    const example = JSON.parse(exampleStr);
    return {
      inputs: example.inputs,
      expected: example.result
    };
  } catch {
    return null;
  }
}

// Parse variables
function parseVariables(variablesStr: string): Array<{id: string; default?: number; options?: Array<{value: number}>}> {
  try {
    return JSON.parse(variablesStr);
  } catch {
    return [];
  }
}

// Extract numeric value from result string
function extractNumericValue(resultStr: string): number | null {
  // Remove currency symbols, spaces, and common text
  const cleaned = resultStr
    .replace(/R\$/g, '')
    .replace(/[%,]/g, '.')  // Replace comma with period for Brazilian decimal
    .replace(/\s+/g, ' ')
    .trim();
  
  // Try to extract first number
  const match = cleaned.match(/[\d.]+/);
  if (match) {
    const num = parseFloat(match[0]);
    if (!isNaN(num)) return num;
  }
  return null;
}

// Compare results
function compareResults(calculated: unknown, expected: string): boolean {
  // If expected contains multiple results (like planet weights)
  if (typeof calculated === 'object' && calculated !== null) {
    const calcObj = calculated as Record<string, number>;
    const expectedLower = expected.toLowerCase();
    
    for (const [planet, weight] of Object.entries(calcObj)) {
      if (expectedLower.includes(planet)) {
        const expectedNum = extractNumericValue(expected);
        if (expectedNum !== null) {
          const diff = Math.abs(weight - expectedNum);
          return diff < 0.5; // Allow small floating point differences
        }
      }
    }
    
    // Check if any calculated value matches expected
    for (const [, weight] of Object.entries(calcObj)) {
      const expectedNum = extractNumericValue(expected);
      if (expectedNum !== null && Math.abs(weight - expectedNum) < 0.5) {
        return true;
      }
    }
    return false;
  }
  
  // Single numeric result
  const calcNum = typeof calculated === 'number' ? calculated : extractNumericValue(String(calculated));
  const expectedNum = extractNumericValue(expected);
  
  if (calcNum !== null && expectedNum !== null) {
    const diff = Math.abs(calcNum - expectedNum);
    // Allow 1% tolerance or minimum of 0.5
    const tolerance = Math.max(Math.abs(expectedNum) * 0.01, 0.5);
    return diff <= tolerance;
  }
  
  // String comparison (for things like age)
  return String(calculated).toLowerCase().includes(expected.toLowerCase().split(' ')[0].toLowerCase());
}

// Validate single calculator
function validateCalculator(calc: Calculator): TestResult | null {
  console.log(`\n🔍 Validating: ${calc.name} (${calc.slug})`);
  console.log(`   Formula: ${calc.formula}`);
  
  // Parse example
  const example = parseExample(calc.example);
  if (!example) {
    console.log(`   ⚠️  Warning: Could not parse example`);
    return null;
  }
  
  // Get default values for variables not in example
  const varsDef = parseVariables(calc.variables);
  const inputs: Record<string, number | string> = {};
  
  // Apply defaults
  for (const v of varsDef) {
    if (v.default !== undefined) {
      inputs[v.id] = v.default;
    } else if (v.options && v.options.length > 0) {
      inputs[v.id] = v.options[0].value;
    }
  }
  
  // Override with example inputs
  Object.assign(inputs, example.inputs);
  
  console.log(`   📥 Input:`, inputs);
  console.log(`   📤 Expected: ${example.expected}`);
  
  // Execute formula
  const result = executeFormula(calc.formula, inputs);
  
  if (!result.success) {
    console.log(`   ❌ ERROR: ${result.error}`);
    return {
      passed: false,
      input: inputs,
      expected: example.expected,
      calculated: "ERROR",
      error: result.error
    };
  }
  
  console.log(`   📊 Calculated:`, result.results);
  
  // Check if any result matches expected
  let passed = false;
  for (const [, value] of Object.entries(result.results)) {
    if (compareResults(value, example.expected)) {
      passed = true;
      break;
    }
  }
  
  if (passed) {
    console.log(`   ✅ PASS`);
  } else {
    console.log(`   ❌ FAIL - Result does not match expected`);
  }
  
  return {
    passed,
    input: inputs,
    expected: example.expected,
    calculated: JSON.stringify(result.results),
    error: passed ? undefined : "Result mismatch"
  };
}

// Main
function main() {
  const args = process.argv.slice(2);
  const targetSlug = args[0];
  
  console.log(`
╔════════════════════════════════════════════════════════════╗
║           CALCULABS CALCULATOR VALIDATOR                   ║
╚════════════════════════════════════════════════════════════╝
  `);
  
  const calculators = loadCalculators();
  
  let toTest: Calculator[];
  if (targetSlug) {
    toTest = calculators.filter(c => c.slug === targetSlug);
    if (toTest.length === 0) {
      console.error(`❌ Calculator not found: ${targetSlug}`);
      process.exit(1);
    }
  } else {
    toTest = calculators;
  }
  
  console.log(`Found ${toTest.length} calculator(s) to validate\n`);
  
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  
  for (const calc of toTest) {
    const result = validateCalculator(calc);
    
    if (result === null) {
      skipped++;
    } else if (result.passed) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                      TEST SUMMARY                          ║
╚════════════════════════════════════════════════════════════╝
  ✅ Passed:  ${passed}
  ❌ Failed:  ${failed}
  ⚠️  Skipped: ${skipped}
  📊 Total:   ${passed + failed + skipped}
`);
  
  if (failed > 0) {
    console.log(`\n⚠️  Some calculators failed validation!`);
    process.exit(1);
  } else {
    console.log(`\n✅ All calculators passed validation!`);
    process.exit(0);
  }
}

main();
