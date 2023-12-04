<script setup>
import { ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "@/supabase";

import PlayerContent from "./PlayerContent.vue";
import usePlayer from "../composables/usePlayer";

const player = usePlayer();
const { activeId } = storeToRefs(player);

const song = ref(null);
const songUrl = ref(null);

watch(activeId, async () => {
  if (!activeId.value) {
    return;
  }

  const { data } = await supabase
    .from("songs")
    .select("*")
    .eq("id", activeId.value)
    .single();

  song.value = data;
});

watch(song, async () => {
  if (!song.value) {
    return;
  }

  const { data } = await supabase.storage
    .from("songs")
    .getPublicUrl(song.value.song_path);

  songUrl.value = data.publicUrl;
});
</script>

<template>
  <div
    v-if="song && songUrl && player.activeId"
    class="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4"
  >
    <PlayerContent
      :key="songUrl"
      :song="song"
      :songUrl="songUrl"
    />
  </div>
</template>
