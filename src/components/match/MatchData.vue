<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import { computed } from 'vue'
import useWindowWidth from '@/composables/useWindowWidth'
import { Match, Stream, Team } from '@/data'

const { hoveredTeam } = useTeam()
const { windowWidth } = useWindowWidth()
const isMobile = computed(() => windowWidth.value <= 1024)

const props = defineProps<{
  team1?: Team
  team2?: Team
  stream?: Stream
  text?: string
}>()

const color = computed(() => {
  if (props.team1 && hoveredTeam.value?.name === props.team1?.name) {
    return props.team1?.color
  }
  if (props.team2 && hoveredTeam.value?.name === props.team2?.name) {
    return props.team2?.color
  }
  return 'transparent'
})
</script>

<template>
  <td class="relative px-6 py-4">
    <div class="background" :style="{ borderColor: color }"></div>
    <div
      class="match-data w-full flex flex-row sm:flex-row flex-wrap items-center justify-between md:justify-center"
    >
      <div v-if="text" class="text-sm mb-2">
        {{ text }}
      </div>
      <div
        v-if="team1 && team2"
        class="match-teams text-md font-semibold tracking-wider lead min-w-full flex flex-row items-center md:(flex-col justify-center) lg:flex-row"
        :style="{
          textDecoration: isMobile ? 'underline' : 'none',
          textDecorationThickness: '3px',
          textDecorationColor: color,
        }"
      >
        <span v-if="team1" class="lg:text-right">
          {{ team1.name }}
        </span>
        <span class="mx-2">vs</span>
        <span v-if="team2" class="lg:text-left">
          {{ team2.name }}
        </span>
      </div>
      <div v-if="stream" class="md:hidden pl-4">
        <a
          class="underline text-xs leading-4 float-left"
          :href="stream.link"
          target="_blank"
        >
          {{ stream.name }}
        </a>
      </div>
    </div>
  </td>
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

.col-span-4 .match-data {
  justify-content: center;
}
</style>
