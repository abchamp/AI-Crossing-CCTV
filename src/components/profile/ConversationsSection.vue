<template>
  <div class="luxury-card tw-p-6 tw-rounded-xl">
    <h3 class="tw-text-lg tw-font-semibold tw-mb-4">ConversationsSection</h3>
    <div class="tw-space-y-4">
      <div v-for="msg in props.messages" :key="msg.id" class="tw-flex tw-gap-4">
        <div class="tw-w-10 tw-h-10 tw-rounded-full tw-overflow-hidden">
          <img :src="msg.avatar" :alt="msg.name" class="tw-w-full tw-h-full tw-object-cover" />
        </div>
        <div class="tw-flex-1">
          <div class="tw-flex tw-justify-between tw-items-start">
            <h4 class="tw-text-sm tw-font-medium">{{ msg.name }}</h4>
            <q-btn flat dense size="sm" color="primary" label="REPLY" @click="handleReply(msg)" />
          </div>
          <p class="tw-text-sm tw-text-gray-500">{{ msg.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['reply'])

const handleReply = (message) => {
  emit('reply', message)
}
</script>
