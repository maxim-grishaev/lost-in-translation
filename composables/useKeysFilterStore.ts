import { computed } from 'vue';
import { defineStore } from 'pinia';

const DEFAULT_STATE = {
  search: '',
  dateFrom: undefined as Date | undefined,
  dateTo: undefined as Date | undefined,
  // TODO: Add sortBy and sortOrder
  // sortBy: 'key',
  // sortOrder: 1,
};
export const useKeysFilterStore = defineStore('keys_filter', {
  state: () => ({ ...DEFAULT_STATE }),
  getters: {
    isValid: (state) =>
      !state.dateFrom || !state.dateTo || state.dateFrom < state.dateTo,

    changed: (state) =>
      computed(() => [state.search, state.dateFrom, state.dateTo] as const),
    isDefault: (state) =>
      (
        Object.entries(DEFAULT_STATE) as [keyof typeof DEFAULT_STATE, unknown][]
      ).every(([k, v]) => state[k] === v),
  },
  actions: {
    reset() {
      this.search = DEFAULT_STATE.search;
      this.dateFrom = DEFAULT_STATE.dateFrom;
      this.dateTo = DEFAULT_STATE.dateTo;
    },
  },
});
