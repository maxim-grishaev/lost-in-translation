import { useKeysFilterStore } from '~/composables/useKeysFilterStore';
import { toError } from '~/lib/toError';
import type { APIKeysQuery, FilterData } from '~/server/api/keys';

export type DataState = 'pending' | 'ok' | 'error';
export const useFilterDataStore = async () => {
  const keysFilter = useKeysFilterStore();
  const keysPages = useKeysPagesStore();

  const query = computed((): APIKeysQuery | null => {
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

  const data = ref<FilterData>();
  const error = ref<Error>();
  const status = ref<DataState>('pending');

  watchThrottled(
    query,
    (newQ, _old) => {
      if (!newQ) {
        return;
      }
      status.value = 'pending';
      $fetch<FilterData>('/api/keys', { method: 'GET', query: newQ })
        .then((res) => {
          data.value = res;
          status.value = 'ok';
        })
        .catch((err: unknown) => {
          status.value = 'error';
          error.value = toError(err);
        });
    },
    {
      immediate: true,
      throttle: 1000,
    },
  );

  return {
    data,
    error,
    status,
  };
};
