<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

import Box from "./Box.vue";
import Library from "./Library.vue";

const route = useRoute();
const routes = computed(() => [
  {
    icon: "heroicons-solid:home",
    label: "Home",
    active: route.path !== "/search",
    href: "/",
  },
  {
    icon: "bx:search",
    label: "Search",
    active: route.path === "/search",
    href: "/search",
  },
]);
</script>

<template>
  <div class="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
    <Box>
      <div class="flex flex-col gap-y-4 px-5 py-4">
        <router-link
          v-for="{ icon, label, href, active } in routes"
          :to="href"
          :class="
            twMerge(
              `
                flex 
                flex-row 
                h-auto 
                items-center 
                w-full 
                gap-x-4 
                text-md 
                font-medium
                cursor-pointer
                hover:text-white
                transition
                text-neutral-400
                py-1
              `,
              active && 'text-white'
            )
          "
        >
          <Icon
            width="26"
            :icon="icon"
          />
          <p class="truncate w-100">{{ label }}</p>
        </router-link>
      </div>
    </Box>
    <Box customClass="overflow-y-auto h-full">
      <Library />
    </Box>
  </div>
</template>
