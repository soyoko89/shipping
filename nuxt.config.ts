// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api.jsonbin.io/v3/b',
        changeOrigin: true,
        autoRewrite: true
      }
    }
  }
})