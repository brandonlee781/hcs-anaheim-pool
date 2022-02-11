<template>
  <BaseTable :headers="headers">
    <tr>
      <Data>{{ format(new Date('2022-02-11T18:30:00+0000'), 'h:mmaaa') }}</Data>
      <Data v-for="n in (headers.length - 1)" :key="`start-${n}`">Broadcast Start</Data>
    </tr>
    <tr>
      <Data>{{ format(new Date('2022-02-11T18:45:00+0000'), 'h:mmaaa') }}</Data>
      <Data v-for="n in (headers.length - 1)" :key="`pre-${n}`">Anaheim Preshow</Data>
    </tr>
    <MatchRow
      v-for="(time, index) in timeslots"
      :key="index"
      :time="time"
      :matches=" getMatches(index)"
    />
    <tr>
      <Data>{{ format(new Date('2022-03-11T02:45:00+0000'), 'h:mmaaa') }}</Data>
      <Data v-for="n in (headers.length - 1)" :key="`pre-${n}`">Broadcast Ends</Data>
    </tr>
  </BaseTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Data from '@/components/table/BaseData.vue'
import { matches } from '@/data';
import { format } from 'date-fns'
import useWindowWidth from '@/composables/useWindowWidth';
import BaseTable from './table/BaseTable.vue';
import MatchRow from './MatchRow.vue';

const { windowWidth } = useWindowWidth()

const defaultTimeslots = [
  new Date('2022-02-11T19:00:00+0000'),
  new Date('2022-02-11T20:15:00+0000'),
  new Date('2022-02-11T21:30:00+0000'),
  new Date('2022-02-11T22:45:00+0000'),
  new Date('2022-03-11T00:00:00+0000'),
  new Date('2022-03-11T01:15:00+0000'),
]

const timeslots = computed(() => defaultTimeslots.map((time: Date) => format(time, 'h:mmaaa')))

const headers = computed(() => {
  if (windowWidth.value >= 1200) {
    return [
      'Timeslot',
      'A Stream (Halo)',
      'B Stream (Xbox)',
      'C Stream (HCS_Red)',
      'D Stream (HCS_Blue)',
    ]
  }
  return [
    'Timeslot',
    'Matches',
  ]
})

const getMatches = (index: number) => matches.filter((m) => m.timeslot === index)

</script>

<style scoped>
</style>
