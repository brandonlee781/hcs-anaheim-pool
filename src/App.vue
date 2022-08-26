<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import useTournament from '@/composables/useTournament'
import { watch } from 'vue'

const day = useStorage('hsc-day-val', 1)
const { pools, title, link } = useTournament(day)

const dark = useStorage('hcs-dark-val', true)
watch(dark, val => {
  if (val) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <AppHeader v-model:day="day" v-model:dark="dark" :title="title" />
  <div class="flex flex-col items-center">
    <div class="min-w-full c*ard">
      <ScheduleTable class="max-w-full" :day="day" />
    </div>
  </div>
  <div v-if="pools" class="pools">
    <PoolTable v-if="pools.A" class="*card" title="Pool A" :teams="pools.A" />
    <PoolTable v-if="pools.B" class="*card" title="Pool B" :teams="pools.B" />
    <PoolTable v-if="pools.C" class="*card" title="Pool C" :teams="pools.C" />
    <PoolTable v-if="pools.D" class="*card" title="Pool D" :teams="pools.D" />
  </div>

  <AppFooter :link="link" :show-toggle="!!pools" />
  <ReloadPrompt />
</template>

<style>
* {
  box-sizing: border-box;
}
#app {
  margin: 8px;
  max-width: 1200px;
}

.pools {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 8px;
}
.pools table {
  margin: 8px 0;
}

.toggle-checkbox:checked {
  @apply right-0 border-green-400;
  right: 0;
  border-color: rgb(21, 103, 255);
}
.toggle-checkbox:checked + .toggle-label {
  @apply bg-green-400;
  background-color: rgb(21, 103, 255);
}

@media (min-width: 600px) {
  .pools {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .pools table:first-of-type {
    margin-left: 0;
  }
  .pools table:last-of-type {
    margin-right: 0;
  }
}

@media (min-width: 1200px) {
  body {
    height: 100vh;
  }
  #app {
    margin: 1rem auto;
  }
  .pools {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .pools table:first-of-type {
    margin-left: 0;
  }
  .pools table:last-of-type {
    margin-right: 0;
  }
}
</style>
