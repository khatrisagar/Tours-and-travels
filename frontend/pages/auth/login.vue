<template>
  <auth-login-form />
</template>

<script lang="ts">
export default {
  setup() {
    definePageMeta({
      requireAuth: false,
    });
    return {};
  },
};
</script>
