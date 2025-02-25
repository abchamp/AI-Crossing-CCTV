<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="tw-w-[500px] tw-rounded-xl tw-overflow-hidden">
      <q-card-section
        class="tw-flex tw-justify-between tw-items-center tw-border-b tw-border-gray-100 tw-bg-white"
      >
        <h3 class="tw-text-lg tw-font-semibold tw-m-0">Add New Camera</h3>
        <q-btn flat round dense icon="close" @click="handleClose" />
      </q-card-section>

      <q-card-section class="tw-space-y-4 tw-bg-white">
        <!-- Basic Camera Info -->
        <div class="input-group">
          <div class="input-label">Camera Name</div>
          <q-input v-model="form.name" dense outlined class="modern-input" />
        </div>

        <div class="tw-grid tw-grid-cols-1 tw-gap-3">
          <div class="input-group">
            <div class="input-label">Status</div>
            <q-select
              v-model="form.status"
              :options="['active', 'offline']"
              dense
              outlined
              class="modern-input"
            />
          </div>
        </div>

        <!-- Location Coordinates -->
        <div class="tw-grid tw-grid-cols-2 tw-gap-3">
          <div class="input-group">
            <div class="input-label">Latitude</div>
            <q-input
              v-model="form.latitude"
              type="number"
              dense
              outlined
              class="modern-input"
              step="0.000001"
            />
          </div>
          <div class="input-group">
            <div class="input-label">Longitude</div>
            <q-input
              v-model="form.longitude"
              type="number"
              dense
              outlined
              class="modern-input"
              step="0.000001"
            />
          </div>
        </div>

        <!-- URLs -->
        <div class="input-group">
          <div class="input-label">Stream URL</div>
          <q-input v-model="form.streamUrl" dense outlined class="modern-input" />
        </div>

        <div class="input-group">
          <div class="input-label">AI URL</div>
          <q-input v-model="form.aiUrl" dense outlined class="modern-input" />
        </div>
      </q-card-section>

      <q-card-actions
        align="right"
        class="tw-p-4 tw-bg-gray-50 tw-border-t tw-border-gray-100 tw-rounded-b-xl"
      >
        <q-btn flat color="grey" label="Cancel" @click="handleClose" />
        <q-btn flat color="primary" label="Add Camera" @click="handleSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const form = reactive({
  name: '',
  status: 'active',
  type: 'Fixed',
  latitude: props.latitude,
  longitude: props.longitude,
  streamUrl: '',
  aiUrl: '',
})

const resetForm = () => {
  form.name = ''
  form.status = 'active'
  form.type = 'Fixed'
  form.latitude = props.latitude
  form.longitude = props.longitude
  form.streamUrl = ''
  form.aiUrl = ''
}

const handleClose = () => {
  resetForm()
  isOpen.value = false
}

const handleSubmit = () => {
  emit('submit', {
    ...form,
  })
  handleClose()
}
</script>

<style lang="scss" scoped>
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
