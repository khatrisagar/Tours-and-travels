export const userStore = defineStore("user", () => {
  const user: any = ref(null);
  const addUserToStore = (userObject: any) => {
    user.value = userObject;
  };

  const getUserFromStore = computed(() => user.value);

  return { user, getUserFromStore, addUserToStore };
});
