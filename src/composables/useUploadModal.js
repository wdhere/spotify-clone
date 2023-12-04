import { defineStore } from "pinia";
import { ref } from "vue";

export const useUploadModal = defineStore("uploadModal", () => {
  const isOpen = ref(false);

  const onOpen = () => {
    isOpen.value = true;
  };

  const onClose = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
});
