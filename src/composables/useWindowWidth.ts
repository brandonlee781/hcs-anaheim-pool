import {
  onMounted, onUnmounted, ref,
} from 'vue'

const windowWidth = ref(window.innerWidth)
const onWidthChange = () => (windowWidth.value = window.innerWidth)

export default function useWindowWidth() {
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  return {
    windowWidth,
  }
}
