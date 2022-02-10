<template>
  <table class="divide-y divide-gray-200">
    <thead class="bg-gray-700">
      <tr>
        <th
          v-for="(header, index) in headers"
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
          :key="index"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-gray-900 divide-y divide-gray-200">
      <slot :headers="headers"></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps({
  headers: Array,
})
</script>

<style scoped>
</style>
