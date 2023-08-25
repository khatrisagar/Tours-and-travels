<template>
  <div class="container tour-detail-view" v-if="isLoading">
    <tour-detail-view
      :tour="tour"
      :bookings="bookings"
      @updateBookedTours="updateBookedTours"
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
    onMounted(async () => {
      const tourId = route.params.tourId;
      const [selectedTour, tourBookings] = await Promise.all([
        axiosGet(`tours/${tourId}`),
        axiosGet("bookings"),
      ]);
      tour.value = selectedTour.data.data;
      bookings.value = tourBookings.data.data;
      console.log("v", selectedTour);
      isLoading.value = true;
    });

    const updateBookedTours = (newBookedTour: object) => {
      bookings.value.push(newBookedTour);
      console.log("res", bookings.value, newBookedTour);
    };

    return {
      tour,
      bookings,
      isLoading,
      updateBookedTours,
    };
  },
};
</script>

<style scoped>
.tour-detail-view {
  margin-top: 2rem;
}
</style>
