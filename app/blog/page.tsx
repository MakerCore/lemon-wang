import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getPosts() {
  const postsDir = path.join(process.cwd(), 'content/posts')
  const files = fs.readdirSync(postsDir)
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : (data.tag ? [data.tag] : []),
        summary: data.summary,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getPosts()
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 max-w-3xl mx-auto">
      <h1 className="font-mono text-[#CCFF00] text-2xl mb-12 tracking-tight">
        LABNOTES
      </h1>
      <ul className="space-y-8">
        {posts.map(post => (
          <li key={post.slug} className="border-b border-white/10 pb-8">
            <Link href={`/blog/${post.slug}`} className="group block">
              {(() => {
                const firstTag = Array.isArray(post.tags) ? post.tags[0] : ''
                return firstTag ? (
                  <div className="mb-3">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono text-[#CCFF00] border border-[#CCFF00]">
                      {firstTag.toUpperCase()}
                    </span>
                  </div>
                ) : null
              })()}
              <h2 className="font-mono text-white text-lg group-hover:text-[#CCFF00] transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-[#999] text-sm font-sans mb-3">{post.summary}</p>
              <span className="text-[#999] text-xs font-mono">{post.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
