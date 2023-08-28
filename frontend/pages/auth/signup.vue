<template>
  <auth-signup-form />
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
