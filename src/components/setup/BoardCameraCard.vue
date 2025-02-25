<template>
  <div
    class="camera-card tw-bg-gray-100 tw-rounded-xl tw-overflow-hidden"
    :class="{ 'is-selected': isSelected }"
    @click="$emit('click', camera)"
  >
    <div class="tw-relative">
      <!-- Camera Preview -->
      <div class="tw-aspect-video tw-bg-gray-900">
        <img
          :src="camera.preview || 'https://placehold.co/600x400/1f2937/1f2937'"
          :alt="camera.name"
          class="tw-w-full tw-h-full tw-object-cover"
        />
      </div>

      <!-- Status Indicator -->
      <div
        class="tw-absolute tw-bottom-2 tw-right-2 tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-rounded-full tw-bg-black/50"
      >
        <div
          class="tw-w-1.5 tw-h-1.5 tw-rounded-full"
          :class="camera.status === 'active' ? 'tw-bg-green-500' : 'tw-bg-red-500'"
        ></div>
        <span class="tw-text-xs tw-text-white">{{
          camera.status === 'active' ? 'Active' : 'Offline'
        }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="tw-absolute tw-top-2 tw-right-2 tw-flex tw-gap-1">
        <q-btn flat round dense class="tw-bg-black/50" @click.stop="isEditing = true">
          <PencilIcon class="tw-w-4 tw-h-4 tw-text-white" />
        </q-btn>
        <q-btn flat round dense class="tw-bg-black/50" @click.stop="handleDelete">
          <TrashIcon class="tw-w-4 tw-h-4 tw-text-white" />
        </q-btn>
      </div>
    </div>

    <!-- Camera Info -->
    <div class="tw-p-3">
      <div v-if="!isEditing" class="tw-space-y-2">
        <div class="tw-flex tw-justify-between tw-items-start">
          <div>
            <div class="tw-font-medium">{{ camera.name }}</div>
            <div class="tw-flex tw-items-center tw-gap-2 tw-mt-1">
              <MapPinIcon class="tw-w-4 tw-h-4 tw-text-gray-500" />
              <span class="tw-text-xs tw-text-gray-500">
                {{ formatCoordinates(camera.latitude, camera.longitude) }}
              </span>
            </div>
          </div>
        </div>

        <!-- URLs Display -->
        <div class="tw-space-y-1">
          <div class="tw-flex tw-items-center tw-gap-2">
            <VideoCameraIcon class="tw-w-4 tw-h-4 tw-text-gray-500" />
            <span class="tw-text-xs tw-text-gray-500 tw-truncate">{{ camera.streamUrl }}</span>
          </div>
          <div class="tw-flex tw-items-center tw-gap-2">
            <CpuChipIcon class="tw-w-4 tw-h-4 tw-text-gray-500" />
            <span class="tw-text-xs tw-text-gray-500 tw-truncate">{{ camera.aiUrl }}</span>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-else class="tw-space-y-3">
        <div class="input-group">
          <div class="input-label">Camera Name</div>
          <q-input v-model="editForm.name" dense outlined class="modern-input" />
        </div>

        <div class="input-group">
          <div class="input-label">Status</div>
          <q-select
            v-model="editForm.status"
            :options="['active', 'offline']"
            dense
            outlined
            class="modern-input"
          />
        </div>

        <div class="tw-grid tw-grid-cols-2 tw-gap-3">
          <div class="input-group">
            <div class="input-label">Latitude</div>
            <q-input
              v-model="editForm.latitude"
              type="number"
              dense
              outlined
              step="0.000001"
              class="modern-input"
            />
          </div>
          <div class="input-group">
            <div class="input-label">Longitude</div>
            <q-input
              v-model="editForm.longitude"
              type="number"
              dense
              outlined
              step="0.000001"
              class="modern-input"
            />
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">Stream URL</div>
          <q-input v-model="editForm.streamUrl" dense outlined class="modern-input" />
        </div>

        <div class="input-group">
          <div class="input-label">AI URL</div>
          <q-input v-model="editForm.aiUrl" dense outlined class="modern-input" />
        </div>

        <!-- Action Buttons -->
        <div class="tw-flex tw-justify-end tw-gap-2 tw-mt-4">
          <q-btn flat dense color="grey" label="Cancel" @click="cancelEdit" />
          <q-btn flat dense color="primary" label="Save" @click="saveEdit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  PencilIcon,
  TrashIcon,
  VideoCameraIcon,
  CpuChipIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  camera: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'edit', 'delete'])

const isEditing = ref(false)
const editForm = reactive({
  name: '',
  status: '',
  latitude: 0,
  longitude: 0,
  streamUrl: '',
  aiUrl: '',
})

const initForm = () => {
  editForm.name = props.camera.name
  editForm.status = props.camera.status
  editForm.latitude = props.camera.latitude
  editForm.longitude = props.camera.longitude
  editForm.streamUrl = props.camera.streamUrl || ''
  editForm.aiUrl = props.camera.aiUrl || ''
}

const handleDelete = () => {
  emit('delete', props.camera)
}

const cancelEdit = () => {
  isEditing.value = false
  initForm()
}

const saveEdit = () => {
  emit('edit', { ...props.camera, ...editForm })
  isEditing.value = false
}

const formatCoordinates = (lat, lng) => {
  const formatNum = (num) => Number(num).toFixed(6)
  return `${formatNum(lat)}°, ${formatNum(lng)}°`
}

// Initialize form data
initForm()
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

.input-group {
  @apply tw-flex tw-flex-col tw-gap-1;
}

.input-label {
  @apply tw-text-sm tw-font-medium tw-text-gray-700;
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
</style>
