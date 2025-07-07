<script lang="ts" setup>
defineProps<{ is?: string }>();
</script>
<template>
  <component
    :is="is ?? 'div'"
    class="flex flex-row gap-4 items-center justify-between"
  >
    <slot />
  </component>
</template>
