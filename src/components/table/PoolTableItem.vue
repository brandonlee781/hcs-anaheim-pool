<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'
import { useUiStore } from '@/store/ui'
import { computed } from '@vue/reactivity'

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

const uiStore = useUiStore()

const background = computed(() => `${props.team.color}33`)
</script>

<template>
  <div
    class="pool-item-td cursor-pointer"
    :class="[uiStore.tableDataStyle, hovered ? 'hovered' : '']"
    @click="() => onClick(team)"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      :class="{
        'pool-item-wrapper mobile-row': true,
        [uiStore.poolHoverStyle]: hovered,
        hovered,
      }"
    >
      <div class="team-image">
        <img v-if="team.image" :src="getSrc(team.image)" />
      </div>
      <span class="team-name">
        {{ team.name }}
      </span>
      <span class="team-region">{{ team.region }}</span>
    </div>
  </div>
</template>

<style scoped>
* {
  --default-pool-height: 52px;
  --default-pool-width: 280px;
  --pool-hover-height-offset: 10px;
  --pool-hover-width-offset: 20px;
}

@media (max-width: 1182px) {
  * {
    --default-pool-width: calc(50vw - 28px);
  }
}

.pool-item-td {
  position: relative;
  height: var(--default-pool-height);
}

.pool-item-td:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.pool-item-wrapper {
  @apply border-b-1 px-6 whitespace-nowrap text-sm font-medium;
  position: absolute;
  height: var(--default-pool-height);

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;

  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transition: all 0.2s ease;
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
  @apply border-1 pl-0;
  grid-template-columns: 75px 1fr 1fr;
  top: -10px;
  left: -20px;
  right: 20px;
  bottom: 10px;
  height: calc(var(--default-pool-height) + 20px);
  width: calc(var(--default-pool-width) + 40px);
  z-index: 2;
}

.pool-item-wrapper.hovered .team-image {
  display: inline-block;
}

.pool-item-wrapper.hovered .team-name {
  padding-left: 8px;
}

@media (max-width: 600px) {
  .pool-item-td.hovered {
    height: calc(var(--default-pool-height) + 50px);
    width: auto;
    background-color: transparent;
  }
  .pool-item-wrapper.hovered {
    top: 15px;
    bottom: -10px;
    right: 0px;
    left: 10px;
    width: auto;
    height: calc(var(--default-pool-height) + 20px);
    width: calc(100vw - 32px);
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
