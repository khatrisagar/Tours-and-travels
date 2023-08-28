<template>
  <div class="user-detail-wrapper mt-2">
    <v-form :readonly="!isEditMode">
      <v-text-field class="mt-2 input-field" v-model="user.name" label="Name">
      </v-text-field>
      <v-text-field class="mt-2 input-field" v-model="user.email" label="Email">
      </v-text-field>
      <v-text-field
        class="mt-2 input-field"
        v-model="user.contact"
        type="number"
        hide-spin-buttons
        label="contact"
      >
      </v-text-field>
      <v-btn v-if="!isEditMode" @click="toggleEditMode" class="bg-black"
        >Edit</v-btn
      >

      <v-btn @click="onUserUpdate" v-if="isEditMode" class="mr-2 bg-black"
        >Save</v-btn
      >
      <v-btn @click="toggleCancelEditMode" v-if="isEditMode">Cancel</v-btn>
    </v-form>

    <v-btn @click="logoutUser" class="bg-black">Logout</v-btn>
  </div>
</template>

<script lang="ts">
import { userStore } from "@/store";
export default {
  setup() {
    const user = ref({
      name: null,
      email: null,
      contact: null,
    });
    const copyUser = ref();
    const isEditMode = ref(false);
    const router = useRouter();
    const storeUser = userStore();
    const { axiosGet, axiosPatch } = useAxios();

    onMounted(async () => {
      const userDetails = await axiosGet("profile");
      user.value = userDetails.data.data;
      copyUser.value = JSON.parse(JSON.stringify(userDetails.data.data));
    });

    const toggleEditMode = () => (isEditMode.value = !isEditMode.value);

    const toggleCancelEditMode = () => {
      user.value = JSON.parse(JSON.stringify(copyUser.value));
      isEditMode.value = false;
    };

    const onUserUpdate = async () => {
      try {
        await axiosPatch("profile", {
          name: user.value.name,
          email: user.value.email,
          contact: user.value.contact,
        });

        toggleEditMode();
      } catch (error) {
        toggleCancelEditMode();
      }
    };

    const logoutUser = () => {
      localStorage.clear();
      storeUser.removeUserFromStore();
      router.push({ name: "auth-login" });
    };

    return {
      user,
      onUserUpdate,
      isEditMode,
      toggleEditMode,
      toggleCancelEditMode,
      logoutUser,
    };
  },
};
</script>

<style scoped>
.user-detail-wrapper {
  box-shadow: 0px 0px 5px -1px rgb(114, 114, 114);
  padding: 1rem;
  border-radius: 6px;
}
.input-field {
  width: 300px;
}
</style>
