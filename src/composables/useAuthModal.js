import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthModal = defineStore("authModal", () => {
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
