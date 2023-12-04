import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthUser = defineStore("authUser", () => {
  const user = ref(null);

  return {
    user,
  };
});
