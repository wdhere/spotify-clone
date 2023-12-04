<script setup>
import { Icon } from "@iconify/vue";
import { useAuthUser } from "../composables/useAuthUser";
import { useAuthModal } from "../composables/useAuthModal";
import { useRouter } from "vue-router";

const props = defineProps(["name", "image", "href"]);

const router = useRouter();
const authModal = useAuthModal();
const authUser = useAuthUser();

const onClick = () => {
  if (!authUser.user) {
    return authModal.onOpen();
  }

  router.push(props.href);
};
</script>

<template>
  <button
    @click="onClick"
    class="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 cursor-pointer hover:bg-neutral-100/20 transition pr-4"
  >
    <div class="relative min-h-[64px] min-w-[64px]">
      <img
        height="64"
        width="64"
        class="object-cover"
        :src="image"
        alt="Image"
      />
    </div>
    <p class="font-medium truncate">{{ name }}</p>
    <div
      class="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-4 group-hover:opacity-100 hover:scale-110"
    >
      <Icon
        icon="fa-solid:play"
        class="text-black"
      />
    </div>
  </button>
</template>
