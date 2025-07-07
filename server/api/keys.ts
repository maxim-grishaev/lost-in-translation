import { toDate } from '~/lib/date';
import { isRecord } from '~/lib/isRecord';
import {
  getDirectusFoundKeyURLs,
  type DirectusFoundKey,
} from '~/lib/directus/DirectusFoundKey';
import { DirectusCountResponse, DirectusResponse } from '~/lib/directus/types';
import { COLLECTION_DEFAULTS } from '~/lib/directus/defaults';

type DirectusKeysReqParams = Parameters<typeof getDirectusFoundKeyURLs>[0];

export type APIKeysQuery = {
  page_index?: number | string;
  page_size?: number | string;
  search?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_reverse?: unknown;
};

export type APIKeysResp = {
  count: number;
  items: DirectusFoundKey[];
};

const validateAPIKeysQuery = (data: unknown): DirectusKeysReqParams | void => {
  if (!isRecord(data)) {
    return;
  }
  const pageIndex = Number(data.page_index);
  return {
    pageIndex: Number.isInteger(pageIndex) ? pageIndex : undefined,
    pageSize: Number(data.page_size ?? COLLECTION_DEFAULTS.limit),
    search: typeof data.search === 'string' ? data.search : undefined,
    dateFrom: toDate(data.date_from),
    dateTo: toDate(data.date_to),
    sortBy: data.sort_by ? String(data.sort_by) : undefined,
    sortReverse: Boolean(data.sort_reverse),
  };
};

export default defineEventHandler(async (event): Promise<APIKeysResp> => {
  const params = await getValidatedQuery(event, validateAPIKeysQuery);
  const { countURL, itemsURL } = getDirectusFoundKeyURLs(params);

  const [count, items] = await Promise.all([
    event
      .$fetch<DirectusCountResponse>(countURL)
      .then((res) => Number(res.data[0]?.count || 0)),
    event
      .$fetch<DirectusResponse<DirectusFoundKey[]>>(itemsURL)
      .then((res) => res.data),
  ]);

  return {
    count,
    items,
  };
});
