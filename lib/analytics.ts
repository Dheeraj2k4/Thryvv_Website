// Fires a GA4 event when Analytics is loaded; safe no-op otherwise.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params ?? {});
}
