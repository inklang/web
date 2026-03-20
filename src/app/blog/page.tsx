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
