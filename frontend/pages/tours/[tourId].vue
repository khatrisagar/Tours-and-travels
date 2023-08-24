<template>
  <div class="container tour-detail-view" v-if="isLoading">
    <tour-detail-view :tour="tour" />
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const { axiosGet } = useAxios();
    const route = useRoute();
    const tour = ref(null);
    const isLoading = ref(false);
    onMounted(async () => {
      const tourId = route.params.tourId;
      const selectedTour = await axiosGet(`tours/${tourId}`);
      tour.value = selectedTour.data.data;
      console.log("v", selectedTour);
      isLoading.value = true;
    });
    return {
      tour,
      isLoading,
    };
  },
};
</script>

<style scoped>
.tour-detail-view {
  margin-top: 2rem;
}
</style>
