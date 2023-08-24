<template>
  <div class="card-container">
    <div class="card-image">
      <img :src="tour.coverImage" alt="image" />
    </div>
    <div class="card-content mt-4">
      <h2 class="card-title mb-2">
        {{ tour.name }}
      </h2>
      <div class="card-rating">
        <p class="d-flex align-center">
          Rating: {{ tour.avgRating }}({{ tour.reviews?.length }})
          <v-icon size="small" class="text-orange ml-2"
            >fa-solid fa-star</v-icon
          >
        </p>
      </div>
      <p class="card-description">
        {{ tour.description }}
      </p>
    </div>
  </div>
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
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0px 0px 5px -1px rgb(114, 114, 114);
  height: 400px;
  cursor: pointer;
}
.card-image {
  height: 200px;
}
.card-image > img {
  width: 100%;
  height: 200px !important;
  border-radius: 6px;
}

.card-title {
  line-height: 1.2;
}

.card-container:hover {
  box-shadow: 0px 0px 10px -1px rgb(114, 114, 114);
}
</style>
