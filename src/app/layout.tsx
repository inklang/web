import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ink',
  description: 'A compiled scripting language for the modern VM.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 antialiased flex flex-col min-h-screen">
        <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">ink</a>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="/docs" className="hover:text-zinc-50 transition-colors">Docs</a>
            <a href="/blog" className="hover:text-zinc-50 transition-colors">Blog</a>
            <a href="/playground" className="hover:text-zinc-50 transition-colors">Playground</a>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>ink &copy; {new Date().getFullYear()}</p>
          <a href="https://github.com/inklang/ink" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-50 transition-colors">GitHub</a>
        </footer>
      </body>
    </html>
  )
}
