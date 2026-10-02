"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

const COOKIE_NAME = "tunja_cookie_consent";
const COOKIE_SETTINGS_EVENT = "tunja:open-cookie-settings";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type CookieChoice = {
  analytics: boolean;
  updatedAt: string;
};

function readCookieChoice(): CookieChoice | null {
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  if (!cookie) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(cookie)) as Partial<CookieChoice>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.updatedAt !== "string") {
      return null;
    }
    return { analytics: parsed.analytics, updatedAt: parsed.updatedAt };
  } catch {
    return null;
  }
}

function saveCookieChoice(analytics: boolean) {
  const value = encodeURIComponent(JSON.stringify({ analytics, updatedAt: new Date().toISOString() }));
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
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
    saveCookieChoice(analytics);
    setChoice({ analytics, updatedAt: new Date().toISOString() });
    setAnalyticsEnabled(analytics);
    setIsPreferencesOpen(false);
  }

  const showBanner = isHydrated && (!choice || isPreferencesOpen);

  return (
    <>
      {isHydrated && analyticsEnabled && (
        <Analytics beforeSend={(event) => (readCookieChoice()?.analytics ? event : null)} />
      )}

      {showBanner && (
        <aside
          aria-labelledby="cookie-consent-title"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-5 border border-foreground/20 bg-background p-5 shadow-2xl sm:p-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 id="cookie-consent-title" className="text-xl font-display text-foreground sm:text-2xl">
                {isPreferencesOpen ? "Tus preferencias de privacidad" : "Tú decides sobre las cookies"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Usamos una cookie necesaria para recordar tu elección. Solo activamos Vercel Web Analytics,
                nuestra medición anónima de visitas, si la autorizas. Rechazarla no limita el acceso al sitio.
                Consulta la{" "}
                <Link className="underline underline-offset-4 hover:text-foreground" href="/politica-de-cookies">
                  política de cookies
                </Link>
                {" "}y la{" "}
                <Link className="underline underline-offset-4 hover:text-foreground" href="/politica-de-privacidad">
                  política de privacidad
                </Link>.
              </p>

              {isPreferencesOpen && (
                <label className="mt-5 flex min-h-11 max-w-lg cursor-pointer items-start gap-3 border-t border-foreground/10 pt-4 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-5 shrink-0 accent-foreground"
                    checked={analyticsEnabled}
                    onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  />
                  <span>
                    <span className="block font-medium">Analítica opcional</span>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Permite medir visitas de forma agregada para mejorar el sitio. Puedes cambiar esta opción
                      cuando quieras.
                    </span>
                  </span>
                </label>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                className="min-h-11 border border-foreground/30 px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                onClick={() => saveChoice(false)}
              >
                Rechazar analítica
              </button>
              {isPreferencesOpen ? (
                <button
                  type="button"
                  className="min-h-11 border border-foreground/30 px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                  onClick={() => setIsPreferencesOpen(false)}
                >
                  Cerrar
                </button>
              ) : (
                <button
                  type="button"
                  className="min-h-11 border border-foreground/30 px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                  onClick={() => setIsPreferencesOpen(true)}
                >
                  Personalizar
                </button>
              )}
              <button
                type="button"
                className="min-h-11 bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
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

export function CookiePreferencesInlineLink({ className = "" }: { className?: string }) {
  return <CookiePreferencesButton className={className} />;
}

export function hasCookieAnalyticsConsent() {
  return readCookieChoice()?.analytics ?? false;
}

export { COOKIE_NAME as COOKIE_CONSENT_COOKIE_NAME };
export { COOKIE_SETTINGS_EVENT as COOKIE_CONSENT_SETTINGS_EVENT };
export { COOKIE_MAX_AGE as COOKIE_CONSENT_MAX_AGE };
export { saveCookieChoice as saveCookieConsent };
export { readCookieChoice as readCookieConsent };

export function ConsentAnalytics() {
  return <Analytics beforeSend={(event) => (hasCookieAnalyticsConsent() ? event : null)} />;
}

export function CookiePreferenceToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readCookieChoice()?.analytics ?? false);
  }, []);

  return (
    <label className="flex min-h-11 items-center gap-3 text-sm text-foreground">
      <input
        type="checkbox"
        className="size-5 shrink-0 accent-foreground"
        checked={enabled}
        onChange={(event) => setEnabled(event.target.checked)}
      />
      Analítica opcional
    </label>
  );
}

export function updateCookieConsent(analytics: boolean) {
  saveCookieChoice(analytics);
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export function CookieSettingsLink({ className = "" }: { className?: string }) {
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

export function getCookieConsentDescription() {
  return "La preferencia se guarda en una cookie propia durante un año. Las cookies de analítica permanecen desactivadas hasta que las aceptes.";
}

export function CookieConsentStatus() {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setAnalytics(readCookieChoice()?.analytics ?? false);
  }, []);

  return <span>{analytics ? "Analítica activada" : "Analítica desactivada"}</span>;
}

export function CookieConsentVersion() {
  return <span>Preferencias guardadas durante un año</span>;
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

export function CookiePreferencesCallout() {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      Puedes revisar o retirar tu consentimiento desde el botón «Configurar cookies» del pie de página.
    </p>
  );
}

export function ConsentAnalyticsClient() {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setAnalytics(readCookieChoice()?.analytics ?? false);
    const handleChange = () => setAnalytics(readCookieChoice()?.analytics ?? false);
    window.addEventListener(COOKIE_SETTINGS_EVENT, handleChange);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleChange);
  }, []);

  return analytics ? <ConsentAnalytics /> : null;
}

export function CookieNotice() {
  return <CookieConsentManager />;
}

export default CookieConsentManager;
