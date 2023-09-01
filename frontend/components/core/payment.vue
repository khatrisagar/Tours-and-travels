<template>
  <div class="payment-wrapper" ref="paymentWrapper">
    <div class="payment-card">
      <div class="alert" v-if="isAlert">
        <v-btn @click="onPayPayment"
          >Pay
          {{
            Intl.NumberFormat("en-in", {
              style: "currency",
              currency: "INR",
            }).format(tour?.price)
          }}</v-btn
        >
        <v-btn @click="cancelPayment">Cancel</v-btn>
      </div>
      <div v-if="!isAlert">
        <div ref="cardDiv"></div>
        <p class="text-red" v-if="paymentError">{{ paymentError }}</p>
        <v-btn @click="onConfirmPayment">Confirm Payment</v-btn>
        <v-btn @click="cancelPayment">Cancel</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { loadStripe } from "@stripe/stripe-js";
export default {
  props: {
    tour: {
      type: Object,
      required: true,
    },
  },

  setup(props, ctx) {
    const { axiosPost } = useAxios();

    const isAlert = ref(true);

    const paymentIntent = ref();
    const paymentError = ref("");

    const paymentWrapper: any = ref(null);

    const runtimeConfig = useRuntimeConfig();

    let stripe: any;
    let card: any;
    const cardDiv = ref(null);

    // disable scroll

    const scrollTop = 0;
    const scrollLeft = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };

    const onPayPayment = async () => {
      const paymentIntentData = await axiosPost("bookings/get-payment-intent", {
        tour: props.tour._id,
      });
      paymentIntent.value = paymentIntentData.data.data;
      isAlert.value = false;
      stripe = await loadStripe(runtimeConfig.public.STRIPE_PUBLIC_KEY);
      const elements = stripe.elements("card");
      let style = {
        base: {
          border: "1px solid #D8D8D8",
          borderRadius: "4px",
          color: "#000",
        },

        invalid: {
          // All of the error styles go inside of here.
        },
      };
      card = elements.create("card", { style, hidePostalCode: true });

      card.mount(cardDiv.value);
    };

    const cancelPayment = () => {
      window.onscroll = function () {};
      ctx.emit("cancelPayment");
    };

    const onConfirmPayment = async () => {
      try {
        const data = await stripe.confirmCardPayment(
          paymentIntent.value.client_secret,
          {
            payment_method: {
              card: card,
            },
          }
        );
        if (!data.paymentIntent?.status)
          throw new Error("something went wrong");
        ctx.emit("onConfirmPayment", data?.paymentIntent);
      } catch (error) {
        paymentError.value = (error as Error).message;
      }
    };

    return {
      isAlert,
      cardDiv,
      onPayPayment,
      paymentIntent,
      onConfirmPayment,
      cancelPayment,
      paymentError,
      paymentWrapper,
    };
  },
};
</script>

<style scoped>
.payment-wrapper {
  background-color: rgba(122, 122, 122, 0.295);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payment-card {
  padding: 16px;
  width: 400px;
  height: 200px;
  background-color: white;
  box-shadow: 0px 0px 3px black;
  border-radius: 6px;
}
</style>
