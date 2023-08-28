<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { userStore } from "@/store";
export default {
  setup() {
    const { axiosGet } = useAxios();
    const storeUser = userStore();
    const route = useRoute();

    const updateUserState = async () => {
      if (route.meta?.requireAuth != false) {
        const user = await axiosGet("profile");
        user.data.data["token"] = localStorage.getItem("tnt_at");
        storeUser.addUserToStore(user.data.data);
      }
    };
    onMounted(async () => {
      await updateUserState();
    });

    watch(
      () => route.fullPath,
      async () => {
        if (!storeUser.getUserFromStore) await updateUserState();
      }
    );

    return {};
  },
};
</script>
