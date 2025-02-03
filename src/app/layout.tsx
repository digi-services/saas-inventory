import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inventario App',
  description: 'Sistema de gestión de inventario',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
