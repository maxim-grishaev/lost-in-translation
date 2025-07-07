<script lang="ts" setup>
import type { FoundKey } from '~/lib/directus';

const props = defineProps<{
  foundKey: FoundKey;
}>();

const trunc = computed(() => {
  const { key } = props.foundKey;
  return key.length > 23
    ? [key.substring(0, 10), key.substring(key.length - 10, key.length)].join(
        '...',
      )
    : key;
});
const ICONS = {
  clip: 'i-lucide-clipboard',
  check: 'i-lucide-check',
};

const icon = ref(ICONS.clip);
const copyToClipboard = () => {
  navigator.clipboard.writeText(props.foundKey.key);
  icon.value = ICONS.check;
  setTimeout(() => {
    icon.value = ICONS.clip;
  }, 2000);
};
</script>

<template>
  <UPopover mode="hover" arrow>
    <div class="font-mono text-sm truncate">
      {{ props.foundKey.key }}
    </div>
    <template #content>
      <div class="font-mono text-sm p-4">
        {{ props.foundKey.key }}
        <UButton
          variant="outline"
          size="sm"
          :icon="icon"
          aria-label="Copy to clipboard"
          @click="copyToClipboard"
        />
      </div>
    </template>
  </UPopover>
</template>
