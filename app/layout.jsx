import "./globals.css";

export const metadata = {
  title: "Kontiva.ai · Reforma tributária com simulação pronta para o seu escritório",
  description:
    "Chegue na reforma tributária (IBS e CBS) com a simulação pronta. O Hub de agentes de IA para escritórios contábeis. Vaga de lançamento no 9º EGESCON: setup de teste grátis e condição travada.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
