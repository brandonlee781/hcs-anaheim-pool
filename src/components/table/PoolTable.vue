
<script setup lang="ts">
import useTeam, { Team } from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'
import { computed } from 'vue';

defineProps<{ title: string; teams: Team[] }>()

const { windowWidth } = useWindowWidth()
const isDesktop = computed(() => windowWidth.value > 1200)

const { setHover, hoveredTeam, clickToHighlight } = useTeam()
const onClick = (team: Team) => {
  if (clickToHighlight.value && hoveredTeam.value?.name === team.name) {
    setHover(null)
  } else if (isDesktop.value) {
    setHover(team)
  } else {
    setHover(team)
  }
}
</script>

<template>
  <BaseTable :headers="[{ text: title }]">
    <tr v-for="(team) in teams" :key="team.name">
      <TableData
        class="team-data cursor-pointer flex flex-row justify-between"
        @click="() => onClick(team)"
        @mouseenter="isDesktop && !clickToHighlight && setHover(team)"
        @mouseleave="isDesktop && !clickToHighlight && setHover(null)"
      >
        <span
          class="hover:underline"
          :style="{
            textDecorationColor: team.color
          }"
        >
        {{ team.name }}
        </span>
        <span>{{ team.region }}</span>
      </TableData>
    </tr>
  </BaseTable>
</template>


<style scoped>
.team-data :deep(.data-slot) {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.team-data:hover {
  background-color: rgba(255,255, 255, 0.1);
}
</style>
