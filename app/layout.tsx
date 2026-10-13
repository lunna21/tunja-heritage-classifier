import React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { CookieConsentManager } from "@/components/cookie-consent"
import "./globals.css"

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: {
    default: "Patrimonio Cultural de Tunja",
    template: "%s | Patrimonio Cultural de Tunja",
  },
  description: "Descubre el patrimonio cultural de Tunja, Boyacá: templos coloniales, arte barroco, casas museo, legado muisca y la historia de la independencia de Colombia.",
  generator: "v0.app",
  openGraph: {
    title: "Patrimonio Cultural de Tunja",
    description: "Una guía informativa del patrimonio cultural de Tunja, Boyacá.",
    locale: "es_CO",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1012",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <CookieConsentManager />
      </body>
    </html>
  )
}
