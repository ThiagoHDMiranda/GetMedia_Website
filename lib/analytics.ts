/**
 * trackEvent
 *
 * Send a GA4 custom event to gtag. Safe when gtag.js has not loaded yet
 * (GA4 is loaded with a lazyOnload strategy) or on the server.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}