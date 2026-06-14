import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const alt = 'Lemon Wang — LabNotes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const postsDir = path.join(process.cwd(), 'content/posts')

export default function Image({ params }: { params: { slug: string } }) {
  let title = 'LabNotes'
  let tag = ''
  try {
    const raw = fs.readFileSync(path.join(postsDir, `${params.slug}.mdx`), 'utf-8')
    const { data } = matter(raw)
    title = data.title ?? title
    const tags = Array.isArray(data.tags) ? data.tags : data.tag ? [data.tag] : []
    tag = tags[0] ?? ''
  } catch {
    // fall back to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 56 }}>🍋</div>
          {tag ? (
            <div
              style={{
                display: 'flex',
                fontSize: 26,
                color: '#CCFF00',
                fontWeight: 700,
                border: '2px solid #CCFF00',
                borderRadius: 8,
                padding: '6px 16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            fontSize: 30,
            color: '#CCFF00',
            fontWeight: 700,
            borderTop: '3px solid #CCFF00',
            paddingTop: 16,
          }}
        >
          lemon.wang / labnotes
        </div>
      </div>
    ),
    { ...size }
  )
}
