<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import { useUiStore } from '@/store/ui'

defineProps<{ link: string; showToggle: boolean }>()

const { clickToHighlight, showScheduleLogos } = useTeam()
const uiStore = useUiStore()
</script>

<template>
  <div
    class="flex flex-row justify-between items-center mt-2 pr-4"
    :class="[uiStore.footerStyle]"
  >
    <div class="flex flex-row">
      <div class="hidden xl:inline">
        <!-- <BaseToggle v-model="clickToHighlight">
          {{ clickToHighlight ? 'Click' : 'Hover' }} Pools to Highlight
        </BaseToggle> -->
        <button
          class="*btn flex flex-nowrap items-center justify-center"
          :class="[uiStore.buttonStyle]"
          @click="() => (clickToHighlight = !clickToHighlight)"
        >
          <i-mdi-cursor-default-click
            v-if="clickToHighlight"
            height="24"
            width="24"
            class="mr-2"
          />
          <i-mdi-cursor-default v-else height="24" width="24" class="mr-2" />
          <span class="">
            {{ clickToHighlight ? 'Click' : 'Hover' }} Pools to Highlight
          </span>
        </button>
      </div>
      <button
        class="*btn flex flex-nowrap items-center justify-center"
        :class="[uiStore.buttonStyle]"
        @click="() => (showScheduleLogos = !showScheduleLogos)"
      >
        <i-mdi-radar
          v-if="showScheduleLogos"
          height="24"
          width="24"
          class="mr-2"
        />
        <i-hcs-icons-camo v-else height="24" width="24" class="mr-2" />
        Team Logos {{ showScheduleLogos ? 'Shown' : 'Hidden' }}
      </button>
      <!-- <BaseToggle v-model="showScheduleLogos" class="ml-6"> </BaseToggle> -->
    </div>

    <div class="dark:text-gray-200 text-xs underline text-right">
      <a :href="link" target="_blank"> Liquipedia Page for this event </a>
    </div>
  </div>
</template>

<style scoped></style>
