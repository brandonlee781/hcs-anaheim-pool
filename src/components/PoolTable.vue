<template>
  <BaseTable :headers="[{ text: title }]">
    <tr v-for="(team) in teams" :key="team.name">
      <Data
        class="team-data cursor-pointer flex flex-row justify-between"
        @click="() => onClick(team)"
        @mouseenter="isDesktop && !clickToHighlight && setHover(team)"
        @mouseleave="isDesktop && !clickToHighlight && setHover(null)"
      >
        <span>{{ team.name }}</span>
        <span>{{ regions[team.region] }}</span>
      </Data>
    </tr>
  </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from '@/components/table/BaseTable.vue';
import Data from '@/components/table/BaseData.vue'
import { Team, Region } from '@/data'
import useTeam from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'
import { computed } from 'vue';

defineProps<{ title: string; teams: Team[] }>()

const regions = {
  [Region.NA]: 'NA',
  [Region.EU]: 'EU',
  [Region.MX]: 'MX',
  [Region.AZ]: 'AZ',
}

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
.team-data ::v-deep .data-slot {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.team-data:hover {
  background-color: rgba(255,255, 255, 0.1);
}
</style>
