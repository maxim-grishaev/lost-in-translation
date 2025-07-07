<script lang="ts" setup>
import { formatDate, toDate } from '~/lib/date';
import type { DirectusFoundKey } from '~/lib/directus/DirectusFoundKey';

const { foundKey } = defineProps<{
  foundKey: DirectusFoundKey;
}>();

const date = computed(() => toDate(foundKey.updatedAt));
</script>

<template>
  <span v-if="date">{{ formatDate(date) }}</span>
  <span v-else class="text-gray-500">n/a</span>
</template>
