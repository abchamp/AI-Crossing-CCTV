<template>
  <div class="luxury-card tw-p-6 tw-rounded-xl">
    <h3 class="tw-text-xs tw-font-bold tw-tracking-wider tw-text-gray-400 tw-mb-4">ACCOUNT</h3>
    <div class="tw-space-y-4">
      <div
        v-for="(setting, index) in accountSettings"
        :key="index"
        class="tw-flex tw-items-center tw-justify-between"
      >
        <span class="tw-text-sm">{{ setting.label }}</span>
        <q-toggle
          v-model="setting.value"
          color="primary"
          @update:model-value="handleSettingChange"
        />
      </div>
    </div>

    <h3 class="tw-text-xs tw-font-bold tw-tracking-wider tw-text-gray-400 tw-mt-8 tw-mb-4">
      APPLICATION
    </h3>
    <div class="tw-space-y-4">
      <div
        v-for="(setting, index) in appSettings"
        :key="index"
        class="tw-flex tw-items-center tw-justify-between"
      >
        <span class="tw-text-sm">{{ setting.label }}</span>
        <q-toggle
          v-model="setting.value"
          color="primary"
          @update:model-value="handleSettingChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  accountSettings: {
    type: Array,
    required: true,
  },
  appSettings: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['settingChange'])

const handleSettingChange = () => {
  emit('settingChange', {
    accountSettings: props.accountSettings,
    appSettings: props.appSettings,
  })
}
</script>
