import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
import { sanitizeString, rateLimiter } from "@/lib/sanitization";

/**
 * Internal tracking API endpoint
 *
 * Receives events from the client-side trackEvent function
 * and logs them for internal analytics.
 *
 * Request body:
 * {
 *   event: string,
 *   [key: string]: any,
 *   timestamp: number
 * }
 */

export async function POST(request: NextRequest) {
  let clientIP = '';

  try {
    // Rate limiting
    clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!rateLimiter.isAllowed(clientIP, 100, 60000)) { // 100 requests per minute
      logger.warn('Rate limit exceeded for tracking', { ip: clientIP });
      return NextResponse.json(
        { error: "Muitas requisições" },
        { status: 429 }
      );
    }

    const body = await request.json();

    const { event, timestamp, ...params } = body;

    // Sanitize event name
    const sanitizedEvent = sanitizeString(event || '');
    if (!sanitizedEvent) {
      logger.warn('Invalid event name in tracking', { event, ip: clientIP });
      return NextResponse.json(
        { error: "Nome do evento inválido" },
        { status: 400 }
      );
    }

    // Sanitize params (basic sanitization)
    const sanitizedParams: Record<string, any> = {};
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string') {
        sanitizedParams[key] = sanitizeString(value).slice(0, 500); // Limit param length
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitizedParams[key] = value;
      }
      // Ignore complex objects
    }

    // Log the event with structured logging
    logger.info('Tracking event received', {
      event: sanitizedEvent,
      timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
      params: sanitizedParams,
      ip: clientIP,
      userAgent: request.headers.get('user-agent')
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Failed to process tracking event', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: clientIP
    });

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
