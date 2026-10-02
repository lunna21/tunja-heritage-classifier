import type { ReactNode } from "react";

export type LegalSection = {
  title: string;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
};

type LegalDocumentProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalDocument({
  title,
  description,
  updatedAt,
  sections,
}: LegalDocumentProps) {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <article className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <nav aria-label="Ruta de navegación" className="mb-10 text-sm text-muted-foreground">
          <a className="underline underline-offset-4 hover:text-foreground" href="/">
            Inicio
          </a>
          <span aria-hidden="true" className="px-2">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mb-12 border-b border-border pb-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Patrimonio Cultural de Tunja
          </p>
          <h1 className="font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Última actualización: <time dateTime="2026-10-02">{updatedAt}</time>
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`legal-section-${index}`}>
              <h2
                id={`legal-section-${index}`}
                className="font-display text-3xl tracking-tight sm:text-4xl"
              >
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="mt-4 max-w-3xl leading-7 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 flex list-disc flex-col gap-3 pl-6 leading-7 text-muted-foreground marker:text-foreground">
                  {section.bullets.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside
          aria-label="Información pendiente del titular"
          className="mt-14 border border-border bg-card p-5 sm:p-6"
        >
          <h2 className="font-medium">Información del titular</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Antes de publicar estas políticas como documentos definitivos, el titular del sitio debe
            completar su nombre o razón social, domicilio y un medio oficial de contacto para
            consultas y solicitudes. Esos datos no están definidos en el proyecto.
          </p>
        </aside>

        <a
          href="/"
          className="mt-10 inline-flex min-h-11 items-center text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
        >
          Volver al sitio
        </a>
      </article>
    </main>
  );
}
