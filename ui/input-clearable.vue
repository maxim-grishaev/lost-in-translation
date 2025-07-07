<script lang="ts" setup>
const model = defineModel<string>();

defineProps<{ placeholder?: string }>();

const clear = () => {
  model.value = '';
};
</script>

<template>
  <UInput v-model="model" :placeholder="placeholder" :ui="{ trailing: 'pe-1' }">
    <template v-if="model" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="clear"
      />
    </template>
  </UInput>
</template>
