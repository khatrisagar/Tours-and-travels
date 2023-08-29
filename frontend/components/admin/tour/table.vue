<template>
  <v-table class="v-table">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Price</th>
        <th>Date</th>
        <th>Ratings</th>
        <th>isTourActive</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tour, index) in tours" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ tour.name }}</td>
        <td>
          {{
            Intl.NumberFormat("en-in", {
              style: "currency",
              currency: "INR",
            }).format(tour.price) + "/-"
          }}
        </td>
        <td>
          from {{ new Date(tour.startDate).toLocaleDateString() }} to
          {{ new Date(tour.endDate).toLocaleDateString() }}
        </td>
        <td>{{ tour.avgRating }}</td>
        <td>{{ tour.isTourActive }}</td>
        <td>
          <v-btn class="bg-black" @click="onEditTour(tour._id)">Edit</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
export default {
  props: {
    tours: {
      type: Object,
    },
  },

  setup() {
    const router = useRouter();
    const onEditTour = (tourId: string) => {
      router.push({ name: "edit-tours", params: { tourId: tourId } });
    };
    return {
      onEditTour,
    };
  },
};
</script>
