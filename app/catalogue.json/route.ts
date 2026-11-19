import { buildCatalogue } from '@/lib/catalogue'

export const dynamic = 'force-static'

export function GET() {
  return Response.json(buildCatalogue())
}
