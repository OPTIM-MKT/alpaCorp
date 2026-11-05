import { GOOGLE_ADS_WHATSAPP_CONVERSION_ID } from "@/constants/analytics";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
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

/**
 * Safe helper to track conversions with Google Ads (gtag.js).
 * Safe for SSR/SSG environments (checks `typeof window !== "undefined"`).
 */
export function trackGoogleAdsConversion(
  sendTo: string = GOOGLE_ADS_WHATSAPP_CONVERSION_ID,
  params: Record<string, unknown> = {}
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      ...params,
    });
  }
}

/**
 * Helper to trigger cross-platform tracking for WhatsApp contact clicks
 * across Google Tag Manager, Meta Pixel, and Google Ads.
 */
export function trackWhatsAppClick() {
  pushGTMEvent("whatsapp_click", { action: "click" });
  trackFBEvent("Contact");
  trackGoogleAdsConversion(GOOGLE_ADS_WHATSAPP_CONVERSION_ID);
}
