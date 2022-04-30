<script setup lang="ts">
import useTeam from '@/composables/useTeam';
import { computed } from 'vue';
import useWindowWidth from '@/composables/useWindowWidth';
import { Match } from '@/composables/useMatches'

const { hoveredTeam } = useTeam()
const { windowWidth } = useWindowWidth()
const isMobile = computed(() => windowWidth.value <= 1024)

const props = defineProps<{ match: Match }>()


const color = computed(() => {
  if (hoveredTeam.value?.name === props.match.team1?.name) {
    return props.match.team1?.color
  }
  if (hoveredTeam.value?.name === props.match.team2?.name) {
    return props.match.team2?.color
  }
  return 'transparent'
})
</script>

<template>
  <div class="background" :style="{ borderColor: color }"></div>
  <div class="w-full flex flex-col sm:flex-row flex-wrap lg:items-center">
    <div
      class="match-teams text-sm lg:hidden xl:block"
      :style="{
        textDecoration: isMobile ? 'underline' : 'none',
        textDecorationThickness: '3px',
        textDecorationColor: color,
      }"
    >

      <span>
        {{ match.team1.name }}
      </span>
      vs
      <span>
        {{ match.team2.name }}
      </span>
    </div>
    <div class="match-teams min-w-full flex-col items-center hidden lg:flex xl:hidden">
      <span>
        {{ match.team1.name }}
      </span>
      <span>vs</span>
      <span>
        {{ match.team2.name }}
      </span>
    </div>
    <div class="lg:hidden pl-4">
      <a class="underline text-xs leading-4" :href="match.stream.link" target="_blank">
        {{ match.stream.name }}
      </a>
    </div>
  </div>
</template>



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
