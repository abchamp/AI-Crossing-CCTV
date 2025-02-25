<template>
  <div class="luxury-card tw-p-4 tw-rounded-xl tw-bg-white tw-flex tw-flex-col tw-h-full">
    <!-- Fixed Header -->
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
      <h2 class="tw-text-lg tw-font-semibold">Crossings</h2>
      <div v-if="crossings.length" class="tw-flex tw-items-center tw-gap-2">
        <span class="tw-text-sm tw-text-gray-500">{{ crossings.length }} crossings</span>
        <q-btn flat round dense icon="add" class="tw-text-gray-600" />
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="tw-flex-1 tw-overflow-y-auto">
      <div v-if="crossings.length" class="timeline-container tw-relative tw-pb-4">
        <!-- Timeline Line -->
        <div class="timeline-line"></div>

        <!-- Crossing Cards with Timeline Dots -->
        <div
          v-for="(crossing, index) in crossings"
          :key="crossing.id"
          class="timeline-item"
          :class="{ 'is-last': index === crossings.length - 1 }"
        >
          <div
            class="timeline-dot"
            :class="{ 'is-selected': selectedCrossing?.id === crossing.id }"
          ></div>
          <CrossingCard
            :crossing="crossing"
            :selected-crossing="selectedCrossing"
            @click="$emit('crossing-selected', $event)"
          />
        </div>
      </div>

      <div v-else class="tw-text-center tw-py-8 tw-text-gray-500">
        Select a route to view its crossings
      </div>
    </div>
  </div>
</template>

<script setup>
import CrossingCard from './CrossingCard.vue'

defineProps({
  crossings: {
    type: Array,
    required: true,
  },
  selectedCrossing: {
    type: Object,
    default: null,
  },
})

defineEmits(['crossing-selected'])
</script>

<style lang="scss" scoped>
.crossing-card {
  @apply tw-bg-gray-50 tw-border-2 tw-border-transparent tw-transition-all tw-duration-200;

  &:hover {
    @apply tw-bg-gray-100;
  }

  &.is-selected {
    @apply tw-bg-primary/5 tw-border-primary/20;
  }
}

.timeline-container {
  @apply tw-pl-8;
}

.timeline-line {
  @apply tw-absolute tw-left-3 tw-top-4 tw-bottom-0 tw-w-0.5 tw-bg-gray-200;
}

.timeline-item {
  @apply tw-relative tw-mb-3;

  &.is-last .timeline-line {
    @apply tw-hidden;
  }
}

.timeline-dot {
  @apply tw-absolute tw-left-[-1.75rem] tw-top-1/2 tw-transform tw-translate-y-[-50%];
  @apply tw-w-4 tw-h-4 tw-rounded-full tw-bg-gray-300 tw-border-4 tw-border-white;
  @apply tw-transition-all tw-duration-200;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);

  &.is-selected {
    @apply tw-bg-primary tw-border-primary/20;
    box-shadow: 0 0 0 4px rgba(196, 160, 82, 0.2);
  }
}
</style>
