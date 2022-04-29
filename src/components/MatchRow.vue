<script setup lang="ts">
import { ref } from 'vue'
import { Match } from '@/data';

const props = defineProps<{ matches: Match[], time: string; }>()
const show = ref(true)
</script>


<template>
  <tr>
    <BaseData @click="() => (show = !show)">{{ time }}</BaseData>
    <BaseData
      v-for="(match, i) in matches"
      class="hidden lg:table-cell"
      :key="`match-${time}-${i}`"
    >
      <MatchData :match="match" />
    </BaseData>
    <BaseData class="table-cell lg:hidden">
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
    </BaseData>
  </tr>
</template>


<style scoped>
</style>
