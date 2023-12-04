<script setup>
import { ref, watch, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useAuthUser } from "@/composables/useAuthUser";
import { useUploadModal } from "@/composables/useUploadModal";
import { useAuthModal } from "@/composables/useAuthModal";
import MediaItem from "./MediaItem.vue";

import useSongsByUserId from "@/composables/useSongsByUserId";
import useOnPlay from "@/composables/useOnPlay";

const authUser = useAuthUser();
const uploadModal = useUploadModal();
const authModal = useAuthModal();
const userSongs = ref([]);
const onPlay = computed(() => useOnPlay(userSongs.value));

const onClick = () => {
  if (!authUser.user) {
    return authModal.onOpen();
  }
  return uploadModal.onOpen();
};

watch(
  () => authUser.user,
  async () => {
    if (authUser.user?.id) {
      userSongs.value = await useSongsByUserId(authUser.user?.id);
    } else {
      userSongs.value = [];
    }
  }
);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between px-5 pt-4">
      <div class="inline-flex items-center gap-x-2">
        <Icon
          icon="tabler:playlist"
          class="text-neutral-400"
          width="26"
        />

        <p class="text-neutral-400 font-medium text-md">Your Library</p>
      </div>
      <Icon
        icon="ant-design:plus-outlined"
        @click="onClick"
        width="20"
        class="text-neutral-400 cursor-pointer hover:text-white transition"
      />
    </div>
    <div class="flex flex-col gap-y-2 mt-4 px-3">
      <MediaItem
        v-for="song in userSongs"
        :onClick="onPlay"
        :key="song.id"
        :data="song"
      />
    </div>
  </div>
</template>
