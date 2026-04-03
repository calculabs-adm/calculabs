import { evaluateFormula } from '@/lib/formula-engine';

describe('Formula Engine', () => {
  describe('evaluateFormula', () => {
    it('should handle multiple outputs with assignments', () => {
      const result = evaluateFormula('J = C * (i/100) * t; M = C + J', { C: 1000, i: 10, t: 1 });
      console.log('DEBUG result:', result);
      expect(result.success).toBe(true);
      expect(result.result).toEqual({
        J: 100,
        M: 1100
      });
    });

    it('should calculate compound interest formula with assignment', () => {
      const result = evaluateFormula('resultado = C * pow(1 + i/100, t)', { C: 1000, i: 5, t: 2 });
      expect(result.success).toBe(true);
      expect(result.result?.resultado).toBeCloseTo(1102.5, 1);
    });

    it('should handle single assignment', () => {
      const result = evaluateFormula('total = a + b + c', { a: 5, b: 3, c: 2 });
      expect(result.success).toBe(true);
      expect(result.result).toEqual({ total: 10 });
    });

    it('should handle mathematical functions with assignment', () => {
      const result = evaluateFormula('resultado = pow(2, 3) + sqrt(16)', {});
      expect(result.success).toBe(true);
      expect(result.result).toEqual({ resultado: 12 });
    });

    it('should handle errors gracefully', () => {
      const result = evaluateFormula('resultado = invalid_function(x)', { x: 5 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Não foi possível calcular');
    });

    it('should handle division by zero', () => {
      const result = evaluateFormula('resultado = 10 / 0', {});
      expect(result.success).toBe(false);
      expect(result.error).toContain('Não foi possível calcular');
    });

    it('should handle empty formula', () => {
      const result = evaluateFormula('', {});
      expect(result.success).toBe(false);
      expect(result.error).toContain('Não foi possível calcular');
    });
  });
});