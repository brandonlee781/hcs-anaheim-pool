<template>
  <tr>
    <Data @click="() => (show = !show)">{{ time }}</Data>
    <Data
      v-for="(match, i) in matches"
      class="hidden xl:table-cell"
      :key="`match-${time}-${i}`"
    >
      <MatchData :match="match" :time="time"/>
    </Data>
    <Data class="table-cell xl:hidden">
      <template v-if="show">
        <MatchData
          v-for="(match, i) in matches"
          :key="`match-${time}-${i}`"
          :match="match"
          :time="time"
        />
      </template>
      <template v-else>
        Click the time to show
      </template>
    </Data>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Match } from '@/data';
import Data from '@/components/table/BaseData.vue'
import MatchData from './MatchData.vue';

const props = defineProps<{ matches: Match[], time: string; }>()
const show = ref(true)
</script>

<style scoped>
</style>
