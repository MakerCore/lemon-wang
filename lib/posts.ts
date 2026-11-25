import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { SHELVES } from '@/lib/library'

/**
 * Single source of truth for field notes (content/posts).
 * Everything that lists posts — /blog, the homepage, shelf pages, /llms.txt,
 * /catalogue.json and the sitemaps — reads from here.
 *
 * Publishing = one new .mdx file in content/posts, plus its cover image in
 * public/images. Optional frontmatter:
 *   cover, coverAlt, coverCaption   cover photo (article page + Image archive)
 *   gallery: [{ src, alt, caption }] more field photos for the Image archive
 *   shelves: ["tabletop-wargaming"]  shelf slugs; the first sets the call number
 *   wing: "B"                        call number for posts on no shelf
 *   startHere: true                  the post behind "Start with the best field note"
 */

const postsDir = path.join(process.cwd(), 'content/posts')
const WING_COLOR = '#CCFF00'

export interface Photo { src: string; alt: string; caption: string }

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover?: Photo
  gallery: Photo[]
  shelves: string[]
  wing?: string
  startHere: boolean
}

export interface CallNumber { code: string; color: string }

function toPhoto(src: unknown, alt: unknown, caption: unknown, title: string): Photo | undefined {
  if (typeof src !== 'string' || !src) return undefined
  const cap = typeof caption === 'string' && caption ? caption : title
  return { src, alt: typeof alt === 'string' && alt ? alt : cap, caption: cap }
}

function toPost(filename: string): Post {
  const { data } = matter(fs.readFileSync(path.join(postsDir, filename), 'utf-8'))
  const slug = filename.replace(/\.mdx$/, '')
  const shelves: string[] = Array.isArray(data.shelves) ? data.shelves : []
  // Fail the build on a typo rather than silently dropping the post from its shelf.
  for (const s of shelves) {
    if (!SHELVES.some(shelf => shelf.slug === s)) throw new Error(`content/posts/${filename}: unknown shelf "${s}"`)
  }
  const gallery = Array.isArray(data.gallery) ? data.gallery : []
  return {
    slug,
    title: data.title,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date,
    tags: Array.isArray(data.tags) ? data.tags : data.tag ? [data.tag] : [],
    summary: data.summary,
    cover: toPhoto(data.cover, data.coverAlt, data.coverCaption, data.title),
    gallery: gallery.map(g => toPhoto(g?.src, g?.alt, g?.caption, data.title)).filter((p): p is Photo => !!p),
    shelves,
    wing: data.wing,
    startHere: data.startHere === true,
  }
}

/** All posts, newest first (ties broken by slug). */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(toPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || (a.slug < b.slug ? -1 : 1))
}

export function getPostsOnShelf(shelfSlug: string): Post[] {
  return getAllPosts().filter(p => p.shelves.includes(shelfSlug))
}

export function getStartHere(): Post | undefined {
  return getAllPosts().find(p => p.startHere)
}

/** The newest field photos: each post's cover, then its gallery. */
export function getArchivePhotos(n: number): { photo: Photo; post: Post }[] {
  return getAllPosts()
    .flatMap(post => [post.cover, ...post.gallery].filter((p): p is Photo => !!p).map(photo => ({ photo, post })))
    .slice(0, n)
}

/** Shelf code ("A2.1") of the first shelf, else the wing letter, else undefined. */
export function callNumberFor(post: Post): CallNumber | undefined {
  const shelf = SHELVES.find(s => s.slug === post.shelves[0])
  if (shelf) return { code: shelf.code, color: shelf.color }
  if (post.wing) return { code: post.wing, color: WING_COLOR }
  return undefined
}
