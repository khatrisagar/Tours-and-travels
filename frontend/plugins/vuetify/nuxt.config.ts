// import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, fa } from "vuetify/iconsets/fa";

export default defineNuxtConfig({
  // "@invictus.codes/nuxt-vuetify"
  modules: ["vuetify-nuxt-module"],
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: "fa",
      },
    },
  },
});
