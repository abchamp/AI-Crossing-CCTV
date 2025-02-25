<template>
  <div
    class="crossing-card tw-p-4 tw-rounded-xl tw-cursor-pointer"
    :class="{ 'is-selected': selectedCrossing?.id === crossing.id }"
    @click="$emit('click', crossing)"
  >
    <div class="tw-flex tw-justify-between">
      <div>
        <div class="tw-font-medium">{{ crossing.name }}</div>
        <div class="tw-flex tw-items-center tw-gap-2 tw-mt-1">
          <span class="tw-text-xs tw-text-gray-500">{{ crossing.type }}</span>
          <span class="tw-text-gray-300">•</span>
          <div class="tw-flex tw-items-center tw-gap-1">
            <MapPinIcon class="tw-w-4 tw-h-4 tw-text-gray-400" />
            <span class="tw-text-xs tw-text-gray-500">{{ crossing.coordinates }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-items-center tw-gap-2 tw-mt-3">
      <VideoCameraIcon class="tw-w-4 tw-h-4 tw-text-gray-500" />
      <span class="tw-text-sm tw-text-gray-500">{{ crossing.cameras.length }} cameras</span>
    </div>
  </div>
</template>

<script setup>
import { VideoCameraIcon, MapPinIcon } from '@heroicons/vue/24/outline'

defineProps({
  crossing: {
    type: Object,
    required: true,
  },
  selectedCrossing: {
    type: Object,
    default: null,
  },
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.crossing-card {
  @apply tw-bg-gray-100 tw-border-2 tw-border-transparent tw-transition-all tw-duration-200;

  &:hover {
    @apply tw-bg-gray-200/70;
  }

  &.is-selected {
    @apply tw-bg-gray-200 tw-border-primary/20;
    box-shadow: 0 4px 12px rgba(196, 160, 82, 0.1);
  }
}
</style>
