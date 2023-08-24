<template>
  <div class="location-card mb-2">
    <p class="font-weight-bold">
      <span class="text-purple mr-2">Day-{{ location.day }}</span>
      {{ location.name }}
    </p>
    <p>{{ location.details }}</p>
    <p><strong>Include</strong>:- {{ location.includedMeals.toString() }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    location: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
