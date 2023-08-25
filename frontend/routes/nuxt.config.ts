import { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    "pages:extend"(pages) {
      pages.push(
        {
          name: "home",
          path: "/",
          redirect: { name: "tours" },
        },
        {
          name: "tours",
          path: "/tours",
          file: "@/pages/tours/index.vue",
        },
        {
          name: "tour",
          path: "/tours/:tourId",
          file: "@/pages/tours/[tourId].vue",
        },
        {
          name: "bookings",
          path: "/bookings",
          file: "@/pages/bookings/index.vue",
        },
        {
          name: "profile",
          path: "/profile",
          file: "@/pages/profile/index.vue",
        },

        {
          name: "login",
          path: "/auth/login",
          file: "@/pages/auth/login.vue",
        },
        {
          name: "signup",
          path: "/auth/signup",
          file: "@/pages/auth/signup.vue",
        }
      );

      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = [];
        for (const page of pages) {
          if (pattern.test((page as any).file)) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1);
        }
      }
      removePagesMatching(/\.ts$/, pages);
    },
  },
});
