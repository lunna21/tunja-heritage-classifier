import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent";

const legalLinks = [
  { href: "/politica-de-privacidad", label: "Privacidad" },
  { href: "/politica-de-cookies", label: "Cookies" },
  { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
];

type LegalDocumentProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

export function LegalDocument({ title, updatedAt, children }: LegalDocumentProps) {
  return (
    <main id="contenido-principal" className="min-h-screen bg-background text-foreground">
      <a
        href="#contenido-principal"
        className="sr-only fixed left-4 top-4 z-[100] rounded-sm bg-foreground px-4 py-3 font-medium text-background focus:not-sr-only focus:outline-none"
      >
        Ir al contenido principal
      </a>
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16 lg:py-20">
        <header className="mb-10 border-b border-border pb-8 sm:mb-12 sm:pb-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Patrimonio Cultural de Tunja
          </Link>
          <p className="mt-8 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Información legal · Borrador
          </p>
          <h1 className="mt-3 text-4xl font-display leading-tight tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Última actualización: {updatedAt}</p>
        </header>

        <aside
          aria-label="Aviso importante sobre el borrador"
          className="mb-10 border-l-2 border-[#eca8d6] bg-foreground/[0.04] px-5 py-4 sm:mb-12 sm:px-6"
        >
          <h2 className="text-base font-semibold text-foreground">Pendiente de validación antes de publicar</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            El proyecto no identifica todavía quién es el titular legal de este sitio. Para que estos textos sean
            definitivos, la entidad responsable debe completar y verificar su nombre o razón social, NIT cuando
            corresponda, domicilio y canal de contacto; confirmar los proveedores, tratamientos y contenidos que
            utiliza; y revisar el documento con su responsable jurídico. Este borrador no sustituye asesoría legal.
          </p>
        </aside>

        <article className="space-y-9 text-[15px] leading-7 text-muted-foreground sm:text-base">
          {children}
        </article>

        <nav aria-label="Documentos legales" className="mt-14 border-t border-border pt-8 sm:mt-16">
          <h2 className="text-lg font-display text-foreground">Documentos relacionados</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground" />
            </li>
          </ul>
        </nav>

        <footer className="mt-8 border-t border-border pt-6">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Volver al inicio
          </Link>
        </footer>
      </div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={title.toLowerCase().replaceAll(" ", "-")}>
      <h2
        id={title.toLowerCase().replaceAll(" ", "-")}
        className="mb-3 text-xl font-display leading-snug text-foreground sm:text-2xl"
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-muted-foreground">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export function LegalCode({ children }: { children: React.ReactNode }) {
  return <code className="rounded-sm border border-border bg-foreground/[0.04] px-1.5 py-0.5 text-sm text-foreground">{children}</code>;
}

export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">{children}</a>;
}

export function LegalExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">{children}</a>;
}

export function LegalSectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-medium text-foreground">{children}</h3>;
}

export function LegalExternalLinkNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-muted-foreground">{children}</p>;
}

export function LegalLinkLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

export function LegalDocumentNotice({ children }: { children: React.ReactNode }) {
  return <p className="border-l-2 border-[#eca8d6] pl-4 text-sm leading-6 text-muted-foreground">{children}</p>;
}

export function LegalStrong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function LegalAddress() {
  return <p>Identificación y canal para ejercer derechos: pendientes de publicar por el titular responsable del sitio.</p>;
}

export function LegalUpdatedAt({ date }: { date: string }) {
  return <time dateTime="2026-10-02">{date}</time>;
}

export function LegalInternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="underline underline-offset-4 hover:text-foreground">{children}</Link>;
}

export function LegalInlineNote({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

export function LegalProviderLink({ children }: { children: React.ReactNode }) {
  return <LegalExternalLink href="https://vercel.com/legal/privacy-policy">{children}</LegalExternalLink>;
}

export function LegalRegulationLink({ children }: { children: React.ReactNode }) {
  return <LegalExternalLink href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981">{children}</LegalExternalLink>;
}

export function LegalDocumentEndnote({ children }: { children: React.ReactNode }) {
  return <p className="border-t border-border pt-6 text-sm">{children}</p>;
}

export function LegalDataContact() {
  return <p>Para consultas o reclamos sobre datos personales, el responsable debe publicar aquí su canal oficial de atención antes de poner esta política en vigencia.</p>;
}
