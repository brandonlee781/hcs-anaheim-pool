<script setup lang="ts">
import { useUiStore } from '@/store/ui'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useI18n } from 'vue-i18n'
const intervalMS = 15 * 60 * 1000

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        console.log('checking for update')
        r.update()
      }, intervalMS)
  },
})
const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}

const uiStore = useUiStore()
const { t } = useI18n()
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast rounded-lg z-10 fixed bottom-4 right-4 border-1 border-gray-500 shadow-md text-left m-4 p-3"
    :class="[uiStore.tableHeadStyle]"
    role="alert"
  >
    <div class="mb-2">
      <span v-if="offlineReady"> {{ t('instructions.work-offline') }} </span>
      <span v-else>
        {{ t('instructions.new-content') }}
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">
      {{ t('instructions.reload') }}
    </button>
    <button @click="close"> {{ t('instructions.close') }} </button>
  </div>
</template>

<style>
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
