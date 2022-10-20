<script setup lang="ts">
import { computed } from 'vue'
import useTeam from '@/composables/useTeam'

const { showScheduleLogos } = useTeam()

const props = defineProps<{
  team1?: Team
  team2?: Team
  team3?: Team
  team4?: Team
  stream?: Stream
  text?: string
  textClass?: string
}>()

const teams = computed<Team[]>(
  () =>
    [props.team1, props.team2, props.team3, props.team4].filter(
      Boolean
    ) as Team[]
)
</script>

<template>
  <TableData class="match-wrapper" :highlights="teams">
    <MatchHover :teams="teams" :display-logos="showScheduleLogos" />
    <div
      v-if="teams.length <= 2"
      class="match-data"
      :class="[showScheduleLogos ? 'px-12 md:px-0 show-logos' : '']"
    >
      <div
        v-if="text"
        class="match-text text-center whitespace-normal"
        :class="[textClass ? textClass : 'text-sm mb-2']"
      >
        {{ text }}
      </div>
      <div
        v-if="team1 && team2"
        class="match-teams text-md font-semibold tracking-wider lead min-w-full flex flex-row items-center justify-center md:flex-col lg:flex-row"
      >
        <span v-if="team1" class="text-right w-40">
          {{ team1.name }}
        </span>
        <span class="mx-2">vs</span>
        <span v-if="team2" class="text-left w-40">
          {{ team2.name }}
        </span>
      </div>
      <div
        v-if="stream"
        class="match-stream md:hidden flex items-center justify-center md:justify-end"
      >
        <a
          class="underline text-xs leading-4"
          :href="stream.link"
          target="_blank"
        >
          {{ stream.name }}
        </a>
      </div>
    </div>
    <div
      v-else
      class="match-data winner-of"
      :class="[showScheduleLogos ? 'px-12 md:px-0 show-logos' : '']"
    >
      <div
        v-if="text"
        class="match-text text-center whitespace-normal"
        :class="[textClass ? textClass : 'text-sm']"
      >
        {{ text }}
      </div>
      <div
        v-if="team1 && team3"
        class="match-left match-teams text-md font-semibold tracking-wider lead min-w-full flex flex-row items-center justify-center md:flex-col lg:flex-row"
      >
        <span v-if="team1" class="text-center w-40">
          {{ team1.name }}
        </span>
        <span class="mx-2">or</span>
        <span v-if="team3" class="text-center w-40">
          {{ team3.name }}
        </span>
      </div>
      <div class="winner-of-vs">vs</div>
      <div
        v-if="team2 && team4"
        class="match-right match-teams text-md font-semibold tracking-wider lead min-w-full flex flex-row items-center justify-center md:flex-col lg:flex-row"
      >
        <span v-if="team2" class="text-center w-40">
          {{ team2.name }}
        </span>
        <span class="mx-2">or</span>
        <span v-if="team4" class="text-center w-40">
          {{ team4.name }}
        </span>
      </div>
      <div
        v-if="stream"
        class="match-stream md:hidden flex items-center justify-center md:justify-end"
      >
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: fit-content fit-content fit-content;
}

.match-data .match-text {
  grid-row: 1 / span 1;
  grid-column: 1 / span 2;
}

.match-data.show-logos {
  grid-template-columns: 1fr;
}

.match-data .match-teams {
  grid-row: 2 / span 1;
  grid-column: 1 / span 2;
}

.match-data .match-stream {
  grid-row: 3 / span 1;
  grid-column: 1 / span 2;
  text-align: left;
}

.match-data.winner-of {
  grid-template-columns: 1fr 16px 1fr;
  grid-template-rows: 1fr;
  margin-top: 8px;
  margin-bottom: 8px;
}

.match-data.winner-of .match-stream {
  position: absolute;
  bottom: 4px;
  right: 0;
  left: 0;
}

.match-data.winner-of .match-text {
  position: absolute;
  top: 4px;
  right: 0;
  left: 0;
}

.match-data.winner-of .match-left {
  grid-column: 1 / span 1;
  grid-row: 2;
  display: flex;
  flex-flow: column nowrap;
}

.match-data.winner-of .match-right {
  grid-column: 3 / span 1;
  grid-row: 2;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.winner-of-vs {
  grid-row: 2;
  grid-column: 2 / span 1;
  justify-self: center;
  align-self: center;
}

@media (min-width: 768px) {
  .match-data {
    grid-template-columns: 1fr;
  }
  .match-text {
    text-align: center;
  }
}

/* .match-wrapper {
  position: relative;
} */

.match-data {
  z-index: 2;
}

.match-wrapper:hover :deep(.right),
.match-wrapper:hover :deep(.left) {
  opacity: 0.3;
  transition: opacity 0s linear 0.5s;
}
</style>
