import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useKeysFilterStore } from '~/composables/useKeysFilterStore';

export const DEFAULT_STATE = {
  pageIndex: 0,
  pageSize: 10,
  totalItems: 0, // For validation
};

export const PAGE_SIZE_ITEMS = [10, 50, 100, 250];
const useKeysPagesStoreRaw = defineStore('keys_pages', {
  state: () => DEFAULT_STATE,
  getters: {
    page: (state) => state.pageIndex + 1,
  },
  actions: {
    setTotalItems(value: number) {
      this.totalItems = value;
    },
    setPageSize(value: number) {
      this.pageSize = value;
      this.pageIndex = 0;
    },
    setPage(value: number) {
      this.pageIndex = value - 1;
    },
  },
});

export const useKeysPagesStore = () => {
  const keysPages = useKeysPagesStoreRaw();
  const keysFilter = useKeysFilterStore();

  watch(keysFilter.changed, (val) => {
    keysPages.pageIndex = 0;
    keysPages.totalItems = 0;
  });
  return keysPages;
};
