<template>
  <div
    class="camera-card tw-bg-gray-100 tw-rounded-xl tw-overflow-hidden"
    :class="{ 'is-selected': isSelected }"
    @click="$emit('select', camera.id)"
  >
    <div class="tw-relative">
      <!-- Camera Preview -->
      <div class="tw-aspect-video tw-bg-gray-900">
        <img :src="camera.preview" alt="" class="tw-w-full tw-h-full tw-object-cover" />
      </div>

      <!-- Status Indicator -->
      <div
        class="tw-absolute tw-bottom-8 tw-right-2 tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-rounded-full tw-bg-black/50"
      >
        <div
          class="tw-w-1.5 tw-h-1.5 tw-rounded-full"
          :class="camera.isActive ? 'tw-bg-green-500' : 'tw-bg-red-500'"
        ></div>
        <span class="tw-text-xs tw-text-white">{{ camera.isActive ? 'Active' : 'Offline' }}</span>
      </div>

      <!-- Camera Info - Now floating on preview -->
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-3 tw-bg-gradient-to-t tw-from-black/70 tw-to-transparent"
      >
        <div class="tw-flex tw-justify-between tw-items-start">
          <div class="tw-space-y-1">
            <!-- Station Name -->
            <div class="tw-text-sm tw-font-semibold tw-text-white">{{ camera.stationName }}</div>
            <!-- Route Info -->
            <div class="tw-flex tw-items-center tw-gap-2">
              <span class="tw-text-xs tw-text-gray-200">{{ camera.startPoint }}</span>
              <ArrowLongRightIcon class="tw-w-3 tw-h-3 tw-text-gray-200" />
              <span class="tw-text-xs tw-text-gray-200">{{ camera.endPoint }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Danger Level Indicator -->
      <div
        class="tw-absolute tw-bottom-4 tw-right-2 tw-flex tw-gap-1 tw-px-2 tw-py-1 tw-rounded-full tw-bg-black/50"
      >
        <div
          v-for="level in 5"
          :key="level"
          class="tw-w-1.5 tw-h-1.5 tw-rounded-full"
          :class="[
            level <= (camera.dangerLevel || 1)
              ? getDangerLevelColor(camera.dangerLevel || 1)
              : 'tw-bg-gray-300/30',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline'

defineProps({
  camera: {
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
.camera-card {
  @apply tw-transition-all tw-duration-200 tw-cursor-pointer tw-border-2 tw-border-transparent;

  &:hover {
    @apply tw-bg-gray-200/70;
  }

  &.is-selected {
    @apply tw-bg-gray-200 tw-border-primary/20;
    box-shadow: 0 4px 12px rgba(196, 160, 82, 0.1);
  }
}
</style>
