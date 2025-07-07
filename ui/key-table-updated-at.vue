<script lang="ts" setup>
import { formatDate, toDate } from '~/lib/date';

const props = defineProps<{
  updatedAt: string | null;
}>();

const date = computed(() => toDate(props.updatedAt));
</script>

<template>
  <span v-if="date">{{ formatDate(date) }}</span>
  <span v-else class="text-gray-500">N/A</span>
</template>
