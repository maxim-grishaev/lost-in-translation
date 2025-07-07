<script lang="ts" setup>
import Col from './col.vue';
import DatePicker from './date-picker.vue';
import InputClearable from './input-clearable.vue';
import Row from './row.vue';

const { isFetching } = defineProps<{ isFetching: boolean }>();

const keysFilter = useKeysFilterStore();
const emit = defineEmits(['submit']);
const progress = computed(() => ({
  val: isFetching ? undefined : 0,
  max: isFetching ? undefined : 1,
}));
</script>

<template>
  <Row is="form" @submit.prevent="() => keysFilter.isValid && emit('submit')">
    <Col class="flex-grow gap-2">
      <InputClearable
        v-model="keysFilter.search"
        placeholder="Search for keys"
        class="min-w-48 w-full"
      />

      <Row class="flex-grow">
        <Row class="justify-start gap-2!">
          <span>Updated&nbsp;from</span>
          <DatePicker id="date_from" v-model="keysFilter.dateFrom" />
          <span>to</span>
          <DatePicker id="date_from" v-model="keysFilter.dateTo" />
        </Row>

        <UButton
          type="button"
          variant="ghost"
          label="Reset"
          color="neutral"
          :disabled="keysFilter.isDefault"
          @click="keysFilter.reset"
          class="justify-self-end"
        />
      </Row>
    </Col>
  </Row>
  <UProgress
    size="2xs"
    :model-value="progress.val"
    :max="progress.max"
    class="my-4"
  />
</template>
