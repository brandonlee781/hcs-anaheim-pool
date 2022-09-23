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
const { t, te, availableLocales, locale } = useI18n()
</script>

<template>
  <div
    class="header-bar grid grid-cols-[80%,20%] grid-rows-2 h-24 p-2 md:(grid-cols-[1fr,2fr,1fr] grid-rows-1 gap-4 h-14 px-4 items-center)"
    :class="[uiStore.tableHeadStyle, uiStore.cardStyle]"
  >
    <h1
      class="dark:text-gray-200 text-xl md:text-3xl pl-1 font-bold whitespace-nowrap"
    >
      {{ title }}
    </h1>

    <nav
      class="row-start-2 col-span-2 md:(row-start-1 col-start-2 col-span-1 justify-self-center) overflow-y-hidden"
    >
      <div
        class="w-full flex flex-row items-start md:(items-center) overflow-y-scroll scrollbar-hide"
      >
        <a
          v-for="(d, index) in event.days"
          :key="index"
          class="py-2 px-4 mx-1 hover:underline whitespace-nowrap"
          :class="[
            uiStore.buttonStyle,
            day === index
              ? `underline active ${uiStore.buttonActiveStyle}`
              : '',
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
    </nav>

    <div class="controls flex flex-nowrap justify-end items-center">
      <a class="cursor-pointer w-4 h-4 ml-4" @click="uiStore.setDarkMode()">
        <i-mdi-theme-light-dark />
      </a>

      <BaseDropDown class="ml-4 -mb-1" :width="56">
        <template #activator="{ toggleOpen }">
          <a class="cursor-pointer" @click="toggleOpen">
            <i-mdi-translate />
          </a>
        </template>
        <ul>
          <li
            v-for="loc in availableLocales"
            :key="`locale-${loc}`"
            class="cursor-pointer hover:dark:bg-gray-600 hover:bg-gray-300 text-center py-2 uppercase"
            :class="[locale === loc ? 'dark:bg-blue-400 bg-blue-200' : '']"
            @click="locale = loc"
          >
            {{ loc }}
          </li>
        </ul>
      </BaseDropDown>
    </div>
  </div>
</template>

<style scoped></style>
