import { getAllPosts } from '@/lib/posts'

const FIRST_YEAR = 2026 // Vol. 1

/**
 * Magazine-style issue line, derived from the newest field note:
 * Vol. = years since 2026 (+1), No. = month, date = that month.
 * Publishing a new post moves the issue forward automatically.
 */
export function getCurrentIssue() {
  const dates = getAllPosts().map(p => new Date(p.date)).filter(d => !isNaN(d.getTime()))
  const latest = dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date()
  const vol = latest.getUTCFullYear() - FIRST_YEAR + 1
  const no = latest.getUTCMonth() + 1
  const month = latest.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
  return { vol, no, label: `Vol. ${vol} · No. ${no} · ${month} ${latest.getUTCFullYear()}` }
}
