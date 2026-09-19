// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves the site under /Tambo/, but visual tools (Stacki) and
// plain `astro dev` expect it at the root – so the prefix is build-only.
// Every internal link goes through import.meta.env.BASE_URL / astro:i18n,
// so both modes resolve correctly.
const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
    site: 'https://vselukas.github.io',
    base: isBuild ? '/Tambo' : '/',
    trailingSlash: 'ignore',

    i18n: {
        defaultLocale: 'cs',
        locales: ['cs', 'en'],
        routing: {
            prefixDefaultLocale: false,
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
});
