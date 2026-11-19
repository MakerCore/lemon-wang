import { buildCatalogue, BASE } from '@/lib/catalogue'

export const dynamic = 'force-static'

export function GET() {
  const c = buildCatalogue()
  const lines: string[] = []
  lines.push(`# ${c.name}`)
  lines.push('')
  lines.push(`> ${c.description} Curated by ${c.curator.name} (${c.curator.role}). Contact: ${c.curator.contact}.`)
  lines.push('')
  lines.push(`Machine-readable version: ${BASE}/catalogue.json`)
  lines.push('')
  lines.push('## Application shelves (Wing A)')
  for (const s of c.shelves) {
    const detail = [s.finding, s.money].filter(Boolean).join(' ')
    lines.push(`- ${s.call_number} ${s.name}${s.url ? ` (${s.url})` : ''}: ${detail || 'Being catalogued.'}`)
  }
  lines.push('')
  lines.push('## Capabilities (Wing F)')
  for (const f of c.capabilities) lines.push(`- ${f.call_number} ${f.name}: ${f.note ?? 'Being catalogued.'}`)
  lines.push('')
  lines.push('## Field notes and analysis')
  for (const i of c.items) lines.push(`- [${i.title}](${i.url})${i.call_number ? ` [${i.call_number}]` : ''} (${i.date}): ${i.summary ?? ''}`)
  lines.push('')
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
