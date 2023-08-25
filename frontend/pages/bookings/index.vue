<template>
  <div class="container bookings-container">
    <div class="booking-header">
      <h3>My Bookings</h3>
    </div>
    <booking-table :bookings="bookings" />
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const { axiosGet } = useAxios();
    const bookings = ref(null);

    onMounted(async () => {
      const userBookings = await axiosGet("bookings");
      bookings.value = userBookings.data.data;
    });

    return {
      bookings,
    };
  },
};
</script>

<style scoped>
.bookings-container {
  margin-top: 1rem;
}
</style>
