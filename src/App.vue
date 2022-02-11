<template>
  <div class="">
    <div class="py-4 px-8 bg-gray-700 shadow-lg rounded-lg mb-4 mx-2 xl:mx-0">
      <div>
        <p class="text-gray-200">
          All times are automatically converted to your timezone.
          <span class="hidden xl:inline">Hover over</span>
          <span class="xs:inline xl:hidden">Click</span>
          a team in the pools below to highlight them in the schedule.
          <span class="xs:inline xl:hidden">Click the time to show and hide it's matches.</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div class="min-w-full shadow border-b border-gray-200 sm:rounded-lg px-2 xl:px-0">
        <ScheduleTable class="max-w-full" />
      </div>
    </div>
    <div class="pools">
      <PoolTable
       class="shadow border-b border-gray-200 sm:rounded-lg"
        title="Pool A"
        :teams="poolA"
      />
      <PoolTable
        class="shadow border-b border-gray-200 sm:rounded-lg"
        title="Pool B"
        :teams="poolB"
      />
      <PoolTable
        class="shadow border-b border-gray-200 sm:rounded-lg"
        title="Pool C"
        :teams="poolC"
      />
      <PoolTable
        class="shadow border-b border-gray-200 sm:rounded-lg"
        title="Pool D"
        :teams="poolD"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { teams, Pool } from '@/data'
import ScheduleTable from './components/ScheduleTable.vue';
import PoolTable from './components/PoolTable.vue';

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
#app {
  margin: 2rem auto;
  max-width: 1200px;
}

.pools {
  display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
}
.pools table {
  margin: 8px;
}

@media (min-width:1200px) {
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
