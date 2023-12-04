<script setup>
import { useRouter } from "vue-router";

import { useAuthUser } from "@/composables/useAuthUser";
import { watchEffect, computed } from "vue";

import MediaItem from "@/components/MediaItem.vue";
import LikeButton from "@/components/LikeButton.vue";
import useOnPlay from "../composables/useOnPlay";

const props = defineProps(["songs"]);
const onPlay = computed(() => useOnPlay(props.songs));

const router = useRouter();
const authUser = useAuthUser();

watchEffect(() => {
  if (!authUser.user?.id) {
    router.replace("/");
  }
});
</script>

<template>
  <div
    v-if="songs.length === 0"
    class="flex flex-col gap-y-2 w-full px-6 text-neutral-400"
  >
    No liked songs.
  </div>

  <div
    v-else
    class="flex flex-col gap-y-2 w-full p-6"
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
