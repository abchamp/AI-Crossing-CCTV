<template>
  <div class="luxury-card tw-rounded-xl tw-bg-black tw-overflow-hidden">
    <div class="tw-relative">
      <!-- Video Player or Image Placeholder -->
      <div class="tw-aspect-video tw-bg-gray-900">
        <!-- Video player will be implemented here -->
      </div>

      <!-- Overlay Info -->
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-4 tw-bg-gradient-to-t tw-from-black/80"
      >
        <div class="tw-flex tw-justify-between tw-items-end">
          <div>
            <div class="tw-flex tw-items-center tw-gap-2">
              <div>
                <h3 class="tw-text-white tw-font-medium">{{ currentCamera.name }}</h3>
                <div class="tw-flex tw-items-center tw-gap-2">
                  <span class="tw-text-xs tw-text-gray-300">{{ currentCamera.stationName }}</span>
                  <div class="tw-flex tw-items-center tw-gap-1">
                    <div class="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-green-500"></div>
                    <span class="tw-text-xs tw-text-green-500">Live</span>
                  </div>
                </div>
                <div class="tw-flex tw-items-center tw-gap-2 tw-mt-1">
                  <span class="tw-text-xs tw-text-gray-400">{{ currentCamera.location }}</span>
                  <span class="tw-text-xs tw-text-gray-400">•</span>
                  <span class="tw-text-xs tw-text-gray-400"
                    >Platform {{ currentCamera.platform }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-end tw-gap-2">
            <!-- Danger Level Indicator -->
            <div class="tw-flex tw-gap-1">
              <div
                v-for="level in 5"
                :key="level"
                class="tw-w-2 tw-h-2 tw-rounded-full"
                :class="[
                  level <= (currentCamera.dangerLevel || 1)
                    ? getDangerLevelColor(currentCamera.dangerLevel || 1)
                    : 'tw-bg-gray-200/30',
                ]"
              ></div>
            </div>
            <!-- Control Buttons -->
            <div class="tw-flex tw-items-center tw-gap-2">
              <q-btn flat round dense class="tw-text-white">
                <ArrowsPointingOutIcon class="tw-w-5 tw-h-5" />
              </q-btn>
              <q-btn flat round dense class="tw-text-white">
                <EllipsisHorizontalIcon class="tw-w-5 tw-h-5" />
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowsPointingOutIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const currentCamera = ref({
  name: 'North Platform Camera',
  stationName: 'Central Station Crossing',
  location: 'Track Approach',
  platform: '2A',
  avatar: 'https://placehold.co/100x100/1f2937/1f2937',
  dangerLevel: 4,
  lastMaintenance: '2024-02-15',
  nextInspection: '2024-03-15',
  type: 'High-Speed Rail Monitoring',
})

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
