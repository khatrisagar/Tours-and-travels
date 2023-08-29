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
          name: "login",
          path: "/auth/login",
          meta: { requiresAuth: false },
          file: "@/pages/auth/login.vue",
        },
        {
          name: "signup",
          path: "/auth/signup",
          meta: { requiresAuth: false },
          file: "@/pages/auth/signup.vue",
        },
        {
          name: "tours",
          path: "/tours",
          file: "@/pages/user/tours/index.vue",
        },
        {
          name: "tour",
          path: "/tours/:tourId",
          file: "@/pages/user/tours/[tourId].vue",
        },
        {
          name: "bookings",
          path: "/bookings",
          file: "@/pages/user/bookings/index.vue",
        },
        {
          name: "profile",
          path: "/profile",
          file: "@/pages/profile/index.vue",
        },
        // admin routes
        {
          name: "admin-tours",
          path: "/admin/tours",
          file: "@/pages/admin/tours/tours.vue",
        },
        {
          name: "add-tours",
          path: "/admin/add-tours",
          file: "@/pages/admin/tours/add-tour.vue",
        },
        {
          name: "edit-tours",
          path: "/admin/edit-tours/:tourId",
          file: "@/pages/admin/tours/edit-tour.vue",
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
