<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watch, onMounted } from 'vue'

const { locale } = useI18n()

watch(locale, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    localStorage.setItem('hcs-locale', newVal)
  }
})
onMounted(() => {
  const storedLocale = localStorage.getItem('hcs-locale')
  locale.value = storedLocale ?? 'en'
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <slot></slot>
</template>
