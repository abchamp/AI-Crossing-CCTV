<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <!-- Main Player Section - Fixed -->
    <!-- <div class="tw-flex-none tw-mb-4">
      <MainPlayerCard />
    </div> -->

    <!-- Main Content -->
    <div class="luxury-card tw-p-1 tw-rounded-xl tw-bg-white">
      <div class="tw-flex tw-flex-col">
        <!-- Route Info Header -->
        <!-- <div v-if="selectedBoard" class="tw-mb-6">
          <div class="tw-flex tw-p-4 tw-justify-between tw-items-start">
            <div class="">
              <h3 class="tw-text-lg tw-font-semibold">{{ selectedBoard.title }}</h3>
              <div class="tw-flex tw-items-center tw-gap-4 tw-mt-1">
                <div class="tw-flex tw-items-center tw-gap-4">
                  <div class="tw-flex tw-items-center tw-gap-1 tw-text-gray-500">
                    <MapPinIcon class="tw-w-4 tw-h-4" />
                    <span class="tw-text-sm">{{ selectedBoard.crossings }} crossings</span>
                  </div>
                  <div class="tw-flex tw-items-center tw-gap-1 tw-text-gray-500">
                    <VideoCameraIcon class="tw-w-4 tw-h-4" />
                    <span class="tw-text-sm">{{ selectedBoard.cameras }} cameras</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tw-flex tw-gap-1">
              <div
                v-for="level in 5"
                :key="level"
                class="tw-w-2 tw-h-2 tw-rounded-full"
                :class="[
                  level <= (selectedBoard.dangerLevel || 1)
                    ? getDangerLevelColor(selectedBoard.dangerLevel || 1)
                    : 'tw-bg-gray-200',
                ]"
              ></div>
            </div>
          </div>
        </div> -->

        <!-- Cameras Grid -->
        <div
          class="tw-grid tw-gap-0.5"
          :class="{
            'tw-grid-cols-4': !showLeftColumn && !showRightColumn,
            'tw-grid-cols-3':
              (showLeftColumn && !showRightColumn) || (!showLeftColumn && showRightColumn),
            'tw-grid-cols-2': showLeftColumn && showRightColumn,
          }"
        >
          <CameraCard
            v-for="camera in sortedCameras"
            :key="camera.id"
            :camera="{
              ...camera,
              stationName: getStationName(camera),
              startPoint: getStationStartPoint(camera),
              endPoint: getStationEndPoint(camera),
            }"
            :all-cameras="sortedCameras"
            :is-selected="selectedCameraId === camera.id"
            @select="handleCameraSelect"
          />
        </div>
      </div>
    </div>

    <!-- Full Screen Dialog -->
    <CameraViewDialog
      v-if="selectedCamera"
      v-model="showDialog"
      :camera="selectedCamera"
      :cameras="sortedCameras"
      @camera-switch="handleCameraSwitch"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import { VideoCameraIcon, MapPinIcon } from '@heroicons/vue/24/outline'
// import MainPlayerCard from './MainPlayerCard.vue'
import CameraCard from './CameraCard.vue'
import CameraViewDialog from './CameraViewDialog.vue'
import { stations as mockStations } from '../../data/mockStations'

defineProps({
  selectedBoard: {
    type: Object,
    default: null,
  },
  showLeftColumn: {
    type: Boolean,
    default: true,
  },
  showRightColumn: {
    type: Boolean,
    default: true,
  },
})

const stations = ref(mockStations)
const selectedCameraId = ref(null)
const showDialog = ref(false)

// Computed property to get the selected camera
const selectedCamera = computed(
  () => sortedCameras.value.find((camera) => camera.id === selectedCameraId.value) || null,
)

const handleCameraSelect = (cameraId) => {
  selectedCameraId.value = cameraId
  showDialog.value = true
}

const handleCameraSwitch = (newCamera) => {
  selectedCameraId.value = newCamera.id
}

// New computed property to get all cameras sorted by danger level
const sortedCameras = computed(() => {
  const allCameras = stations.value.flatMap((station) => station.cameras)
  return allCameras.sort((a, b) => (b.dangerLevel || 0) - (a.dangerLevel || 0))
})

// const getDangerLevelColor = (level) => {
//   const colors = {
//     1: 'tw-bg-green-500', // Very Safe
//     2: 'tw-bg-yellow-400', // Safe
//     3: 'tw-bg-orange-400', // Moderate
//     4: 'tw-bg-red-500', // Dangerous
//     5: 'tw-bg-red-700', // Very Dangerous
//   }
//   return colors[level] || colors[1]
// }

const getStationName = (camera) => {
  const station = stations.value.find((station) =>
    station.cameras.some((cam) => cam.id === camera.id),
  )
  return station?.name || ''
}

const getStationStartPoint = (camera) => {
  const station = stations.value.find((station) =>
    station.cameras.some((cam) => cam.id === camera.id),
  )
  return station?.startPoint || ''
}

const getStationEndPoint = (camera) => {
  const station = stations.value.find((station) =>
    station.cameras.some((cam) => cam.id === camera.id),
  )
  return station?.endPoint || ''
}
</script>
