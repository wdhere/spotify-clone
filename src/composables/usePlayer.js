import { defineStore } from "pinia";
import { ref } from "vue";

const usePlayer = defineStore("player", () => {
  const ids = ref([]);
  const activeId = ref(undefined);

  const setId = (id) => {
    activeId.value = id;
  };

  const setIds = (idArr) => {
    ids.value = idArr;
  };

  const reset = () => {
    ids.value = [];
    activeId.value = undefined;
  };

  return {
    ids,
    activeId,
    setId,
    setIds,
    reset,
  };
});

export default usePlayer;
