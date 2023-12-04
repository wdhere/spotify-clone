<script setup>
import { ref, toRef, computed } from "vue";
import { SliderRange, SliderRoot, SliderTrack } from "radix-vue";

const props = defineProps(["value"]);
const emit = defineEmits(["update:value"]);

const valueRef = toRef(props, "value");

const silderValue = computed(() => [valueRef.value]);

const handleChange = (newValue) => {
  emit("update:value", newValue[0]);
  // console.log(newValue[0]);
};
</script>

<template>
  <SliderRoot
    class="relative flex items-center select-none touch-none w-full h-10"
    v-model:modalValue="silderValue"
    @update:model-value="handleChange"
    :max="1"
    :step="0.1"
    aria-label="Volume"
  >
    {{ value }}
    <input
      :placeholder="[value]"
      class="w-[15px]"
    />
    {{ silderValue }}
    <SliderTrack class="bg-neutral-600 relative grow rounded-full h-[3px]">
      <SliderRange class="absolute bg-white rounded-full h-full" />
    </SliderTrack>
  </SliderRoot>
</template>
