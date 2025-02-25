<template>
  <div class="luxury-card tw-p-6 tw-rounded-xl tw-bg-white tw-h-full tw-flex tw-flex-col">
    <div class="tw-text-lg tw-font-semibold tw-mt-4">Train Boards</div>
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
      <div class="tw-text-sm tw-text-gray-500">Total Boards: {{ sortedBoards.length }}</div>
      <q-btn flat round dense>
        <PlusIcon class="tw-w-5 tw-h-5 tw-text-gray-600" />
      </q-btn>
    </div>
    <!-- Boards List -->
    <div class="tw-flex-1 tw-overflow-y-auto">
      <div class="tw-space-y-3">
        <BoardCard
          v-for="board in sortedBoards"
          :key="board.id"
          :board="board"
          :is-selected="selectedBoard?.id === board.id"
          @select="handleBoardSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import BoardCard from './BoardCard.vue'
import { boards } from '../../data/mockBoards'

defineProps({
  selectedBoard: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['board-selected'])

const handleBoardSelect = (boardId) => {
  emit('board-selected', boardId)
}

const sortedBoards = computed(() => {
  return [...boards.value].sort((a, b) => (b.dangerLevel || 0) - (a.dangerLevel || 0))
})
</script>
