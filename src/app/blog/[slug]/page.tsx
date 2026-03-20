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
