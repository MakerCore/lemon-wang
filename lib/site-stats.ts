import fs from 'fs'
import path from 'path'
import { SHELVES } from '@/lib/library'

export interface Stat { key: string; value: string; label: string; source?: string }

/**
 * Proof-strip numbers. Editable in content/site-stats.json (no code change);
 * the shelf count is derived from lib/library.ts.
 */
export function getSiteStats(): { updated?: string; stats: Stat[] } {
  const file = path.join(process.cwd(), 'content/site-stats.json')
  let data: { updated?: string; stats?: Stat[] } = {}
  try { data = JSON.parse(fs.readFileSync(file, 'utf-8')) } catch { /* fall back to shelves only */ }
  const stats = (data.stats ?? []).filter(s => s && s.value && s.label)
  return {
    updated: data.updated,
    stats: [...stats, { key: 'shelves', value: String(SHELVES.length), label: 'application shelves' }],
  }
}
