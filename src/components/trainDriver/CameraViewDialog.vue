<template>
  <q-dialog
    v-model="isOpen"
    full-width
    full-height
    seamless
    maximized
    class="camera-view-dialog"
    @hide="handleClose"
  >
    <q-card class="tw-w-full tw-h-full tw-bg-gray-900" flat>
      <!-- Header -->
      <div class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-p-4">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-flex tw-items-center tw-gap-3">
            <h3 class="tw-text-lg tw-font-semibold tw-text-white tw-m-0">
              {{ currentCamera.name }}
            </h3>
            <div class="tw-flex tw-items-center tw-gap-1">
              <div
                class="tw-w-1.5 tw-h-1.5 tw-rounded-full"
                :class="currentCamera.isActive ? 'tw-bg-green-500' : 'tw-bg-red-500'"
              ></div>
              <span class="tw-text-xs tw-text-gray-300">{{
                currentCamera.isActive ? 'Active' : 'Offline'
              }}</span>
            </div>
          </div>
          <q-btn
            flat
            round
            dense
            color="white"
            icon="close"
            class="hover:tw-bg-white/10"
            @click="handleClose"
          />
        </div>
      </div>

      <!-- Main Content -->
      <div class="tw-flex tw-h-full">
        <!-- Left Column - Live View -->
        <div class="tw-w-4/5 tw-h-full tw-relative">
          <!-- Video Player -->
          <div class="tw-w-full tw-h-full tw-bg-gray-900">
            <img
              :src="currentCamera.preview || 'https://placehold.co/1920x1080/1f2937/1f2937'"
              class="tw-w-full tw-h-full tw-object-cover"
              alt="Camera Feed"
            />
          </div>

          <!-- Camera Info Overlay -->
          <div
            class="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-6 tw-bg-gradient-to-t tw-from-black/80"
          >
            <div class="tw-space-y-3">
              <!-- Station Info -->
              <div class="tw-flex tw-items-center tw-gap-4">
                <div class="tw-flex tw-items-center tw-gap-2">
                  <MapPinIcon class="tw-w-4 tw-h-4 tw-text-gray-300" />
                  <span class="tw-text-sm tw-font-medium tw-text-white">{{
                    currentCamera.stationName
                  }}</span>
                </div>
              </div>

              <!-- Route Info -->
              <div class="tw-flex tw-items-center tw-gap-6">
                <div class="tw-flex tw-items-center tw-gap-2">
                  <span class="tw-text-xs tw-text-gray-400">From:</span>
                  <span class="tw-text-sm tw-text-white">{{ currentCamera.startPoint }}</span>
                </div>
                <ArrowLongRightIcon class="tw-w-5 tw-h-5 tw-text-gray-400" />
                <div class="tw-flex tw-items-center tw-gap-2">
                  <span class="tw-text-xs tw-text-gray-400">To:</span>
                  <span class="tw-text-sm tw-text-white">{{ currentCamera.endPoint }}</span>
                </div>
              </div>

              <!-- Danger Level -->
              <div class="tw-flex tw-items-center tw-gap-3">
                <div class="tw-flex tw-gap-1">
                  <div
                    v-for="level in 5"
                    :key="level"
                    class="tw-w-2 tw-h-2 tw-rounded-full"
                    :class="[
                      level <= (currentCamera.dangerLevel || 1)
                        ? getDangerLevelColor(currentCamera.dangerLevel || 1)
                        : 'tw-bg-gray-500/30',
                    ]"
                  ></div>
                </div>
                <span class="tw-text-xs tw-text-gray-300">Danger Level</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Camera List -->
        <div class="tw-w-1/5 tw-h-full tw-bg-gray-800 tw-border-l tw-border-gray-700">
          <div class="tw-p-4">
            <h4 class="tw-text-sm tw-font-medium tw-text-gray-400 tw-mb-4">Other Cameras</h4>
            <div class="tw-space-y-2 tw-overflow-y-auto" style="height: calc(100vh - 5rem)">
              <div
                v-for="cam in otherCameras"
                :key="cam.id"
                class="camera-list-item tw-p-3 tw-rounded-xl tw-cursor-pointer"
                :class="{ 'is-active': cam.id === currentCamera.id }"
                @click="switchCamera(cam)"
              >
                <div class="tw-relative">
                  <img
                    :src="cam.preview || 'https://placehold.co/400x225/1f2937/1f2937'"
                    class="tw-w-full tw-aspect-video tw-rounded-lg tw-object-cover"
                    :alt="cam.name"
                  />
                  <div
                    class="tw-absolute tw-bottom-2 tw-right-2 tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-bg-black/50"
                  >
                    <div
                      class="tw-w-1.5 tw-h-1.5 tw-rounded-full"
                      :class="cam.isActive ? 'tw-bg-green-500' : 'tw-bg-red-500'"
                    ></div>
                    <span class="tw-text-white">{{ cam.isActive ? 'Active' : 'Offline' }}</span>
                  </div>
                </div>
                <div class="tw-mt-2">
                  <div class="tw-text-sm tw-font-medium tw-text-gray-200">{{ cam.name }}</div>
                  <div class="tw-text-xs tw-text-gray-400 tw-mt-1">{{ cam.stationName }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { MapPinIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'
import { mockCameraData, mockCameraList } from '../../data/mockCameraData'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  camera: {
    type: Object,
    default: () => mockCameraData.value, // Use mock data as default instead of required
  },
  cameras: {
    type: Array,
    default: () => mockCameraList.value,
  },
})

const emit = defineEmits(['update:modelValue', 'camera-switch'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Use mock data if no cameras are provided
const otherCameras = computed(() => (props.cameras.length ? props.cameras : mockCameraList.value))

// Use mock data if no camera is provided
const currentCamera = computed(() => ({
  ...mockCameraData.value,
  ...props.camera,
}))

const handleClose = () => {
  isOpen.value = false
}

const switchCamera = (camera) => {
  emit('camera-switch', camera)
}

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
.camera-list-item {
  @apply tw-bg-gray-700/50 tw-border tw-border-transparent;

  &:hover {
    @apply tw-bg-gray-700;
  }

  &.is-active {
    @apply tw-bg-gray-700 tw-border-primary/30;
  }
}

:deep(.q-dialog__inner--minimized > div) {
  max-width: 100%;
}
</style>
