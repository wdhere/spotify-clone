<script setup>
import { ref } from "vue";

import useLikedSongs from "@/composables/useLikedSongs";
import Header from "@/components/Header.vue";
import LikedContent from "@/components/LikedContent.vue";

const songs = ref([]);

const getSongs = async () => {
  songs.value = await useLikedSongs();
};

getSongs();
</script>

<template>
  <div
    class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
  >
    <Header>
      <div class="mt-20">
        <div class="flex flex-col md:flex-row items-center gap-x-5">
          <div class="relative h-32 w-32 lg:h-44 lg:w-44">
            <img
              class="object-cover"
              fill
              src="/images/liked.png"
              alt="Playlist"
            />
          </div>
          <div class="flex flex-col gap-y-2 mt-4 md:mt-0">
            <p class="hidden md:block font-semibold text-sm">Playlist</p>
            <h1 class="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
              Liked Songs
            </h1>
          </div>
        </div>
      </div>
    </Header>
    <LikedContent :songs="songs" />
  </div>
</template>
