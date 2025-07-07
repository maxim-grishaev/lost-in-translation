import { toError } from '~/lib/toError';
import { fetchKeys, type FetchKeysQuery, type FetchKeysResp } from '~/lib/api';

export type DataState = 'pending' | 'ok' | 'error';
export const useKeysDataStore = () => {
  const keysFilter = useKeysFilterStore();
  const keysPages = useKeysPagesStore();

  const query = computed((): FetchKeysQuery | null => {
    if (!keysFilter.isValid) {
      return null;
    }
    return {
      search: keysFilter.search,
      page_index: keysPages.pageIndex,
      page_size: keysPages.pageSize,
      date_from: keysFilter.dateFrom?.toISOString(),
      date_to: keysFilter.dateTo?.toISOString(),
    };
  });

  const { status, refresh, error, data } = useAsyncData('keysData', async () =>
    query.value ? fetchKeys(query.value) : null,
  );

  watchThrottled(
    query,
    (newQ, _old) => {
      if (newQ) {
        refresh();
      }
    },
    {
      immediate: true,
      throttle: 1000,
    },
  );

  return {
    data,
    error: computed(() => (error.value ? toError(error.value) : undefined)),
    status,
    isFetching: computed(
      () => status.value === 'pending' || status.value === 'idle',
    ),
  };
};
