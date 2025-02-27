<template>
  <q-page class="tw-px-4 tw-pt-0.5 tw-h-full">
    <div class="tw-h-full tw-relative">
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
import { ref, inject } from 'vue'
import BoardsList from '../components/cctv/BoardsList.vue'
import BoardCameras from '../components/cctv/BoardCameras.vue'
import MapView from '../components/cctv/MapView.vue'
import { boards } from '../data/mockBoards'

// Inject CCTV state from MainLayout
const { showLeftColumn, showRightColumn, gridSize } = inject('cctvState')

const selectedBoard = ref(null)

const handleBoardSelect = (boardId) => {
  selectedBoard.value = boards.value.find((board) => board.id === boardId)
}
</script>

<style lang="scss" scoped>
.luxury-card {
  border: 1px solid rgba(196, 160, 82, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
}
</style>
