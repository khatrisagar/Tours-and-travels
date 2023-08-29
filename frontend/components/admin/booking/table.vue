<template>
  <div class="booking-table-wrapper">
    <v-table class="v-table" v-if="bookings && bookings.length">
      <thead>
        <tr>
          <th>No</th>
          <th>Tour Name</th>
          <th>User Name</th>
          <th>Price</th>
          <th>Date</th>
          <th>Payment Status</th>
          <th>Payment Type</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(booking, index) in bookings"
          :key="index"
          class="booking-col"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ booking.tour.name }}</td>
          <td>{{ booking.user.name }}</td>
          <td>
            {{
              Intl.NumberFormat("en-in", {
                style: "currency",
                currency: "INR",
              }).format(booking.tour.price) + "/-"
            }}
          </td>
          <td>{{ new Date(booking.createdAt).toLocaleString() }}</td>
          <td>{{ booking.paymentStatus }}</td>
          <td>{{ booking.paymentType }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="no-tour" v-if="!bookings || (bookings && !bookings.length)">
      <h2>No Bookings Found</h2>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    bookings: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.booking-col:hover {
  cursor: pointer;
  box-shadow: 0px 0px 5px -2px rgb(10, 10, 10);
}
.v-table {
  margin-top: 0.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 5px -1px rgb(114, 114, 114);

  /* border: 1px solid black; */
}
tbody {
  padding-bottom: 10px;
}
.booking-col:last-child {
  padding: 10px;
}
.no-tour {
  opacity: 0.2;
  display: flex;
  justify-content: center;
  height: 70vh;
}
.no-tour > h2 {
  font-size: 3rem;
  margin-top: 2rem;
}
</style>
