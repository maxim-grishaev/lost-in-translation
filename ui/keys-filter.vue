<script lang="ts" setup>
import { useKeysFilterStore } from '~/composables/useKeysFilterStore';
import DatePicker from './date-picker.vue';
import InputClearable from './input-clearable.vue';

const keysFilter = useKeysFilterStore();
const emit = defineEmits(['submit']);
</script>

<template>
  <form
    class="flex flex-row gap-4 justify-between pb-4 border-b-1 border-muted mb-4"
    @submit.prevent="() => keysFilter.isValid && emit('submit')"
  >
    <div class="flex flex-row items-center gap-4">
      <InputClearable
        v-model="keysFilter.search"
        placeholder="Search for keys"
      />

      <span>Updated&nbsp;from</span>
      <DatePicker id="date_from" v-model="keysFilter.dateFrom" />
      <span>to</span>
      <DatePicker id="date_from" v-model="keysFilter.dateTo" />
    </div>

    <div class="flex flex-row items-center gap-4">
      <UButton
        type="button"
        variant="ghost"
        label="Reset"
        color="neutral"
        :disabled="keysFilter.isDefault"
        @click="keysFilter.reset"
      />
    </div>
  </form>
</template>
