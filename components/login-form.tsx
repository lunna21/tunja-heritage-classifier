"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "El acceso estará disponible próximamente. No se han enviado ni guardado tus datos.",
    );
  }

  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)]">
        <aside className="relative hidden min-h-svh overflow-hidden border-r border-white/10 bg-[#101012] lg:block">
          <Image
            src="/images/catedral-luna.png"
            alt="La catedral de Tunja iluminada al anochecer"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 0px"
            className="object-cover object-[62%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"
          />

          <div className="relative flex min-h-svh flex-col justify-between p-10 xl:p-14">
            <Link
              href="/"
              aria-label="Tunja Patrimonio, volver al inicio"
              className="inline-flex w-fit items-baseline gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="font-display text-2xl tracking-wide text-white">TUNJA</span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-white/85">
                PATRIMONIO
              </span>
            </Link>

            <div className="max-w-xl pb-2">
              <p className="mb-7 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/90">
                <span aria-hidden="true" className="h-px w-8 bg-[#eca8d6]" />
                Tunja, Boyacá · Colombia
              </p>
              <h1 className="font-display text-6xl leading-[0.94] tracking-tight text-white xl:text-7xl">
                La historia
                <br />
                vive en cada
                <br />
                <span className="italic text-[#f3cf9b]">calle.</span>
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/85">
                Regresa a tu espacio y continúa descubriendo cinco siglos de
                patrimonio, arte y memoria.
              </p>
              <div className="mt-12 flex items-center gap-8 border-t border-white/30 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85">
                <span>Desde 1539</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#f3cf9b]" />
                <span>Patrimonio vivo</span>
              </div>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
              Un lugar para volver a descubrir
            </p>
          </div>
        </aside>

        <div className="flex min-h-svh flex-col px-6 py-5 sm:px-10 sm:py-7 lg:px-12 xl:px-[4.5rem]">
          <header className="flex min-h-11 items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Volver al sitio
            </Link>
            <Link
              href="/"
              aria-label="Inicio de Tunja Patrimonio"
              className="inline-flex items-baseline gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:hidden"
            >
              <span className="font-display text-lg tracking-wide">TUNJA</span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground">
                PATRIMONIO
              </span>
            </Link>
          </header>

          <section
            aria-labelledby="login-title"
            className="mx-auto flex w-full max-w-[25rem] flex-1 flex-col justify-center py-8 sm:py-12 lg:py-0"
          >
            <div className="mb-8">
              <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e6abd0]">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#e6abd0]" />
                Tu recorrido continúa
              </p>
              <h2
                id="login-title"
                className="font-display text-[2.75rem] leading-[0.98] tracking-tight sm:text-[3.25rem]"
              >
                Qué bueno
                <br />
                verte de nuevo.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Ingresa a tu cuenta para continuar explorando la historia de Tunja.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              aria-describedby="login-note"
              className="flex flex-col gap-5"
            >
              <FieldGroup className="gap-5">
                <Field className="gap-2.5">
                  <FieldLabel
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/85"
                  >
                    Correo electrónico
                  </FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    inputMode="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="nombre@correo.com"
                    required
                    className="h-12 rounded-sm border-border bg-card/60 px-4 text-base placeholder:text-muted-foreground/75"
                  />
                </Field>

                <Field className="gap-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel
                      htmlFor="password"
                      className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/85"
                    >
                      Contraseña
                    </FieldLabel>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      Acceso seguro
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Escribe tu contraseña"
                      required
                      className="h-12 rounded-sm border-border bg-card/60 px-4 pr-12 text-base placeholder:text-muted-foreground/75"
                    />
                    <button
                      type="button"
                      aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                      aria-pressed={passwordVisible}
                      onClick={() => setPasswordVisible((visible) => !visible)}
                      className="absolute inset-y-0 right-0 inline-flex size-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:z-10"
                    >
                      {passwordVisible ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                className="group h-12 w-full rounded-sm text-sm font-medium tracking-wide"
              >
                Iniciar sesión
                <ArrowRight
                  aria-hidden="true"
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>

              <p
                id="login-note"
                className="text-center text-xs leading-5 text-muted-foreground"
              >
                Vista previa: la autenticación aún no está conectada. No se envían ni guardan tus datos.
              </p>
              <p
                role="status"
                aria-live="polite"
                className="min-h-5 text-center text-xs leading-5 text-[#f3cf9b]"
              >
                {notice}
              </p>
            </form>

          </section>

          <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-4 text-xs text-muted-foreground">
            <span>© Tunja Patrimonio</span>
            <nav aria-label="Exploración y enlaces legales" className="flex items-center gap-4">
              <Link
                href="/#features"
                className="inline-flex min-h-8 items-center transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Explora
              </Link>
              <Link
                href="/politica-de-privacidad"
                className="min-h-8 inline-flex items-center transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos-y-condiciones"
                className="min-h-8 inline-flex items-center transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Términos
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </main>
  );
}
