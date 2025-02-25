<template>
  <div class="luxury-card tw-p-4 tw-rounded-xl tw-bg-white tw-flex tw-flex-col tw-h-full">
    <!-- Fixed Header -->
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
      <h2 class="tw-text-lg tw-font-semibold">Routes</h2>
      <div class="tw-flex tw-items-center tw-gap-2">
        <span class="tw-text-sm tw-text-gray-500">{{ routes.length }} routes</span>
        <q-btn
          color="primary"
          round
          dense
          flat
          icon="add"
          class="tw-text-gray-600 hover:tw-bg-primary/5"
        />
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="tw-flex-1 tw-overflow-y-auto">
      <div class="tw-space-y-3 tw-pb-4">
        <RouteCard
          v-for="route in routes"
          :key="route.id"
          :route="route"
          :selected-route="selectedRoute"
          @click="$emit('route-selected', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import RouteCard from './RouteCard.vue'

defineProps({
  routes: {
    type: Array,
    required: true,
  },
  selectedRoute: {
    type: Object,
    default: null,
  },
})

defineEmits(['route-selected'])
</script>

<style lang="scss" scoped>
.route-card {
  @apply tw-bg-gray-50 tw-border-2 tw-border-transparent tw-transition-all tw-duration-200;

  &:hover {
    @apply tw-bg-gray-100;
  }

  &.is-selected {
    @apply tw-bg-primary/5 tw-border-primary/20;
  }
}
</style>
