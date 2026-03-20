import Link from 'next/link'

export function Nav() {
  return (
    <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight">
        inklang
      </Link>
      <div className="flex gap-6 text-sm text-zinc-400">
        <Link href="/docs" className="hover:text-zinc-50 transition-colors">Docs</Link>
        <Link href="/blog" className="hover:text-zinc-50 transition-colors">Blog</Link>
        <Link href="/playground" className="hover:text-zinc-50 transition-colors">Playground</Link>
      </div>
    </nav>
  )
}
