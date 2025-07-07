import { getDirectusURLs, FoundKey, KeysReqParams } from '~/lib/directus';
import { DirectusCountResponse, DirectusResponse } from '~/lib/types';

const DEFAULTS = {
  limit: 100,
};

const isRecord = (record: unknown): record is Record<string, unknown> =>
  typeof record === 'object' && record !== null;

const toDate = (date: unknown): Date | undefined => {
  if (date === undefined) {
    return undefined;
  }
  const d = new Date(String(date));
  return d.toJSON() === null ? undefined : d;
};

export type APIKeysQuery = {
  page_index?: number | string;
  page_size?: number | string;
  search?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_reverse?: unknown;
};

export type FilterData = {
  count: number;
  items: FoundKey[];
};
export default defineEventHandler(async (event): Promise<FilterData> => {
  const params = await getValidatedQuery(
    event,
    (data): KeysReqParams | void => {
      if (!isRecord(data)) {
        return;
      }
      return {
        pageIndex: Number.isInteger(Number(data.page_index))
          ? Number(data.page_index)
          : undefined,
        pageSize: Number(data.page_size ?? DEFAULTS.limit),
        search: typeof data.search === 'string' ? data.search : undefined,
        dateFrom: toDate(data.date_from),
        dateTo: toDate(data.date_to),
        sortBy: data.sort_by ? String(data.sort_by) : undefined,
        sortReverse: Boolean(data.sort_reverse),
      };
    },
  );

  const { countURL, itemsURL } = getDirectusURLs(params);

  const [count, items] = await Promise.all([
    event
      .$fetch<DirectusCountResponse>(countURL)
      .then((res) => Number(res.data[0]?.count || 0)),
    event
      .$fetch<DirectusResponse<FoundKey[]>>(itemsURL)
      .then((res) => res.data),
  ]);

  return {
    count,
    items,
  };
});
