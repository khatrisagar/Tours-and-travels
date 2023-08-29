<template>
  <div class="header-wrapper">
    <div class="header-container container">
      <div class="left-header">
        <h3 class="logo-text">
          <NuxtLink v-if="!isAdminMode" :to="{ name: 'tours' }">Tours</NuxtLink>
          <NuxtLink v-if="isAdminMode" :to="{ name: 'admin-tours' }"
            >Admin Tours</NuxtLink
          >
        </h3>
      </div>
      <div class="right-header">
        <nav v-if="!isAdminMode">
          <ul class="link-wrapper">
            <li>
              <NuxtLink :to="{ name: 'tours' }">Tours</NuxtLink>
            </li>

            <li><NuxtLink :to="{ name: 'bookings' }">Bookings</NuxtLink></li>
            <li><NuxtLink :to="{ name: 'profile' }">Profile</NuxtLink></li>
            <li v-if="!isUserLoggedIn">
              <NuxtLink :to="{ name: 'auth-login' }">Login</NuxtLink>
            </li>

            <li v-if="isUserAdmin" @click="goToAdminPanel">Admin</li>
          </ul>
        </nav>
        <nav v-if="isAdminMode">
          <ul class="link-wrapper">
            <li>
              <NuxtLink :to="{ name: 'admin-tours' }">Tours</NuxtLink>
            </li>

            <li><NuxtLink :to="{ name: 'add-tours' }">Add Tours</NuxtLink></li>
            <li>
              <NuxtLink :to="{ name: 'admin-bookings' }">Bookings</NuxtLink>
            </li>

            <li v-if="isUserAdmin" @click="goToUserPanel" class="switchUser">
              <v-btn icon="fa-solid fa-repeat"></v-btn>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { userStore } from "@/store";
import { siteMode } from "@/enums";
export default {
  setup() {
    const storeUser = userStore();
    const isAdminMode = ref(false);
    const router = useRouter();
    const setSiteMode = () => {
      if (
        localStorage.getItem("mode") === siteMode.ADMIN &&
        isUserAdmin.value
      ) {
        isAdminMode.value = true;
      } else {
        isAdminMode.value = false;
      }
    };
    onMounted(() => {
      setSiteMode();
    });

    const isUserLoggedIn = computed(() => {
      return storeUser.getUserFromStore ? true : false;
    });

    const isUserAdmin = computed(() => {
      const isAdminRole = storeUser.getUserFromStore?.roles?.find(
        (role: any) => {
          return role.name === "ADMIN" ? true : false;
        }
      );
      return isAdminRole ? true : false;
    });

    const goToAdminPanel = () => {
      localStorage.setItem("mode", siteMode.ADMIN);
      isAdminMode.value = true;
      router.push({ name: "admin-tours" });
    };
    const goToUserPanel = () => {
      localStorage.setItem("mode", siteMode.USER);
      isAdminMode.value = false;
      router.push({ name: "tours" });
    };

    watch(isUserAdmin, () => {
      setSiteMode();
    });

    return {
      isUserLoggedIn,
      isUserAdmin,
      goToAdminPanel,
      goToUserPanel,
      isAdminMode,
    };
  },
};
</script>

<style scoped>
.header-wrapper {
  box-shadow: 0 4px 6px -5px #444444;
  position: relative;
  z-index: 1000;
}
.header-container {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.logo-text {
  font-size: 2rem;
}
.logo-text > a {
  color: black;
}
.right-header {
  display: flex;
  align-self: center;
}
.link-wrapper {
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
}
.link-wrapper > li > a {
  color: black;
}
</style>
