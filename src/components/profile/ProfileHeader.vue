<template>
  <div class="luxury-card tw-p-6 tw-rounded-xl">
    <div class="tw-flex tw-items-center tw-gap-6">
      <div
        class="tw-w-20 tw-h-20 tw-rounded-full tw-overflow-hidden tw-border-4 tw-border-white tw-shadow-lg"
      >
        <img
          :src="modelValue.avatar"
          :alt="modelValue.name"
          class="tw-w-full tw-h-full tw-object-cover"
        />
      </div>
      <div class="tw-flex-1">
        <h2 class="tw-text-xl tw-font-semibold">{{ modelValue.name }}</h2>
        <p class="tw-text-sm tw-text-gray-500">{{ modelValue.email }}</p>
      </div>
      <div class="tw-flex tw-gap-4">
        <q-btn
          flat
          v-for="tab in tabs"
          :key="tab.value"
          :class="activeTab === tab.value ? 'tw-text-primary tw-font-medium' : 'tw-text-gray-500'"
          @click="$emit('update:activeTab', tab.value)"
        >
          {{ tab.label }}
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:activeTab'])
</script>
