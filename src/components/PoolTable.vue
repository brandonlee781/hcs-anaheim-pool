<template>
  <BaseTable :headers="[title]">
    <tr v-for="(team) in teams" :key="team.name">
      <Data
        class="team-data cursor-pointer"
        @mouseenter="setHover(team)"
        @mouseleave="setHover(null)"
      >
        {{ team.name }}
      </Data>
    </tr>
  </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from '@/components/table/BaseTable.vue';
import Data from '@/components/table/BaseData.vue'
import { Team } from '@/data'
import useTeam from '@/composables/useTeam'

defineProps<{ title: string; teams: Team[] }>()
const { setHover, hoveredTeam } = useTeam()
</script>

<style scoped>
.team-data:hover {
  background-color: rgba(255,255, 255, 0.1);
}
</style>
