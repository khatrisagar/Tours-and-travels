export const commonLoaderStore = defineStore("common-loader", () => {
  const loader = ref(false);
  const addLoaderToStore = () => {
    loader.value = true;
  };
  const removeLoaderFromStore = () => {
    loader.value = false;
  };

  const getLoaderFromStore = computed(() => loader.value);

  return {
    loader,
    getLoaderFromStore,
    addLoaderToStore,
    removeLoaderFromStore,
  };
});
