<template>
  <div
    class="route-card tw-p-4 tw-rounded-xl tw-cursor-pointer"
    :class="{ 'is-selected': selectedRoute?.id === route.id }"
    @click="$emit('click', route)"
  >
    <div class="tw-flex tw-justify-between tw-items-start">
      <div>
        <div class="tw-font-medium">{{ route.name }}</div>
        <!-- Route Points with Enhanced UI -->
        <div class="route-points tw-mt-2">
          <div class="tw-flex tw-items-center tw-gap-2">
            <div class="point-marker start">
              <div class="point-dot"></div>
            </div>
            <span class="tw-text-xs tw-text-gray-600">{{ route.startPoint }}</span>
          </div>
          <div class="route-line"></div>
          <div class="tw-flex tw-items-center tw-gap-2">
            <div class="point-marker end">
              <div class="point-dot"></div>
            </div>
            <span class="tw-text-xs tw-text-gray-600">{{ route.endPoint }}</span>
          </div>
        </div>
        <div class="tw-text-sm tw-text-gray-500 tw-mt-2">{{ route.description }}</div>
      </div>
      <q-badge :color="route.status === 'active' ? 'green' : 'orange'" class="tw-capitalize">
        {{ route.status }}
      </q-badge>
    </div>
    <div class="tw-flex tw-items-center tw-gap-4 tw-mt-3">
      <div class="tw-flex tw-items-center tw-gap-1 tw-text-gray-500">
        <MapPinIcon class="tw-w-4 tw-h-4" />
        <span class="tw-text-xs">{{ route.crossings.length }} crossings</span>
      </div>
      <div class="tw-flex tw-items-center tw-gap-1 tw-text-gray-500">
        <VideoCameraIcon class="tw-w-4 tw-h-4" />
        <span class="tw-text-xs">
          {{ route.crossings.reduce((acc, crossing) => acc + crossing.cameras.length, 0) }}
          cameras
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon, VideoCameraIcon } from '@heroicons/vue/24/outline'

defineProps({
  route: {
    type: Object,
    required: true,
  },
  selectedRoute: {
    type: Object,
    default: null,
  },
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.route-card {
  @apply tw-bg-gray-100 tw-border-2 tw-border-transparent tw-transition-all tw-duration-200;

  &:hover {
    @apply tw-bg-gray-200/70;
  }

  &.is-selected {
    @apply tw-bg-gray-200 tw-border-primary/20;
    box-shadow: 0 4px 12px rgba(196, 160, 82, 0.1);
  }
}

.route-points {
  @apply tw-flex tw-flex-col tw-gap-1;

  .point-marker {
    @apply tw-w-4 tw-h-4 tw-rounded-full tw-flex tw-items-center tw-justify-center;

    &.start {
      @apply tw-bg-green-100;
      .point-dot {
        @apply tw-bg-green-500;
      }
    }

    &.end {
      @apply tw-bg-red-100;
      .point-dot {
        @apply tw-bg-red-500;
      }
    }

    .point-dot {
      @apply tw-w-2 tw-h-2 tw-rounded-full;
    }
  }

  .route-line {
    @apply tw-w-[2px] tw-h-3 tw-bg-gray-200 tw-ml-2;
  }
}
</style>
