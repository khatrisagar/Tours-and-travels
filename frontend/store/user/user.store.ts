export const userStore = defineStore("user", () => {
  const user: any = ref(null);
  const addUserToStore = (userObject: any) => {
    user.value = userObject;
  };
  const removeUserFromStore = () => {
    user.value = null;
  };

  const getUserFromStore = computed(() => user.value);

  return { user, getUserFromStore, addUserToStore, removeUserFromStore };
});
