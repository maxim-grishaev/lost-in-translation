<script lang="ts" setup>
import type { DirectusFoundKey } from '~/lib/directus/DirectusFoundKey';
import { FLAG_NA, getFlagByLangCode } from '~/lib/getFlagByLangCode';
import Row from './row.vue';
import Col from './col.vue';

const { foundKey } = defineProps<{
  foundKey: DirectusFoundKey;
}>();

const ICONS = {
  clip: 'i-lucide-clipboard',
  check: 'i-lucide-check',
};

const icon = ref(ICONS.clip);
const copyToClipboard = () => {
  navigator.clipboard.writeText(foundKey.key);
  icon.value = ICONS.check;
  setTimeout(() => {
    icon.value = ICONS.clip;
  }, 1500);
};
</script>

<template>
  <Col class="lg:flex-row lg:gap-2 lg:justify-between">
    <UTooltip :text="foundKey.key" :content="{ side: 'top' }">
      <span class="font-mono truncate text-sm">
        {{ foundKey.key }}
      </span>
    </UTooltip>

    <Row class="justify-end gap-1!">
      <span v-for="it in foundKey.translations" :key="it.id">
        {{ getFlagByLangCode(it.languages_code) || FLAG_NA }}
      </span>
      <UTooltip text="Copy key to clipboard" :content="{ side: 'top' }">
        <UButton
          variant="ghost"
          size="xs"
          color="neutral"
          :icon="icon"
          aria-label="Copy to clipboard"
          @click="copyToClipboard"
        />
      </UTooltip>
    </Row>
  </Col>
</template>
