<script setup lang="ts">
import { computed } from 'vue'
import useWindowWidth from '@/composables/useWindowWidth'
import useTeam from '@/composables/useTeam'

const { windowWidth } = useWindowWidth()
const isMobile = computed(() => windowWidth.value <= 1024)
const { showScheduleLogos, clickToHighlight, hoveredTeam } = useTeam()

function adjust(color: string, amount: number) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, c =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)
        ).substr(-2)
      )
  )
}

const props = defineProps<{
  team1?: Team
  team2?: Team
  stream?: Stream
  text?: string
  textClass?: string
}>()

const teams = computed<Team[]>(
  () => [props.team1, props.team2].filter(Boolean) as Team[]
)
const image1 = computed(() => {
  if (!props.team1?.image) return null
  return new URL(`/src/assets/images/${props.team1.image}`, import.meta.url)
    .href
})
const image2 = computed(() => {
  if (!props.team2?.image) return null
  return new URL(`/src/assets/images/${props.team2.image}`, import.meta.url)
    .href
})

const showImages = computed(() => {
  if (showScheduleLogos.value && !clickToHighlight.value && hoveredTeam.value) {
    return (
      hoveredTeam.value?.name === props.team1?.name ||
      hoveredTeam.value?.name === props.team2?.name
    )
  }
  return true
})
</script>

<template>
  <TableData class="match-wrapper" :highlights="teams">
    <div
      v-if="image1 && team1 && showImages"
      :class="{ left: true, showScheduleLogos }"
      :style="{ backgroundColor: adjust(team1.color, 50) }"
    >
      <img :src="image1" />
    </div>
    <div
      v-if="image2 && team2 && showImages"
      :class="{ right: true, showScheduleLogos }"
      :style="{ backgroundColor: adjust(team2.color, 50) }"
    >
      <img :src="image2" />
    </div>
    <div class="match-data" :class="[showScheduleLogos ? 'px-12 md:px-0' : '']">
      <div
        v-if="text"
        class="match-text"
        :class="[textClass ? textClass : 'text-sm mb-2']"
      >
        {{ text }}
      </div>
      <div
        v-if="team1 && team2"
        class="match-teams text-md font-semibold tracking-wider lead min-w-full flex flex-row items-center md:(flex-col justify-center) lg:flex-row"
      >
        <span v-if="team1" class="lg:text-right">
          {{ team1.name }}
        </span>
        <span class="mx-2">vs</span>
        <span v-if="team2" class="lg:text-left">
          {{ team2.name }}
        </span>
      </div>
      <div v-if="stream" class="match-stream md:hidden pl-4">
        <a
          class="underline text-xs leading-4"
          :href="stream.link"
          target="_blank"
        >
          {{ stream.name }}
        </a>
      </div>
    </div>
  </TableData>
</template>

<style scoped>
.match-data {
  display: grid;
  grid-template-columns: 2;
  grid-template-rows: 1;
}

.match-data .match-text {
  grid-column: 1 / span 1;
}
.match-data .match-teams {
  grid-column: 1 / span 1;
}
.match-data .match-stream {
  grid-column: 2 / span 1;
  text-align: right;
}

@media (min-width: 768px) {
  .match-data {
    grid-template-columns: 1;
  }
  .match-text {
    text-align: center;
  }
}

.match-wrapper {
  position: relative;
}
.right,
.left {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 8px;
  opacity: 0;
  z-index: 1;
}

.match-data {
  z-index: 2;
}

.match-wrapper:hover .right,
.match-wrapper:hover .left {
  opacity: 0.3;
  transition: opacity 0s linear 0.5s;
}

.right.showScheduleLogos,
.left.showScheduleLogos {
  opacity: 0.3;
}

/* @supports (-webkit-text-stroke: 0.3px black) {
  .match-wrapper:hover .match-teams,
  .match-wrapper:hover .match-text {
    -webkit-text-stroke: 0.3px black;
    -webkit-text-fill-color: white;
  }
} */

.right {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  -webkit-clip-path: polygon(60% 0, 100% 0%, 100% 100%, 40% 100%);
  clip-path: polygon(60% 0, 100% 0%, 100% 100%, 40% 100%);

  justify-content: flex-end;
}

.left {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
  clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
}

.left img,
.right img {
  height: 2rem;
  width: auto;
  object-fit: scale-down;
  filter: drop-shadow(4px 8px 10px black);
}
</style>
