<script lang="ts" setup>
import { useKeysPagesStore } from '~/composables/useKeysPagesStore';
import { formatNumber } from '~/lib/formatNumber';

const props = defineProps<{ totalCount: number }>();

const keysPages = useKeysPagesStore();
</script>

<template>
  <div class="flex flex-row gap-4 justify-between">
    <h2 class="flex flex-row gap-2 justify-center">
      {{ formatNumber(props.totalCount) }} keys found
    </h2>

    <div class="flex flex-row gap-4 mb-4">
      <UTooltip text="Items per page">
        <USelect
          size="sm"
          v-model="keysPages.pageSize"
          :items="PAGE_SIZE_ITEMS"
          @update:modelValue="keysPages.setPageSize"
        />
      </UTooltip>

      <UPagination
        size="sm"
        show-edges
        :siblingCount="0"
        activeColor="neutral"
        activeVariant="subtle"
        :page="keysPages.page"
        :itemsPerPage="keysPages.pageSize"
        :total="props.totalCount"
        @update:page="keysPages.setPage"
      />
    </div>
  </div>
</template>
