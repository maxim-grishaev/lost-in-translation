<script lang="ts" setup>
import type { DirectusFoundKey } from '~/lib/directus/DirectusFoundKey';
import { FLAG_NA, getFlagByLangCode } from '~/lib/getFlagByLangCode';
import Col from './col.vue';

const { getLangNameByCode } = useLangStore();

const { foundKey, lang } = defineProps<{
  foundKey: DirectusFoundKey;
  lang: string;
}>();

const otherLangs = computed(() =>
  foundKey.translations.filter((it) => it.languages_code !== lang),
);
</script>

<template>
  <UPopover mode="hover" arrow :open-delay="200" :content="{ sideOffset: -4 }">
    <slot />

    <template #content v-if="otherLangs.length > 0">
      <Col class="gap-2! max-w-xl p-4" v-if="otherLangs.length > 0">
        <div
          v-if="otherLangs.length > 0"
          v-for="tr in otherLangs"
          :key="tr.id"
          :value="tr.languages_code"
          class="border-b-1 last:border-0 border-b-gray-800 pb-2 w-full last:pb-0"
        >
          <span class="text-sm">
            <strong>
              {{ getFlagByLangCode(tr.languages_code) || FLAG_NA }}
              {{ getLangNameByCode(tr.languages_code) || tr.languages_code }}:
            </strong>
            {{ tr.value }}
          </span>
        </div>
      </Col></template
    >
  </UPopover>
</template>
