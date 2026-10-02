"use client";

import { useEffect, useState, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Church,
  Landmark,
  Castle,
  Building2,
  Mountain,
  Palette,
  BookOpen,
  Music,
  UtensilsCrossed,
  Footprints,
  Map,
  Sun,
} from "lucide-react";

const routes: { name: string; category: string; icon: LucideIcon }[] = [
  { name: "Catedral Basílica", category: "Templo", icon: Church },
  { name: "Santo Domingo", category: "Barroco", icon: Church },
  { name: "Santa Clara la Real", category: "Convento", icon: Castle },
  { name: "San Francisco", category: "Templo", icon: Church },
  { name: "Casa del Fundador", category: "Museo", icon: Landmark },
  { name: "Casa de Juan de Vargas", category: "Museo", icon: Building2 },
  { name: "Pozo de Donato", category: "Muisca", icon: Sun },
  { name: "Cojines del Zaque", category: "Muisca", icon: Mountain },
  { name: "Puente de Boyacá", category: "Historia", icon: Map },
  { name: "Festival de la Luz", category: "Cultura", icon: Palette },
  { name: "Aguinaldo Boyacense", category: "Fiesta", icon: Music },
  { name: "Cocina boyacense", category: "Sabores", icon: UtensilsCrossed },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">

      <div className="relative z-10 pt-32 lg:pt-40 text-center px-6">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="w-12 h-px bg-foreground/20" />
          Rutas patrimoniales
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Conecta
          <br />
          <span className="text-muted-foreground">con la historia.</span>
        </h2>

        <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          Templos, casas museo, vestigios muiscas y tradiciones vivas. Cada parada es un capítulo del patrimonio de Tunja.
        </p>
      </div>

      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {routes.map((route, index) => {
            const Icon = route.icon;
            return (
              <div
                key={route.name}
                className={`group relative overflow-hidden p-6 lg:p-8 border transition-all duration-500 cursor-default ${
                  hoveredIndex === index
                    ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                    : "border-foreground/10 hover:border-foreground/30"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${index * 30 + 300}ms`,
                }}
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setMousePos(null);
                }}
              >
                {hoveredIndex === index && mousePos && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                    }}
                  />
                )}
                <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 transition-colors ${
                  hoveredIndex === index
                    ? "bg-foreground text-background"
                    : "bg-foreground/10 text-muted-foreground"
                }`}>
                  {route.category}
                </span>

                <div className={`w-10 h-10 mb-6 flex items-center justify-center transition-colors ${
                  hoveredIndex === index ? "text-white" : "text-foreground/60"
                }`}>
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <span className="font-medium block">{route.name}</span>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 overflow-hidden">
                  <div className={`h-full bg-foreground transition-all duration-500 ${
                    hoveredIndex === index ? "w-full" : "w-0"
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "12", label: "Paradas destacadas" },
              { value: "A pie", label: "Centro histórico" },
              { value: "Guías", label: "Locales certificados" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#developers" className="group inline-flex min-h-11 items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <Footprints className="w-4 h-4" aria-hidden="true" />
            Planear la visita
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
