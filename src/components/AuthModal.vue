<script setup>
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@nuxtbase/auth-ui-vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { supabase } from "@/supabase";
import { useAuthModal } from "@/composables/useAuthModal";
import Modal from "./Modal.vue";
import { ref, watch } from "vue";

// const session = ref(null);
// getSession();
const router = useRouter();

const authModal = useAuthModal();
const { isOpen } = storeToRefs(authModal);

// watch(
//   () => session.value,
//   () => {
//     if (session.value) {
//       router.go(0);
//       authModal.onClose();
//     }
//   }
// );

// async function getSession() {
//   session.value = await supabase.auth.getSession();
// }

const onChange = (open) => {
  if (!open) {
    authModal.onClose();
  }
};
</script>

<template>
  <Modal
    title="Welcome back"
    description="Login to your account."
    :isOpen="isOpen"
    :onChange="onChange"
  >
    <Auth
      :supabaseClient="supabase"
      :providers="['github']"
      :magicLink="true"
      :appearance="{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#404040',
              brandAccent: '#22c55e',
            },
          },
        },
      }"
      theme="dark"
    />
  </Modal>
</template>
