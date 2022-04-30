<script setup lang="ts">
import useTeam from './composables/useTeam';

const { clickToHighlight, pools } = useTeam()
const day = $ref(1)
</script>

<template>
  <AppHeader v-model:day="day" title="HCS Kansas City Major" />
  <div class="flex flex-col items-center">
    <div class="min-w-full card">
        <ScheduleTable class="max-w-full" :day="day"/>
    </div>
  </div>
  <div class="pools">
    <PoolTable
      class="card"
      title="Pool A"
      :teams="pools.A"
    />
    <PoolTable
      class="card"
      title="Pool B"
      :teams="pools.B"
    />
    <PoolTable
      class="card"
      title="Pool C"
      :teams="pools.C"
    />
    <PoolTable
      class="card"
      title="Pool D"
      :teams="pools.D"
    />
  </div>

  <AppFooter />
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
