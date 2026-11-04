declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Safe helper to push events to Google Tag Manager (GTM) dataLayer.
 * Safe for SSR/SSG environments (checks `typeof window !== "undefined"`).
 */
export function pushGTMEvent(
  event: string,
  payload: Record<string, unknown> = {}
) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...payload,
    });
  }
}

/**
 * Safe helper to track events with Meta / Facebook Pixel (fbq).
 * Safe for SSR/SSG environments (checks `typeof window !== "undefined"`).
 */
export function trackFBEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", event, params);
    } else {
      window.fbq("track", event);
    }
  }
}
