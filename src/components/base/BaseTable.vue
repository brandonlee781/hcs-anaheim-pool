<script setup lang="ts">
defineProps<{ headers: { text: string; link?: string; span?: number }[] }>()
</script>

<template>
  <table
    class="table-auto min-w-full divide-y dark:divide-gray-200 light:divid-gray-600"
  >
    <thead class="dark:bg-gray-700 light:bg-gray-200">
      <tr>
        <th
          v-for="(header, index) in headers"
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium dark:text-gray-100 light:text-gray-900 uppercase tracking-wider lg:text-center"
          :class="[index === 0 ? 'w-4' : '']"
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
</template>

<style>
.schedule-table thead tr th:first-child {
  text-align: left;
}
</style>
