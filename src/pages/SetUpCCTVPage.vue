<template>
  <q-page class="tw-py-2 tw-px-4 tw-h-full">
    <div class="tw-h-[calc(100vh-6rem)] tw-space-y-2">
      <!-- Main Content -->
      <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-h-full">
        <!-- Routes List -->
        <div class="tw-col-span-3 tw-min-h-0">
          <RoutesList
            :routes="routes"
            :selected-route="selectedRoute"
            @route-selected="handleRouteSelect"
            class="tw-h-full tw-overflow-y-auto"
          />
        </div>

        <!-- Crossings List -->
        <div class="tw-col-span-4 tw-min-h-0">
          <CrossingsList
            :crossings="selectedRoute?.crossings || []"
            :selected-crossing="selectedCrossing"
            @crossing-selected="handleCrossingSelect"
            class="tw-h-full tw-overflow-y-auto"
          />
        </div>

        <!-- Cameras Setup -->
        <div class="tw-col-span-5 tw-min-h-0">
          <CamerasSetup
            :cameras="selectedCrossing?.cameras || []"
            :crossing="selectedCrossing"
            :selected-camera="selectedCamera"
            @camera-selected="handleCameraSelect"
            @add="handleCameraAdd"
            class="tw-h-full tw-overflow-y-auto"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import RoutesList from '../components/setup/RoutesList.vue'
import CrossingsList from '../components/setup/CrossingsList.vue'
import CamerasSetup from '../components/setup/CamerasSetup.vue'
import { routes } from '../data/mockSetupData'

const selectedRoute = ref(null)
const selectedCrossing = ref(null)
const selectedCamera = ref(null)

const handleRouteSelect = (route) => {
  if (selectedRoute.value?.id === route.id) {
    // Deselect if clicking the same route
    selectedRoute.value = null
    selectedCrossing.value = null
    selectedCamera.value = null
  } else {
    selectedRoute.value = route
    selectedCrossing.value = null
    selectedCamera.value = null
  }
}

const handleCrossingSelect = (crossing) => {
  if (selectedCrossing.value?.id === crossing.id) {
    // Deselect if clicking the same crossing
    selectedCrossing.value = null
    selectedCamera.value = null
  } else {
    selectedCrossing.value = crossing
    selectedCamera.value = null
  }
}

const handleCameraSelect = (camera) => {
  if (selectedCamera.value?.id === camera.id) {
    // Deselect if clicking the same camera
    selectedCamera.value = null
  } else {
    selectedCamera.value = camera
  }
}

const handleCameraAdd = (newCamera) => {
  if (selectedCrossing.value) {
    // Add the new camera to the selected crossing
    selectedCrossing.value.cameras.push(newCamera)
  }
}
</script>
