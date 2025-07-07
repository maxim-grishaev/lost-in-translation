<script lang="ts" setup>
import { formatNumber } from '~/lib/formatNumber';
import Row from './row.vue';
import Col from './col.vue';

defineProps<{ totalCount: number }>();

const keysPages = useKeysPagesStore();
</script>

<template>
  <Col class="flex-grow md:flex-row md:justify-between md:items-end gap-4">
    <Row class="justify-between grow items-end">
      <h2>{{ formatNumber(totalCount) }} keys found</h2>

      <UTooltip text="Items per page">
        <USelect
          size="sm"
          v-model="keysPages.pageSize"
          :items="PAGE_SIZE_ITEMS"
          @update:modelValue="keysPages.setPageSize"
        />
      </UTooltip>
    </Row>

    <UPagination
      size="sm"
      show-edges
      :siblingCount="0"
      activeColor="neutral"
      activeVariant="subtle"
      :page="keysPages.page"
      :itemsPerPage="keysPages.pageSize"
      :total="totalCount"
      @update:page="keysPages.setPage"
      class="justify-self-end self-end grow-0 shrink"
    />
  </Col>
</template>
