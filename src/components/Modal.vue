<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "radix-vue";
import { Icon } from "@iconify/vue";

defineProps(["isOpen", "onChange", "title", "description"]);
</script>

<template>
  <DialogRoot
    :open="isOpen"
    :defaultOpen="isOpen"
    @update:open="onChange()"
  >
    <DialogPortal>
      <DialogOverlay class="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
      <DialogContent
        class="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none"
      >
        <DialogTitle class="text-xl text-center font-bold mb-4">
          {{ title }}
        </DialogTitle>
        <DialogDescription class="mb-5 text-sm leading-normal text-center">
          {{ description }}
        </DialogDescription>
        <div>
          <slot />
        </div>
        <DialogClose asChild>
          <button
            class="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
            aria-label="Close"
          >
            <Icon icon="ion:close-outline" />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
