import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/** Keystatic may write `null` for empty optional fields; treat it as missing (coercing null would give 1970-01-01). */
const optional = <T extends z.ZodType>(schema: T) => z.preprocess(value => value ?? undefined, schema.optional())

// Articles are MDX files edited from the Keystatic admin (/keystatic, see keystatic.config.ts) or by hand;
// the file name is the slug.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: optional(z.coerce.date()),
    tags: z.array(z.string()).default([]),
    cover: optional(image()),
    draft: z.boolean().default(false)
  })
})

export const collections = { blog }
