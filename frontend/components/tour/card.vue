<template>
  <div class="card-container">{{ tour.name }} -{{ tour.ratings }}</div>
</template>

<script lang="ts">
export default {
  props: {
    tour: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.card-container {
  border: 1px solid black;
  height: 400px;
}
</style>
