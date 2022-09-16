<script setup lang="ts">
import { Team } from '@/data'

defineProps<{ title: string; teams: Team[] }>()
</script>

<template>
  <BaseTable :headers="[{ text: title }]">
    <tr v-for="(team, index) in teams" :key="team.name">
      <td>
        <PoolTableItem :team="team" :index="index" />
      </td>
      <!-- <TableData
        class="team-data cursor-pointer flex flex-row justify-between"
      >
      </TableData> -->
    </tr>
  </BaseTable>
</template>

<style scoped></style>
