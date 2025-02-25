<template>
  <div class="luxury-card tw-p-4 tw-rounded-xl tw-bg-white tw-flex tw-flex-col tw-h-full">
    <!-- Fixed Header -->
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
      <div class="tw-flex tw-items-center tw-gap-2">
        <h2 class="tw-text-lg tw-font-semibold">Cameras</h2>
        <span v-if="cameras.length" class="tw-text-sm tw-text-gray-500">
          ({{ cameras.length }} cameras)
        </span>
      </div>
      <q-btn
        v-if="crossing"
        color="primary"
        flat
        class="tw-gap-2"
        icon="add"
        @click="showAddDialog = true"
      >
        Add Camera
      </q-btn>
    </div>

    <!-- Scrollable Content -->
    <div class="tw-flex-1 tw-overflow-y-auto tw-space-y-8 tw-pb-8">
      <!-- Crossing Details Section -->
      <div v-if="crossing" class="tw-space-y-4">
        <!-- Map Section -->
        <div class="tw-bg-gray-100 tw-rounded-xl tw-overflow-hidden">
          <div id="camera-setup-map" class="tw-h-[240px]"></div>
        </div>
        <!-- Crossing Info Inputs -->
        <div class="tw-space-y-3">
          <div class="input-group">
            <div class="input-label">Crossing Name</div>
            <q-input
              v-model="crossingForm.name"
              dense
              outlined
              class="modern-input"
              @update:model-value="updateCrossing"
            />
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-3">
            <div class="input-group">
              <div class="input-label">Latitude</div>
              <q-input
                v-model="crossingForm.latitude"
                type="number"
                dense
                outlined
                class="modern-input"
                step="0.000001"
                @update:model-value="updateCrossing"
              />
            </div>
            <div class="input-group">
              <div class="input-label">Longitude</div>
              <q-input
                v-model="crossingForm.longitude"
                type="number"
                dense
                outlined
                class="modern-input"
                step="0.000001"
                @update:model-value="updateCrossing"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Cameras List -->
      <div v-if="crossing" class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-4">
        <BoardCameraCard
          v-for="camera in cameras"
          :key="camera.id"
          :camera="camera"
          :is-selected="selectedCamera?.id === camera.id"
          @click="$emit('camera-selected', camera)"
          @edit="handleEditCamera"
          @delete="handleDeleteCamera"
        />
      </div>

      <div v-else class="tw-text-center tw-py-8 tw-text-gray-500">
        Select a crossing to view and manage its cameras
      </div>
    </div>

    <!-- Fixed Footer -->
    <div v-if="crossing" class="tw-pt-4 tw-border-t tw-border-gray-200">
      <div class="tw-flex tw-justify-end tw-gap-2">
        <q-btn flat dense color="grey" label="Cancel" @click="cancelEdit" />
        <q-btn flat dense color="primary" label="Save Changes" @click="saveChanges" />
      </div>
    </div>

    <!-- Add Camera Dialog -->
    <AddCameraDialog v-model="showAddDialog" @submit="handleAddCamera" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, reactive } from 'vue'
import BoardCameraCard from './BoardCameraCard.vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import AddCameraDialog from './AddCameraDialog.vue'

// Fix for the marker icon issue in Leaflet with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

const props = defineProps({
  cameras: {
    type: Array,
    required: true,
  },
  crossing: {
    type: Object,
    default: null,
  },
  selectedCamera: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['camera-selected', 'edit', 'delete', 'add', 'update:crossing'])

const showAddDialog = ref(false)
let map = null
let markers = []

const crossingForm = reactive({
  name: '',
  latitude: 0,
  longitude: 0,
  note: '',
})

const handleEditCamera = (camera) => {
  emit('edit', camera)
}

const handleDeleteCamera = (camera) => {
  emit('delete', camera)
}

const initMap = async () => {
  if (!props.crossing) return

  // Wait for DOM to be ready
  await nextTick()

  const mapContainer = document.getElementById('camera-setup-map')
  if (!mapContainer) return

  // Initialize map
  map = L.map('camera-setup-map', {
    zoomControl: true,
    zoomAnimation: true,
  })

  // Add the OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  // Add markers for each camera
  updateMarkers()

  // Set view to crossing location or first camera
  const defaultLocation = props.crossing.coordinates?.split(',').map(Number) || [13.7563, 100.5018]
  map.setView(defaultLocation, 15)

  // Force a resize after mounting to ensure the map fills the container
  setTimeout(() => {
    map.invalidateSize()
  }, 100)
}

// Add this after the Leaflet icon fix
const crossingIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Update the updateMarkers function
const updateMarkers = () => {
  // Clear existing markers
  markers.forEach((marker) => marker.remove())
  markers = []

  // Add crossing marker if coordinates exist
  if (crossingForm.latitude && crossingForm.longitude) {
    const crossingMarker = L.marker([crossingForm.latitude, crossingForm.longitude], {
      icon: crossingIcon,
    })
      .bindPopup(
        `
        <div class="tw-font-medium">${crossingForm.name || 'Crossing Location'}</div>
        <div class="tw-text-sm tw-text-gray-600">Crossing Point</div>
      `,
      )
      .addTo(map)
    markers.push(crossingMarker)
  }

  // Add markers for each camera
  props.cameras.forEach((camera) => {
    if (camera.latitude && camera.longitude) {
      const marker = L.marker([camera.latitude, camera.longitude])
        .bindPopup(
          `
          <div class="tw-font-medium">${camera.name}</div>
          <div class="tw-text-sm tw-text-gray-600">${camera.type}</div>
        `,
        )
        .addTo(map)
      markers.push(marker)
    }
  })
}

// Watch for changes in cameras array
watch(
  () => props.cameras,
  () => {
    if (map) {
      updateMarkers()
    }
  },
  { deep: true },
)

// Watch for crossing changes
watch(
  () => props.crossing,
  async (newCrossing) => {
    if (newCrossing && !map) {
      await initMap()
    } else if (!newCrossing && map) {
      map.remove()
      map = null
    }
  },
  { immediate: true }, // Add immediate option to handle initial state
)

// Update the watch for crossing form changes
watch([() => crossingForm.latitude, () => crossingForm.longitude], () => {
  if (map) {
    updateMarkers()
    // Center map on crossing location if it exists
    if (crossingForm.latitude && crossingForm.longitude) {
      map.setView([crossingForm.latitude, crossingForm.longitude], 15)
    }
  }
})

const handleAddCamera = (newCamera) => {
  // Generate a unique ID for the new camera
  const camera = {
    id: Date.now().toString(),
    ...newCamera,
  }
  emit('add', camera)
}

// Update form when crossing changes
watch(
  () => props.crossing,
  (newCrossing) => {
    if (newCrossing) {
      const [lat, lng] = newCrossing.coordinates.split(',').map(Number)
      crossingForm.name = newCrossing.name
      crossingForm.latitude = lat
      crossingForm.longitude = lng
      crossingForm.note = newCrossing.note || ''
    }
  },
  { immediate: true },
)

// Emit updates to parent
const updateCrossing = () => {
  emit('update:crossing', {
    ...props.crossing,
    name: crossingForm.name,
    coordinates: `${crossingForm.latitude},${crossingForm.longitude}`,
    note: crossingForm.note,
  })
}

// Add new method for saving all changes
const saveChanges = () => {
  updateCrossing()
  // Add any other save operations here
}

// Add cancelEdit method
const cancelEdit = () => {
  // Reset crossing form to original values
  if (props.crossing) {
    const [lat, lng] = props.crossing.coordinates.split(',').map(Number)
    crossingForm.name = props.crossing.name
    crossingForm.latitude = lat
    crossingForm.longitude = lng
    crossingForm.note = props.crossing.note || ''
  }
}

onMounted(async () => {
  if (props.crossing) {
    await initMap()
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style lang="scss" scoped>
.camera-card {
  @apply tw-border-2 tw-border-transparent tw-transition-all tw-duration-200;

  &:hover {
    @apply tw-border-primary/20;
  }
}

.input-group {
  @apply tw-flex tw-flex-col tw-gap-1;
}

.input-label {
  @apply tw-text-sm tw-font-medium;
}

.modern-input {
  :deep(.q-field__control) {
    @apply tw-bg-white tw-shadow-sm tw-rounded-xl;
    border-radius: 12px !important;
  }

  :deep(.q-field__native) {
    @apply tw-text-sm;
  }

  :deep(.q-field__marginal) {
    @apply tw-h-8;
  }
}

/* Ensure the map container takes full height */
#camera-setup-map {
  min-height: 240px;
  z-index: 1;
}

/* Custom popup styles */
:deep(.leaflet-popup-content) {
  padding: 8px;
  margin: 8px !important;
}

/* Ensure Leaflet controls stay below the toggle button */
:deep(.leaflet-control-container) {
  z-index: 1;
}

/* Ensure the content area scrolls properly */
.luxury-card {
  min-height: 0; /* Required for proper flex behavior */
}

/* Hide scrollbar but keep functionality */
.tw-overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
}
</style>
