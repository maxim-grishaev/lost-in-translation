import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/ui'],
  css: ['~/assets/main.css'],
  nitro: {
    openAPI: {
      meta: {
        title: 'Give me your keys',
        description: 'Whatever',
        version: '1.0',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
