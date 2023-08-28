<template>
  {{ tour }}
  <v-form @submit.prevent="onAddTour">
    <v-text-field label="Name" v-model="tour.name"> </v-text-field>
    <v-textarea label="description" v-model="tour.description"> </v-textarea>
    <!-- <v-date-picker label="Start date" v-model="tour.startDate"> </v-date-picker> -->
    <v-text-field type="date" label="Start date" v-model="tour.startDate">
    </v-text-field>
    <v-text-field type="date" label="End date" v-model="tour.endDate">
    </v-text-field>
    <v-text-field label="Price" v-model="tour.price"> </v-text-field>
    <v-file-input
      v-model="tour.coverImage"
      label="Cover Image"
      variant="solo-inverted"
    ></v-file-input>
    <v-btn class="bg-black" @click="onAddTour">Add </v-btn>
  </v-form>
</template>

<script lang="ts">
export default {
  setup() {
    const { axiosPost } = useAxios();
    const router = useRouter();
    const tour = ref({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      price: null,
      coverImage: [{ name: "", type: "" }],
      locationsCovered: [],
    });

    const convertImageToBase64 = () => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL((tour.value as any)?.coverImage?.[0]);
        let tourImageObject;
        reader.onload = () => {
          tourImageObject = {
            image: reader.result,
            name: tour.value?.coverImage?.[0]?.name,
            type: tour.value?.coverImage?.[0]?.type,
          };
          resolve(tourImageObject);
        };
      });
    };
    const onAddTour = async () => {
      try {
        let tourClone = JSON.parse(JSON.stringify(tour.value));
        const tourCoverImage: any = await convertImageToBase64();
        (tourClone["coverImage"] as any) = tourCoverImage.image;
        const newTour = await axiosPost("admin/tours/add-tours", tourClone);
        router.push({ name: "admin-tours" });
      } catch (error) {
        console.log(error);
      }
    };
    return { onAddTour, tour };
  },
};
</script>
