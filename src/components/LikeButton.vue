<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

import { useAuthUser } from "@/composables/useAuthUser";
import { useAuthModal } from "@/composables/useAuthModal";

import { supabase } from "@/supabase";
import { ref, computed, watchEffect } from "vue";
import { storeToRefs } from "pinia";

const props = defineProps(["songId"]);

const router = useRouter();
const authModal = useAuthModal();
const authUser = useAuthUser();
const { user } = storeToRefs(authUser);

const isLiked = ref(false);
const icon = computed(() => {
  return isLiked.value
    ? "ant-design:heart-filled"
    : "ant-design:heart-outlined";
});

watchEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("liked_songs")
      .select("*")
      .eq("user_id", user.value.id)
      .eq("song_id", props.songId);

    if (!error && data.length !== 0) {
      isLiked.value = true;
    }
  };

  if (user.value?.id) {
    fetchData();
  }
});

const handleLike = async () => {
  if (!user.value) {
    return authModal.onOpen();
  }

  if (isLiked.value) {
    const { error } = await supabase
      .from("liked_songs")
      .delete()
      .eq("user_id", user.value.id)
      .eq("song_id", props.songId);

    if (error) {
      // toast.error(error.message);
    } else {
      isLiked.value = false;
    }
  } else {
    const { error } = await supabase.from("liked_songs").insert({
      song_id: props.songId,
      user_id: user.value.id,
    });

    if (error) {
      // toast.error(error.message);
    } else {
      isLiked.value = true;
      // toast.success("Liked!");
    }
  }

  // router.go(0);
};
</script>

<template>
  <button
    class="cursor-pointer hover:opacity-75 transition"
    @click="handleLike"
  >
    <Icon
      :icon="icon"
      :color="isLiked ? '#22c55e' : 'white'"
      width="25"
    />
  </button>
</template>
