<script lang="ts" setup>
defineProps<{ is?: string }>();
</script>
<template>
  <component :is="is ?? 'div'" class="flex flex-col">
    <slot />
  </component>
</template>
