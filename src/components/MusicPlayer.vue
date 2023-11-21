<script setup>
import { ref, watch, onMounted } from "vue";

import Heart from "vue-material-design-icons/Heart.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";

import { useSongStore } from "../stores/song";
import { storeToRefs } from "pinia";
import MusicPlayerVolume from "./MusicPlayerVolume.vue";

const useSong = useSongStore();
const { isPlaying, audio, currentTrack, currentArtist } = storeToRefs(useSong);

const isHover = ref(false);
const isTrackTimeCurrent = ref(null);
const isTrackTimeTotal = ref(null);
const seeker = ref(null);
const seekerContainer = ref(null);
const range = ref(0);

onMounted(() => {
  if (audio.value) {
    setTimeout(() => {
      timeupdate();
      loadedmetadata();
    }, 300);
  }

  if (currentTrack.value) {
    seeker.value.addEventListener("change", () => {
      const time = (seeker.value.value / 100) * audio.value.duration;
      audio.value.currentTime = time;
    });

    seeker.value.addEventListener("mousedown", () => {
      audio.value.pause();
      isPlaying.value = false;
    });

    seeker.value.addEventListener("mouseup", () => {
      audio.value.play();
      isPlaying.value = true;
    });

    seekerContainer.value.addEventListener("click", (e) => {
      const clickPosition =
        (e.pageX - seekerContainer.value.offsetLeft) /
        seekerContainer.value.offsetWidth;
      const time = audio.value.duration * clickPosition;
      audio.value.currentTime = time;
      seeker.value.value =
        (audio.value.currentTime / audio.value.duration) * 100;
    });
  }
});

const timeupdate = () => {
  audio.value.addEventListener("timeupdate", () => {
    const minutes = Math.floor(audio.value.currentTime / 60);
    const seconds = Math.floor(audio.value.currentTime % 60);
    isTrackTimeCurrent.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
    const value = (audio.value.currentTime / audio.value.duration) * 100;
    range.value = value;
    seeker.value.value = value;
  });
};

const loadedmetadata = () => {
  audio.value.addEventListener("loadedmetadata", () => {
    const minutes = Math.floor(audio.value.duration / 60);
    const seconds = Math.floor(audio.value.duration % 60);
    isTrackTimeTotal.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });
};

watch(
  () => audio.value,
  () => {
    timeupdate();
    loadedmetadata();
  }
);

watch(
  () => isTrackTimeCurrent.value,
  (time) => {
    if (time && time == isTrackTimeTotal.value) {
      useSong.nextSong(currentTrack.value);
    }
  }
);
</script>

<template>
  <div
    id="MusicPlayer"
    v-if="audio"
    class="fixed flex items-center justify-between left-0 bottom-0 w-full z-50 h-[90px] bg-[#181818] border-t border-t-[#272727]"
  >
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <img
          class="rounded-sm shadow-2xl"
          width="55"
          :src="currentArtist.albumCover"
        />
        <div class="ml-4 mr-2 w-[120px]">
          <div class="text-[14px] text-white hover:underline cursor-pointer">
            {{ currentTrack.name }}
          </div>
          <div
            class="text-[11px] text-gray-500 hover:underline hover:text-white cursor-pointer"
          >
            {{ currentArtist.name }}
          </div>
        </div>
        <Heart
          fillColor="#1BD760"
          :size="20"
        />
        <PictureInPictureBottomRight
          class="ml-4"
          fillColor="#FFFFFF"
          :size="18"
        />
      </div>
    </div>

    <div class="max-w-[35%] mx-auto w-2/4 mb-3">
      <div class="flex-col items-center justify-center">
        <div class="buttons flex items-center justify-center h-[30px]">
          <button class="mx-2">
            <SkipBackward
              fillColor="#FFFFFF"
              :size="25"
              @click="useSong.prevSong(currentTrack)"
            />
          </button>
          <button
            class="p-1 rounded-full mx-3 bg-white"
            @click="useSong.playOrPauseThisSong(currentArtist, currentTrack)"
          >
            <Play
              v-if="!isPlaying"
              fillColor="#181818"
              :size="25"
            />
            <Pause
              v-else
              fillColor="#181818"
              :size="25"
            />
          </button>
          <button class="mx-2">
            <SkipForward
              fillColor="#FFFFFF"
              :size="25"
              @click="useSong.nextSong(currentTrack)"
            />
          </button>
        </div>
      </div>

      <div class="flex items-center h-[25px]">
        <div
          v-if="isTrackTimeCurrent"
          class="text-white text-[12px] pr-2 pt-[11px]"
        >
          {{ isTrackTimeCurrent }}
        </div>
        <div
          ref="seekerContainer"
          class="w-full relative mt-2 mb-3"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >
          <input
            v-model="range"
            ref="seeker"
            type="range"
            class="absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
            :class="{ rangeDotHidden: !isHover }"
          />
          <div
            class="pointer-events-none rounded-l-full mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
            :style="`width: ${range}%;`"
            :class="isHover ? 'bg-green-500' : 'bg-white'"
          ></div>
          <div
            class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
          ></div>
        </div>
        <div
          v-if="isTrackTimeTotal"
          class="text-white text-[12px] pl-2 pt-[11px]"
        >
          {{ isTrackTimeTotal }}
        </div>
      </div>
    </div>

    <div class="flex items-center w-1/4 justify-end pr-10">
      <MusicPlayerVolume />
    </div>
  </div>
</template>

<style scoped>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
