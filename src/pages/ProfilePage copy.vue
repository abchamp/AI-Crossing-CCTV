<template>
  <q-page class="tw-p-6">
    <div class="tw-space-y-6">
      <!-- Header Section -->
      <div class="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 class="tw-text-2xl tw-font-bold tw-text-primary-text">Profile Settings</h1>
          <p class="tw-text-gray-500/80 tw-mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="tw-grid tw-grid-cols-12 tw-gap-6">
        <!-- Left Column - Profile Info -->
        <div class="tw-col-span-12 md:tw-col-span-4">
          <div class="luxury-card tw-p-6 tw-rounded-xl">
            <!-- Profile Picture -->
            <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
              <div class="tw-relative">
                <div
                  class="tw-w-24 tw-h-24 tw-rounded-xl tw-overflow-hidden tw-border tw-border-primary/10 tw-shadow-lg"
                >
                  <img
                    :src="profile.avatar"
                    :alt="profile.name"
                    class="tw-w-full tw-h-full tw-object-cover"
                  />
                </div>
                <q-btn
                  round
                  flat
                  size="sm"
                  class="tw-absolute tw-bottom-0 tw-right-0 tw-bg-white tw-shadow-md hover:tw-shadow-lg"
                  @click="onUploadClick"
                >
                  <CameraIcon class="tw-w-4 tw-h-4 tw-text-primary" />
                </q-btn>
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  class="tw-hidden"
                  @change="handleFileUpload"
                />
              </div>
              <div class="tw-text-center">
                <h3 class="tw-text-lg tw-font-semibold">{{ profile.name }}</h3>
                <p class="tw-text-sm tw-text-gray-500">{{ profile.function }}</p>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="tw-mt-6 tw-space-y-4">
              <div
                class="tw-flex tw-justify-between tw-items-center tw-p-3 tw-rounded-lg tw-bg-primary/5"
              >
                <span class="tw-text-sm tw-text-gray-600">Department</span>
                <span class="tw-text-sm tw-font-medium">{{ profile.department }}</span>
              </div>
              <div
                class="tw-flex tw-justify-between tw-items-center tw-p-3 tw-rounded-lg tw-bg-primary/5"
              >
                <span class="tw-text-sm tw-text-gray-600">Joined Date</span>
                <span class="tw-text-sm tw-font-medium">{{ profile.employed }}</span>
              </div>
              <div
                class="tw-flex tw-justify-between tw-items-center tw-p-3 tw-rounded-lg tw-bg-primary/5"
              >
                <span class="tw-text-sm tw-text-gray-600">Status</span>
                <span
                  class="tw-px-3 tw-py-1 tw-rounded-lg tw-text-xs tw-font-semibold"
                  :class="
                    profile.status === 'Online'
                      ? 'tw-bg-green-500 tw-text-white'
                      : 'tw-bg-gray-500/10 tw-text-gray-500'
                  "
                >
                  {{ profile.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Settings -->
        <div class="tw-col-span-12 md:tw-col-span-8">
          <div class="luxury-card tw-p-6 tw-rounded-xl">
            <form @submit.prevent="saveProfile" class="tw-space-y-6">
              <!-- Personal Information -->
              <div class="tw-space-y-4">
                <h3 class="tw-text-lg tw-font-semibold">Personal Information</h3>
                <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                  <q-input
                    v-model="profile.name"
                    label="Full Name"
                    outlined
                    dense
                    class="luxury-input"
                  />
                  <q-input
                    v-model="profile.email"
                    label="Email"
                    outlined
                    dense
                    class="luxury-input"
                  />
                </div>
                <q-input
                  v-model="profile.function"
                  label="Job Title"
                  outlined
                  dense
                  class="luxury-input"
                />
                <q-input
                  v-model="profile.department"
                  label="Department"
                  outlined
                  dense
                  class="luxury-input"
                />
              </div>

              <!-- Password Change -->
              <div class="tw-space-y-4">
                <h3 class="tw-text-lg tw-font-semibold">Change Password</h3>
                <div class="tw-space-y-4">
                  <q-input
                    v-model="passwords.current"
                    label="Current Password"
                    outlined
                    dense
                    type="password"
                    class="luxury-input"
                  />
                  <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                    <q-input
                      v-model="passwords.new"
                      label="New Password"
                      outlined
                      dense
                      type="password"
                      class="luxury-input"
                    />
                    <q-input
                      v-model="passwords.confirm"
                      label="Confirm Password"
                      outlined
                      dense
                      type="password"
                      class="luxury-input"
                    />
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="tw-flex tw-justify-end">
                <q-btn
                  type="submit"
                  color="primary"
                  class="tw-px-6 tw-h-10 tw-rounded-xl tw-shadow-md hover:tw-shadow-lg tw-transition-all"
                  label="Save Changes"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { CameraIcon } from '@heroicons/vue/24/solid'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const fileInput = ref(null)

const profile = ref({
  name: 'John Thompson',
  email: 'john.t@railadmin.com',
  function: 'Station Master',
  department: 'Station Operations',
  status: 'Online',
  employed: '15/03/23',
  avatar: 'https://i.pravatar.cc/150?img=1',
})

const passwords = ref({
  current: '',
  new: '',
  confirm: '',
})

const onUploadClick = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Create a preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.avatar = e.target.result
      $q.notify({
        message: 'Profile picture updated successfully',
        color: 'positive',
        position: 'top',
        timeout: 2000,
      })
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  // Validate passwords match if being changed
  if (passwords.value.new || passwords.value.confirm) {
    if (passwords.value.new !== passwords.value.confirm) {
      $q.notify({
        message: 'New passwords do not match',
        color: 'negative',
        position: 'top',
        timeout: 2000,
      })
      return
    }
  }

  // Save profile logic here
  $q.notify({
    message: 'Profile updated successfully',
    color: 'positive',
    position: 'top',
    timeout: 2000,
  })

  // Clear password fields after successful save
  passwords.value = {
    current: '',
    new: '',
    confirm: '',
  }
}
</script>

<style lang="scss" scoped>
.luxury-input {
  :deep(.q-field__control) {
    border-radius: 0.75rem;
    border-color: rgba(26, 35, 126, 0.1);
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(26, 35, 126, 0.2);
    }
  }

  :deep(.q-field__control.text-primary) {
    color: var(--primary);
  }
}
</style>
