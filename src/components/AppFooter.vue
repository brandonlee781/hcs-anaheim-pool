<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import { useUiStore } from '@/store/ui'
import { useI18n } from 'vue-i18n'

defineProps<{ link: string; showToggle: boolean }>()

const { clickToHighlight, showScheduleLogos } = useTeam()
const uiStore = useUiStore()
const { t } = useI18n()
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
            {{
              clickToHighlight
                ? t('footer.click-highlight')
                : t('footer.hover-highlight')
            }}
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
        {{
          showScheduleLogos ? t('footer.show-logos') : t('footer.hide-logos')
        }}
      </button>
    </div>

    <div class="dark:text-gray-200 text-xs underline text-right">
      <a :href="link" target="_blank">{{ t('footer.link') }}</a>
    </div>
  </div>
</template>

<style scoped></style>
