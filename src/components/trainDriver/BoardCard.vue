<template>
  <div class="board-card" :class="{ 'is-selected': isSelected }" @click="$emit('select', board.id)">
    <div class="tw-flex tw-justify-between tw-items-start">
      <div>
        <div class="tw-text-sm tw-font-semibold tw-text-gray-900">{{ board.title }}</div>
      </div>
      <q-btn flat round dense size="sm">
        <EllipsisHorizontalIcon class="tw-w-5 tw-h-5 tw-text-gray-400" />
      </q-btn>
    </div>
    <p class="tw-text-sm tw-text-gray-500 tw-mt-1 tw-line-clamp-2">{{ board.description }}</p>

    <!-- Route Statistics -->
    <div class="tw-flex tw-items-center tw-gap-4 tw-mt-3">
      <div class="tw-flex tw-items-center tw-gap-1 tw-text-gray-500">
        <MapPinIcon class="tw-w-4 tw-h-4" />
        <span class="tw-text-xs">{{ board.crossings }} crossings</span>
      </div>
      <div class="tw-flex tw-items-center tw-gap-1 tw-text-gray-500">
        <VideoCameraIcon class="tw-w-4 tw-h-4" />
        <span class="tw-text-xs">{{ board.cameras }} cameras</span>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="tw-flex tw-justify-between tw-items-center tw-mt-3">
      <!-- Danger Level Indicator -->
      <div class="tw-flex tw-gap-1">
        <div
          v-for="level in 5"
          :key="level"
          class="tw-w-2 tw-h-2 tw-rounded-full"
          :class="[
            level <= (board.dangerLevel || 1)
              ? getDangerLevelColor(board.dangerLevel || 1)
              : 'tw-bg-gray-200',
          ]"
        ></div>
      </div>

      <!-- Team Members -->
      <div class="tw-flex tw--space-x-2">
        <div
          v-for="(member, index) in board.members"
          :key="index"
          class="tw-w-6 tw-h-6 tw-rounded-full tw-border-2 tw-border-white tw-bg-gray-200"
        >
          <img
            v-if="member.avatar"
            :src="member.avatar"
            :alt="member.role"
            class="tw-w-full tw-h-full tw-rounded-full tw-object-cover"
          />
        </div>
        <div
          v-if="board.additionalMembers"
          class="tw-w-6 tw-h-6 tw-rounded-full tw-border-2 tw-border-white tw-bg-gray-100 tw-flex tw-items-center tw-justify-center"
        >
          <span class="tw-text-xs tw-text-gray-600">+{{ board.additionalMembers }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EllipsisHorizontalIcon, MapPinIcon, VideoCameraIcon } from '@heroicons/vue/24/outline'

defineProps({
  board: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])

const getDangerLevelColor = (level) => {
  const colors = {
    1: 'tw-bg-green-500', // Very Safe
    2: 'tw-bg-yellow-400', // Safe
    3: 'tw-bg-orange-400', // Moderate
    4: 'tw-bg-red-500', // Dangerous
    5: 'tw-bg-red-700', // Very Dangerous
  }
  return colors[level] || colors[1]
}
</script>

<style lang="scss" scoped>
.board-card {
  @apply tw-bg-gray-100 tw-rounded-xl tw-p-4 tw-transition-all tw-duration-200 tw-cursor-pointer tw-border-2 tw-border-transparent;

  &:hover {
    @apply tw-bg-gray-200/70;
  }

  &.is-selected {
    @apply tw-bg-gray-200 tw-border-primary/20;
    box-shadow: 0 4px 12px rgba(196, 160, 82, 0.1);
  }
}
</style>
