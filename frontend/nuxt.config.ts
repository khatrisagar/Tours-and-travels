export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["./routes/", "./plugins/vuetify"],

  css: ["~/assets/styles/main.css"],
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt"],
  googleFonts: {
    families: {
      Lato: [400, 700],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },

  pinia: {
    autoImports: ["defineStore"],
  },

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.NUXT_BACKEND_URL,
      STRIPE_PUBLIC_KEY: process.env.NUXT_STRIPE_PUBLIC_KEY,
    },
  },
  ssr: false,
});
