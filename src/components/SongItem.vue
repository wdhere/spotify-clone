<script setup>
import { ref } from "vue";
import useLoadImage from "@/composables/useLoadImage";
import { Icon } from "@iconify/vue";

const props = defineProps(["data", "onClick"]);

const imagePath = ref(null);

const getImage = async () => {
  imagePath.value = await useLoadImage(props.data);
};

getImage();
</script>

<template>
  <div
    @click="onClick(data.id)"
    class="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
  >
    <div
      class="relative aspect-square w-full h-full rounded-md overflow-hidden"
    >
      <img
        class="object-cover"
        :src="imagePath || '/images/music-placeholder.png'"
        alt="Image"
      />
    </div>
    <div class="flex flex-col items-start w-full pt-4 gap-y-1">
      <p class="font-semibold truncate w-full">{{ data.title }}</p>
      <p class="text-neutral-400 text-sm pb-4 w-full truncate">
        {{ data.author }}
      </p>
    </div>
    <div class="absolute bottom-24 right-5">
      <button
        class="transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
      >
        <Icon
          icon="fa-solid:play"
          class="text-black"
        />
      </button>
    </div>
  </div>
</template>
