<script setup>
import { twMerge } from "tailwind-merge";

defineProps(["customClass"]);
</script>

<template>
  <button
    :class="
      twMerge(
        `
            w-full 
            rounded-full 
            bg-green-500
            border
            border-transparent
            px-3 
            py-3 
            disabled:cursor-not-allowed 
            disabled:opacity-50
            text-black
            font-bold
            hover:opacity-75
            transition
          `,
        customClass || ''
      )
    "
  >
    <slot />
  </button>
</template>
