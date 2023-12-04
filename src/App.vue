<script setup>
import { twMerge } from "tailwind-merge";
import Sidebar from "@/components/Sidebar.vue";
import AuthModal from "@/components/AuthModal.vue";
import UploadModal from "@/components/UploadModal.vue";
import Player from "@/components/Player.vue";
import usePlayer from "@/composables/usePlayer";

const player = usePlayer();
</script>

<template>
  <div
    :class="twMerge('flex h-full', player.activeId && 'h-[calc(100%-80px)]')"
  >
    <Sidebar />
    <main class="h-full flex-1 overflow-y-auto py-2">
      <router-view></router-view>
    </main>
  </div>
  <AuthModal />
  <UploadModal />
  <Player />
</template>
