<template>
  <v-sheet max-width="300" class="mx-auto pt-8">
    <v-form
      class="form elevation-4"
      validate-on="submit lazy"
      @submit.prevent="onUserLogin"
    >
      <h3 class="text-h5 font-weight-bold">Login</h3>
      <v-text-field
        class="mt-2"
        v-model="user.email"
        label="Email"
      ></v-text-field>
      <v-text-field v-model="user.password" label="Password"></v-text-field>

      <v-btn
        :loading="loading"
        type="submit"
        block
        class="mt-2 bg-black"
        text="Submit"
      ></v-btn>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { userStore, commonErrorStore } from "@/store";
export default {
  setup() {
    const user = ref({
      email: null,
      password: null,
    });
    const loading = ref(false);
    const router = useRouter();
    const { axiosPost } = useAxios();
    // from store
    const storeUser = userStore();
    const errorStore = commonErrorStore();

    const onUserLogin = async () => {
      try {
        loading.value = true;
        const apiResponse = await axiosPost("auth/login", user.value);
        localStorage.setItem("tnt_at", apiResponse.data.data);
        storeUser.addUserToStore({ token: apiResponse.data.data });
        router.push({ name: "home" });
      } catch (error) {
        errorStore.showErrorFromStore((error as any).response.data.message);
      } finally {
        loading.value = false;
      }
    };

    return {
      onUserLogin,
      user,
      loading,
    };
  },
};
</script>

<style scoped>
.form {
  padding: 16px;
  border-radius: 4px;
}
</style>
