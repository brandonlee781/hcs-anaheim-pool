<script setup lang="ts">
import { Match } from '@/data'
import { ref, computed } from 'vue'

const props = defineProps<{ matches: Match[]; time: string }>()
const show = ref(true)
const validMatches = computed(() => {
  return props.matches.filter(match => match?.team1 && match?.team2)
})
const colSpan = computed(() => {
  switch (validMatches.value.length) {
    case 1:
      return 4
    case 2:
      return 2
    default:
      return 1
  }
})
</script>

<template>
  <tr>
    <TableData @click="() => (show = !show)">{{ time }}</TableData>
    <TableData
      v-for="(match, i) in validMatches"
      :class="`hidden lg:table-cell col-span-${colSpan}`"
      :key="`match-${time}-${i}`"
      :colspan="colSpan"
    >
      <MatchData :match="match" />
    </TableData>
    <TableData class="table-cell lg:hidden">
      <template v-if="show">
        <MatchData
          v-for="(match, i) in validMatches"
          :key="`match-${time}-${i}`"
          :match="match"
        />
      </template>
      <template v-else> Click the time to show </template>
    </TableData>
  </tr>
</template>

<style scoped></style>
