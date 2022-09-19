<script setup lang="ts">
import { useUiStore } from '@/store/ui'

defineProps<{ title: string; teams: Team[] }>()

const uiStore = useUiStore()
</script>

<template>
  <div>
    <div
      class="h-12 text-center p-3"
      :class="[uiStore.tableHeadStyle, uiStore.tableHeaderStyle]"
    >
      {{ title }}
    </div>
    <PoolTableItem
      v-for="(team, index) in teams"
      :key="team.name"
      :team="team"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
