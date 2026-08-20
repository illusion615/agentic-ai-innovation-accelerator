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

/** Prefix an app-relative path with the current locale. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean === '/' ? '/' : clean}`;
}
