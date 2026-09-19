// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://vselukas.github.io',
    base: '/Tambo',
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
