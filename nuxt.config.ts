// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    // devProxy: {
    //   '/api': {
    //     target: 'https://api.jsonbin.io/v3/b',
    //     changeOrigin: true,
    //     autoRewrite: true
    //   }
    // }
  }
})