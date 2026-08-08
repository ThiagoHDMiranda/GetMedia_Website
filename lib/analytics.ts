/**
 * trackEvent
 *
 * Send a GA4 custom event to gtag. Safe when gtag.js has not loaded yet
 * (the `@next/third-parties` snippet loads after hydration) or on the server.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}