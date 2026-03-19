/**
 * Analytics module for tracking events to Google Tag Manager and internal API
 * 
 * This module provides a centralized way to send events to both:
 * - Google Tag Manager's dataLayer
 * - Internal /api/tracking endpoint
 * 
 * Usage:
 * import { track, trackEvent } from "@/lib/analytics";
 * 
 * // GTM only (legacy)
 * track("calculadora_visualizada", {
 *   calculadora_nome: "simulacao-aposentadoria",
 *   calculadora_categoria: "financas-pessoais"
 * });
 * 
 * // Dual tracking - GTM + API (recommended)
 * trackEvent("calculadora_visualizada", {
 *   calculadora_nome: "simulacao-aposentadoria",
 *   calculadora_categoria: "financas-pessoais"
 * });
 */

/**
 * Send an event to Google Tag Manager's dataLayer
 * 
 * @param event - The event name to track
 * @param parameters - Additional parameters to include with the event
 */
export function track(event: string, parameters: Record<string, any> = {}): void {
  // Skip execution during SSR (Server-Side Rendering)
  if (typeof window === "undefined") return;

  // Get or initialize dataLayer
  const dataLayer = (window as any).dataLayer || [];
  
  // Push the event to the dataLayer
  dataLayer.push({
    event,
    ...parameters,
  });
  
  // Update the dataLayer reference
  (window as any).dataLayer = dataLayer;
}

/**
 * Send an event to both Google Tag Manager AND internal API endpoint
 * 
 * This function provides dual tracking:
 * 1. Sends to GTM dataLayer (for Google Analytics/Tag Manager)
 * 2. Sends to /api/tracking endpoint (for internal analytics)
 * 
 * @param event - The event name to track
 * @param params - Additional parameters to include with the event
 */
export function trackEvent(event: string, params: Record<string, any> = {}): void {
  // Skip execution during SSR
  if (typeof window === "undefined") return;

  // 1. Always send to GTM (existing behavior)
  track(event, params);

  // 2. Also send to internal API endpoint (non-blocking)
  sendToInternalAPI(event, params);
}

/**
 * Send event to internal tracking API
 * 
 * @param event - The event name
 * @param params - Event parameters
 */
async function sendToInternalAPI(event: string, params: Record<string, any>): Promise<void> {
  try {
    await fetch('/api/tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        ...params,
        timestamp: Date.now(),
      }),
    });
  } catch (error) {
    // Silently fail - don't block execution if API fails
    console.debug('Tracking API error:', error);
  }
}
