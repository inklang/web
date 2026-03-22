'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { Check, Copy } from 'lucide-react'
import { Card } from '@/components/ui/card'

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const language = className?.replace('language-', '') || 'text'

  function handleCopy() {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="relative group my-4 bg-zinc-950 border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span className="text-xs text-zinc-500 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className={`language-${language} text-sm text-zinc-300`}>{children}</code>
      </pre>
    </Card>
  )
}

export function DocRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ children, className }) {
          // Inline code (not inside a pre) - use backticks styling
          if (!className) {
            return (
              <code className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            )
          }
          // Code blocks (inside pre) - use our custom card
          return <CodeBlock className={className}>{String(children)}</CodeBlock>
        },
        pre({ children }) {
          // The pre is handled by our custom code component
          return <>{children}</>
        },
        h1({ children }) {
          return <h1 className="text-3xl font-bold text-zinc-100 mb-4 mt-8 first:mt-0">{children}</h1>
        },
        h2({ children }) {
          return <h2 className="text-2xl font-semibold text-zinc-200 mb-3 mt-8">{children}</h2>
        },
        h3({ children }) {
          return <h3 className="text-xl font-semibold text-zinc-200 mb-2 mt-6">{children}</h3>
        },
        p({ children }) {
          return <p className="text-zinc-400 mb-4 leading-relaxed">{children}</p>
        },
        ul({ children }) {
          return <ul className="list-disc list-inside text-zinc-400 mb-4 space-y-1">{children}</ul>
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside text-zinc-400 mb-4 space-y-1">{children}</ol>
        },
        li({ children }) {
          return <li className="text-zinc-400">{children}</li>
        },
        a({ href, children }) {
          return (
            <a href={href} className="text-zinc-300 underline hover:text-zinc-100 transition-colors">
              {children}
            </a>
          )
        },
        strong({ children }) {
          return <strong className="font-semibold text-zinc-200">{children}</strong>
        },
        em({ children }) {
          return <em className="italic text-zinc-300">{children}</em>
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4">
              {children}
            </blockquote>
          )
        },
        hr() {
          return <hr className="border-zinc-800 my-8" />
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm text-zinc-400 border border-zinc-800">
                {children}
              </table>
            </div>
          )
        },
        thead({ children }) {
          return <thead className="bg-zinc-900 text-zinc-200">{children}</thead>
        },
        th({ children }) {
          return <th className="px-4 py-2 text-left font-semibold border-b border-zinc-800">{children}</th>
        },
        td({ children }) {
          return <td className="px-4 py-2 border-b border-zinc-800">{children}</td>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
