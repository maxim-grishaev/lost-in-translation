<script lang="ts" setup>
import type { FoundKey } from '~/lib/directus';
import { FLAG_NA, getFlag, getLang } from '~/lib/lang';

const props = defineProps<{
  foundKey: FoundKey;
  lang: string;
}>();

const tr = computed(() =>
  props.foundKey.translations.find((it) => it.languages_code === props.lang),
);
const otherTrs = computed(() =>
  props.foundKey.translations.filter((it) => it.languages_code !== props.lang),
);
</script>

<template>
  <UPopover mode="hover" arrow>
    <div class="flex flex-col gap-2">
      <span v-if="tr">{{ tr.value }}</span>
      <span v-else class="text-gray-500">
        <UIcon name="i-lucide-flag-off" />
        No translation for {{ props.lang }}
      </span>

      <span class="text-sm" v-if="otherTrs.length > 0">
        {{
          otherTrs.map((it) => getFlag(it.languages_code) || FLAG_NA).join(' ')
        }}
      </span>
    </div>
    <template #content v-if="otherTrs.length > 0">
      <div class="flex flex-col items-baseline gap-2 p-4 w-xl">
        <div
          v-for="it in otherTrs"
          :key="it.id"
          :value="it.languages_code"
          class="border-b-1 last:border-0 border-b-gray-500 pb-2 w-full"
        >
          <span
            class="text-sm"
            :title="getLang(it.languages_code) || it.languages_code"
          >
            {{ getFlag(it.languages_code) || FLAG_NA }}
            <strong
              >{{ getLang(it.languages_code) || it.languages_code }}:</strong
            >
            {{ it.value }}
          </span>
        </div>
      </div>
    </template>
  </UPopover>
</template>
