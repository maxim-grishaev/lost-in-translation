<script lang="ts" setup>
import { CalendarDate, type DateValue } from '@internationalized/date';
import { formatDate } from '~/lib/date';

const model = defineModel<Date>();
const emit = defineEmits(['update:date']);

const date = model.value ? new Date(model.value) : undefined;
const calValue = shallowRef(
  date
    ? new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate())
    : null,
);

const open = ref(false);
const handleDateValue = (value: DateValue) => {
  if (!value) {
    return;
  }
  model.value = new Date(value.year, value.month, value.day);
  open.value = false;
};
const handleClear = () => {
  model.value = undefined;
  open.value = false;
};
const openPop = () => {
  open.value = true;
};
</script>

<template>
  <UPopover arrow v-model:open="open">
    <UButton
      icon="i-lucide-calendar"
      color="primary"
      variant="ghost"
      class="w-auto"
      @click="openPop"
    >
      {{ model ? formatDate(model) : 'anytime' }}
    </UButton>

    <template #content>
      <UCalendar
        ref="pop"
        size="sm"
        v-model="calValue"
        @update:modelValue="(e) => handleDateValue(e as DateValue)"
      />

      <div class="flex justify-end p-2">
        <UButton
          variant="outline"
          size="sm"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="handleClear"
        >
          Anytime
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
