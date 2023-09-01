<template>
  <Transition>
    <div class="alert-pop-up-wrapper" v-if="getErrorMessage">
      <v-btn
        class="close-icon"
        size="x-small"
        @click="closeErrorPopup"
        icon="fa fa-close"
      ></v-btn>
      <p class="text-red">{{ getErrorMessage }}</p>
    </div>
  </Transition>
</template>

<script lang="ts">
import { commonErrorStore } from "@/store/common/error.store";
export default {
  setup() {
    const store = commonErrorStore();

    const closeErrorPopup = () => {
      store.removeErrorFromStore();
    };
    const getErrorMessage = computed(() => {
      return store.getErrorFromStore;
    });
    watch(
      () => getErrorMessage.value,
      () => {
        setTimeout(() => {
          closeErrorPopup();
        }, 2000);
      }
    );

    return {
      closeErrorPopup,
      getErrorMessage,
    };
  },
};
</script>

<style scoped>
.alert-pop-up-wrapper {
  position: absolute;
  right: 16px;
  top: 100px;
  z-index: 9999;
  width: 400px;
  padding: 1rem;
  box-shadow: 0.5px 0.5px 4px rgb(133, 133, 133);
}

.close-icon {
  position: absolute;
  top: 8px;
  right: 8px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
