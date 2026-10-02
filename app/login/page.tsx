import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión para continuar tu recorrido por el patrimonio cultural de Tunja.",
};

export default function LoginPage() {
  return <LoginForm />;
}
