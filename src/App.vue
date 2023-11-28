<script setup>
import { ref, onMounted } from "vue";

import MenuItem from "./components/MenuItem.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import { useSongStore } from "./stores/song";
import { storeToRefs } from "pinia";
import MainPage from "./components/MainPage.vue";
import { Icon } from "@iconify/vue";

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);

const openMenu = ref(false);

onMounted(() => {
  isPlaying.value = false;
});
</script>

<template>
  <div>
    <div
      class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-90 flex items-center justify-between"
    >
      <div class="flex items-center ml-6">
        <button
          type="button"
          class="rounded-full bg-black p-[1px] cursor-pointer"
        >
          <ChevronLeft
            fillColor="#fff"
            :size="30"
          />
        </button>
        <button
          type="button"
          class="rounded-full bg-black p-[1px] ml-4 cursor-pointer"
        >
          <ChevronRight
            fillColor="#fff"
            :size="30"
          />
        </button>
      </div>

      <button
        @click="openMenu = !openMenu"
        :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
        class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer"
      >
        <div class="flex items-center">
          <Icon
            icon="heroicons:home-20-solid"
            width="26"
            class="cursor-pointer hover:text-white transition text-neutral-400"
          />
          <img
            src="/face.png"
            width="27"
            class="rounded-full"
          />
          <div class="text-white text-[14px] ml-1.5 font-semibold">Devan</div>
          <ChevronDown
            v-if="!openMenu"
            @click="openMenu = true"
            fillColor="#fff"
            :size="25"
          />
          <ChevronUp
            v-else
            @click="openMenu = false"
            fillColor="#fff"
            :size="25"
          />
        </div>
      </button>

      <span
        v-if="openMenu"
        class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
      >
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">
            Profile
          </li>
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
        </ul>
      </span>
    </div>

    <div
      id="SideNav"
      class="h-[100%] p-6 w-[240px] fixed left-0 z-50 bg-black"
    >
      <router-link to="/">
        <img
          width="125"
          src="/images/icons/spotify-logo.png"
        />
      </router-link>
      <div class="my-8"></div>
      <ul>
        <router-link to="/">
          <MenuItem
            class="ml-[1px]"
            :iconSize="23"
            name="Home"
            iconString="home"
            pageUrl="/"
          />
        </router-link>
        <router-link to="/search">
          <MenuItem
            class="ml-[1px]"
            :iconSize="24"
            name="Search"
            iconString="search"
            pageUrl="/search"
          />
        </router-link>
        <router-link to="/library">
          <MenuItem
            class="ml-[1px]"
            :iconSize="23"
            name="Library"
            iconString="library"
            pageUrl="/library"
          />
        </router-link>
        <div class="py-3.5"></div>
        <MenuItem
          :iconSize="24"
          name="Create Playlist"
          iconString="playlist"
          pageUrl="/playlist"
        />
        <MenuItem
          class="-ml-[1px]"
          :iconSize="27"
          name="Liked Songs"
          iconString="liked"
          pageUrl="/liked"
        />
      </ul>
      <div class="border-b border-b-gray-700"></div>
      <ul>
        <li
          v-for="n in 4"
          class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My Playlist #{{ n }}
        </li>
      </ul>
    </div>
  </div>

  <MainPage />

  <MusicPlayer v-if="currentTrack" />
</template>
