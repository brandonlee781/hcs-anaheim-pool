<script setup lang="ts">
import { useUiStore } from '@/store/ui'
import { useRegisterSW } from 'virtual:pwa-register/vue'
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
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast rounded-lg z-10 fixed bottom-4 right-4 border-1 border-gray-500 shadow-md text-left m-4 p-3"
    :class="[uiStore.tableHeadStyle]"
    role="alert"
  >
    <div class="mb-2">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()"> Reload </button>
    <button @click="close"> Close </button>
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
