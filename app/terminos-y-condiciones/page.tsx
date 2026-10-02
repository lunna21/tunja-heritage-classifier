import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de acceso y uso del sitio informativo Patrimonio Cultural de Tunja.",
};

const sections: LegalSection[] = [
  {
    title: "Objeto e independencia del sitio",
    paragraphs: [
      "Estos términos describen el acceso y uso de Patrimonio Cultural de Tunja, un sitio de carácter informativo y cultural. El sitio es independiente y no es el portal oficial de la Alcaldía de Tunja, de la Arquidiócesis ni de otra entidad pública o privada.",
      "Al navegar por el sitio aceptas utilizarlo de manera lícita y conforme a estas condiciones. Si no estás de acuerdo, puedes dejar de utilizarlo. Estos términos no sustituyen los derechos irrenunciables que te otorgue la legislación aplicable.",
    ],
  },
  {
    title: "Información cultural",
    paragraphs: [
      "Los textos y referencias se presentan con fines generales de divulgación y orientación. Aunque se procura mantenerlos claros y actualizados, pueden contener errores, omisiones o información que cambie con el tiempo. No constituyen asesoría oficial ni garantizan horarios, disponibilidad, acceso, tarifas o condiciones de visita a monumentos y servicios.",
      "Antes de planear un viaje o una visita, verifica directamente los horarios, cierres, accesibilidad física y demás condiciones con el lugar o la autoridad correspondiente. Las distancias y cifras divulgativas son orientativas.",
    ],
  },
  {
    title: "Propiedad intelectual y contenidos",
    paragraphs: [
      "Los derechos sobre textos, fotografías, ilustraciones, marcas y demás materiales pertenecen a sus respectivos titulares. Su publicación en este sitio no transfiere derechos ni concede una licencia general para copiar, modificar, distribuir o utilizar comercialmente esos materiales.",
      "Puedes consultar el contenido para uso personal y no comercial respetando los derechos de autor, las licencias aplicables y la atribución correspondiente. Para reproducirlo, solicita autorización al titular de los derechos. El responsable del sitio debe identificar y documentar las licencias de los recursos antes de su publicación.",
    ],
  },
  {
    title: "Uso permitido y disponibilidad",
    paragraphs: [
      "No debes interferir con el funcionamiento o la seguridad del sitio, intentar acceder sin autorización a sus sistemas, introducir código malicioso ni utilizar el contenido de una forma que infrinja derechos de terceros o la ley.",
      "El sitio se ofrece como está y puede modificarse, interrumpirse o retirarse para mantenimiento o por razones técnicas. Nada en esta cláusula excluye responsabilidades que no puedan limitarse conforme a la ley colombiana.",
    ],
  },
  {
    title: "Enlaces a terceros y cookies",
    paragraphs: [
      "Los enlaces a páginas externas se ofrecen como referencia. Sus contenidos, seguridad, disponibilidad y políticas son responsabilidad de sus respectivos operadores; incluir un enlace no implica respaldo oficial ni control sobre esos sitios.",
      "El uso de cookies y de analítica opcional se describe en la Política de cookies. La analítica permanece desactivada hasta que otorgues tu consentimiento y puedes cambiar esa decisión desde «Configurar cookies».",
    ],
  },
  {
    title: "Ley aplicable y contacto",
    paragraphs: [
      "Estas condiciones se interpretan conforme a las leyes de la República de Colombia, sin limitar las normas imperativas ni los derechos de las personas consumidoras que resulten aplicables. Las controversias serán atendidas por las autoridades competentes según la ley.",
      "La identidad y el correo del titular que administra el proyecto todavía deben publicarse en este sitio. Esa información debe completarse y verificarse antes de considerar estos términos definitivos.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      summary="Estas condiciones explican el alcance del contenido cultural, las reglas básicas de uso y el carácter independiente de este sitio."
      updatedAt="2 de octubre de 2026"
      sections={sections}
    />
  );
}
