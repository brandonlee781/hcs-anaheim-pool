<script setup lang="ts">
type Props = { title?: string; modelValue: boolean; hideHeader: boolean }
defineProps<Props>()
defineEmits(['click:close'])
</script>

<template>
  <div
    id="default-modal"
    :data-modal-show="modelValue"
    :aria-hidden="!modelValue"
    class="overflow-x-hidden overflow-y-auto fixed md:h-full top-4 left-0 right-0 md:inset-0 z-50 flex justify-center items-center"
    :class="[modelValue ? '' : 'hidden']"
  >
    <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow relative dark:bg-gray-700">
        <!-- Modal header -->
        <div
          v-if="!hideHeader"
          class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3
            class="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white"
          >
            {{ title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="default-modal"
            @click="$emit('click:close')"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <slot></slot>
        </div>
        <!-- Modal footer -->
        <div
          class="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
