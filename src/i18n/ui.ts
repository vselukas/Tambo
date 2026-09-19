import cs from './cs.json';
import en from './en.json';

export const locales = ['cs', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'cs';

export const ui = { cs, en } satisfies Record<Lang, typeof cs>;

/** Narrow Astro.currentLocale (string | undefined) to a known Lang. */
export function getLang(locale: string | undefined): Lang {
    return locales.includes(locale as Lang) ? (locale as Lang) : defaultLang;
}

/** Full UI dictionary for a language. */
export function getUi(locale: string | undefined) {
    return ui[getLang(locale)];
}
