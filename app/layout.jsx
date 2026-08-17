import "./globals.css";

export const metadata = {
  title: "Kontiva.ai · Hub de agentes de IA para escritórios contábeis",
  description:
    "O Hub de agentes de IA que acha o dinheiro que o seu escritório deixa na mesa. Vagas fundadoras limitadas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
