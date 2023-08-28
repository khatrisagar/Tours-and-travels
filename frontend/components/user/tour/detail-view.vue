<template>
  <div class="detail-view-wrapper">
    <NuxtLink :to="{ name: 'tours' }" class="text-black">
      <div class="d-flex align-center back-navigator">
        <v-icon class="mr-1">fa-solid fa-arrow-left</v-icon>
        <p class="text-h6">Back</p>
      </div>
    </NuxtLink>
    <div class="top-view d-flex flex-row mt-2">
      <div class="cover-image top-left-view">
        <img :src="tour?.coverImage" alt="coverImage" />
      </div>
      <div class="cover-image top-right-view">
        <h2 class="tour-title">{{ tour.name }}</h2>

        <p class="tour-description mt-3">{{ tour.description }}</p>
        <p class="tour-price mt-2">
          Price -
          {{
            Intl.NumberFormat("en-in", {
              style: "currency",
              currency: "INR",
            }).format(tour.price) + "/-"
          }}
        </p>
        <p class="tour-start-date mt-2">
          Start Date:- {{ new Date(tour.startDate).toLocaleDateString() }}
        </p>
        <p class="tour-end-date">
          End Date:- {{ new Date(tour.endDate).toLocaleDateString() }}
        </p>
        <p class="d-flex align-center tour-rating mt-2">
          <span class="mr-2"> Rating:- </span>
          <span class="d-flex align-center">
            {{ tour.avgRating
            }}<v-icon size="small" class="text-orange mx-1"
              >fa-solid fa-star</v-icon
            >
            with</span
          >
          <span class="ml-1 text-blue view-reviews" @click="onclickViewReviews">
            {{ tour.reviews?.length }} reviews</span
          >
        </p>
        <v-btn
          class="mt-3 bg-black px-15"
          v-if="!isTourBooked"
          @click="onClickBookTour(tour._id)"
          >Book Now</v-btn
        >
        <p class="mt-3 already-booked" v-if="isTourBooked">
          Booking Successfully
        </p>
      </div>
    </div>
    <div class="location-wrapper mt-4">
      <h2 class="mb-4">Locations Covered</h2>
      <user-tour-location-day-card
        v-for="location in tour.locationsCovered"
        :key="location._id"
        :location="location"
      />
    </div>
    <div class="review-wrapper mt-4" ref="reviews">
      <h2 class="mb-4">Reviews</h2>
      <div v-for="review in tour.reviews" :key="review._id">
        <user-tour-review-card :review="review" />
      </div>
      <div v-if="!tour.reviews || (tour?.reviews && !tour?.reviews?.length)">
        No reviews
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tour: {
      type: Object,
    },
    bookings: {
      type: Object,
    },
  },

  setup(props, ctx) {
    const reviews = ref();
    const { axiosPost } = useAxios();
    const onclickViewReviews = () => {
      console.log("ref", reviews.value);
      reviews.value?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const isTourBooked = computed(() => {
      const selectedTour = props.bookings?.find(
        (booking: any) => booking.tour._id === props.tour?._id
      );
      console.log("propsss", props.bookings);
      return selectedTour ? true : false;
    });

    const onClickBookTour = async (tourId: string) => {
      const bookingPayload = {
        tour: tourId,
        paymentStatus: "completed",
        paymentType: "online",
      };
      const bookTour = await axiosPost("bookings", bookingPayload);
      ctx.emit("updateBookedTours", bookTour.data.data);
    };

    return {
      reviews,
      onclickViewReviews,
      onClickBookTour,
      isTourBooked,
    };
  },
};
</script>

<style scoped>
.detail-view-wrapper {
  scroll-behavior: smooth;
}
.top-view {
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px -1px rgb(58, 58, 58);
}
.cover-image > img {
  width: 500px;
  height: 300px;
  border-radius: 6px;
}
.back-navigator {
  cursor: pointer;
}
.location-wrapper,
.review-wrapper {
  box-shadow: 0px 0px 5px -1px rgb(114, 114, 114);
  border-radius: 6px;
  padding: 32px;
}
.top-right-view {
  padding-inline: 16px;
}
.tour-title {
  font-size: 2rem;
}
.tour-description {
  margin-top: 1rem;
  font-size: 1.2rem;
}
.tour-rating > span {
  font-size: 1.1rem;
}
.view-reviews {
  cursor: pointer;
}
.already-booked {
  font-weight: 900;
  color: red;
  font-style: italic;
}
</style>
