"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Pause, Play, X } from "lucide-react";

const navLinks = [
  { name: "Patrimonio", href: "#features" },
  { name: "Recorrido", href: "#how-it-works" },
  { name: "Arquitectura", href: "#infra" },
  { name: "Rutas", href: "#integrations" },
  { name: "Conservación", href: "#security" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    firstMobileLinkRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMotion = () => {
    const nextPaused = !isMotionPaused;
    document.documentElement.dataset.animationsPaused = String(nextPaused);
    setIsMotionPaused(nextPaused);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] border border-foreground bg-background px-4 py-3 text-sm font-medium text-foreground focus:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        Saltar al contenido
      </a>

      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? "max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/90 shadow-lg backdrop-blur-xl"
              : "max-w-[1400px] rounded-b-2xl border border-white/10 bg-black/60 shadow-lg backdrop-blur-lg"
          }`}
        >
          <div className={`flex items-center justify-between px-6 transition-all duration-500 lg:px-8 ${isScrolled ? "h-14" : "h-20"}`}>
            <a href="/" className="group inline-flex min-h-11 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : "text-2xl text-white"}`}>
                TUNJA
              </span>
              <span className={`mt-0.5 font-mono text-[10px] transition-all duration-500 ${isScrolled ? "text-muted-foreground" : "text-white"}`}>
                PATRIMONIO
              </span>
            </a>

            <div className="hidden items-center gap-7 lg:flex xl:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative inline-flex min-h-11 items-center text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isScrolled ? "text-foreground hover:text-foreground/75" : "text-white hover:text-white/80"}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <a
                href="#developers"
                className={`inline-flex min-h-11 items-center text-sm font-medium transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isScrolled ? "text-foreground hover:text-foreground/75" : "text-white hover:text-white/80"}`}
              >
                Planear visita
              </a>
              <button
                type="button"
                aria-pressed={isMotionPaused}
                onClick={toggleMotion}
                className={`inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isScrolled ? "text-foreground" : "text-white"}`}
              >
                {isMotionPaused ? "Reanudar animaciones" : "Pausar animaciones"}
              </button>
              <a
                href="/login"
                className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isScrolled ? "bg-foreground text-background hover:bg-foreground/90" : "bg-white text-black hover:bg-white/90"}`}
              >
                Explora Tunja
              </a>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={toggleMotion}
                className={`inline-flex size-11 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
                aria-label={isMotionPaused ? "Reanudar animaciones" : "Pausar animaciones"}
                aria-pressed={isMotionPaused}
              >
                {isMotionPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              </button>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className={`inline-flex size-11 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-panel"
              >
                {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </div>
        </nav>

        <div
          id="mobile-navigation-panel"
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
          className={`fixed inset-0 z-40 bg-background transition-opacity duration-300 lg:hidden ${
            isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={closeMobileMenu}
            className="absolute right-6 top-5 inline-flex size-11 items-center justify-center rounded-md text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label="Cerrar menú"
          >
            <X aria-hidden="true" />
          </button>
          <div className="flex h-full flex-col px-8 pb-8 pt-24">
            <nav aria-label="Navegación móvil" className="flex flex-1 flex-col justify-center gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="inline-flex min-h-12 items-center font-display text-4xl text-foreground transition-colors hover:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-5xl"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <button
                type="button"
                aria-pressed={isMotionPaused}
                onClick={toggleMotion}
                className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {isMotionPaused ? "Reanudar animaciones" : "Pausar animaciones"}
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#developers"
                  onClick={closeMobileMenu}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-foreground/50 px-5 text-base font-medium text-foreground hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Planear visita
                </a>
                <a
                  href="/login"
                  onClick={closeMobileMenu}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-foreground px-5 text-base font-semibold text-background hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Explora Tunja
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
