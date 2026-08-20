/**
 * Public i18n surface. Components import `useTranslations` from here and never
 * reach into a locale module directly, so adding a language is a one-line
 * change and no component ever learns which locale it is rendering.
 *
 * Copy lives in `en.ts` / `zh.ts`; the shape lives in `types.ts`. Both locales
 * are typed as `Dictionary`, so a section added to one and forgotten in the
 * other is a build error rather than a missing string on the page.
 */
import type { Lang } from './config';
import type { Dictionary } from './types';
import { en } from './en';
import { zh } from './zh';

export * from './types';

export const dictionaries: Record<Lang, Dictionary> = { en, zh };

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}
