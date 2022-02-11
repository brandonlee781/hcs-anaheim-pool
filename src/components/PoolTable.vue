<template>
  <BaseTable :headers="[title]">
    <tr v-for="(team) in teams" :key="team.name">
      <Data
        class="team-data cursor-pointer"
        @click="() => onClick(team)"
        @mouseenter="isDesktop && setHover(team)"
        @mouseleave="isDesktop && setHover(null)"
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
import useWindowWidth from '@/composables/useWindowWidth'
import { computed } from 'vue';

defineProps<{ title: string; teams: Team[] }>()

const { windowWidth } = useWindowWidth()
const isDesktop = computed(() => windowWidth.value > 1200)

const { setHover, hoveredTeam } = useTeam()
const onClick = (team: Team) => {
  if (hoveredTeam.value?.name === team.name) {
    setHover(null)
  } else {
    setHover(team)
  }
}
</script>

<style scoped>
.team-data:hover {
  background-color: rgba(255,255, 255, 0.1);
}
</style>
