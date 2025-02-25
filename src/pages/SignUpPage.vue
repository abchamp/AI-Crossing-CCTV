<template>
  <q-page class="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-gray-50">
    <div class="tw-w-full tw-max-w-md tw-p-6">
      <!-- Logo and Header -->
      <div class="tw-text-center tw-mb-8">
        <div class="tw-flex tw-justify-center tw-mb-6">
          <img :src="WebLogo" alt="Logo" class="tw-h-12" />
        </div>
        <h1 class="tw-text-2xl tw-font-bold tw-text-primary-text">Create Account</h1>
        <p class="tw-text-gray-500/80 tw-mt-1">Sign up to get started with CCTV management</p>
      </div>

      <!-- Sign Up Form -->
      <div class="luxury-card tw-p-6 tw-rounded-xl">
        <form @submit.prevent="handleSignUp" class="tw-space-y-4">
          <!-- Full Name -->
          <div>
            <q-input
              v-model="formData.fullName"
              label="Full Name"
              outlined
              dense
              class="luxury-input"
              :rules="[(val) => !!val || 'Name is required']"
            />
          </div>

          <!-- Email -->
          <div>
            <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              outlined
              dense
              class="luxury-input"
              :rules="[
                (val) => !!val || 'Email is required',
                (val) => /.+@.+\..+/.test(val) || 'Please enter a valid email',
              ]"
            />
          </div>

          <!-- Password -->
          <div>
            <q-input
              v-model="formData.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              class="luxury-input"
              :rules="[(val) => !!val || 'Password is required']"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>

          <!-- Confirm Password -->
          <div>
            <q-input
              v-model="formData.confirmPassword"
              label="Confirm Password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              class="luxury-input"
              :rules="[
                (val) => !!val || 'Please confirm your password',
                (val) => val === formData.password || 'Passwords do not match',
              ]"
            />
          </div>

          <!-- Terms and Conditions -->
          <div class="tw-flex tw-items-center">
            <q-checkbox v-model="formData.acceptTerms" color="primary" />
            <span class="tw-ml-2 tw-text-sm tw-text-gray-600">
              I agree to the
              <a href="#" class="tw-text-primary hover:tw-text-primary-dark"
                >Terms and Conditions</a
              >
            </span>
          </div>

          <!-- Sign Up Button -->
          <q-btn
            type="submit"
            color="primary"
            class="tw-w-full tw-h-11 tw-rounded-xl tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-mt-6"
            label="Create Account"
            :loading="loading"
          />
        </form>

        <!-- Sign In Link -->
        <div class="tw-text-center tw-mt-6">
          <p class="tw-text-sm tw-text-gray-600">
            Already have an account?
            <router-link to="/sign-in" class="tw-text-primary hover:tw-text-primary-dark"
              >Sign In</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const WebLogo = new URL('/src/assets/Logo.png', import.meta.url)

const $q = useQuasar()
const router = useRouter()

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const showPassword = ref(false)
const loading = ref(false)

const handleSignUp = async () => {
  if (!formData.value.acceptTerms) {
    $q.notify({
      message: 'Please accept the Terms and Conditions',
      color: 'negative',
      position: 'top',
    })
    return
  }

  loading.value = true
  try {
    // Implement your sign-up logic here
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call

    $q.notify({
      message: 'Account created successfully',
      color: 'positive',
      position: 'top',
    })
    router.push('/') // Redirect to dashboard after successful signup
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'Failed to create account',
      color: 'negative',
      position: 'top',
    })
  } finally {
    loading.value = false
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
}
</style>
