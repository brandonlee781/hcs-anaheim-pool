<script setup lang="ts">
import { useUiStore } from '@/store/ui'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

defineProps<{ label?: string; width?: number }>()
const open = ref(false)
const dropDownRef = ref(null)

onClickOutside(dropDownRef, () => {
  open.value = false
})

const toggleOpen = () => (open.value = !open.value)

const uiStore = useUiStore()
</script>

<template>
  <div ref="dropDownRef" class="relative inline-block text-left dropdown z-3">
    <span class="rounded-md shadow-sm">
      <slot name="activator" :open="open" :toggleOpen="toggleOpen">
        <button
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:shadow-outline-blue"
          :class="[uiStore.buttonStyle]"
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span>{{ label }}</span>
          <svg
            class="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </slot>
    </span>
    <div
      class="dropdown-menu z-3 transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
      :class="[open ? '' : 'opacity-0 invisible']"
    >
      <div
        class="absolute right-0 mt-2 z-3 origin-top-right border divide-y rounded-md shadow-lg outline-none"
        :class="[uiStore.cardStyle, uiStore.tableDataStyle]"
        :style="{
          width: (width ?? 120) + 'px',
        }"
        role="menu"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
