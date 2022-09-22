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
    class="flex flex-row justify-between align-center mt-1"
    :class="[uiStore.footerStyle]"
  >
    <div class="flex flex-row">
      <div class="hidden xl:inline">
        <BaseToggle v-model="clickToHighlight">
          {{
            clickToHighlight
              ? t('footer.click-highlight')
              : t('footer.hover-highlight')
          }}
        </BaseToggle>
      </div>
      <BaseToggle v-model="showScheduleLogos" class="ml-6">
        {{
          showScheduleLogos ? t('footer.show-logos') : t('footer.hide-logos')
        }}
      </BaseToggle>
    </div>

    <div class="dark:text-gray-200 text-xs underline text-right">
      <a :href="link" target="_blank">{{ t('footer.link') }}</a>
    </div>
  </div>
</template>

<style scoped></style>
