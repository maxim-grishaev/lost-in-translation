<script lang="ts" setup>
import UAvatar from '@nuxt/ui/components/Avatar.vue';
import { useLangStore } from '~/composables/useLangStore';
import KeysFilter from './keys-filter.vue';
import KeysTable from './keys-table.vue';
import KeysHeader from './keys-header.vue';

const langStore = useLangStore();
const itemsFetch = await useFilterDataStore();

const status = computed(() => itemsFetch.status.value);
const isFetching = computed(() => status.value === 'pending');
</script>

<template>
  <h1 class="flex flex-row gap-4 items-center mb-4">
    <UAvatar size="2xl" src="/img/goose.png" />
    <span>Lost in translation</span>
  </h1>

  <KeysFilter />

  <UProgress size="xs" :class="{ 'opacity-0': !isFetching }" class="my-4" />

  <UAlert
    v-if="status === 'error'"
    color="error"
    title="Error"
    variant="subtle"
    icon="i-lucide-alert-triangle"
    :description="`Something went wrong: ${JSON.stringify(itemsFetch.error)}`"
  />

  <UAlert
    v-if="itemsFetch.data.value && !itemsFetch.data.value.count"
    color="neutral"
    variant="subtle"
    title="Nothing found"
    icon="i-lucide-search-x"
    description="Please change the filter and try again"
  />

  <div
    :class="{ 'opacity-70': isFetching }"
    v-if="
      itemsFetch.data.value &&
      status !== 'error' &&
      itemsFetch.data.value.count > 0
    "
  >
    <div class="flex flex-col gap-4">
      <KeysHeader :totalCount="itemsFetch.data.value.count" />
      <KeysTable :data="itemsFetch.data.value" :lang="langStore.lang" />
    </div>
  </div>
</template>
