<script setup>
import { ref } from "vue";

import Header from "@/components/Header.vue";
import ListItem from "@/components/ListItem.vue";
import SongItem from "@/components/SongItem.vue";

import useSongs from "@/composables/useSongs";
import useOnPlay from "../composables/useOnPlay";

const songs = ref([]);
const onPlay = ref(null);

const getSongs = async () => {
  songs.value = await useSongs();
  onPlay.value = useOnPlay(songs.value);
};

getSongs();
</script>

<template>
  <div
    class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
  >
    <Header>
      <div class="mb-2">
        <h1 class="text-white text-3xl font-semibold">Welcome back</h1>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
        >
          <ListItem
            name="Liked Songs"
            image="/images/liked.png"
            href="/liked"
          />
        </div>
      </div>
    </Header>
    <div class="mt-2 mb-7 px-6">
      <div class="flex justify-between items-center">
        <h1 class="text-white text-2xl font-semibold">Newest songs</h1>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
      >
        <SongItem
          v-for="item in songs"
          :onClick="onPlay"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>
