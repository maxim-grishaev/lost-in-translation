<script lang="ts" setup>
import type { FilterData } from '~/server/api/keys';
import { ALL_LANGS, FLAG_NA, getFlag, getLang } from '~/lib/lang';
import { useLangStore } from '~/composables/useLangStore';
import KeyTableKey from './key-table-key.vue';
import KeyTableTranslation from './key-table-translation.vue';
import KeyTableUpdatedAt from './key-table-updated-at.vue';
import { NA } from './na';

const langStore = useLangStore();

const props = defineProps<{ data: FilterData; lang: string }>();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="w-3/10 max-w-48">Key</th>
        <th class="w-5/10">
          <USelect
            v-model="langStore.lang"
            value-key="id"
            :items="
              ALL_LANGS.map((it) => ({
                id: it,
                label: [getFlag(it) || FLAG_NA, getLang(it) || NA].join(' '),
              }))
            "
            class="w-auto"
          />
        </th>
        <th>Updated&nbsp;on</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="it in props.data.items" :key="it.key">
        <td class="w-3/10 max-w-48 align-top">
          <KeyTableKey :foundKey="it" />
        </td>
        <td class="w-5/10">
          <KeyTableTranslation :foundKey="it" :lang="props.lang" />
        </td>
        <td class="w-2/10 align-top">
          <KeyTableUpdatedAt :updatedAt="it.updatedAt" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
