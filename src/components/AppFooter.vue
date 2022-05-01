<script setup lang="ts">
import useTeam from '@/composables/useTeam'
const { clickToHighlight } = useTeam()
</script>

<template>
  <div class="flex flex-row justify-between align-center">
    <div class="hidden xl:inline">
      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input v-model="clickToHighlight" type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
        <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
      </div>
      <label class="cursor-pointer" for="toggle">
        {{ clickToHighlight ? 'Click' : 'Hover' }} team name in their pool to highlight their matches
      </label>
    </div>

    <div class="text-gray-200 text-xs underline text-right">
      <a href="https://liquipedia.net/halo/Halo_Championship_Series/2021-22/Kansas_City" target="_blank">
        Liquipedia Page for this event
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
