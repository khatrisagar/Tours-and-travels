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
    onMounted(async () => {
      const user = await axiosGet("profile");
      user.data.data["token"] = localStorage.getItem("tnt_at");
      storeUser.addUserToStore(user.data.data);
    });

    return {};
  },
};
</script>
