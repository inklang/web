# inklang Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub Pages website for inklang at github.com/inklang/inklang — landing page, docs, blog, and interactive playground (UI-only, API stubbed).

**Architecture:** Next.js 14 App Router with shadcn/ui + Tailwind. MDX for docs and blog content. Monaco Editor for playground. Static export to `out/` for GitHub Pages deployment.

**Tech Stack:** Next.js 14, shadcn/ui, Tailwind CSS, Inter font, Monaco Editor, MDX, `next export`

---

## Chunk 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `.gitignore` (for Next.js)

- [ ] **Step 1: Create package.json**

```json
{
  "name": "inklang",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@monaco-editor/react": "^4.6.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.5.3",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.6",
    "postcss": "^8.4.39",
    "autoprefixer": "^10.4.19",
    "@tailwindcss/typography": "^0.5.13"
  }
}
```

- [ ] **Step 2: Create next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '',
}

module.exports = nextConfig
```

- [ ] **Step 3: Create tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ['./src/*'] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Create .gitignore for Next.js**

```
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 7: Create src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
  }
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

- [ ] **Step 8: Create src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'inklang',
  description: 'A compiled scripting language for the modern VM.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Create src/lib/utils.ts**

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 10: Install dependencies**

Run: `npm install`

- [ ] **Step 11: Commit**

```bash
git add package.json next.config.js tailwind.config.ts tsconfig.json postcss.config.js .gitignore src/app/globals.css src/app/layout.tsx src/lib/utils.ts
git commit -m "chunk 1: scaffold Next.js 14 + Tailwind + shadcn base

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 2: shadcn/ui Components

**Files:**
- Create: `components.json`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/tabs.tsx`
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/separator.tsx`

> **Note:** Run `npx shadcn@latest init` in the worktree as a shortcut, then copy components into src/components/ui/. Verify components.json path is set correctly.

- [ ] **Step 1: Run shadcn init**

Run: `npx shadcn@latest init -y -d` (run in worktree directory)

Expected: Creates components.json and src/lib/utils.ts (overwrite utils if exists — already created)

- [ ] **Step 2: Add shadcn components**

Run: `npx shadcn@latest add card button tabs accordion input separator -o`

Expected: Creates src/components/ui/card.tsx, button.tsx, tabs.tsx, accordion.tsx, input.tsx, separator.tsx

- [ ] **Step 3: Verify files exist**

Run: `ls src/components/ui/`
Expected: card.tsx, button.tsx, tabs.tsx, accordion.tsx, input.tsx, separator.tsx, index.tsx

- [ ] **Step 4: Commit**

```bash
git add components.json src/components/ui/ src/lib/utils.ts
git commit -m "chunk 2: add shadcn/ui components (card, button, tabs, accordion, input, separator)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 3: Nav and Footer

**Files:**
- Create: `src/components/nav.tsx`
- Create: `src/components/footer.tsx`

- [ ] **Step 1: Create src/components/nav.tsx**

```tsx
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
```

- [ ] **Step 2: Create src/components/footer.tsx**

```tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
      <p>inklang &copy; {new Date().getFullYear()}</p>
      <div className="flex gap-6">
        <a href="https://github.com/inklang/inklang" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-50 transition-colors">
          GitHub
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Update layout.tsx to include nav/footer**

Modify: `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'inklang',
  description: 'A compiled scripting language for the modern VM.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/components/footer.tsx src/app/layout.tsx
git commit -m "chunk 3: add nav and footer components

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 4: Landing Page

**Files:**
- Modify: `src/app/page.tsx` (create)

- [ ] **Step 1: Create src/app/page.tsx**

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const EXAMPLE_CODE = `fn main() {
  let greeting = "Hello, inklang!"
  print(greeting)

  let nums = [1, 2, 3, 4, 5]
  for num in nums {
    print("Number: " + num)
  }
}`

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
          inklang
        </h1>
        <p className="text-xl text-zinc-400 mb-2">
          A compiled scripting language for the modern VM.
        </p>
        <p className="text-zinc-500 mb-8">Fast. Simple. Extensible.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/docs">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/playground">
            <Button variant="outline" size="lg">Try Playground</Button>
          </Link>
        </div>
      </section>

      {/* Code Preview */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 p-6 overflow-x-auto">
          <pre className="text-sm text-zinc-300">
            <code>{EXAMPLE_CODE}</code>
          </pre>
        </Card>
      </section>

      <Separator className="max-w-3xl mx-auto" />

      {/* Features */}
      <section className="px-6 py-16 max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Compiled to Bytecode</h3>
          <p className="text-sm text-zinc-400">Fast execution with a register-based VM optimized for modern hardware.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Simple Syntax</h3>
          <p className="text-sm text-zinc-400">Clean, expressive syntax that reads naturally. No ceremony required.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">First-Class Functions</h3>
          <p className="text-sm text-zinc-400">Functions are values — pass them around, return them, close over scope.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Extensible via Packages</h3>
          <p className="text-sm text-zinc-400">Build and share reusable code with inklang&apos;s package manager.</p>
        </Card>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify the page renders**

Run: `npm run dev` (then Ctrl+C to stop)
Expected: No build errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "chunk 4: landing page with hero, code preview, and features

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 5: Docs Layout and Sidebar

**Files:**
- Create: `src/app/docs/layout.tsx`
- Create: `src/app/docs/page.tsx`
- Create: `src/components/docs-nav.tsx`

- [ ] **Step 1: Create src/app/docs/layout.tsx**

```tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
```

- [ ] **Step 2: Create src/app/docs/page.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/docs/layout.tsx src/app/docs/page.tsx
git commit -m "chunk 5: docs layout with sidebar navigation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 6: Doc Pages (MDX)

**Files:**
- Create: `src/app/docs/[slug]/page.tsx` (catches all doc slugs)
- Create: `src/content/docs/intro.mdx`
- Create: `src/content/docs/getting-started.mdx`
- Create: `src/content/docs/language-reference.mdx`
- Create: `src/content/docs/stdlib.mdx`
- Create: `src/content/docs/examples.mdx`

- [ ] **Step 1: Create src/app/docs/[slug]/page.tsx**

```tsx
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { Button } from '@/components/ui/button'

function getDoc(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/docs', `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)
  return { content, frontmatter: data }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/docs'))
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  const { content, frontmatter } = getDoc(params.slug)
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <h1>{frontmatter.title}</h1>
      {/* Render MDX — using simple regex replacements for h2/h3/code/pre since next-mdx-remote adds complexity */}
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
      <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between">
        <Link href="/docs">
          <Button variant="ghost">← Back to Docs</Button>
        </Link>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Create src/content/docs/intro.mdx**

```mdx
---
title: Introduction
---

# Introduction

**inklang** is a compiled scripting language targeting a register-based bytecode VM. It supports first-class functions, string interpolation, classes, and more.

## Why inklang?

- **Fast**: Compiles to efficient bytecode, runs on a lightweight VM
- **Simple**: Clean syntax with minimal boilerplate
- **Extensible**: Build and share packages via the inklang package manager
```

- [ ] **Step 3: Create src/content/docs/getting-started.mdx**

```mdx
---
title: Getting Started
---

# Getting Started

## Installation

Download the latest release from GitHub.

## Your First Program

Create a file `hello.ink`:

    fn main() {
      print("Hello, inklang!")
    }

Run it:

    ink run hello.ink
```

- [ ] **Step 4: Create src/content/docs/language-reference.mdx**

```mdx
---
title: Language Reference
---

# Language Reference

## Variables

    let x = 10
    const PI = 3.14

## Functions

    fn greet(name) {
      return "Hello, " + name
    }

## Control Flow

    if x > 10 {
      print("big")
    } else {
      print("small")
    }

## Loops

    for i in range(10) {
      print(i)
    }
```

- [ ] **Step 5: Create src/content/docs/stdlib.mdx**

```mdx
---
title: Standard Library
---

# Standard Library

## print

    print("Hello")

## range

    for i in range(5) {
      print(i)  // 0, 1, 2, 3, 4
    }
```

- [ ] **Step 6: Create src/content/docs/examples.mdx**

```mdx
---
title: Examples
---

# Examples

## Hello World

    fn main() {
      print("Hello, world!")
    }

## FizzBuzz

    fn main() {
      for i in range(1, 101) {
        if i % 15 == 0 {
          print("FizzBuzz")
        } else if i % 3 == 0 {
          print("Fizz")
        } else if i % 5 == 0 {
          print("Buzz")
        } else {
          print(i)
        }
      }
    }
```

- [ ] **Step 7: Commit**

```bash
git add src/app/docs/[slug]/page.tsx src/content/docs/
git commit -m "chunk 6: doc pages with MDX content (placeholder)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 7: Blog

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/content/blog/introducing-inklang.mdx`

- [ ] **Step 1: Create src/app/blog/page.tsx**

```tsx
import Link from 'next/link'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

function getPosts() {
  const dir = path.join(process.cwd(), 'src/content/blog')
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { data } = matter(raw)
      return { slug: f.replace('.mdx', ''), ...data }
    })
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogIndex() {
  const posts = getPosts()
  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <p className="text-sm text-zinc-500">{post.date}</p>
            <h2 className="text-xl font-semibold group-hover:text-zinc-400 transition-colors">{post.title}</h2>
            {post.excerpt && <p className="text-zinc-400 mt-1">{post.excerpt}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create src/app/blog/[slug]/page.tsx**

```tsx
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content/blog')
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const dir = path.join(process.cwd(), 'src/content/blog')
  const raw = fs.readFileSync(path.join(dir, `${params.slug}.mdx`), 'utf8')
  const { content, data } = matter(raw)
  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <p className="text-sm text-zinc-500 mb-2">{data.date}</p>
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
      <div className="mt-8 pt-6 border-t border-zinc-800">
        <Link href="/blog">
          <Button variant="ghost">← Back to Blog</Button>
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create src/content/blog/introducing-inklang.mdx**

```mdx
---
title: Introducing inklang
date: 2026-03-19
author: inklang team
excerpt: We are excited to announce inklang — a new compiled scripting language for the modern VM.
---

# Introducing inklang

We are excited to announce inklang — a new compiled scripting language for the modern VM.

After months of development, we are ready to share what we have been building. inklang is fast, simple, and extensible.

## What is inklang?

inklang is a compiled language that targets a register-based bytecode VM. It features clean syntax, first-class functions, and a powerful package manager.
```
- [ ] **Step 4: Commit**

```bash
git add src/app/blog/ src/content/blog/
git commit -m "chunk 7: blog index and post pages with initial post

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 8: Playground UI

**Files:**
- Create: `src/app/playground/page.tsx`
- Create: `src/components/playground/editor.tsx`
- Create: `src/components/playground/output.tsx`
- Create: `src/app/api/run/route.ts`

- [ ] **Step 1: Create src/components/playground/editor.tsx**

```tsx
'use client'

import MonacoEditor from '@monaco-editor/react'

const EXAMPLES = [
  {
    label: 'Hello World',
    code: `fn main() {
  print("Hello, inklang!")
}`,
  },
  {
    label: 'Simple Function',
    code: `fn add(a, b) {
  return a + b
}

fn main() {
  print(add(2, 3))
}`,
  },
  {
    label: 'For Loop',
    code: `fn main() {
  for i in range(5) {
    print("Number: " + i)
  }
}`,
  },
]

const DEFAULT = EXAMPLES[0].code

export function PlaygroundEditor({ code, onChange }: { code: string; onChange: (v: string) => void }) {
  return (
    <MonacoEditor
      height="400px"
      defaultLanguage="plaintext"
      value={code}
      onChange={(v) => onChange(v || '')}
      theme="vs-dark"
      options={{ minimap: { enabled: false }, fontSize: 14 }}
    />
  )
}

export { EXAMPLES, DEFAULT }
```

- [ ] **Step 2: Create src/components/playground/output.tsx**

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface OutputProps {
  stdout: string
  stderr: string
}

export function PlaygroundOutput({ stdout, stderr }: OutputProps) {
  return (
    <Tabs defaultTo="stdout">
      <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-transparent h-auto p-0">
        <TabsTrigger value="stdout" className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 data-[state=active]:bg-transparent">
          stdout
        </TabsTrigger>
        <TabsTrigger value="stderr" className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 data-[state=active]:bg-transparent">
          stderr
        </TabsTrigger>
      </TabsList>
      <TabsContent value="stdout" className="p-4 font-mono text-sm text-zinc-300 bg-zinc-900 rounded-b-md border border-zinc-800 border-t-0 min-h-24">
        {stdout || <span className="text-zinc-600">Run your code to see output here.</span>}
      </TabsContent>
      <TabsContent value="stderr" className="p-4 font-mono text-sm text-red-400 bg-zinc-900 rounded-b-md border border-zinc-800 border-t-0 min-h-24">
        {stderr || <span className="text-zinc-600">No errors.</span>}
      </TabsContent>
    </Tabs>
  )
}
```

- [ ] **Step 3: Create src/app/playground/page.tsx**

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlaygroundEditor, EXAMPLES, DEFAULT } from '@/components/playground/editor'
import { PlaygroundOutput } from '@/components/playground/output'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRun() {
    setLoading(true)
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setStdout(data.stdout || '')
      setStderr(data.stderr || '')
    } catch {
      setStderr('Request failed. Is the API server running?')
    } finally {
      setLoading(false)
    }
  }

  function loadExample(code: string) {
    setCode(code)
    setStdout('')
    setStderr('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-zinc-800">
        <Select onValueChange={(v) => loadExample(EXAMPLES[parseInt(v)].code)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Load example..." />
          </SelectTrigger>
          <SelectContent>
            {EXAMPLES.map((ex, i) => (
              <SelectItem key={i} value={String(i)}>{ex.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleRun} disabled={loading} size="sm">
          {loading ? 'Running...' : 'Run'}
        </Button>
      </div>
      {/* Editor */}
      <div className="flex-1">
        <PlaygroundEditor code={code} onChange={setCode} />
      </div>
      {/* Output */}
      <div className="border-t border-zinc-800">
        <PlaygroundOutput stdout={stdout} stderr={stderr} />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Add Select component to shadcn**

Run: `npx shadcn@latest add select -o`

- [ ] **Step 5: Create src/app/api/run/route.ts (stub)**

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  // Stub: returns mock output. Replace with actual runtime call.
  return NextResponse.json({
    stdout: `[inklang] Executed ${code.split('\n').length} lines\n> Done.`,
    stderr: '',
  })
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/playground/ src/components/playground/ src/app/api/run/route.ts
git commit -m "chunk 8: playground UI with Monaco editor and stub API route

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 9: Build Verification and GitHub Setup

**Files:**
- Modify: `src/app/playground/page.tsx` (fix 'use client' + imports)
- Modify: `src/components/playground/output.tsx` (fix Tabs default)

- [ ] **Step 1: Run build**

Run: `npm run build` (in worktree)
Expected: BUILD SUCCEEDED

- [ ] **Step 2: Fix any build errors** (list them here and fix before proceeding)

- [ ] **Step 3: Verify export output**

Run: `ls out/` (check that `out/` directory was created with static files)

- [ ] **Step 4: Update GitHub remote**

Run: `git remote set-url origin https://github.com/inklang/inklang.git`

- [ ] **Step 5: Push to new remote**

Run: `git push -u origin feat/inklang-website`

- [ ] **Step 6: Commit**

```bash
git commit -m "chunk 9: ready for GitHub Pages deployment

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
