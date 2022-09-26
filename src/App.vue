<script setup lang="ts">
import { watch, ref } from 'vue'
import useTournament from '@/composables/useTournament'
import { useUiStore } from './store/ui'
import { useI18n } from 'vue-i18n'

const { pools, event, participants, styles, day } = useTournament()

const warningModal = ref(true)

const { t } = useI18n()

const uiStore = useUiStore()
watch(styles, () => {
  uiStore.setStyle(styles.value)
})
</script>

<template>
  <I18NProvider>
    <AppHeader v-model:dark="uiStore.darkMode" :title="event.title" />
    <div class="app-body">
      <ScheduleTable class="max-w-full" :day="day" />
      <div v-if="pools" class="pools">
        <PoolTable
          v-if="pools.A"
          :title="t('table.pool', { pool: 'A' })"
          :teams="pools.A"
        />
        <PoolTable
          v-if="pools.B"
          :title="t('table.pool', { pool: 'B' })"
          :teams="pools.B"
        />
        <PoolTable
          v-if="pools.C"
          :title="t('table.pool', { pool: 'C' })"
          :teams="pools.C"
        />
        <PoolTable
          v-if="pools.D"
          :title="t('table.pool', { pool: 'D' })"
          :teams="pools.D"
        />
      </div>
      <h3 v-if="event.playInTitle" class="text-2xl text-center m-4">
        {{ t('event.play-in-title') }}
      </h3>
      <div
        v-if="participants && participants.length"
        class="participants grid grid-cols-4 gap-2 mt-4 px-1"
      >
        <PoolTableItem
          v-for="(team, index) in participants"
          :key="index"
          :index="index"
          :team="team"
        />
      </div>

      <AppFooter :link="event.link" :show-toggle="!!pools" />
    </div>

    <BaseModal
      v-model="warningModal"
      :hide-header="true"
      @click:close="warningModal = false"
    >
      <span class="text-xl">
        {{ t('instructions.speculation') }}
      </span>

      <template #actions>
        <a
          class="*btn bg-blue-500 ml-auto"
          role="button"
          @click="warningModal = false"
          >{{ t('instructions.understood') }}</a
        >
      </template>
    </BaseModal>

    <ReloadPrompt />
  </I18NProvider>
</template>

<style>
* {
  box-sizing: border-box;
}
.app-body {
  margin: 8px;
  max-width: 1400px;
}

.pools {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}
/* .pools table {
  margin: 8px 0;
} */

.toggle-checkbox:checked {
  @apply right-0 border-green-400;
  right: 0;
  border-color: rgb(21, 103, 255);
}
.toggle-checkbox:checked + .toggle-label {
  @apply bg-green-400;
  background-color: rgb(21, 103, 255);
}

@media (min-width: 600px) {
  .pools {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .pools table:first-of-type {
    margin-left: 0;
  }
  .pools table:last-of-type {
    margin-right: 0;
  }
}

@media (min-width: 1200px) {
  body {
    height: 100vh;
  }
  .app-body {
    margin: 0 auto;
    padding: 1rem;
  }
  .pools {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .pools table:first-of-type {
    margin-left: 0;
  }
  .pools table:last-of-type {
    margin-right: 0;
  }
}
</style>
