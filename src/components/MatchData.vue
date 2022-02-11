<template>
  <div class="background" :style="{ borderColor: color }"></div>
  <div class="max-w-full flex flex-col sm:flex-row flex-wrap">
    <span class="match-teams inline-block text-lg xl:text-sm">
      {{ teams[match.team1].name }} vs {{ teams[match.team2].name }}
    </span>
    <span class="inline-block xl:hidden pl-4 leading-8">
      <a class="underline leading-4" :href="match.stream.link" target="_blank">
        {{ match.stream.name }}
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Match, teams } from '@/data';
import useTeam from '@/composables/useTeam';
import { computed } from 'vue';
import Data from '@/components/table/BaseData.vue'

const { hoveredTeam } = useTeam()

const props = defineProps<{ match: Match }>()
const color = computed(() => {
  const team1 = teams[props.match.team1]
  const team2 = teams[props.match.team2]
  if (hoveredTeam.value?.name === team1.name) {
    return team1.color
  }
  if (hoveredTeam.value?.name === team2.name) {
    return team2.color
  }
  return 'transparent'
})
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: transparent;
  box-sizing: border-box;
  border-width: 8px;
  border-style: solid;
  pointer-events: none;
}
</style>
