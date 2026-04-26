import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Lemon's Mission Tree | lemon.wang",
  description:
    "A public record of decision-making under uncertainty. Each piece follows Lemon's MDM — from core technology to verticals, validation, and exit.",
}

function getLMTPosts() {
  const dir = path.join(process.cwd(), 'content/lmt')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title as string,
        date: data.date as string,
        number: (data.number as string) ?? '',
        category: (data.category as string) ?? '',
        summary: data.summary as string,
      }
    })
    .sort((a, b) => Number(a.number) - Number(b.number))
}

export default function LMTPage() {
  const posts = getLMTPosts()

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/"
        className="text-[#999] font-mono text-xs hover:text-[#CCFF00] transition-colors mb-12 block"
      >
        ← lemon.wang
      </Link>

      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-[#CCFF00] inline-block" />
          <span className="font-mono text-[11px] uppercase tracking-[3px] text-[#CCFF00]">
            Mission Tree
          </span>
        </div>
        <h1 className="font-sans text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
          Lemon&apos;s Mission Tree
        </h1>
        <p className="text-[#888] text-[15px] font-sans leading-relaxed max-w-xl">
          A public record of decision-making under uncertainty. Each piece follows
          Lemon&apos;s MDM — from core technology to verticals, validation, and exit.
        </p>
      </div>

      {/* Post list */}
      <ul className="space-y-0">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-white/10 last:border-0">
            <Link
              href={`/lmt/${post.slug}`}
              className="group flex items-start gap-5 py-7 hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors"
            >
              {/* Number */}
              <span className="font-mono text-[11px] text-[#CCFF00] font-bold pt-0.5 flex-shrink-0 w-8">
                #{post.number}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {post.category && (
                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-widest font-mono text-[#CCFF00] border border-[#CCFF00]/50 mb-3">
                    {post.category}
                  </span>
                )}
                <h2 className="font-mono text-white text-base group-hover:text-[#CCFF00] transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-[#666] text-sm font-sans leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              {/* Date + arrow */}
              <div className="flex-shrink-0 flex flex-col items-end gap-2 pt-0.5">
                <span className="text-[#555] text-[11px] font-mono whitespace-nowrap">{post.date}</span>
                <span className="text-[#555] group-hover:text-[#CCFF00] transition-colors text-lg leading-none">→</span>
              </div>
            </Link>
          </li>
        ))}

        {/* Placeholder #02 */}
        <li className="border-b border-white/10 last:border-0">
          <div className="flex items-start gap-5 py-7 opacity-30 cursor-default">
            <span className="font-mono text-[11px] text-[#555] font-bold pt-0.5 flex-shrink-0 w-8">#02</span>
            <div className="flex-1">
              <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-widest font-mono text-[#555] border border-[#555]/50 mb-3">
                COMING SOON
              </span>
              <h2 className="font-mono text-[#555] text-base leading-snug">
                Desktop PCB 3D Printing: A Category That Doesn&apos;t Have a Name yet
              </h2>
            </div>
          </div>
        </li>
      </ul>
    </main>
  )
}
