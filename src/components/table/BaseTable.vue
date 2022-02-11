<template>
  <table class="table-auto min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-700">
      <tr>
        <th
          v-for="(header, index) in headers"
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
          :key="index"
        >
          <span v-if="header.text && !header.link">
            {{ header.text }}
          </span>
          <a v-else :href="header.link" class="underline">
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

<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps<{ headers: { text: string; link?: string}[] }>()
</script>

<style scoped>
</style>
