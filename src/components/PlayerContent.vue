<script setup>
import { useSound } from "@vueuse/sound";
import { computed, ref, watch, watchEffect } from "vue";

import { Icon } from "@iconify/vue";
import { SliderRange, SliderRoot, SliderTrack } from "radix-vue";

import usePlayer from "@/composables/usePlayer";

import LikeButton from "./LikeButton.vue";
import MediaItem from "./MediaItem.vue";
import { storeToRefs } from "pinia";

const props = defineProps(["song", "songUrl"]);

const player = usePlayer();
const { setIds, setId, reset } = player;
const { ids, activeId } = storeToRefs(player);

const volume = ref(1);
const silderValue = computed(() => [volume.value]);
const isPlaying = ref(false);

const playOrPause = computed(() => {
  return isPlaying.value ? "bi:pause-fill" : "bi:play-fill";
});
const volumeIcon = computed(() => {
  return volume.value === 0
    ? "heroicons:speaker-x-mark-solid"
    : "heroicons:speaker-wave-solid";
});

const onPlayNext = () => {
  if (ids.value.length === 0) {
    return;
  }

  const currentIndex = ids.value.findIndex((id) => id === activeId.value);
  const nextSong = ids.value[currentIndex + 1];

  if (!nextSong) {
    return setId(ids.value[0]);
  }

  setId(nextSong);
};

const onPlayPrevious = () => {
  if (ids.value.length === 0) {
    return;
  }

  const currentIndex = ids.value.findIndex((id) => id === activeId.value);
  const previousSong = ids.value[currentIndex - 1];

  if (!previousSong) {
    return setId(ids.value[ids.value.length - 1]);
  }

  setId(previousSong);
};

const { play, sound, pause } = useSound(props.songUrl, {
  volume,
  onplay: () => (isPlaying.value = true),
  onend: () => {
    isPlaying.value = false;
    onPlayNext();
  },
  onpause: () => (isPlaying.value = false),
  format: ["mp3"],
});

watch(sound, (n, o, onCleanup) => {
  if (!n) {
    return;
  }
  n?.play();

  onCleanup(() => {
    n?.unload();
  });
});

const handlePlay = () => {
  if (!isPlaying.value) {
    play();
  } else {
    pause();
  }
};

const toggleMute = () => {
  if (volume.value === 0) {
    volume.value = 1;
  } else {
    volume.value = 0;
  }
};
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 h-full">
    <div class="flex w-full justify-start">
      <div class="flex items-center gap-x-4">
        <MediaItem :data="song" />
        <LikeButton :songId="song.id" />
      </div>
    </div>

    <div class="flex md:hidden col-auto w-full justify-end items-center">
      <div
        @click="handlePlay"
        class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
      >
        <Icon
          :icon="playOrPause"
          width="30"
          class="text-black"
        />
      </div>
    </div>

    <div
      class="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6"
    >
      <Icon
        @click="onPlayPrevious"
        icon="ant-design:step-backward-filled"
        width="30"
        class="text-neutral-400 cursor-pointer hover:text-white transition"
      />
      <div
        @click="handlePlay"
        class="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
      >
        <Icon
          :icon="playOrPause"
          width="30"
          class="text-black"
        />
      </div>
      <Icon
        @click="onPlayNext"
        icon="ant-design:step-forward-filled"
        width="30"
        class="text-neutral-400 cursor-pointer hover:text-white transition"
      />
    </div>

    <div class="hidden md:flex w-full justify-end pr-2">
      <div class="flex items-center gap-x-2 w-[120px]">
        <Icon
          @click="toggleMute"
          :icon="volumeIcon"
          class="cursor-pointer"
          width="26"
        />
        <SliderRoot
          class="relative flex items-center select-none touch-none w-full h-10"
          :defaultValue="silderValue"
          :modelValue="silderValue"
          @update:modelValue="(newValue) => (volume = newValue[0])"
          :max="1"
          :step="0.1"
          aria-label="Volume"
        >
          <SliderTrack
            class="bg-neutral-600 relative grow rounded-full h-[3px]"
          >
            <SliderRange class="absolute bg-white rounded-full h-full" />
          </SliderTrack>
        </SliderRoot>
      </div>
    </div>
  </div>
</template>
