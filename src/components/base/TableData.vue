<template>
  <td class="px-6 py-4 whitespace-nowrap">
    <div class="text-sm font-medium text-gray-200 mobile-row data-slot">
      <slot></slot>
    </div>
  </td>
</template>

<script setup lang="ts">
</script>

<style scoped>
td {
  position: relative;
}
@media(max-width: 1200px) {
  .mobile-row {
    display: flex;
    flex-flow: column wrap;
  }
}
</style>
