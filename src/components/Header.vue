<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

import { supabase } from "@/supabase";
import { useAuthModal } from "../composables/useAuthModal";
import { useAuthUser } from "../composables/useAuthUser";

import Button from "./Button.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const authModal = useAuthModal();
const authUser = useAuthUser();
const { user } = storeToRefs(authUser);

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  // player.reset();

  if (error) {
    console.log(error);
  } else {
    console.log("Sign out success");
    // await useUser();
  }

  // if (error) {
  //   toast.error(error.message);
  // } else {
  //   toast.success("Logged out!");
  // }
};

supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null;
  authModal.onClose();
});

defineProps(["customClass"]);
</script>

<template>
  <div
    :class="
      twMerge(
        `
        h-fit 
        bg-gradient-to-b 
        from-emerald-800 
        p-6
        `,
        customClass || ''
      )
    "
  >
    <div class="w-full mb-4 flex items-center justify-between">
      <div class="hidden md:flex gap-x-2 items-center">
        <button
          @click="router.back()"
          class="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <Icon
            icon="radix-icons:caret-left"
            width="35"
            class="text-white"
          />
        </button>
        <button
          @click="router.forward()"
          class="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <Icon
            icon="radix-icons:caret-right"
            width="35"
            class="text-white"
          />
        </button>
      </div>
      <div class="flex md:hidden gap-x-2 items-center">
        <button
          @click="router.push('/')"
          class="rounded-full p-2 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <Icon
            icon="heroicons-solid:home"
            class="text-black"
            width="20"
          />
        </button>
        <button
          @click="router.push('/search')"
          class="rounded-full p-2 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        >
          <Icon
            icon="bx:search"
            class="text-black"
            width="20"
          />
        </button>
      </div>

      <div class="flex justify-between items-center gap-x-4">
        <div
          v-if="user"
          class="flex gap-x-4 items-center"
        >
          <Button
            @click="handleLogout()"
            customClass="bg-white px-6 py-2"
          >
            Logout
          </Button>
          <Button
            @click="() => {}"
            customClass="bg-white"
          >
            <Icon icon="fa-solid:user-alt" />
          </Button>
        </div>

        <template v-else>
          <div>
            <Button
              @click="authModal.onOpen()"
              customClass="bg-transparent text-neutral-300 font-medium"
            >
              Sign up
            </Button>
          </div>
          <div>
            <Button
              @click="authModal.onOpen()"
              customClass="bg-white px-6 py-2"
            >
              Log in
            </Button>
          </div>
        </template>
      </div>
    </div>

    <slot />
  </div>
</template>
