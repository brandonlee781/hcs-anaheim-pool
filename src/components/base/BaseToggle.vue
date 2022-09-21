<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])

const uuid = ref(0)
onBeforeMount(() => {
  uuid.value = Math.ceil(Math.random() * 1000000)
})
</script>

<template>
  <div class="wrapper">
    <div
      class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
    >
      <input
        :value="modelValue"
        type="checkbox"
        name="toggle"
        :id="`toggle-${uuid}`"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full dark:bg-white light:bg-gray-600 border-4 light:border-gray-600 appearance-none cursor-pointer"
        @input="() => $emit('update:modelValue', !modelValue)"
      />
      <label
        :for="`toggle-${uuid}`"
        class="toggle-label block overflow-hidden h-6 rounded-full dark:bg-gray-300 light:bg-gray-700 cursor-pointer"
      ></label>
    </div>
    <label class="cursor-pointer" :for="`toggle-${uuid}`">
      <slot></slot>
    </label>
  </div>
</template>

<style scoped></style>
