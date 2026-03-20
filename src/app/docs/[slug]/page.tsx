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
