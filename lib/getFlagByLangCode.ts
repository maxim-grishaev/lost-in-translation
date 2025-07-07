const flag: Record<string, string> = {
  'en-GB': '🇬🇧',
  'nl-NL': '🇳🇱',
  'fr-FR': '🇫🇷',
};
export const FLAG_NA = '🏳️';

export const getFlagByLangCode = (code: string | undefined) =>
  code && code in flag ? flag[code] : null;
