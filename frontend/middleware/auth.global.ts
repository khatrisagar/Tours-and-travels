export default defineNuxtRouteMiddleware((to, from) => {
  const authToken = localStorage?.getItem("tnt_at");
  if (to.meta.requireAuth === false && !authToken) {
    return;
  }
  if (to.meta.requireAuth === false && authToken) {
    return "/";
  }
  if (!to.meta.requireAuth && !authToken) {
    return "/auth/login";
  }
});
