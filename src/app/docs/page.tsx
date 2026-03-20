import Link from 'next/link'

export default function DocsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Documentation</h1>
      <p className="text-zinc-400 mb-6">Welcome to inklang. Choose a topic to get started.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/docs/intro" className="p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors">
          <p className="font-medium">Introduction</p>
          <p className="text-sm text-zinc-500">What is inklang?</p>
        </Link>
        <Link href="/docs/getting-started" className="p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors">
          <p className="font-medium">Getting Started</p>
          <p className="text-sm text-zinc-500">Install and run your first program</p>
        </Link>
        <Link href="/docs/language-reference" className="p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors">
          <p className="font-medium">Language Reference</p>
          <p className="text-sm text-zinc-500">Syntax and language features</p>
        </Link>
        <Link href="/docs/examples" className="p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors">
          <p className="font-medium">Examples</p>
          <p className="text-sm text-zinc-500">Sample programs</p>
        </Link>
      </div>
    </div>
  )
}
