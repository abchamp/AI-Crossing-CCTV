<template>
  <div class="board-camera-card">
    <!-- Existing template content -->
    <div
      class="camera-card tw-bg-gray-100 tw-rounded-xl tw-overflow-hidden"
      :class="{ 'is-selected': isSelected }"
      @click="handleClick"
    ></div>

    <!-- Add the CameraViewDialog component -->
    <CameraViewDialog
      v-model="showFullView"
      :camera="camera"
      :cameras="allCameras"
      @camera-switch="handleCameraSwitch"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CameraViewDialog from './CameraViewDialog.vue'

const props = defineProps({
  camera: {
    type: Object,
    required: true,
  },
  allCameras: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['click'])

const showFullView = ref(false)

const handleClick = () => {
  showFullView.value = true
  emit('click', props.camera)
}

const handleCameraSwitch = (newCamera) => {
  // Handle camera switch logic here
  console.log('Switching to camera:', newCamera)
}
</script>

<style lang="scss" scoped>
/* Existing styles */
</style>
