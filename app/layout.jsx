import "./globals.css";

export const metadata = {
  title: "Kontiva · Vaga Fundadora EGESCON para escritórios contábeis",
  description:
    "O Hub de agentes de IA que recupera o dinheiro que o seu escritório deixa na mesa. Vaga Fundadora EGESCON, limitada. Veja rodando nos seus números antes de pagar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
