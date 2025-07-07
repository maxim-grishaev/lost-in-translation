import { fetchKnownLang } from '~/lib/api';
import type { APILangMap } from '~/server/api/langs';

export const useLangStore = defineStore('lang', {
  state: () => ({
    langCode: '',
    langMap: {} as APILangMap,
    allLangCodes: [] as string[],
  }),
  getters: {
    lang: (state) => state.langMap[state.langCode],
  },
  actions: {
    async init() {
      const { langCodes, langMap } = await fetchKnownLang();
      if (!langCodes.length) {
        throw new Error('No languages found');
      }
      this.langCode = langCodes[0];
      this.langMap = langMap;
      this.allLangCodes = langCodes;
    },

    setLang(code: string) {
      if (code in this.langMap) {
        this.langCode = code;
      }
    },

    getLangNameByCode(code: string) {
      return code in this.langMap ? this.langMap[code].name : undefined;
    },
  },
});
