<script setup>
import { ref, watchEffect } from "vue";
import Header from "@/components/Header.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchContent from "@/components/SearchContent.vue";

import useSongsByTitle from "@/composables/useSongsByTitle";
import { useRoute } from "vue-router";

const route = useRoute();

const songs = ref([]);

watchEffect(async () => {
  songs.value = await useSongsByTitle(route.query.title);
});
</script>

<template>
  <div
    class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
  >
    <Header customClass="from-bg-neutral-900">
      <div class="mb-2 flex flex-col gap-y-6">
        <h1 class="text-white text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>
    </Header>
    <SearchContent :songs="songs" />
  </div>
</template>
