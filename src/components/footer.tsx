import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
      <p>ink &copy; {new Date().getFullYear()}</p>
      <div className="flex gap-6">
        <a href="https://github.com/inklang/ink" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-50 transition-colors">
          GitHub
        </a>
      </div>
    </footer>
  )
}
