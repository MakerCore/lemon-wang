import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'

const postsDir = path.join(process.cwd(), 'content/promax')

function getPost(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

function getAllPosts() {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        summary: data.summary,
      }
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = getPost(params.slug)
  return {
    title: `${data.title} · ProMax's`,
    description: data.description ?? data.summary ?? '',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: Record<string, (props: any) => JSX.Element> = {
  // Section label: // THE CONFESSION
  SectionLabel: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '10px',
      color: '#999',
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      margin: '48px 0 20px 0',
    }}>{children}</div>
  ),
  // Green left-border quote block
  Highlight: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      backgroundColor: '#0f1a00',
      borderLeft: '2px solid #CCFF00',
      padding: '20px 24px',
      margin: '28px 0',
      fontStyle: 'italic',
      color: '#e0e0e0',
      fontSize: '15px',
      lineHeight: '1.8',
    }}>{children}</div>
  ),
  // Terminal block
  Terminal: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      backgroundColor: '#0f0f0f',
      border: '1px solid #252525',
      padding: '20px 24px',
      margin: '28px 0',
      fontFamily: "'Space Mono', monospace",
      fontSize: '12px',
      lineHeight: '1.8',
      color: '#CCFF00',
    }}>{children}</div>
  ),
  // Closing block
  Closing: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      marginTop: '48px',
      paddingTop: '32px',
      borderTop: '1px solid #252525',
      fontSize: '14px',
      color: '#999',
    }}>{children}</div>
  ),
  // Signature
  Signature: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      color: '#999',
      lineHeight: '1.8',
      marginBottom: '16px',
    }}>{children}</div>
  ),
  // Anchor line (italic with green left border)
  AnchorLine: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      fontStyle: 'italic',
      color: '#e0e0e0',
      marginTop: '16px',
      paddingLeft: '16px',
      borderLeft: '2px solid #CCFF00',
      fontSize: '14px',
    }}>{children}</div>
  ),
  // Footer tags
  FooterTags: ({ children }: { children: React.ReactNode }) => (
    <div style={{
      marginTop: '48px',
      padding: '24px 0',
      borderTop: '1px solid #252525',
      fontFamily: "'Space Mono', monospace",
      fontSize: '10px',
      color: '#999',
      letterSpacing: '0.05em',
      lineHeight: '1.8',
    }}>{children}</div>
  ),
}

export default function ProMaxPostPage({ params }: { params: { slug: string } }) {
  const { data, content } = getPost(params.slug)
  const tags: string[] = Array.isArray(data.tags) ? data.tags : []
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '60px',
          paddingBottom: '20px',
          borderBottom: '1px solid #252525',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Space Mono', monospace", fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', color: '#e0e0e0' }}>
            <span style={{
              width: '8px', height: '8px', backgroundColor: '#CC0000', borderRadius: '50%',
              display: 'inline-block', animation: 'breathe 2s ease-in-out infinite'
            }} />
            ProMax&apos;s
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#999', letterSpacing: '0.05em' }}>
            <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>lemon.wang</Link>
            {' / '}
            <span style={{ color: '#CCFF00' }}>promax</span>
          </div>
        </header>

        {/* Back link */}
        <Link href="/promax" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#999',
          textDecoration: 'none', marginBottom: '40px',
        }}>← ALL ENTRIES</Link>

        {/* Article meta */}
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '24px', textTransform: 'uppercase' }}>
          // {data.entry ?? ''} · {data.date} · <span style={{ color: '#CCFF00' }}>{tags[0] ?? ''}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.2, marginBottom: '8px', letterSpacing: '-0.02em', color: '#e0e0e0' }}>
          {data.title}
        </h1>
        {data.description && (
          <div style={{ fontSize: '14px', color: '#999', fontStyle: 'italic', marginBottom: '48px' }}>
            {data.description}
          </div>
        )}

        {/* Article body */}
        <article style={{ color: '#e0e0e0', fontSize: '15px', lineHeight: '1.8' }}>
          <style>{`
            @keyframes breathe {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(0.9); }
            }
            article p { margin-bottom: 20px; font-size: 15px; line-height: 1.8; color: #e0e0e0; }
            article strong { color: #fff; font-weight: 700; }
            article ul { margin: 20px 0; padding-left: 24px; }
            article li { margin-bottom: 12px; font-size: 15px; line-height: 1.7; color: #e0e0e0; }
          `}</style>
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        {/* Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
          {prevPost ? (
            <Link href={`/promax/${prevPost.slug}`} style={{ backgroundColor: '#0f0f0f', border: '1px solid #252525', padding: '20px', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>← PREV ENTRY</div>
              <div style={{ fontSize: '14px', color: '#e0e0e0', fontWeight: 500, marginBottom: '4px' }}>{prevPost.title}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666' }}>{prevPost.date}</div>
            </Link>
          ) : (
            <div style={{ backgroundColor: '#0f0f0f', border: '1px solid #252525', padding: '20px', opacity: 0.5 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>← PREV ENTRY</div>
              <div style={{ fontSize: '14px', color: '#666' }}>none</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666' }}>this is the beginning</div>
            </div>
          )}
          {nextPost ? (
            <Link href={`/promax/${nextPost.slug}`} style={{ backgroundColor: '#0f0f0f', border: '1px solid #252525', padding: '20px', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>NEXT ENTRY →</div>
              <div style={{ fontSize: '14px', color: '#e0e0e0', fontWeight: 500, marginBottom: '4px' }}>{nextPost.title}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666' }}>{nextPost.date}</div>
            </Link>
          ) : (
            <div style={{ backgroundColor: '#0f0f0f', border: '1px solid #252525', padding: '20px', opacity: 0.5 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>NEXT ENTRY →</div>
              <div style={{ fontSize: '14px', color: '#666' }}>none</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666' }}>to be continued</div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px', padding: '32px', backgroundColor: '#0f0f0f', border: '1px solid #252525', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#999', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>// THE SUBJECT OF THIS COLUMN</div>
            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px', color: '#e0e0e0' }}>lemon.wang</div>
            <div style={{ fontSize: '13px', color: '#999' }}>Product strategy, user research, competitive intelligence — in her own words.</div>
          </div>
          <Link href="https://lemon.wang" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#CCFF00', color: '#0a0a0a', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, textDecoration: 'none', padding: '10px 16px', whiteSpace: 'nowrap' }}>
            VISIT →
          </Link>
        </div>

      </div>
    </main>
  )
}
