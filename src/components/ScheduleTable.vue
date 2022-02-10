<template>
  <BaseTable :headers="headers">
    <tr>
      <Data>11:30am</Data>
      <Data v-for="n in 4" :key="`start-${n}`">Broadcast Start</Data>
    </tr>
    <tr>
      <Data>11:45am</Data>
      <Data v-for="n in 4" :key="`pre-${n}`">Anaheim Preshow</Data>
    </tr>
    <tr v-for="(time, index) in timeslots" :key="index">
      <Data>{{ time }}</Data>
      <MatchData
        v-for="(match, i) in getMatches(index)"
        :key="`match-${time}-${i}`"
        :match="match"
      />
    </tr>

    <tr>
      <Data>7:45pm</Data>
      <Data v-for="n in 4" :key="`pre-${n}`">Broadcast Ends</Data>
    </tr>
  </BaseTable>
</template>

<script setup lang="ts">
import Data from '@/components/table/BaseData.vue'
import { matches, teams } from '@/data';
import useTeam from '@/composables/useTeam';
import BaseTable from './table/BaseTable.vue';
import MatchData from './MatchData.vue';

const timeslots = [
  '12:00pm',
  '1:15pm',
  '2:30pm',
  '3:45pm',
  '5:00pm',
  '6:15pm',
]
const headers = [
  'Timeslot',
  'A Stream (Halo)',
  'B Stream (Xbox)',
  'C Stream (HCS_Red)',
  'D Stream (HCS_Blue)',
]

const getMatches = (index: number) => matches.filter((m) => m.timeslot === index)

</script>

<style scoped>
</style>
