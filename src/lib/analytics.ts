/**
 * Analytics module for tracking events to Google Tag Manager
 * 
 * This module provides a centralized way to send events to the dataLayer
 * for Google Tag Manager integration.
 * 
 * Usage:
 * import { track } from "@/lib/analytics";
 * 
 * track("calculadora_visualizada", {
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
