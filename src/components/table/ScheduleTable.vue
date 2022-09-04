<script setup lang="ts">
import { computed } from 'vue'
import useWindowWidth from '@/composables/useWindowWidth'
import useTournament from '@/composables/useTournament'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

const props = defineProps({ day: { type: Number, default: 1 } })
const day = computed(() => props.day)

const { schedule, streams, timezone } = useTournament(day)

const { windowWidth } = useWindowWidth()

const headers = computed(() => {
  if (windowWidth.value >= 600) {
    return [
      { text: 'Timeslot' },
      ...Object.values(streams).map(st => ({
        text: st.name,
        link: st.link,
      })),
    ]
  }
  return [{ text: 'Timeslot' }, { text: 'Matches' }]
})

const getStream = (index: number) => {
  return Object.values(streams)[index]
}

const getUserTime = (time: string) => {
  return format(new Date(time), 'h:mmaaa')
}

const getTourneyTime = (time: string) => {
  return formatInTimeZone(new Date(time), timezone, 'MM/dd/yyyy h:mmaaa')
}
</script>

<template>
  <BaseTable class="schedule-table" :headers="headers">
    <template v-for="(timeslot, index) in schedule">
      <tr
        v-if="timeslot.items"
        :key="index"
        class="dark:bg-gray-900 light:bg-gray-100 divide-y dark:divide-gray-200 light:divide-gray-800"
      >
        <TableData class="w-4 time-wrapper">
          <span>{{ getUserTime(timeslot.time) }}</span>
          <div
            class="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full time-tooltip z-50"
          >
            <div>Tournament Local Time:</div>
            <div>{{ getTourneyTime(timeslot.time) }}</div>
          </div>
        </TableData>
        <template v-for="(item, i) in timeslot.items" :key="i">
          <!-- <TableData
            v-if="!item.team1 && !item.team2"
            :key="`${timeslot.time}-${i}`"
            :colspan="item.span"
            class="text-left md:text-center"
            :highlights="item.highlights"
          >
            {{ item.text }}
          </TableData> -->
          <MatchData
            :colspan="item.span"
            :team1="item.team1"
            :team2="item.team2"
            :text="item.text"
            :stream="getStream(i)"
          />
        </template>
      </tr>
    </template>
  </BaseTable>
</template>

<style>
@media screen and (max-width: 768px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
  }

  table td:last-child {
    border-bottom: 0;
  }
}

.time-tooltip {
  display: none;
  position: absolute;
  top: calc(50% - 20px);
  left: 80px;
  width: 160px;
  height: 40px;
}

.time-wrapper {
  position: relative;
}

.time-wrapper:hover .time-tooltip {
  display: block;
}
</style>
