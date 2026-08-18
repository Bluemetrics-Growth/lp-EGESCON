import "./globals.css";

export const metadata = {
  title: "Kontiva · Setup EGESCON para escritórios contábeis",
  description:
    "O Hub de agentes de IA que recupera o dinheiro que o seu escritório deixa na mesa. Setup EGESCON, vagas limitadas. Veja rodando nos seus números antes de pagar.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
