import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const FIRST_YEAR = 2026 // Vol. 1

/**
 * Magazine-style issue line, derived from the newest field note:
 * Vol. = years since 2026 (+1), No. = month, date = that month.
 * Publishing a new post moves the issue forward automatically.
 */
export function getCurrentIssue() {
  const dir = path.join(process.cwd(), 'content/posts')
  const dates = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => {
        const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf-8'))
        return new Date(data.date as string)
      }).filter(d => !isNaN(d.getTime()))
    : []
  const latest = dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date()
  const vol = latest.getUTCFullYear() - FIRST_YEAR + 1
  const no = latest.getUTCMonth() + 1
  const month = latest.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
  return { vol, no, label: `Vol. ${vol} · No. ${no} · ${month} ${latest.getUTCFullYear()}` }
}
