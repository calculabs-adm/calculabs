/**
 * Input sanitization utilities
 */

/**
 * Sanitize string input by removing potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 10000); // Limit length
}

/**
 * Sanitize number input with bounds checking
 */
export function sanitizeNumber(input: any, min?: number, max?: number): number | null {
  const num = Number(input);

  if (isNaN(num) || !isFinite(num)) return null;

  if (min !== undefined && num < min) return null;
  if (max !== undefined && num > max) return null;

  return num;
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(input: string): string | null {
  if (typeof input !== 'string') return null;

  const sanitized = input.trim().toLowerCase();

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) return null;

  // Additional checks
  if (sanitized.length > 254) return null; // RFC 5321 limit
  if (sanitized.includes('<') || sanitized.includes('>')) return null;

  return sanitized;
}

/**
 * Sanitize calculator variables input
 */
export function sanitizeCalculatorInput(variables: Record<string, any>): Record<string, number | string> {
  const sanitized: Record<string, number | string> = {};

  for (const [key, value] of Object.entries(variables)) {
    // Only allow alphanumeric keys
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) continue;

    if (typeof value === 'number') {
      const sanitizedNum = sanitizeNumber(value);
      if (sanitizedNum !== null) {
        sanitized[key] = sanitizedNum;
      }
    } else if (typeof value === 'string') {
      const sanitizedStr = sanitizeString(value);
      if (sanitizedStr) {
        sanitized[key] = sanitizedStr;
      }
    }
    // Ignore other types
  }

  return sanitized;
}

/**
 * Rate limiting helper (basic in-memory implementation)
 */
class RateLimiter {
  private requests = new Map<string, number[]>();

  isAllowed(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);

    if (recentRequests.length >= maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return true;
  }
}

export const rateLimiter = new RateLimiter();