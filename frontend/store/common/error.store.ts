export const commonErrorStore = defineStore("common-error", () => {
  const errorMessage = ref("");
  const showErrorFromStore = (error: string) => {
    errorMessage.value = error;
  };
  const removeErrorFromStore = () => {
    errorMessage.value = "";
  };

  const getErrorFromStore = computed(() => errorMessage.value);

  return {
    error: errorMessage,
    getErrorFromStore,
    showErrorFromStore,
    removeErrorFromStore,
  };
});
