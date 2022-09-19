<script setup lang="ts">
import { useUiStore } from '@/store/ui'
defineProps<{ headers: { text: string; link?: string; span?: number }[] }>()
const uiStore = useUiStore()
</script>

<template>
  <div>
    <table class="min-w-full divide-y" :class="[uiStore.tableStyle]">
      <thead :class="[uiStore.tableHeadStyle]">
        <tr>
          <th
            v-for="(header, index) in headers"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider lg:text-center"
            :class="[index === 0 ? 'w-4' : '', uiStore.tableHeaderStyle]"
            :key="index"
            :colspan="index === 0 ? 1 : header.span"
          >
            <span v-if="header.text && !header.link">
              {{ header.text }}
            </span>
            <a v-else :href="header.link" class="underline" target="_blank">
              {{ header.text }}
            </a>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <slot :headers="headers"></slot>
      </tbody>
    </table>
  </div>
</template>

<style>
.schedule-table thead tr th:first-child {
  text-align: left;
}
</style>
