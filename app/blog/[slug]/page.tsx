import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'

const postsDir = path.join(process.cwd(), 'content/posts')

function getPost(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

function getOtherPosts(currentSlug: string) {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'))
  return files
    .filter(f => f.replace('.mdx', '') !== currentSlug)
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
    .slice(0, 2)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = getPost(params.slug)
  return {
    title: data.title,
    description: data.description ?? data.summary ?? '',
  }
}

const mdxComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: (props: any) => (
    <h3
      {...props}
      className="font-mono text-[#CCFF00] text-[15px] font-bold mt-10 mb-4 border-l-2 border-[#CCFF00] pl-3 leading-snug not-prose"
    />
  ),
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { data, content } = getPost(params.slug)
  const tags: string[] = Array.isArray(data.tags) ? data.tags : (data.tag ? [data.tag] : [])
  const otherPosts = getOtherPosts(params.slug)

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 max-w-3xl mx-auto">
      <a
        href="/blog"
        className="text-[#999] font-mono text-xs hover:text-[#CCFF00] transition-colors mb-12 block"
      >
        ← WRITING
      </a>

      {/* Tags — all of them */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono text-[#CCFF00] border border-[#CCFF00]"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      <h1 className="font-mono text-white text-2xl mb-4 leading-tight">{data.title}</h1>
      <p className="text-[#999] text-xs font-mono mb-12">{data.date}</p>

      <article className="
        prose prose-invert max-w-none
        prose-p:text-[#999] prose-p:leading-[1.9] prose-p:my-5 prose-p:text-[15px]
        prose-headings:font-mono prose-h1:text-white prose-h2:text-white prose-h4:text-white
        prose-a:text-[#CCFF00] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-bold
        prose-em:text-[#999]
        prose-blockquote:border-l-[#CCFF00]/30 prose-blockquote:text-[#999] prose-blockquote:not-italic prose-blockquote:text-sm prose-blockquote:my-6
        prose-hr:border-white/10 prose-hr:my-8
        prose-img:rounded-lg prose-img:my-8
        prose-code:text-[#CCFF00] prose-code:text-[13px] prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
        [&_p:has(>em:only-child)]:text-xs [&_p:has(>em:only-child)]:text-[#999] [&_p:has(>em:only-child)]:font-mono [&_p:has(>em:only-child)]:not-italic
      ">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      {/* Continue Reading */}
      {otherPosts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-white/10">
          <p className="font-mono text-[10px] text-[#999] uppercase tracking-widest mb-6">
            Continue Reading
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-white/10 rounded-lg p-5 hover:border-[#CCFF00]/40 transition-colors"
              >
                {post.tags.length > 0 && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono text-[#CCFF00] border border-[#CCFF00] mb-3">
                    {post.tags[0].toUpperCase()}
                  </span>
                )}
                <h3 className="font-mono text-white text-sm group-hover:text-[#CCFF00] transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#999] text-xs font-mono">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
