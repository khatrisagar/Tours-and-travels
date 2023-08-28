<template>
  <div class="admin-tour-wrapper container mt-2">
    <admin-tour-table :tours="tours" />
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const tours = ref();
    const { axiosGet } = useAxios();
    onMounted(async () => {
      const adminTours = await axiosGet("admin/tours/");
      tours.value = adminTours.data.data;
    });
    return { tours };
  },
};
</script>
