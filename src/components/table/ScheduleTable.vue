<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import useWindowWidth from '@/composables/useWindowWidth';
import useMatches, { Match } from '@/composables/useMatches'
import useSchedule from '@/composables/useSchedule';

const props = defineProps({ day: { type: Number, default: 1 } })
const day = computed(() => props.day)

const { schedule } = useSchedule(day)
const { streams } = useMatches()

const { windowWidth } = useWindowWidth()

const headers = computed(() => {
  if (windowWidth.value >= 1024) {
    return [
      { text: 'Timeslot' },
      ...Object.values(streams).map((st) => ({
        text: st.name,
        link: st.link,
      })),
    ]
  }
  return [
    { text: 'Timeslot' },
    { text: 'Matches' },
  ]
})
</script>

<template>
  <BaseTable :headers="headers">

    <template v-for="(timeslot, index) in schedule">
      <tr v-if="timeslot.text" :key="index">
        <TableData>{{ timeslot.time }}</TableData>
        <TableData :colspan="timeslot.span" class="text-left lg:text-center">
          {{ timeslot.text }}
        </TableData>
      </tr>
      <MatchRow
        v-else
        :key="`match-${index}`"
        :time="timeslot.time"
        :matches="timeslot.matches!"
      />
    </template>
  </BaseTable>
</template>



<style scoped>
</style>
