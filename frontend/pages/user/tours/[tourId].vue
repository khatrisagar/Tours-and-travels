<template>
  <div class="container tour-detail-view" v-if="isLoading">
    <user-tour-detail-view
      :tour="tour"
      :bookings="bookings"
      @updateBookedTours="updateBookedTours"
      @updateReviews="updateReviews"
    />
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const { axiosGet } = useAxios();
    const route = useRoute();
    const tour = ref();
    const bookings = ref();
    const isLoading = ref(false);

    const loadTourData = async () => {
      try {
        const tourId = route.params.tourId;
        const [selectedTour, tourBookings] = await Promise.all([
          axiosGet(`tours/${tourId}`),
          axiosGet("bookings"),
        ]);
        tour.value = selectedTour.data.data;
        bookings.value = tourBookings.data.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      await loadTourData();
      isLoading.value = true;
    });

    const updateBookedTours = (newBookedTour: object) => {
      bookings.value.push(newBookedTour);
      console.log("res", bookings.value, newBookedTour);
    };

    const updateReviews = async () => {
      await loadTourData();
    };

    return {
      tour,
      bookings,
      isLoading,
      updateBookedTours,
      updateReviews,
    };
  },
};
</script>

<style scoped>
.tour-detail-view {
  margin-top: 2rem;
}
</style>
