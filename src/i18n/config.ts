export const LANGS = ['en', 'zh'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export const LANG_LABEL: Record<Lang, string> = {
  en: 'EN',
  zh: '中文',
};

export const LANG_HTML: Record<Lang, string> = {
  en: 'en',
  zh: 'zh',
};

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}

/**
 * The path the site is served from. On GitHub Pages this is a project subpath,
 * not the origin root, so nothing may hard-code a leading `/`.
 * Astro normalises `base` to always end in a slash; trimmed here so callers can
 * concatenate a rooted path without doubling it.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an app-absolute path with the deployment base. */
export function withBase(path = '/'): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Prefix an app-relative path with the current locale, under the base. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(`/${lang}${clean === '/' ? '/' : clean}`);
}
