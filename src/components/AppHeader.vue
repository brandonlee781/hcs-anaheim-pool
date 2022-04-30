<script setup lang="ts">
defineProps({ title: { type: String, defaut: null }, day: { type: Number, default: 1 } })
defineEmits(['update:day'])
</script>

<template>
  <h1 class="text-gray-200 text-center text-3xl mb-2 font-bold">{{ title }}</h1>
  <div class="py-2 px-8 bg-gray-700 shadow-lg rounded-lg mb-2">
    <div class="flex flex-col-reverse lg:flex-row justify-between items-center">
      <div class="w-full flex flex-row items-start mt-4 lg:(items-center mt-0 w-half) xl:w-auto">
        <a :class="{ '*btn': true, active: day === 1 }" role="button" @click="$emit('update:day', 1)">Day 1</a>
        <a :class="{ '*btn': true, active: day === 2 }" role="button" @click="$emit('update:day', 2)">Day 2</a>
        <!-- <a :class="{ '*btn': true, active: day === 3 }" role="button" @click="$emit('update:day', 3)">Day 3</a> -->
      </div>
      <p class="text-gray-200">
        All times are automatically converted to your timezone.
        <span class="xs:inline xl:hidden">Click a team in the pools below to highlight them in the schedule.</span>
        <span class="xs:inline xl:hidden"> Click the time to show and hide it's matches.</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
a.active {
  background: rgba(255, 255, 255, 0.2);
}
</style>
