<template>
  <div class="header-wrapper">
    <div class="header-container container">
      <div class="left-header">
        <h3 class="logo-text">
          <NuxtLink :to="{ name: 'tours' }">Tours</NuxtLink>
        </h3>
      </div>
      <div class="right-header">
        <nav>
          <ul class="link-wrapper">
            <li>
              <NuxtLink :to="{ name: 'tours' }">Tours</NuxtLink>
            </li>
            <li><NuxtLink :to="{ name: 'bookings' }">Bookings</NuxtLink></li>
            <li><NuxtLink :to="{ name: 'bookings' }">Profile</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
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
