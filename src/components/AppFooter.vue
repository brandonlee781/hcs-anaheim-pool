<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import { useUiStore } from '@/store/ui'

defineProps<{ link: string; showToggle: boolean }>()

const { clickToHighlight, showScheduleLogos } = useTeam()
const uiStore = useUiStore()
</script>

<template>
  <div
    class="flex flex-row justify-between align-center mt-1"
    :class="[uiStore.footerStyle]"
  >
    <div class="flex flex-row">
      <div class="hidden xl:inline">
        <BaseToggle v-model="clickToHighlight">
          {{ clickToHighlight ? 'Click' : 'Hover' }} Pools to Highlight
        </BaseToggle>
      </div>
      <BaseToggle v-model="showScheduleLogos" class="ml-6">
        {{ showScheduleLogos ? 'Show' : 'Hide' }} Team Logos
      </BaseToggle>
    </div>

    <div class="dark:text-gray-200 text-xs underline text-right">
      <a :href="link" target="_blank"> Liquipedia Page for this event </a>
    </div>
  </div>
</template>

<style scoped></style>
