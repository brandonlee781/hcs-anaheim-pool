<template>
  <tr>
    <Data>{{ time }}</Data>
    <Data
      v-for="(match, i) in matches"
      class="hidden xl:table-cell"
      :key="`match-${time}-${i}`"
    >
      <MatchData :match="match" :time="time" />
    </Data>
    <Data class="table-cell xl:hidden">
      <MatchData
        v-for="(match, i) in matches"
        :key="`match-${time}-${i}`"
        :match="match"
        :time="time"
      />
    </Data>
  </tr>
</template>

<script setup lang="ts">
import { Match } from '@/data';
import Data from '@/components/table/BaseData.vue'
import MatchData from './MatchData.vue';

const props = defineProps<{ matches: Match[], time: string; }>()
</script>

<style scoped>
</style>
