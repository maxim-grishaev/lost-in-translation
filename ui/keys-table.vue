<script lang="ts" setup>
import type { APIKeysResp } from '~/server/api/keys';
import { FLAG_NA, getFlagByLangCode } from '~/lib/getFlagByLangCode';
import KeyTableKey from './key-table-key.vue';
import KeyTableTranslation from './key-table-translation.vue';
import KeyTableUpdatedAt from './key-table-updated-at.vue';
import Col from './col.vue';
import KeyTablePopover from './key-table-popover.vue';

const { data } = defineProps<{ data: APIKeysResp }>();

const { lang, allLangCodes, getLangNameByCode, setLang } = await useLangStore();

const langOptions = computed(() => {
  return allLangCodes.map((it) => ({
    id: it,
    label: [
      getFlagByLangCode(it) || FLAG_NA,
      getLangNameByCode(it) || 'n/a',
    ].join(' '),
  }));
});

const otherLangs = computed(() =>
  allLangCodes.filter((it) => it !== lang.code),
);
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="w-3/10">Key</th>
        <th class="w-full">
          <USelect
            v-model="lang.code"
            @update:model-value="setLang"
            value-key="id"
            :items="langOptions"
            class="w-40"
          />
        </th>
        <th class="w-0">Updated&nbsp;on</th>
      </tr>
    </thead>
    <tbody>
      <KeyTablePopover
        v-for="it in data.items"
        :key="it.key"
        :foundKey="it"
        :lang="lang.code"
      >
        <tr class="hover:bg-white/3">
          <td class="w-3/10 max-w-36">
            <KeyTableKey :foundKey="it" />
          </td>
          <td class="w-full">
            <KeyTableTranslation :foundKey="it" :lang="lang.code" />
          </td>
          <td class="w-0">
            <KeyTableUpdatedAt :foundKey="it" />
          </td>
        </tr>
      </KeyTablePopover>
    </tbody>
  </table>
</template>

<style scoped>
th,
td {
  text-align: left;
  vertical-align: top;
}
tr {
  border-bottom: 1px solid var(--border-color-muted);
}
td {
  padding: 1rem 2rem 1rem 0;
}
th:last-child,
td:last-child {
  text-align: right;
}
td:first-child {
  padding-left: 1rem;
}
td:last-child {
  padding-right: 1rem;
}
tr:last-child {
  border-bottom: none;
}
</style>
