<template>
  <v-sheet max-width="300" class="mx-auto pt-8">
    <v-form
      class="form elevation-4"
      validate-on="submit lazy"
      @submit.prevent="onClickUserSignup"
    >
      <h1 class="text-h5 font-weight-bold">SignUp</h1>
      <v-text-field
        class="pt-4"
        v-model="user.name"
        label="Name"
      ></v-text-field>
      <v-text-field v-model="user.email" label="Email"></v-text-field>
      <v-text-field v-model="user.password" label="Password"></v-text-field>
      <v-text-field
        v-model="user.confirmPassword"
        label="Confirm Password"
      ></v-text-field>

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
export default {
  setup() {
    const { axiosPost } = useAxios();
    const user = ref({
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
    const loading = ref(false);
    const router = useRouter();
    const onClickUserSignup = async () => {
      try {
        loading.value = true;
        const data = await axiosPost("auth/sign-up", user.value);
        if (data.status == 201) {
          router.push({ name: "login" });
        }
      } catch (error) {
        console.log(error);
        // store.dispatch(
        //   "common/setErrorMessageState",
        //   (error as any).response.data.message
        // );
      } finally {
        loading.value = false;
      }
    };

    return {
      onClickUserSignup,
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
