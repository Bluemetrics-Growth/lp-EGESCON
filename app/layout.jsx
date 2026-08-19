import "./globals.css";

export const metadata = {
  title: "Kontiva.ai · Hub de agentes de IA para escritórios contábeis",
  description:
    "Agentes de IA que trabalham no seu escritório, de verdade. Vaga de lançamento do Hub no 9º EGESCON: 15 escritórios, setup de teste grátis e condição travada.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
