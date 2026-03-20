import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'inklang',
  description: 'A compiled scripting language for the modern VM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
