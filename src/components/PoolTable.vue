<template>
  <BaseTable :headers="[{ text: title }]">
    <tr v-for="(team) in teams" :key="team.name">
      <Data
        class="team-data cursor-pointer"
        @click="() => onClick(team)"
        @mouseenter="isDesktop && !clickToHighlight && setHover(team)"
        @mouseleave="isDesktop && !clickToHighlight && setHover(null)"
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

const { setHover, hoveredTeam, clickToHighlight } = useTeam()
const onClick = (team: Team) => {
  if (isDesktop.value) {
    setHover(team)
  } else if (hoveredTeam.value?.name === team.name || !isDesktop.value) {
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
