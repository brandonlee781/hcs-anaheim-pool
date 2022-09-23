<script setup lang="ts">
import { watch, ref, computed, onMounted } from 'vue'
import useTeam from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'
import { useUiStore } from '@/store/ui'

const props = defineProps<{ team: Team; index: number }>()
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

let hovered = ref(false)
const onMouseEnter = () => {
  hovered.value = true
  if (isDesktop.value && !clickToHighlight.value) {
    setHover(props.team)
  }
}
const onMouseLeave = () => {
  hovered.value = false
  if (isDesktop.value && !clickToHighlight.value) {
    setHover(null)
  }
}

const poolItem = ref<HTMLElement | null>()
const itemWidth = ref('0')
watch(windowWidth, () => {
  if (poolItem.value?.clientWidth) {
    itemWidth.value = poolItem.value?.clientWidth + 'px' ?? '0'
  }
})
onMounted(() => {
  if (poolItem.value?.clientWidth) {
    itemWidth.value = poolItem.value?.clientWidth + 'px' ?? '0'
  }
})

const selected = computed(() => {
  if (window.innerWidth <= 768) {
    return hoveredTeam.value?.name === props.team.name
  }
  return false
})
const getSrc = (image: string) => {
  const url = new URL(`../../assets/images/${image}`, import.meta.url).href
  return url
}

const uiStore = useUiStore()

const background = computed(() => `${props.team.color}33`)
</script>

<template>
  <div
    ref="poolItem"
    class="pool-item-td cursor-pointer"
    :class="[uiStore.tableDataStyle, hovered || selected ? 'hovered' : '']"
    @click="() => onClick(team)"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      :class="{
        'pool-item-wrapper mobile-row': true,
        [uiStore.poolHoverStyle]: hovered || selected,
        hovered: hovered || selected,
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
  --pool-hover-height-offset: 10px;
  --pool-hover-width-offset: 20px;
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
  width: calc(v-bind('itemWidth') + 40px);
  z-index: 2;
}

.pool-item-wrapper.hovered .team-image {
  display: inline-block;
}

.pool-item-wrapper.hovered .team-name {
  padding-left: 8px;
}

@media (max-width: 1410px) {
  .pool-item-td.hovered {
    height: calc(var(--default-pool-height) + 50px);
    width: calc(v-bind('itemWidth') - 20px);
    background-color: transparent;
  }

  .pool-item-wrapper.hovered {
    top: 15px;
    bottom: -10px;
    right: 10px;
    left: 10px;
    height: calc(var(--default-pool-height) + 20px);
    width: calc(v-bind('itemWidth') - 20px);
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
