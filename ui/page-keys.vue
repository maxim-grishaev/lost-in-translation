<script lang="ts" setup>
import KeysFilter from './keys-filter.vue';
import KeysTable from './keys-table.vue';
import KeysHeader from './keys-header.vue';
import Row from './row.vue';
import Col from './col.vue';

const { isFetching, status, error, data } = useKeysDataStore();
</script>

<template>
  <Row is="h1" class="mb-4 justify-start">
    <UAvatar size="2xl" src="/img/goose.png" />
    <span>Lost in translation</span>
  </Row>

  <KeysFilter :isFetching="isFetching" />

  <UAlert
    v-if="status === 'error'"
    color="error"
    title="Error"
    variant="subtle"
    icon="i-lucide-alert-triangle"
    :description="`Something went wrong: ${JSON.stringify(error)}`"
  />

  <UAlert
    v-if="data && !data.count"
    color="neutral"
    variant="subtle"
    title="Nothing found"
    icon="i-lucide-search-x"
    description="Please change the filter and try again"
  />

  <Col class="gap-8" v-if="data && status !== 'error' && data.count > 0">
    <KeysHeader :totalCount="data.count" />
    <KeysTable :data="data" :class="{ 'opacity-70': isFetching }" />
  </Col>
</template>
