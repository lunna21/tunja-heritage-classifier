"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

const COOKIE_NAME = "tunja_cookie_consent";
const COOKIE_SETTINGS_EVENT = "tunja:open-cookie-settings";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
const CONSENT_VERSION = 2;

type CookieChoice = {
  analytics: boolean;
  updatedAt: string;
  version: number;
};

function readCookieChoice(): CookieChoice | null {
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  if (!cookie) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(cookie)) as Partial<CookieChoice>;
    if (
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }
    return {
      analytics: parsed.analytics,
      updatedAt: parsed.updatedAt,
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

function saveCookieChoice(analytics: boolean): CookieChoice {
  const choice: CookieChoice = {
    analytics,
    updatedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = encodeURIComponent(JSON.stringify(choice));

  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  return choice;
}

export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
    >
      Configurar cookies
    </button>
  );
}

export function CookieConsentManager() {
  const [choice, setChoice] = useState<CookieChoice | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const storedChoice = readCookieChoice();
    setChoice(storedChoice);
    setAnalyticsEnabled(storedChoice?.analytics ?? false);
    setIsHydrated(true);

    const openPreferences = () => {
      const currentChoice = readCookieChoice();
      setAnalyticsEnabled(currentChoice?.analytics ?? false);
      setIsPreferencesOpen(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, openPreferences);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openPreferences);
  }, []);

  function saveChoice(analytics: boolean) {
    const savedChoice = saveCookieChoice(analytics);
    setChoice(savedChoice);
    setAnalyticsEnabled(analytics);
    setIsPreferencesOpen(false);
  }

  const showBanner = isHydrated && (!choice || isPreferencesOpen);

  return (
    <>
      {isHydrated && choice?.analytics && (
        <Analytics beforeSend={(event) => (readCookieChoice()?.analytics ? event : null)} />
      )}

      {showBanner && (
        <aside
          aria-labelledby="cookie-consent-title"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[80] max-h-[85dvh] overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-5 border border-foreground/25 bg-background p-5 shadow-2xl sm:p-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 id="cookie-consent-title" className="text-xl font-display text-foreground sm:text-2xl">
                {isPreferencesOpen ? "Tus preferencias de privacidad" : "Tú decides sobre las cookies"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                Usamos una cookie propia para recordar tu elección. La analítica opcional de visitas permanece desactivada hasta que la aceptes. Rechazarla no limita el acceso al sitio. Consulta la{" "}
                <Link className="font-medium text-foreground underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" href="/politica-de-cookies">
                  política de cookies
                </Link>
                {" "}y la{" "}
                <Link className="font-medium text-foreground underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" href="/politica-de-privacidad">
                  política de privacidad
                </Link>.
              </p>

              <div id="cookie-analytics-preference" hidden={!isPreferencesOpen}>
                <label className="mt-5 flex min-h-11 max-w-lg cursor-pointer items-start gap-3 border-t border-border pt-4 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-5 shrink-0 accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    checked={analyticsEnabled}
                    onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  />
                  <span>
                    <span className="block font-medium">Analítica opcional</span>
                    <span className="mt-1 block leading-relaxed text-foreground/75">
                      Permite medir visitas para mejorar el sitio. Puedes cambiar esta opción cuando quieras.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                className="min-h-11 border border-foreground/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                onClick={() => saveChoice(false)}
              >
                Rechazar analítica
              </button>
              <button
                type="button"
                aria-expanded={isPreferencesOpen}
                aria-controls="cookie-analytics-preference"
                className="min-h-11 border border-foreground/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                onClick={() => setIsPreferencesOpen((open) => !open)}
              >
                {isPreferencesOpen ? "Ocultar opciones" : "Personalizar"}
              </button>
              <button
                type="button"
                className="min-h-11 bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                onClick={() => saveChoice(isPreferencesOpen ? analyticsEnabled : true)}
              >
                {isPreferencesOpen ? "Guardar preferencias" : "Aceptar analítica"}
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export function CookiePolicyLink() {
  return (
    <Link className="underline underline-offset-4 hover:text-foreground" href="/politica-de-cookies">
      Política de cookies
    </Link>
  );
}

export function PrivacyPolicyLink() {
  return (
    <Link className="underline underline-offset-4 hover:text-foreground" href="/politica-de-privacidad">
      Política de privacidad
    </Link>
  );
}

export { COOKIE_NAME as COOKIE_CONSENT_COOKIE_NAME };
export { COOKIE_SETTINGS_EVENT as COOKIE_CONSENT_SETTINGS_EVENT };
export { COOKIE_MAX_AGE as COOKIE_CONSENT_MAX_AGE };
export { saveCookieChoice as saveCookieConsent };
export { readCookieChoice as readCookieConsent };

export default CookieConsentManager;
