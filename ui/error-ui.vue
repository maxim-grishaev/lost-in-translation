<script lang="ts" setup>
import Col from './col.vue';

const { error, clearError } = defineProps<{
  error: Error;
  clearError?: () => void;
}>();

console.error(error);
const retry = clearError || (() => window.location.reload());
</script>

<template>
  <Col class="items-center justify-center mt-8">
    <h1 class="text-3xl font-bold">
      <UIcon name="i-lucide-alert-triangle" class="text-red-500" />
      Error
    </h1>

    <p class="text-lg text-center">
      Something went wrong.<br />
      {{ error.message }}
    </p>

    <p>
      <UButton
        variant="outline"
        color="neutral"
        label="Try again"
        @click="retry"
      />
    </p>
  </Col>
</template>
