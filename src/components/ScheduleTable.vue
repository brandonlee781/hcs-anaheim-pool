<template>
  <BaseTable :headers="headers">
    <tr>
      <Data>{{ format(new Date('2022-02-11T19:30:00+0000'), 'h:mmaaa') }}</Data>
      <Data :colspan="headers.length - 1" class="text-left lg:text-center">Broadcast Start</Data>
    </tr>
    <tr>
      <Data>{{ format(new Date('2022-02-11T19:45:00+0000'), 'h:mmaaa') }}</Data>
      <Data :colspan="headers.length - 1" class="text-left lg:text-center">Anaheim Preshow</Data>
    </tr>
    <MatchRow
      v-for="(time, index) in timeslots"
      :key="index"
      :time="time"
      :matches=" getMatches(index)"
    />
    <tr>
      <Data>{{ format(new Date('2022-03-11T03:45:00+0000'), 'h:mmaaa') }}</Data>
      <Data :colspan="headers.length - 1" class="text-left lg:text-center">Broadcast Ends</Data>
    </tr>
  </BaseTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Data from '@/components/table/BaseData.vue'
import { matches, streams } from '@/data';
import { format } from 'date-fns'
import useWindowWidth from '@/composables/useWindowWidth';
import BaseTable from './table/BaseTable.vue';
import MatchRow from './MatchRow.vue';

const { windowWidth } = useWindowWidth()

const defaultTimeslots = [
  new Date('2022-02-11T20:00:00+0000'),
  new Date('2022-02-11T21:15:00+0000'),
  new Date('2022-02-11T22:30:00+0000'),
  new Date('2022-02-11T23:45:00+0000'),
  new Date('2022-03-11T01:00:00+0000'),
  new Date('2022-03-11T02:15:00+0000'),
]

const timeslots = computed(() => defaultTimeslots.map((time: Date) => format(time, 'h:mmaaa')))

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

const getMatches = (index: number) => matches.filter((m) => m.timeslot === index)

</script>

<style scoped>
</style>
