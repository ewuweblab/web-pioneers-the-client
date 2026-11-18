import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Keystatic "Posts" collection, stored as src/content/posts/<slug>.mdoc.
// The entry id is the slug Keystatic generates from the title.
const posts = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // Public URL of the post's image, e.g. "/images/posts/<slug>/image.jpg".
    image: z.string().optional(),
  }),
});

export const collections = { posts };
