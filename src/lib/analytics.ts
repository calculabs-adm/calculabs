/**
 * Analytics module for tracking events to Google Tag Manager and internal API
 * 
 * This module provides a centralized way to send events to both:
 * - Google Tag Manager's dataLayer
 * - Internal /api/tracking endpoint
 * 
 * All tracking functions check for user consent before sending data.
 */

import { hasConsent } from "@/components/consent/CookieConsent";

/**
 * Send an event to Google Tag Manager's dataLayer
 * 
 * @param event - The event name to track
 * @param parameters - Additional parameters to include with the event
 */
export function track(event: string, parameters: Record<string, any> = {}): void {
  // Skip execution during SSR (Server-Side Rendering)
  if (typeof window === "undefined") return;

  // Block tracking without consent
  if (!hasConsent()) return;

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
 * Both are blocked if user has not consented to cookies.
 * 
 * @param event - The event name to track
 * @param params - Additional parameters to include with the event
 */
export function trackEvent(event: string, params: Record<string, any> = {}): void {
  // Skip execution during SSR
  if (typeof window === "undefined") return;

  // Block all tracking without consent
  if (!hasConsent()) return;

  // 1. Send to GTM
  track(event, params);

  // 2. Send to internal API endpoint (non-blocking)
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
