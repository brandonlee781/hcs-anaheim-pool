<script setup lang="ts">
import { computed } from 'vue'
import useWindowWidth from '@/composables/useWindowWidth'

const { windowWidth } = useWindowWidth()
const isMobile = computed(() => windowWidth.value <= 1024)

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
</script>

<template>
  <TableData :highlights="teams">
    <div class="match-data w-full">
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
</style>
