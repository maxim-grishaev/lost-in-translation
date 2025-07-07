const lang: Record<string, string> = {
  'en-GB': 'English (UK)',
  'nl-NL': 'Dutch',
  'fr-FR': 'French',
};
export const DEFAULT_LANG = 'en-GB';
export const ALL_LANGS = Object.keys(lang);

export const getLang = (code: string | undefined) =>
  code && code in lang ? lang[code] : (code ?? null);

const flag: Record<string, string> = {
  'en-GB': '🇬🇧',
  'nl-NL': '🇳🇱',
  'fr-FR': '🇫🇷',
};
export const FLAG_NA = '🏳️';

export const getFlag = (code: string | undefined) =>
  code && code in flag ? flag[code] : null;
