<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import { computed } from 'vue'

type Props = {
  teams: Team[]
  displayLogos: boolean
}
const props = defineProps<Props>()

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

const { hoveredTeam } = useTeam()

const show = computed(() => {
  if (props.displayLogos && hoveredTeam.value) {
    return props.teams?.map(t => t.name).includes(hoveredTeam.value.name)
  }
  return true
})

const formattedTeams = computed(() => {
  return props.teams.map(team => {
    if (!team.image) return team
    const image = new URL(`/src/assets/images/${team.image}`, import.meta.url)
      .href
    return {
      ...team,
      image,
    }
  })
})

const getClasses = (index: number) => {
  let horizontal = 'left'
  let vertical = 'top'
  const isVertical = props.teams.length > 2

  if (index % 2 === 0) {
    // if the item is even; ie 0 or 2
    horizontal = 'left'
  } else {
    // if item is odd; ie 1 or 3
    horizontal = 'right'
  }
  if (isVertical && index >= 2) {
    vertical = 'bottom'
  }

  return {
    displayLogos: props.displayLogos,
    [horizontal]: true,
    [vertical]: isVertical,
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="inner-wrapper">
      <template v-for="(team, index) in formattedTeams">
        <div
          v-if="show"
          :key="team.name"
          :class="getClasses(index)"
          :style="{ backgroundColor: adjust(team.color, 50) }"
        >
          <img :src="team.image" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.inner-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.right,
.left {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 8px;
  opacity: 0;
  z-index: 1;
  overflow: hidden;
}
.right.displayLogos,
.left.displayLogos {
  opacity: 0.3;
}
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

.left.top {
  bottom: 50%;
  -webkit-clip-path: polygon(0 0, 60% 0, 50% 100%, 0 100%);
  clip-path: polygon(0 0, 60% 0, 50% 100%, 0 100%);
}
.left.bottom {
  top: 50%;
  -webkit-clip-path: polygon(0 0, 50% 0, 40% 100%, 0 100%);
  clip-path: polygon(0 0, 50% 0, 40% 100%, 0 100%);
}

.right.top {
  bottom: 50%;
  clip-path: polygon(60% 0, 100% 0%, 100% 100%, 50% 100%);
}
.right.bottom {
  top: 50%;
  clip-path: polygon(50% 0, 100% 0%, 100% 100%, 40% 100%);
}

.left img,
.right img {
  position: absolute;
  top: calc(50% - 1rem);
  height: 2rem;
  width: auto;
  object-fit: scale-down;
  filter: drop-shadow(4px 8px 10px black);
  z-index: 4;
}

.left img {
  left: 1rem;
}
.right img {
  right: 1rem;
}
</style>
