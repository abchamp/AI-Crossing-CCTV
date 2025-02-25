<template>
  <q-page class="tw-p-6">
    <div class="tw-space-y-6">
      <!-- Header Section -->
      <div class="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 class="tw-text-2xl tw-font-bold tw-text-primary-text">Dashboard</h1>
          <p class="tw-text-gray-500/80 tw-mt-1">Welcome to your dashboard</p>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
        <!-- Sample Dashboard Cards -->
        <div class="luxury-card tw-p-6 tw-rounded-xl">
          <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Total Users</h3>
          <p class="tw-text-3xl tw-font-bold tw-text-primary">6</p>
        </div>

        <div class="luxury-card tw-p-6 tw-rounded-xl">
          <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Active Users</h3>
          <p class="tw-text-3xl tw-font-bold">3</p>
        </div>

        <div class="luxury-card tw-p-6 tw-rounded-xl">
          <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Offline Users</h3>
          <p class="tw-text-3xl tw-font-bold tw-text-gray-600">3</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Dashboard component logic can be added here
</script>

<style lang="scss" scoped>
.luxury-card {
  background: white;
  border: 1px solid rgba(196, 160, 82, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
}
</style>
