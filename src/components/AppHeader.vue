<script setup lang="ts">
import useTournament from '@/composables/useTournament'
import { useUiStore } from '@/store/ui'

defineProps({
  title: { type: String, defaut: null },
  dark: { type: Boolean, default: true },
})
defineEmits(['update:day', 'update:dark', 'pointerenter', 'pointerleave'])
const { event, day } = useTournament()
const uiStore = useUiStore()
</script>

<template>
  <h1 class="dark:text-gray-200 text-center text-3xl mb-2 font-bold">
    {{ title }}
  </h1>
  <div
    class="py-2 px-6 mb-2 dark:text-gray-200"
    :class="[uiStore.tableHeadStyle, uiStore.cardStyle]"
  >
    <div class="flex flex-col-reverse md:flex-row justify-between items-center">
      <div
        class="w-full flex flex-row items-start mt-4 md:(items-center mt-0 w-75) xl:w-auto"
      >
        <a
          v-for="(d, index) in event.days"
          :key="index"
          class="*btn"
          :class="[
            uiStore.buttonStyle,
            day === index ? `active ${uiStore.buttonActiveStyle}` : '',
          ]"
          role="button"
          @click="() => (day = index)"
          >{{ d.text ?? `Day ${index + 1}` }}</a
        >
        <!-- <a
          v-if="event.days.length >= 2"
          class="*btn"
          :class="[
            uiStore.buttonStyle,
            day === 2 ? `active ${uiStore.buttonActiveStyle}` : '',
          ]"
          role="button"
          @click="$emit('update:day', 2)"
          >Saturday</a
        >
        <a
          v-if="event.days.length >= 3"
          class="*btn"
          :class="[
            uiStore.buttonStyle,
            day === 3 ? `active ${uiStore.buttonActiveStyle}` : '',
          ]"
          role="button"
          @click="$emit('update:day', 3)"
          >Championship Sunday</a
        > -->
      </div>
      <div class="flex flex-row flex-nowrap items-center justify-center">
        <p class="">
          All times are automatically converted to your timezone.
          <span class="xs:inline md:hidden"
            >Click a team in the pools below to highlight them in the
            schedule.</span
          >
          <span class="xs:inline md:hidden">
            Click the time to show and hide it's matches.</span
          >
        </p>
        <a class="cursor-pointer w-4 h-4 ml-4" @click="uiStore.setDarkMode()">
          <i-mdi-theme-light-dark />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
