import { CookiePreferencesButton } from "@/components/cookie-consent";

const footerLinks = {
  Patrimonio: [
    { name: "Joyas coloniales", href: "#features" },
    { name: "Recorrido", href: "#how-it-works" },
    { name: "Arquitectura", href: "#infra" },
  ],
  Visita: [
    { name: "Planear visita", href: "#developers" },
    { name: "Rutas culturales", href: "#integrations" },
    { name: "Conservación", href: "#security" },
  ],
  Legal: [
    { name: "Privacidad", href: "/politica-de-privacidad" },
    { name: "Cookies", href: "/politica-de-cookies" },
    { name: "Términos y condiciones", href: "/terminos-y-condiciones" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative bg-black text-white">
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[420px]">
        <img
          src="/images/plaza-aerea.jpeg"
          alt="Vista aérea de los tejados coloniales y la Plaza de Bolívar de Tunja"
          className="h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="py-14 lg:py-20">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5 lg:gap-8">
            <div className="col-span-2">
              <a href="/" className="mb-5 inline-flex min-h-11 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <span className="font-display text-2xl text-white">TUNJA</span>
                <span className="font-mono text-xs text-white/80">PATRIMONIO</span>
              </a>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/80">
                Patrimonio Cultural de Tunja. Cinco siglos de historia, arte colonial y memoria viva en el corazón de Boyacá.
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-white/80">
                Sitio informativo independiente; no es un portal oficial de la Alcaldía de Tunja.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <h2 className="mb-4 text-sm font-semibold text-white">{title}</h2>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-sm text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                  {title === "Legal" && (
                    <li>
                      <CookiePreferencesButton className="inline-flex min-h-11 items-center text-left text-sm text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" />
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/20 py-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/80">
            &copy; 2026 Patrimonio Cultural de Tunja. Todos los derechos reservados.
          </p>
          <p className="flex min-h-11 items-center gap-2 text-sm text-white/80">
            <span aria-hidden="true" className="size-2 rounded-full bg-[#eca8d6]" />
            Tunja, Boyacá · Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
