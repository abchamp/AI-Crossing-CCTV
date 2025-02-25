<template>
  <div class="luxury-card tw-p-6 tw-rounded-xl">
    <h3 class="tw-text-lg tw-font-semibold tw-mb-4">Profile Information</h3>
    <p class="tw-text-sm tw-text-gray-600 tw-mb-6">
      {{ profile.bio }}
    </p>

    <div class="tw-space-y-4">
      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <div>
          <label class="tw-text-xs tw-text-gray-500">Full Name</label>
          <p class="tw-text-sm tw-font-medium">{{ profile.fullName }}</p>
        </div>
        <div>
          <label class="tw-text-xs tw-text-gray-500">Mobile</label>
          <p class="tw-text-sm tw-font-medium">{{ profile.mobile }}</p>
        </div>
      </div>
      <div>
        <label class="tw-text-xs tw-text-gray-500">Email</label>
        <p class="tw-text-sm tw-font-medium">{{ profile.email }}</p>
      </div>
      <div>
        <label class="tw-text-xs tw-text-gray-500">Location</label>
        <p class="tw-text-sm tw-font-medium">{{ profile.location }}</p>
      </div>
      <div>
        <label class="tw-text-xs tw-text-gray-500">Social Media</label>
        <!-- <div class="tw-flex tw-gap-4 tw-mt-2">
          <q-btn
            v-for="social in socialMedia"
            :key="social.icon"
            flat
            round
            color="primary"
            @click="handleSocialClick(social)"
          >
            <component :is="social.icon" class="tw-w-5 tw-h-5" />
          </q-btn>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// import { FacebookIcon, TwitterIcon, InstagramIcon } from '@heroicons/vue/24/outline'

defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

// const socialMedia = [
//   { icon: FacebookIcon, url: '#' },
//   { icon: TwitterIcon, url: '#' },
//   { icon: InstagramIcon, url: '#' },
// ]

// const handleSocialClick = (social) => {
//   window.open(social.url, '_blank')
// }
</script>
