import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre los datos personales y las preferencias de privacidad en Patrimonio Cultural de Tunja.",
};

const sections: LegalSection[] = [
  {
    title: "Responsable y alcance",
    paragraphs: [
      "Esta política describe el tratamiento asociado a este sitio informativo sobre el patrimonio cultural de Tunja. El responsable es el titular que administra el proyecto Patrimonio Cultural de Tunja. Su nombre o razón social, domicilio y correo para consultas deben publicarse aquí antes de que este documento se considere definitivo.",
      "Este proyecto es independiente y no es el portal oficial de la Alcaldía de Tunja ni de otra autoridad pública. En la versión actual no ofrecemos cuentas, compras, reservas ni formularios para que el público envíe datos personales.",
    ],
  },
  {
    title: "Qué información se trata",
    paragraphs: [
      "El sitio puede tratar datos técnicos necesarios para entregar y proteger sus páginas, como información de la solicitud, navegador y registros de seguridad gestionados por el proveedor de alojamiento. El alcance y el plazo de esos registros dependen de la configuración y condiciones vigentes del proveedor.",
      "La preferencia de cookies se guarda en una cookie propia: si autorizaste analítica, la fecha de tu elección y la versión del aviso. La decisión dura hasta 180 días o hasta que la cambies. No usamos esa cookie para identificarte.",
      "Vercel Web Analytics solo se carga después de que aceptes expresamente la analítica opcional. En ese caso, el proveedor puede procesar información de uso y del dispositivo para generar métricas del sitio conforme a su servicio y configuración. No usamos esta herramienta para publicidad comportamental ni creamos perfiles publicitarios.",
    ],
    links: [
      { label: "Información de privacidad de Vercel Web Analytics", href: "https://vercel.com/docs/analytics/privacy-policy" },
    ],
  },
  {
    title: "Finalidades y fundamento",
    paragraphs: [
      "La información técnica se utiliza para mostrar el sitio, mantener su seguridad y detectar errores. La cookie de preferencias recuerda tu decisión para no volver a mostrar el aviso durante su vigencia. La medición opcional se utiliza únicamente para conocer de manera agregada cómo se consulta el sitio y orientar mejoras.",
      "La analítica permanece desactivada hasta que la aceptas. Puedes rechazarla sin perder acceso al contenido y retirar o cambiar tu decisión en cualquier momento. El tratamiento de datos personales que resulte aplicable se rige, entre otras normas, por la Ley 1581 de 2012 y su reglamentación vigente en Colombia.",
    ],
  },
  {
    title: "Proveedores y transferencias",
    paragraphs: [
      "El sitio utiliza servicios de infraestructura web de Vercel para alojamiento y, si das tu consentimiento, Vercel Web Analytics. Esos servicios pueden tratar información técnica en los lugares donde operen sus sistemas. Antes de publicar esta política como definitiva, el responsable debe verificar las condiciones vigentes, los plazos, las ubicaciones y los mecanismos aplicables a cualquier transmisión o transferencia internacional de datos.",
      "El sitio no vende datos personales ni comparte información para fines de publicidad dirigida. No se incorporan herramientas publicitarias ni analítica opcional antes del consentimiento.",
    ],
  },
  {
    title: "Tus derechos y cómo ejercerlos",
    paragraphs: [
      "En los casos previstos por la ley colombiana, puedes solicitar acceso a tus datos, su actualización o rectificación, la prueba de la autorización, información sobre su uso, la revocatoria del consentimiento y la supresión cuando corresponda. También puedes presentar consultas o reclamos ante la Superintendencia de Industria y Comercio, de acuerdo con el procedimiento legal aplicable.",
      "El administrador debe publicar un correo de contacto para recibir estas solicitudes antes de poner en producción la política. No envíes datos sensibles ni documentos personales por canales que no hayan sido confirmados por el responsable.",
    ],
    links: [
      { label: "Superintendencia de Industria y Comercio: protección de datos personales", href: "https://www.sic.gov.co/tema/proteccion-de-datos-personales" },
    ],
  },
  {
    title: "Seguridad, menores y cambios",
    paragraphs: [
      "Se aplican medidas técnicas propias de la operación del sitio y de sus proveedores para reducir riesgos, sin que ningún sistema conectado a internet pueda garantizar seguridad absoluta. Este sitio no solicita información a menores ni está diseñado para crear perfiles de menores.",
      "La política puede actualizarse si cambian el sitio, los proveedores o las normas aplicables. Cuando una modificación afecte la forma de obtener consentimiento, se actualizará el aviso y se solicitará una nueva elección antes de habilitar la analítica opcional.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      summary="Conoce qué información técnica puede tratar este sitio, para qué se utiliza y cómo ejercer tus derechos sobre tus datos personales."
      updatedAt="2 de octubre de 2026"
      sections={sections}
    />
  );
}
