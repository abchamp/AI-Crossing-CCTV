<template>
  <div class="tw-space-y-6">
    <h3 class="tw-text-lg tw-font-semibold">CCTV</h3>
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="luxury-card tw-rounded-xl tw-overflow-hidden tw-shadow-lg tw-bg-white"
      >
        <img :src="project.image" :alt="project.title" class="tw-w-full tw-h-48 tw-object-cover" />
        <div class="tw-p-6">
          <h4 class="tw-text-lg tw-font-semibold">{{ project.title }}</h4>
          <p class="tw-text-sm tw-text-gray-500 tw-mt-2">{{ project.description }}</p>
          <div class="tw-flex tw-items-center tw-gap-2 tw-mt-4">
            <div class="tw-flex tw--space-x-2">
              <img
                v-for="member in project.team"
                :key="member.id"
                :src="member.avatar"
                :alt="member.name"
                class="tw-w-8 tw-h-8 tw-rounded-full tw-border-2 tw-border-white"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Create New Project Card -->
      <div
        class="luxury-card tw-rounded-xl tw-shadow-lg tw-bg-white tw-p-6 tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-shadow-lg tw-transition-all"
        @click="$emit('create-project')"
      >
        <div class="tw-text-center">
          <div
            class="tw-w-12 tw-h-12 tw-rounded-full tw-bg-primary/10 tw-flex tw-items-center tw-justify-center tw-mx-auto"
          >
            <PlusIcon class="tw-w-6 tw-h-6 tw-text-primary" />
          </div>
          <p class="tw-mt-2 tw-font-medium">Create a New Project</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'

defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

defineEmits(['create-project'])
</script>
