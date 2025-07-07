import type { APIKeysQuery, APIKeysResp } from '~/server/api/keys';
import type { APILangResp } from '~/server/api/langs';

export type FetchKeysQuery = APIKeysQuery;
export type FetchKeysResp = APIKeysResp;
export const fetchKeys = async (query: FetchKeysQuery) =>
  await $fetch<FetchKeysResp>('/api/keys', { method: 'GET', query });

export type FetchKnownLangResp = APILangResp;
export const fetchKnownLang = async () =>
  await $fetch<FetchKnownLangResp>('/api/langs');
