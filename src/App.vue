<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <ScheduleTable class="min-w-full" />
        </div>
      </div>
    </div>
  </div>
  <div class="pools">
    <PoolTable
     class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      title="Pool A"
      :teams="poolA"
    />
    <PoolTable
      class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      title="Pool B"
      :teams="poolB"
    />
    <PoolTable
      class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      title="Pool C"
      :teams="poolC"
    />
    <PoolTable
      class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      title="Pool D"
      :teams="poolD"
    />
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
  margin: 2rem;
}

.pools {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.pools table {
  margin: 16px;
}
.pools table:first-of-type {
  margin-left: 0;
}
.pools table:last-of-type {
  margin-right: 0;
}
</style>
