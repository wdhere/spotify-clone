<script setup>
import qs from "query-string";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { ref, watch } from "vue";

const router = useRouter();

const value = ref("");

const debouncedFn = useDebounceFn(() => {
  const query = {
    title: value.value,
  };

  const url = qs.stringifyUrl({
    url: "/search",
    query,
  });

  router.push(url);
}, 500);

watch(value, () => {
  debouncedFn();
});
</script>

<template>
  <input
    placeholder="What do you want to listen to?"
    v-model="value"
    class="flex w-full rounded-md bg-neutral-700 border border-transparent px-4 py-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
  />
</template>
