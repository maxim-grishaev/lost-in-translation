<script lang="ts" setup>
import type { DirectusFoundKey } from '~/lib/directus/DirectusFoundKey';
import Col from './col.vue';
import Row from './row.vue';

const { getLangNameByCode } = useLangStore();
const { foundKey, lang } = defineProps<{
  foundKey: DirectusFoundKey;
  lang: string;
}>();

const tr = computed(() =>
  foundKey.translations.find((it) => it.languages_code === lang),
);
</script>

<template>
  <Col class="gap-2">
    <span v-if="tr">{{ tr.value }}</span>
    <Row v-else class="text-gray-500 justify-start gap-2!">
      <UIcon name="i-lucide-flag-off" />
      No {{ getLangNameByCode(lang) }} ({{ lang }}) translation available
    </Row>
  </Col>
</template>
