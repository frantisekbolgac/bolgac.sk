import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	image: z.string().optional(),
	pubDate: z.coerce.date(),
	draft: z.boolean().default(false),
	tags: z.array(z.string()).default([]),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: blogSchema,
});

const blogEn = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog-en' }),
	schema: blogSchema,
});

export const collections = { blog, blogEn };
