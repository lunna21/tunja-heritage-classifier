"use client";

import { useEffect, useState, useRef } from "react";

const regions = [
  { name: "Catedral Basílica", detail: "Plaza de Bolívar", status: "abierto" },
  { name: "Santo Domingo", detail: "Capilla del Rosario", status: "abierto" },
  { name: "San Francisco", detail: "Retablo mayor", status: "abierto" },
  { name: "Santa Clara la Real", detail: "Museo conventual", status: "abierto" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
        {/* Background accent — retiré, remplacé par l'image sphère */}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Arquitectura colonial
          </span>
          
          <div className={`group relative overflow-hidden border border-foreground/10 bg-foreground/[0.02] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(236,168,214,0.10),transparent_55%)]"
            />

            <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center">
              <div className="relative h-[420px] lg:h-[600px] overflow-hidden border-b lg:border-b-0 lg:border-r border-foreground/10">
                <img
                  src="/images/bolivar.jpeg"
                  alt="Monumento ecuestre a Simón Bolívar iluminado de noche en Tunja"
                  className="w-full h-full object-contain object-bottom grayscale-[35%] transition-all duration-[1500ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute top-6 left-6 inline-flex items-center gap-2 border border-foreground/15 bg-background/70 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground backdrop-blur">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6] animate-pulse" />
                  Monumento ecuestre
                </span>
              </div>

              <div className="flex flex-col justify-center px-8 pb-12 lg:px-12 lg:py-16">
                <h2 className="text-6xl md:text-7xl lg:text-[120px] font-display tracking-tight leading-[0.9] text-foreground">
                  Ciudad
                  <br />
                  <span className="italic text-muted-foreground">monumento.</span>
                </h2>

                <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}>
                  Tejados de barro, balcones de madera y plazas empedradas. El centro histórico de Tunja
                  conserva el trazado original de la ciudad fundada en 1539 y honra al Libertador en
                  cada una de sus plazas.
                </p>

                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8 max-w-lg">
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Fundación</dt>
                    <dd className="mt-1 text-2xl font-display text-foreground">1539</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Monumento</dt>
                    <dd className="mt-1 text-2xl font-display text-foreground">1959</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Altitud</dt>
                    <dd className="mt-1 text-2xl font-display text-foreground">2.820 m</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large stat card */}
          <div className={`lg:col-span-2 relative p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Animated dots background with connecting lines */}
            <div className="absolute inset-0 opacity-70">
              {/* SVG for connecting lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="connecting-line"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  );
                })}
              </svg>

              {/* Dots */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6]"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-8xl lg:text-[10rem] font-display leading-none">1959</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Año en que el centro histórico de Tunja fue declarado Monumento Nacional de Colombia.
              </p>
            </div>
          </div>

          {/* Stacked stat cards */}
          <div className="flex flex-col gap-6">
            <div className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <span className="text-5xl lg:text-6xl font-display">Mudéjar</span>
              <span className="block text-sm text-muted-foreground mt-2">Techos artesonados</span>
            </div>
            
            <div className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <span className="text-5xl lg:text-6xl font-display">Barroco</span>
              <span className="block text-sm text-muted-foreground mt-2">Retablos en pan de oro</span>
            </div>
          </div>
        </div>

        {/* Region list */}
        <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`p-6 border transition-all duration-300 cursor-default ${
                activeRegion === index 
                  ? "border-foreground/30 bg-foreground/[0.04]" 
                  : "border-foreground/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full transition-colors ${
                  activeRegion === index ? "bg-[#eca8d6]" : "bg-foreground/20"
                }`} />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {region.status}
                </span>
              </div>
              <span className="font-medium block mb-1">{region.name}</span>
              <span className="text-sm text-muted-foreground">{region.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
