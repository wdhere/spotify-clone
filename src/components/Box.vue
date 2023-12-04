<script setup>
import { twMerge } from "tailwind-merge";

const props = defineProps(["customClass"]);
</script>

<template>
  <div
    :class="
      twMerge(
        `
        bg-neutral-900 
        rounded-lg 
        h-fit 
        w-full
        `,
        props.customClass || ''
      )
    "
  >
    <slot />
  </div>
</template>
