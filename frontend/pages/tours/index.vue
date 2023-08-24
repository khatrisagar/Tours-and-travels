<template>
  <div class="touts-home-wrapper">
    <div class="container card-wrapper" v-if="isLoading">
      <div v-for="tour in toursData" class="outer-container" :key="tour._id">
        <tour-card :tour="tour" @click="onClickTour(tour._id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const { axiosGet } = useAxios();
    const router = useRouter();
    const toursData = ref(null);
    const isLoading = ref(true);

    onMounted(async () => {
      const tours = await axiosGet("tours");
      toursData.value = tours.data.data;
      isLoading.value = true;
    });

    const onClickTour = (tourId: string) => {
      router.push({ name: "tour", params: { tourId: tourId } });
    };

    return {
      toursData,
      onClickTour,
      isLoading,
    };
  },
};
</script>

<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 2rem;
}
.outer-container {
  width: calc(100% / 3);
}
</style>
