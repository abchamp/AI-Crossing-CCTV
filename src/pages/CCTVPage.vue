<template>
  <q-page class="tw-px-4 tw-pt-0.5 tw-h-full">
    <div class="tw-h-full tw-relative">
      <!-- Floating Toggle Buttons -->
      <!-- Left Button -->
      <button
        @click="toggleLeftColumn"
        class="toggle-btn tw-absolute tw-left-0 tw--top-0 tw-z-50"
        :class="{ 'is-active': showLeftColumn }"
      >
        <ChevronRightIcon
          class="tw-w-4 tw-h-4 tw-transition-transform tw-duration-300"
          :class="{ 'tw-rotate-180': showLeftColumn }"
        />
        <span class="tw-text-sm">Routes</span>
      </button>

      <!-- Grid Size Controls - Show only when both columns are hidden -->
      <div
        v-show="!showLeftColumn && !showRightColumn"
        class="tw-absolute tw-left-1/2 tw-transform tw--translate-x-1/2 tw--top-0 tw-z-50 tw-flex tw-gap-2"
      >
        <button
          v-for="size in [2, 3, 4]"
          :key="size"
          @click="gridSize = size"
          class="toggle-btn"
          :class="{ 'is-active': gridSize === size }"
        >
          <span class="tw-text-sm">{{ size }}x</span>
        </button>
      </div>

      <!-- Right Button -->
      <button
        @click="toggleRightColumn"
        class="toggle-btn tw-absolute tw-right-0 tw--top-0 tw-z-50"
        :class="{ 'is-active': showRightColumn }"
      >
        <span class="tw-text-sm">Map</span>
        <ChevronRightIcon
          class="tw-w-4 tw-h-4 tw-transition-transform tw-duration-300"
          :class="{ 'tw-rotate-0': showRightColumn, 'tw-rotate-180': !showRightColumn }"
        />
      </button>

      <!-- Main Content -->
      <div class="tw-grid tw-grid-cols-12 tw-gap-1 tw-h-[calc(100vh-5rem)] tw-relative">
        <!-- Left Column - Train Routes -->
        <div
          v-show="showLeftColumn"
          class="tw-col-span-3 tw-min-h-0 tw-transition-all tw-duration-300"
        >
          <BoardsList @board-selected="handleBoardSelect" :selected-board="selectedBoard" />
        </div>

        <!-- Middle Column - Cameras -->
        <div
          class="tw-overflow-y-auto tw-min-h-0"
          :class="{
            'tw-col-span-5': showLeftColumn && showRightColumn,
            'tw-col-span-8': !showLeftColumn && showRightColumn,
            'tw-col-span-9': showLeftColumn && !showRightColumn,
            'tw-col-span-12': !showLeftColumn && !showRightColumn,
            'tw-col-start-1': !showLeftColumn,
          }"
        >
          <BoardCameras
            :selected-board="selectedBoard"
            :show-left-column="showLeftColumn"
            :show-right-column="showRightColumn"
            :grid-size="gridSize"
          />
        </div>

        <!-- Right Column - Map -->
        <div v-show="showRightColumn" class="tw-col-span-4 tw-transition-all tw-duration-300">
          <MapView />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import BoardsList from '../components/cctv/BoardsList.vue'
import BoardCameras from '../components/cctv/BoardCameras.vue'
import MapView from '../components/cctv/MapView.vue'
import { boards } from '../data/mockBoards'

const selectedBoard = ref(null)
const showLeftColumn = ref(true)
const showRightColumn = ref(true)
const gridSize = ref(2) // Default grid size

const handleBoardSelect = (boardId) => {
  selectedBoard.value = boards.value.find((board) => board.id === boardId)
}

const toggleLeftColumn = () => {
  showLeftColumn.value = !showLeftColumn.value
}

const toggleRightColumn = () => {
  showRightColumn.value = !showRightColumn.value
}
</script>

<style lang="scss" scoped>
.toggle-btn {
  @apply tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full
         tw-bg-white/90 tw-backdrop-blur-sm tw-shadow-md tw-border-2 tw-border-gray-100
         tw-text-gray-500 tw-transition-all tw-duration-300;

  &:hover {
    @apply tw-shadow-xl tw-bg-white;
  }

  &.is-active {
    @apply tw-bg-blue-50 tw-border-blue-200 tw-text-blue-600;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
}

.luxury-card {
  border: 1px solid rgba(196, 160, 82, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
}
</style>
