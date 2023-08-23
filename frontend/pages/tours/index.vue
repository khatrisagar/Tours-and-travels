<template>
  <div class="touts-home-wrapper">
    <div class="container card-wrapper">
      <div v-for="tour in toursData" class="outer-container" :key="tour._id">
        <tour-card :tour="tour" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const { axiosGet } = useAxios();
    const toursData = ref(null);
    (async () => {
      const tours = await axiosGet("tours");
      toursData.value = tours.data.data;
      console.log("tours", toursData.value);
    })();
    return {
      toursData,
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
