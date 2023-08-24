<template>
  <div class="review-card mb-2">
    <p>
      <span class="font-weight-bold text-h6 mr-3"> {{ review.user.name }}</span
      >{{ new Date(review.createdAt).toLocaleDateString() }}
    </p>
    <p class="d-flex align-center">
      Rating: {{ review.rating }}
      <v-icon size="small" class="text-orange ml-1">fa-solid fa-star</v-icon>
    </p>
    <p>{{ review.comment }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    review: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.review-card {
  padding: 16px;
  box-shadow: 0px 0px 5px -2px rgb(114, 114, 114);
}
</style>
