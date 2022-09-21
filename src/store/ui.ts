import { ref } from 'vue'
import { defineStore } from 'pinia'

export const darkModeKey = 'hcs-tourney-dark-mode'
export const styleKey = 'hcs-tourney-style'

export const useUiStore = defineStore('ui', () => {
  const style = ref<Style>()
  const tableStyle = ref('')
  const tableHeadStyle = ref('')
  const tableHeaderStyle = ref('')
  const tableDataStyle = ref('')
  const poolHoverStyle = ref('')
  const buttonStyle = ref('')
  const buttonActiveStyle = ref('')
  const cardStyle = ref('')
  const footerStyle = ref('')

  const setStyle = (styles: Style) => {
    style.value = styles

    document.body.className = styles.bodyStyle

    if (localStorage[styleKey] !== styles) {
      localStorage.setItem(styleKey, JSON.stringify(styles))
    }

    tableStyle.value = styles.tableStyle
    tableHeadStyle.value = styles.tableHeadStyle
    tableHeaderStyle.value = styles.tableHeaderStyle
    tableDataStyle.value = styles.tableDataStyle
    poolHoverStyle.value = styles.poolHoverStyle
    buttonStyle.value = styles.buttonStyle
    buttonActiveStyle.value = styles.buttonActiveStyle
    cardStyle.value = styles.cardStyle
    footerStyle.value = styles.footerStyle
  }

  const darkMode = ref(true)
  const setDarkMode = (payload: boolean | null = null) => {
    const value = payload !== null ? payload : !darkMode.value
    document.documentElement.classList[value ? 'add' : 'remove']('dark')
    localStorage.setItem(darkModeKey, value ? '1' : '0')
    darkMode.value = value
  }

  return {
    tableStyle,
    tableHeadStyle,
    tableHeaderStyle,
    tableDataStyle,
    poolHoverStyle,
    buttonStyle,
    buttonActiveStyle,
    cardStyle,
    footerStyle,
    setStyle,

    darkMode,
    setDarkMode,
  }
})
