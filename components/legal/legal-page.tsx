import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: { label: string; href: string }[];
};

type LegalPageProps = {
  title: string;
  summary: string;
  updatedAt: string;
  sections: LegalSection[];
};

const legalDocuments = [
  { label: "Privacidad", href: "/politica-de-privacidad" },
  { label: "Cookies", href: "/politica-de-cookies" },
  { label: "Términos", href: "/terminos-y-condiciones" },
];

export function LegalPage({ title, summary, updatedAt, sections }: LegalPageProps) {
  return (
    <>
      <a
        href="#legal-content"
        className="sr-only fixed left-4 top-4 z-[100] border border-foreground bg-background px-4 py-3 text-sm font-medium text-foreground focus:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        Saltar al contenido
      </a>

      <header className="border-b border-border">
        <nav
          aria-label="Navegación de documentos legales"
          className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          <Link
            href="/"
            className="min-h-11 inline-flex items-center text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Patrimonio Cultural de Tunja
          </Link>
          <span className="text-right text-xs text-muted-foreground sm:text-sm">Información legal</span>
        </nav>
      </header>

      <main id="legal-content" tabIndex={-1} className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <article>
          <header className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Patrimonio Cultural de Tunja</p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">{summary}</p>
            <p className="mt-5 text-sm text-muted-foreground">
              Última actualización: <time dateTime="2026-10-02">{updatedAt}</time>
            </p>
          </header>

          <aside role="note" className="mt-10 border border-foreground/20 bg-card p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground">Dato pendiente antes de publicar</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/80">
              La identidad legal y el canal de contacto del responsable no aparecen en el sitio. Quien lo administra debe añadir su nombre o razón social, domicilio y correo de contacto, y revisar este texto para confirmar que describe sus prácticas reales. Este aviso es un borrador informativo, no asesoría legal.
            </p>
          </aside>

          <nav aria-label="Contenido de esta página" className="mt-10 border-y border-border py-6">
            <h2 className="text-sm font-semibold text-foreground">En esta página</h2>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    className="inline-flex min-h-11 items-center text-sm leading-5 text-foreground/80 underline decoration-foreground/40 underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    href={`#legal-section-${index + 1}`}
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 max-w-3xl">
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`legal-section-${index + 1}`}
                aria-labelledby={`legal-section-heading-${index + 1}`}
                className="scroll-mt-8 border-b border-border py-8 first:pt-0 last:border-b-0"
              >
                <h2
                  id={`legal-section-heading-${index + 1}`}
                  className="font-display text-2xl leading-snug text-foreground sm:text-3xl"
                >
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-foreground/80">{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-base leading-7 text-foreground/80 marker:text-muted-foreground">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {section.links && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${link.label} (se abre en una nueva pestaña)`}
                          className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline decoration-foreground/50 underline-offset-4 hover:decoration-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Políticas del sitio">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalDocuments.map((document) => (
                <li key={document.href}>
                  <Link
                    href={document.href}
                    className="inline-flex min-h-11 items-center text-sm text-foreground/80 underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {document.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <CookiePreferencesButton className="min-h-11 self-start text-left text-sm text-foreground underline underline-offset-4 hover:text-foreground/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:self-auto" />
        </div>
      </footer>
    </>
  );
}

export type { LegalSection };
