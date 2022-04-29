<template>
  <h1 class="text-gray-200 text-center text-3xl mb-4 font-bold">HCS Kansas City Major</h1>
  <div class="py-2 px-8 bg-gray-700 shadow-lg rounded-lg mb-4">
    <div class="flex flex-row justify-between">
      <p class="text-gray-200">
        All times are automatically converted to your timezone.
        <span class="xs:inline xl:hidden">Click a team in the pools below to highlight them in the schedule.</span>
        <span class="xs:inline xl:hidden"> Click the time to show and hide it's matches.</span>
      </p>
      <div class="hidden xl:inline">
        <label class="cursor-pointer" for="toggle">
          {{ clickToHighlight ? 'Click' : 'Hover' }} team name to highlight
        </label>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input v-model="clickToHighlight" type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
          <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="min-w-full shadow border-b border-gray-200">
      <ScheduleTable class="max-w-full" />
    </div>
  </div>
  <div class="pools">
    <PoolTable
      class="shadow border-b border-gray-200"
      title="Pool A"
      :teams="poolA"
    />
    <PoolTable
      class="shadow border-b border-gray-200"
      title="Pool B"
      :teams="poolB"
    />
    <PoolTable
      class="shadow border-b border-gray-200"
      title="Pool C"
      :teams="poolC"
    />
    <PoolTable
      class="shadow border-b border-gray-200"
      title="Pool D"
      :teams="poolD"
    />
  </div>
  <p class="text-gray-200 text-xs underline text-right">
    <a href="https://liquipedia.net/halo/Halo_Championship_Series/2021-22/Kansas_City/Pool_Play" target="_blank">
      Liquipedia Page for this event
    </a>
  </p>
  <ReloadPrompt />
</template>

<script setup lang="ts">
import { teams, Pool } from '@/data'
import ScheduleTable from './components/ScheduleTable.vue';
import PoolTable from './components/PoolTable.vue';
import useTeam from './composables/useTeam';

const { clickToHighlight } = useTeam()

const poolA = Object.keys(teams)
  .map((t) => teams[t])
  .filter((t) => t.pool === Pool.A)
const poolB = Object.keys(teams)
  .map((t) => teams[t])
  .filter((t) => t.pool === Pool.B)
const poolC = Object.keys(teams)
  .map((t) => teams[t])
  .filter((t) => t.pool === Pool.C)
const poolD = Object.keys(teams)
  .map((t) => teams[t])
  .filter((t) => t.pool === Pool.D)

</script>

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

@media (min-width:1200px) {
  body {
    height: 100vh;
    overflow: hidden;
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
