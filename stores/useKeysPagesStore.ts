export const DEFAULT_STATE = {
  pageIndex: 0,
  pageSize: 10,
  // totalItems: 0, // TODO: validation
};

export const PAGE_SIZE_ITEMS = [10, 50, 100, 250];
const useKeysPagesStoreRaw = defineStore('keys_pages', () => {
  const pageIndex = ref(DEFAULT_STATE.pageIndex);
  const pageSize = ref(DEFAULT_STATE.pageSize);
  // const totalItems = ref(DEFAULT_STATE.totalItems);

  return {
    pageIndex,
    pageSize,
    // totalItems,
    page: computed(() => pageIndex.value + 1),
    // setTotalItems: (value: number) => {
    //   totalItems.value = value;
    // },
    setPageSize: (value: number) => {
      pageSize.value = value;
      pageIndex.value = 0;
    },
    setPage: (value: number) => {
      pageIndex.value = value - 1;
    },
  };
});

export const useKeysPagesStore = () => {
  const keysPages = useKeysPagesStoreRaw();

  const keysFilter = useKeysFilterStore();
  watch(keysFilter.changed, () => {
    keysPages.pageIndex = 0;
    // keysPages.totalItems = 0;
  });

  return keysPages;
};
