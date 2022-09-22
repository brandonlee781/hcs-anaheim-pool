<script setup lang="ts">
import useTournament from '@/composables/useTournament'
import { useUiStore } from '@/store/ui'
import { useI18n } from 'vue-i18n'

defineProps({
  title: { type: String, defaut: null },
  dark: { type: Boolean, default: true },
})
defineEmits(['update:day', 'update:dark', 'pointerenter', 'pointerleave'])
const { event, day } = useTournament()
const uiStore = useUiStore()
const { t, te } = useI18n()
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
          >{{
            te(`days.${d.text}`)
              ? t(`days.${d.text}`)
              : t('days.day', { num: index + 1 })
          }}</a
        >
      </div>
      <div class="flex flex-row flex-nowrap items-center justify-center">
        <p class="">
          {{ t('instructions.timezone') }}
          <span class="xs:inline md:hidden">
            {{ t('instructions.click-pool') }}
          </span>
          <span class="xs:inline md:hidden">
            &nbsp;{{ t('instructions.toggle-times') }}
          </span>
        </p>
        <a class="cursor-pointer w-4 h-4 ml-4" @click="uiStore.setDarkMode()">
          <i-mdi-theme-light-dark />
        </a>

        <a class="cursor-pointer w-4 h-4 ml-4">
          <i-mdi-translate />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
