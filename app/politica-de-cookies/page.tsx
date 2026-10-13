import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Consulta las cookies necesarias y las opciones de consentimiento para analítica en este sitio.",
};

const sections: LegalSection[] = [
  {
    title: "Qué son las cookies",
    paragraphs: [
      "Las cookies son pequeños archivos que un sitio puede guardar en el navegador para recordar información entre visitas. En este sitio se usan para guardar tu elección de privacidad. La medición de visitas es opcional y no se inicia hasta que la aceptes.",
      "El sitio no utiliza cookies de publicidad, seguimiento entre sitios ni personalización de anuncios.",
    ],
  },
  {
    title: "Cookie necesaria de preferencias",
    paragraphs: [
      "La cookie propia tunja_cookie_consent recuerda si aceptaste o rechazaste la analítica opcional, junto con la fecha y la versión del aviso. Es necesaria para respetar tu elección y evitar mostrar el aviso en cada página. Tiene una duración máxima de 180 días; después se te volverá a preguntar.",
      "Si borras las cookies del navegador, el sitio no podrá recordar tu decisión y volverá a mostrar el aviso. La cookie de preferencias no contiene tu nombre, correo ni otra información que te identifique directamente.",
    ],
  },
  {
    title: "Analítica opcional",
    paragraphs: [
      "Vercel Web Analytics solo se activa cuando eliges «Aceptar analítica». Si la rechazas, la medición permanece apagada y puedes seguir navegando normalmente. Este sitio no la utiliza para publicidad dirigida ni para elaborar perfiles de marketing.",
      "Puedes retirar o cambiar tu consentimiento desde «Configurar cookies», disponible en el pie de página de la web y de estas políticas. Al retirar el consentimiento se desactiva la analítica para las siguientes visitas y se guarda tu nueva preferencia.",
    ],
    links: [
      { label: "Información de privacidad de Vercel Web Analytics", href: "https://vercel.com/docs/analytics/privacy-policy" },
    ],
  },
  {
    title: "Cómo gestionar cookies en el navegador",
    paragraphs: [
      "También puedes consultar la ayuda de tu navegador para bloquear o borrar cookies. Si bloqueas la cookie de preferencias, el sitio no podrá recordar si aceptaste o rechazaste la analítica y puede volver a preguntarte. El bloqueo no impide leer el contenido del sitio.",
    ],
  },
  {
    title: "Actualizaciones y contacto",
    paragraphs: [
      "Si añadimos una nueva categoría de cookies o cambiamos la finalidad de la analítica, actualizaremos esta política y solicitaremos el consentimiento que corresponda antes de activarla. La identidad y el correo del responsable del sitio deben publicarse para recibir consultas sobre privacidad antes de que esta política se considere definitiva.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Política de cookies"
      summary="Aquí explicamos qué guarda el sitio en tu navegador, cuándo se activa la analítica y cómo puedes cambiar tu decisión."
      updatedAt="2 de octubre de 2026"
      sections={sections}
    />
  );
}
