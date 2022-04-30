<script setup lang="ts">
import { computed } from 'vue'
import useWindowWidth from '@/composables/useWindowWidth';
import useMatches from '@/composables/useMatches'
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
      <tr v-if="timeslot.items" :key="index">
        <TableData>{{ timeslot.time }}</TableData>
        <TableData
          v-for="(item, i) in timeslot.items"
          :key="`${timeslot.time}-${i}`"
          :colspan="item.span"
          class="text-left lg:text-center"
          :highlights="item.highlights"
        >
          {{ item.text }}
        </TableData>
      </tr>
      <MatchRow
        v-else-if="timeslot.matches"
        :key="`match-${index}`"
        :time="timeslot.time"
        :matches="timeslot.matches"
      />
    </template>
  </BaseTable>
</template>



<style scoped>
</style>
