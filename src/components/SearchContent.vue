<script setup>
import MediaItem from "@/components/MediaItem.vue";
import LikeButton from "@/components/LikeButton.vue";
import { computed } from "vue";
import useOnPlay from "@/composables/useOnPlay";

const props = defineProps(["songs"]);
const onPlay = computed(() => useOnPlay(props.songs));
</script>

<template>
  <div
    v-if="songs.length === 0"
    class="flex flex-col gap-y-2 w-full px-6 text-neutral-400"
  >
    No songs found.
  </div>

  <div
    v-else
    class="flex flex-col gap-y-2 w-full px-6"
  >
    <div
      v-for="song in songs"
      :key="song.id"
      class="flex items-center gap-x-4 w-full"
    >
      <div class="flex-1">
        <MediaItem
          :onClick="onPlay"
          :data="song"
        />
      </div>
      <LikeButton :songId="song.id" />
    </div>
  </div>
</template>
