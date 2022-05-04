<script setup lang="ts">
defineProps<{ headers: { text: string; link?: string }[] }>()
</script>

<template>
  <table class="table-auto min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-700">
      <tr>
        <th
          v-for="(header, index) in headers"
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider lg:text-center"
          :key="index"
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
    <tbody class="bg-gray-900 divide-y divide-gray-200">
      <slot :headers="headers"></slot>
    </tbody>
  </table>
</template>

<style>
.schedule-table thead tr th:first-child {
  text-align: left;
}
</style>
