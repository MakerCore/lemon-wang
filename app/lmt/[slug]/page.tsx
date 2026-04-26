import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'

const lmtDir = path.join(process.cwd(), 'content/lmt')

function getPost(slug: string) {
  const filePath = path.join(lmtDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

function getOtherPosts(currentSlug: string) {
  if (!fs.existsSync(lmtDir)) return []
  return fs
    .readdirSync(lmtDir)
    .filter((f) => f.endsWith('.mdx') && f.replace('.mdx', '') !== currentSlug)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(lmtDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title as string,
        date: data.date as string,
        number: (data.number as string) ?? '',
        category: (data.category as string) ?? '',
      }
    })
    .sort((a, b) => Number(a.number) - Number(b.number))
    .slice(0, 2)
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { data } = getPost(params.slug)
  return {
    title: `${data.title} | Lemon's Mission Tree`,
    description: data.description ?? data.summary ?? '',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: Record<string, (props: any) => JSX.Element> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h2: (props: any) => (
    <h2
      {...props}
      className="font-mono text-white text-xl font-bold mt-14 mb-4 leading-snug border-l-2 border-[#CCFF00] pl-4"
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: (props: any) => (
    <h3
      {...props}
      className="font-mono text-white text-base font-bold mt-10 mb-3 leading-snug"
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hr: (props: any) => (
    <hr {...props} className="border-white/10 my-10" />
  ),
}

export default function LMTPostPage({ params }: { params: { slug: string } }) {
  const { data, content } = getPost(params.slug)
  const tags: string[] = Array.isArray(data.tags) ? data.tags : []
  const otherPosts = getOtherPosts(params.slug)

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/lmt"
        className="text-[#999] font-mono text-xs hover:text-[#CCFF00] transition-colors mb-12 block"
      >
        ← MISSION TREE
      </Link>

      {/* Meta row */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {data.number && (
          <span className="font-mono text-[11px] text-[#CCFF00] font-bold border border-[#CCFF00]/40 px-2 py-0.5 rounded">
            #{data.number}
          </span>
        )}
        {data.category && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#CCFF00] border border-[#CCFF00]/50 px-2 py-0.5 rounded">
            {data.category}
          </span>
        )}
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] uppercase tracking-wider text-[#555] border border-[#333] px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="font-mono text-white text-2xl lg:text-3xl font-bold mb-4 leading-tight">
        {data.title}
      </h1>
      <p className="text-[#555] text-xs font-mono mb-14">{data.date}</p>

      {/* Article body */}
      <article className="
        prose prose-invert max-w-none
        prose-p:text-[#999] prose-p:leading-8 prose-p:mb-6 prose-p:text-[15px]
        prose-headings:font-mono
        prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white
        prose-a:text-[#CCFF00] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-bold
        prose-em:text-[#999]
        prose-blockquote:border-l-[#CCFF00] prose-blockquote:text-[#999] prose-blockquote:not-italic prose-blockquote:text-sm prose-blockquote:my-8 prose-blockquote:pl-6
        prose-hr:border-white/10 prose-hr:my-10
        prose-img:rounded-lg prose-img:my-8 prose-img:border prose-img:border-white/10
        prose-code:text-[#CCFF00] prose-code:text-[13px] prose-code:bg-white/5 prose-code:px-1.5 prose-code:rounded
        prose-ul:text-[#999] prose-li:text-[#999]
        [&_p:has(>em:only-child)]:mt-16 [&_p:has(>em:only-child)]:text-xs [&_p:has(>em:only-child)]:text-[#555] [&_p:has(>em:only-child)]:font-mono
      ">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      {/* Continue Reading */}
      {otherPosts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-white/10">
          <p className="font-mono text-xs text-[#555] uppercase tracking-widest mb-6">
            More from Mission Tree
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/lmt/${post.slug}`}
                className="group block border border-white/10 rounded-lg p-5 hover:border-[#CCFF00]/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  {post.number && (
                    <span className="font-mono text-[10px] text-[#CCFF00] font-bold">
                      #{post.number}
                    </span>
                  )}
                  {post.category && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#555] border border-[#333] px-1.5 py-0.5 rounded">
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="font-mono text-white text-sm group-hover:text-[#CCFF00] transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#555] text-xs font-mono">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to list */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <Link
          href="/lmt"
          className="font-mono text-xs text-[#CCFF00] hover:text-white transition-colors"
        >
          ← All Mission Tree posts
        </Link>
      </div>
    </main>
  )
}
