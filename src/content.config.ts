import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lang = z.enum(['cs', 'en']);

/** Reader reviews shown in the Testimonials section. One JSON file per review. */
const testimonials = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
    schema: z.object({
        lang,
        order: z.number(),
        quote: z.string(),
        author: z.string(),
    }),
});

/** Purchase options shown in the "Choose your form" section. One JSON file per option. */
const products = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
    schema: z.object({
        lang,
        order: z.number(),
        title: z.string(),
        subtitle: z.string(),
        price: z.string(),
        features: z.array(z.string()),
        cta: z.string(),
        /** Small pill in the corner, e.g. "nejvýhodnější". Ignored when soldOut. */
        badge: z.string().optional(),
        /** Visually emphasised card with the gradient button. */
        highlight: z.boolean().default(false),
        /** Greyed-out card with a "sold out" pill and disabled button. */
        soldOut: z.boolean().default(false),
        /** Where the button leads. Empty = button without action (shop not connected yet). */
        href: z.string().optional(),
    }),
});

export const collections = { testimonials, products };
