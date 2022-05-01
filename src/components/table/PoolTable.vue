
<script setup lang="ts">
import useTeam, { Team } from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'
import { computed } from 'vue';

defineProps<{ title: string; teams: Team[] }>()


</script>

<template>
  <BaseTable :headers="[{ text: title }]">
    <tr v-for="(team, index) in teams" :key="team.name">
      <PoolItem :team="team" :index="index" />
      <!-- <TableData
        class="team-data cursor-pointer flex flex-row justify-between"
      >
      </TableData> -->
    </tr>
  </BaseTable>
</template>


<style scoped>

</style>
