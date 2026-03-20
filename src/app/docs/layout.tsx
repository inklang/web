import Link from 'next/link'

const docs = [
  { title: 'Introduction', href: '/docs/intro' },
  { title: 'Getting Started', href: '/docs/getting-started' },
  { title: 'Language Reference', href: '/docs/language-reference' },
  { title: 'Standard Library', href: '/docs/stdlib' },
  { title: 'Examples', href: '/docs/examples' },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full sm:w-64 border-r border-zinc-800 shrink-0">
        <nav className="p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Documentation</p>
          <ul className="space-y-1">
            {docs.map((doc) => (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className="block px-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-50 rounded transition-colors"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Content */}
      <div className="flex-1 p-6 sm:p-10 max-w-3xl">
        {children}
      </div>
    </div>
  )
}
