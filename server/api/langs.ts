import { DirectusResponse, LanguageCodeItem } from '~/lib/directus/types';
import { DIRECTUS_URL_LANG } from '~/lib/directus/url';

export type APILangMap = Record<string, LanguageCodeItem>;
export type APILangResp = {
  langCodes: string[];
  langMap: APILangMap;
};

export default defineEventHandler(async (event): Promise<APILangResp> => {
  const langItems = await event
    .$fetch<DirectusResponse<LanguageCodeItem[]>>(DIRECTUS_URL_LANG)
    .then((res) => res.data);

  const firstItem = langItems[0];
  if (!firstItem) {
    throw new Error('No language items found');
  }

  const langCodes = langItems.map((it) => it.code);
  const langMap = langItems.reduce((memo, item) => {
    memo[item.code] = item;
    return memo;
  }, {} as APILangMap);

  return {
    langCodes,
    langMap,
  };
});
