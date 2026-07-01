import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

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

function plainText(markdown: string) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getFieldFaq(content: string) {
  const faqStart = content.indexOf('## Field FAQ')
  if (faqStart === -1) return []

  const faqSection = content
    .slice(faqStart + '## Field FAQ'.length)
    .split(/\n##\s+/)[0]

  const faqs: { question: string; answer: string }[] = []
  const questionPattern = /\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|$)/g
  let match: RegExpExecArray | null

  while ((match = questionPattern.exec(faqSection)) !== null) {
    const question = plainText(match[1])
    const answer = plainText(match[2])
    if (question && answer) faqs.push({ question, answer })
  }

  return faqs
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = getPost(params.slug)
  const url = `https://www.lemon.wang/blog/${params.slug}`
  const description = data.description ?? data.summary ?? ''
  return {
    title: data.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description,
      url,
      type: 'article',
      publishedTime: data.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: (props: any) => (
    <h3
      {...props}
      className="font-mono text-white text-xl font-bold mt-12 mb-4 leading-snug"
    />
  ),
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { data, content } = getPost(params.slug)
  const tags: string[] = Array.isArray(data.tags) ? data.tags : (data.tag ? [data.tag] : [])
  const otherPosts = getOtherPosts(params.slug)

  const description = data.description ?? data.summary ?? ''
  const faqs = getFieldFaq(content)
  const articleSchema = {
    '@type': 'BlogPosting',
    headline: data.title,
    description,
    datePublished: data.date,
    dateModified: data.date,
    mainEntityOfPage: `https://www.lemon.wang/blog/${params.slug}`,
    author: { '@type': 'Person', name: 'Lemon Wang', url: 'https://www.lemon.wang' },
    publisher: { '@type': 'Person', name: 'Lemon Wang', url: 'https://www.lemon.wang' },
    keywords: tags.join(', '),
  }
  const faqSchema = faqs.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      }
    : null

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 max-w-3xl mx-auto">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': faqSchema ? [articleSchema, faqSchema] : [articleSchema],
        }}
      />
      <a
        href="/blog"
        className="text-[#999] font-mono text-xs hover:text-[#CCFF00] transition-colors mb-12 block"
      >
        ← LABNOTES
      </a>

      {/* All tags */}
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
        prose-p:text-[#999] prose-p:leading-8 prose-p:mb-6 prose-p:text-[15px]
        prose-headings:font-mono prose-h1:text-white prose-h2:text-white prose-h4:text-white
        prose-h3:text-white prose-h3:font-mono prose-h3:text-xl prose-h3:font-bold prose-h3:mt-12 prose-h3:mb-4
        prose-a:text-[#CCFF00] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-bold
        prose-em:text-[#999]
        prose-blockquote:border-l-[#CCFF00] prose-blockquote:text-[#999] prose-blockquote:not-italic prose-blockquote:text-xs prose-blockquote:my-6
        prose-hr:border-white/10 prose-hr:my-8
        prose-img:rounded-lg prose-img:my-8
        prose-code:text-[#CCFF00] prose-code:text-[13px] prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
        [&_p:has(>em:only-child)]:mt-16 [&_p:has(>em:only-child)]:text-xs [&_p:has(>em:only-child)]:text-[#999] [&_p:has(>em:only-child)]:font-mono [&_p:has(>em:only-child)]:not-italic
      ">
        <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      {/* Continue Reading */}
      {otherPosts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-white/10">
          <p className="font-mono text-xs text-[#999] uppercase tracking-widest mb-6">
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
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono text-[#CCFF00] border border-[#CCFF00] mb-3 block">
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
