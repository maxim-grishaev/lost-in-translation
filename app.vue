<script lang="ts" setup>
import { toError } from './lib/toError';
import Error from './ui/error.vue';

useHead({
  title: 'Lost in Translation',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
    { rel: 'shortcut icon', href: '/img/logo_small.svg' },
  ],
  bodyAttrs: {
    'data-theme': 'dark',
  },
});

let langStore = useLangStore();

const initError = ref<Error>();
await callOnce(langStore.init).catch((err: unknown) => {
  initError.value = toError(err);
});
</script>

<template>
  <UApp>
    <NuxtErrorBoundary>
      <NuxtPage v-if="!initError" />
      <Error v-else :error="initError" />

      <template #error="{ error, clearError }">
        <Error :error="error" :clearError="clearError" />
      </template>
    </NuxtErrorBoundary>
  </UApp>
</template>
