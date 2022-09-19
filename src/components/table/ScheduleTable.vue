<script setup lang="ts">
import { computed } from 'vue'
import useWindowWidth from '@/composables/useWindowWidth'
import useTournament from '@/composables/useTournament'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { useUiStore } from '@/store/ui'

const props = defineProps({ day: { type: Number, default: 1 } })
const day = computed(() => props.day)
const uiStore = useUiStore()

const { schedule, event } = useTournament(day)

const { windowWidth } = useWindowWidth()

const headers = computed(() => {
  if (windowWidth.value >= 600) {
    return [
      { text: 'Timeslot' },
      ...Object.values(event.value.streams).map(st => ({
        text: st.name,
        link: st.link,
        span: st.span || event.value.streams.length,
      })),
    ]
  }
  return [{ text: 'Timeslot' }, { text: 'Matches' }]
})

const getStream = (index: number) => {
  return Object.values(event.value.streams)[index]
}

const getUserTime = (time: string) => {
  return format(new Date(time), 'h:mmaaa')
}

const getTourneyTime = (time: string) => {
  return formatInTimeZone(
    new Date(time),
    event.value.timezone,
    'MM/dd/yyyy h:mmaaa'
  )
}
</script>

<template>
  <BaseTable
    class="schedule-table"
    :class="[uiStore.cardStyle]"
    :headers="headers"
  >
    <template v-for="(timeslot, index) in schedule">
      <tr
        v-if="timeslot.items"
        :key="index"
        :class="[uiStore.tableDataStyle, uiStore.tableHeaderStyle]"
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
            :textClass="item.textClass"
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
