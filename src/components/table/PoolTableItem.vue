<script setup lang="ts">
import { Team } from '@/data'
import useTeam from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'

const props = defineProps<{ team: Team; index: number }>()
const { windowWidth } = useWindowWidth()
const isDesktop = $computed(() => windowWidth.value > 1200)

const { setHover, hoveredTeam, clickToHighlight } = useTeam()
const onClick = (team: Team) => {
  if (clickToHighlight.value && hoveredTeam.value?.name === team.name) {
    setHover(null)
  } else if (isDesktop) {
    setHover(team)
  } else {
    setHover(team)
  }
}

let hovered = $ref(false)
const onMouseEnter = () => {
  hovered = true
  if (isDesktop && !clickToHighlight.value) {
    setHover(props.team)
  }
}
const onMouseLeave = () => {
  hovered = false
  if (isDesktop && !clickToHighlight.value) {
    setHover(null)
  }
}

const getSrc = (image: string) => {
  const url = new URL(`../../assets/images/${image}`, import.meta.url).href
  return url
}
</script>

<template>
  <td
    class="pool-item-td cursor-pointer dark:bg-gray-900 light:bg-gray-100 divide-y dark:divide-gray-200 light:divide-gray-800"
    @click="() => onClick(team)"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div :class="{ 'pool-item-wrapper mobile-row': true, hovered }">
      <div class="team-image">
        <img v-if="team.image" :src="getSrc(team.image)" />
      </div>
      <span class="team-name">
        {{ team.name }}
      </span>
      <span class="team-region">{{ team.region }}</span>
    </div>
  </td>
</template>

<style scoped>
* {
  --default-pool-height: 52px;
  --default-pool-width: 294px;
  --pool-hover-height-offset: 10px;
  --pool-hover-width-offset: 20px;
}
.pool-item-td {
  position: relative;
  height: var(--default-pool-height);
  width: var(--default-pool-width);
}

.pool-item-td:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
/* .pool-item-td:hover .team-name {
  text-decoration: underline;
  text-decoration-thickness: 3px;
} */

.pool-item-wrapper {
  @apply bg-gray-900 border-b-1 border-bottom-gray-200 px-6 whitespace-nowrap text-sm font-medium text-gray-200;
  position: absolute;
  height: var(--default-pool-height);
  width: var(--default-pool-width);

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;

  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transition: all 0.2s ease;
}

.light .pool-item-wrapper {
  @apply bg-gray-100 border-bottom-gray-800 text-gray-800;
}

.team-image {
  display: none;
  height: 72px;
  width: 75px;
}
.team-image img {
  height: 100%;
  width: 100%;
  padding: 8px 8px 8px 8px;
  object-fit: scale-down;
  filter: drop-shadow(4px 8px 10px black);
}

.team-name {
  justify-self: flex-start;
  align-self: center;
}

.team-region {
  justify-self: flex-end;
  align-self: center;
}

.pool-item-wrapper.hovered {
  @apply bg-gray-700 border-1 pl-0;
  grid-template-columns: 75px 1fr 1fr;
  top: -10px;
  left: -20px;
  right: 20px;
  bottom: 10px;
  height: calc(var(--default-pool-height) + 20px);
  width: calc(var(--default-pool-width) + 40px);
  z-index: 2;
}

.light .pool-item-wrapper.hovered {
  @apply bg-gray-300;
}

.pool-item-wrapper.hovered .team-image {
  display: inline-block;
}

.pool-item-wrapper.hovered .team-name {
  padding-left: 8px;
}
</style>
