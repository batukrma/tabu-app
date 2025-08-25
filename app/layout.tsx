import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tabu Oyunu - Türkçe Taboo Game",
  description: "Türkçe Tabu kelime oyunu - arkadaşlarınızla eğlenceli vakit geçirin!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
