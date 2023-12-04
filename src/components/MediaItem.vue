<script setup>
import { ref } from "vue";
import useLoadImage from "@/composables/useLoadImage";

const props = defineProps(["data", "onClick"]);

const imageUrl = ref(null);

const getImage = async () => {
  imageUrl.value = await useLoadImage(props.data);
};

getImage();
</script>

<template>
  <div
    @click="onClick(data.id)"
    class="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
  >
    <div class="relative rounded-md overflow-hidden min-h-[48px] min-w-[48px]">
      <img
        height="48"
        width="48"
        :src="imageUrl || '/images/music-placeholder.png'"
        alt="MediaItem"
        class="object-cover"
      />
    </div>
    <div class="flex flex-col gap-y-1 overflow-hidden">
      <p class="text-white truncate">{{ data.title }}</p>
      <p class="text-neutral-400 text-sm truncate">{{ data.author }}</p>
    </div>
  </div>
</template>
