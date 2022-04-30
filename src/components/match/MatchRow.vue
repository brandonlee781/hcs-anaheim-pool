<script setup lang="ts">
import { ref } from 'vue'
import { Match } from '@/composables/useMatches';

const props = defineProps<{ matches: Match[], time: string; }>()
const show = ref(true)
</script>


<template>
  <tr>
    <TableData @click="() => (show = !show)">{{ time }}</TableData>
    <TableData
      v-for="(match, i) in matches"
      class="hidden lg:table-cell"
      :key="`match-${time}-${i}`"
    >
      <MatchData :match="match" />
    </TableData>
    <TableData class="table-cell lg:hidden">
      <template v-if="show">
        <MatchData
          v-for="(match, i) in matches"
          :key="`match-${time}-${i}`"
          :match="match"
        />
      </template>
      <template v-else>
        Click the time to show
      </template>
    </TableData>
  </tr>
</template>


<style scoped>
</style>
