import { defineStore } from 'pinia';
import { DEFAULT_LANG } from '~/lib/lang';

const DEFAULT_STATE = {
  lang: DEFAULT_LANG,
};
export const useLangStore = defineStore('langs', {
  state: () => DEFAULT_STATE,
});
