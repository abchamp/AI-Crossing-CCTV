<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Add Toolbar -->
    <q-header class="bg-[#f8fafc] text-dark">
      <q-toolbar class="toolbar tw-h-16">
        <!-- Toggle Drawer Button - Hide on TrainDriverPage -->
        <q-btn v-if="!isTrainDriverPage" flat dense round @click="toggleLeftDrawer" class="tw-mr-4">
          <Bars3Icon class="tw-w-6 tw-h-6 tw-text-gray-600" />
        </q-btn>

        <!-- Page Title -->
        <div class="">
          <div class="tw-text-2xl tw-font-bold tw-text-gray-700">
            <h1>{{ currentPageTitle }}</h1>
          </div>
          <!-- <q-breadcrumbs class="text-grey-7">
            <q-breadcrumbs-el label="Profile" class="tw-text-sm" />
            <q-breadcrumbs-el label="Account Pages" class="tw-text-sm" />
          </q-breadcrumbs> -->
        </div>

        <!-- Spacer -->
        <q-space />

        <!-- CCTV Controls - Only show on CCTV pages -->
        <div v-if="isCCTVPage" class="tw-flex tw-items-center tw-gap-2">
          <!-- Left Button (Routes) -->
          <button
            @click="toggleLeftColumn"
            class="toggle-btn tw-flex tw-items-center tw-gap-2"
            :class="{ 'is-active': showLeftColumn }"
          >
            <ChevronRightIcon
              class="tw-w-4 tw-h-4 tw-transition-transform tw-duration-300"
              :class="{ 'tw-rotate-180': showLeftColumn }"
            />
            <span class="tw-text-sm">Routes</span>
          </button>

          <!-- Grid Size Controls - Show only when both columns are hidden -->
          <div class="tw-flex tw-gap-2">
            <button
              v-for="size in [2, 3, 4]"
              :key="size"
              @click="gridSize = size"
              class="toggle-btn"
              :class="{ 'is-active': gridSize === size }"
            >
              <span class="tw-text-sm">{{ size }}x</span>
            </button>
          </div>

          <!-- Right Button (Map) -->
          <button
            @click="toggleRightColumn"
            class="toggle-btn tw-flex tw-items-center tw-gap-2"
            :class="{ 'is-active': showRightColumn }"
          >
            <span class="tw-text-sm">Map</span>
            <ChevronRightIcon
              class="tw-w-4 tw-h-4 tw-transition-transform tw-duration-300"
              :class="{ 'tw-rotate-0': showRightColumn, 'tw-rotate-180': !showRightColumn }"
            />
          </button>
        </div>

        <!-- Spacer -->
        <q-space />

        <!-- Search Box -->
        <q-input
          dense
          outlined
          placeholder="Type here"
          class="search-input tw-w-80 tw-mr-6"
          borderless
        >
          <template v-slot:prepend>
            <MagnifyingGlassIcon class="tw-w-6 tw-h-6 tw-text-gray-400" />
          </template>
        </q-input>

        <!-- Right-aligned elements -->
        <div class="tw-flex tw-items-center tw-gap-6">
          <div class="tw-flex tw-items-center tw-gap-2">
            <q-btn flat round>
              <Cog6ToothIcon class="tw-w-6 tw-h-6 tw-text-gray-600" />
            </q-btn>
            <q-btn flat round>
              <BellIcon class="tw-w-6 tw-h-6 tw-text-gray-600" />
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer - Hide on TrainDriverPage -->
    <q-drawer
      v-if="!isTrainDriverPage"
      v-model="leftDrawerOpen"
      show-if-above
      :width="280"
      :breakpoint="500"
      class="app-drawer"
      behavior="desktop"
    >
      <!-- Update Logo Section -->
      <div class="logo-section tw-flex tw-justify-center">
        <img :src="WebLogo" alt="Logo" />
      </div>

      <!-- Navigation Menu -->
      <q-list class="tw-py-2">
        <!-- Main Menu Items -->
        <q-item
          to="/"
          clickable
          v-ripple
          class="drawer-item"
          :class="{ 'drawer-item-active': route.path === '/' }"
        >
          <q-item-section avatar>
            <HomeIcon class="tw-w-6 tw-h-6" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item
          to="/cctv"
          clickable
          v-ripple
          class="drawer-item"
          :class="{ 'drawer-item-active': route.path === '/cctv' }"
        >
          <q-item-section avatar>
            <VideoCameraIcon class="tw-w-6 tw-h-6" />
          </q-item-section>
          <q-item-section>CCTV</q-item-section>
        </q-item>

        <q-item
          to="/set-up-cctv"
          clickable
          v-ripple
          class="drawer-item"
          :class="{ 'drawer-item-active': route.path === '/set-up-cctv' }"
        >
          <q-item-section avatar>
            <WrenchIcon class="tw-w-6 tw-h-6" />
          </q-item-section>
          <q-item-section>Set up CCTV</q-item-section>
        </q-item>

        <q-item
          to="/users"
          clickable
          v-ripple
          class="drawer-item"
          :class="{ 'drawer-item-active': route.path === '/users' }"
        >
          <q-item-section avatar>
            <UsersIcon class="tw-w-6 tw-h-6" />
          </q-item-section>
          <q-item-section>Users</q-item-section>
        </q-item>

        <!-- Account Pages Section -->
        <div class="tw-px-6 tw-py-3 tw-mt-6">
          <div class="tw-text-xs tw-font-medium tw-text-gray-400 tw-uppercase">Account Pages</div>
        </div>

        <q-item
          to="/profile"
          clickable
          v-ripple
          class="drawer-item"
          :class="{ 'drawer-item-active': route.path === '/profile' }"
        >
          <q-item-section avatar>
            <UserIcon class="tw-w-6 tw-h-6" />
          </q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>

        <q-item
          :to="{ path: '/train-driver' }"
          clickable
          v-ripple
          class="drawer-item"
          :class="{ 'drawer-item-active': route.path === '/train-driver' }"
          target="_blank"
          tag="a"
        >
          <q-item-section avatar>
            <RectangleStackIcon class="tw-w-6 tw-h-6" />
          </q-item-section>
          <q-item-section>Train Driver</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch, provide } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  VideoCameraIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  BellIcon,
  UsersIcon,
  Bars3Icon,
  WrenchIcon,
  RectangleStackIcon,
} from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
const WebLogo = new URL('/src/assets/Logo.png', import.meta.url)

const route = useRoute()
const leftDrawerOpen = ref(true)

// Set initial drawer state based on route
onMounted(() => {
  if (route.path === '/cctv' || route.path === '/train-driver') {
    leftDrawerOpen.value = false
  }

  // Initialize CCTV column visibility
  if (route.path === '/cctv' || route.path === '/set-up-cctv') {
    showLeftColumn.value = true
    showRightColumn.value = true
  }
})

// Watch for route changes to close drawer when navigating to CCTV
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/cctv' || newPath === '/set-up-cctv') {
      leftDrawerOpen.value = false

      // Initialize CCTV column visibility if coming from a non-CCTV page
      if (!isCCTVPage.value) {
        showLeftColumn.value = true
        showRightColumn.value = true
      }
    }
  },
)

// Add computed property to check if current page is TrainDriverPage
const isTrainDriverPage = computed(() => route.path === '/train-driver')

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const currentPageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Dashboard'
    case '/cctv':
      return 'CCTV Management'
    case '/set-up-cctv':
      return 'Set up CCTV'
    case '/users':
      return 'Users'
    case '/profile':
      return 'Profile'
    case '/train-driver':
      return 'Train Driver'
    default:
      return 'Page Not Found'
  }
})

// Add new state variables
const showLeftColumn = ref(false)
const showRightColumn = ref(false)
const gridSize = ref(2)

// Add new computed property
const isCCTVPage = computed(() => route.path === '/cctv' || route.path === '/set-up-cctv')

// Add new methods
const toggleLeftColumn = () => {
  showLeftColumn.value = !showLeftColumn.value
}

const toggleRightColumn = () => {
  showRightColumn.value = !showRightColumn.value
}

// Provide CCTV state to child components
provide('cctvState', {
  showLeftColumn,
  showRightColumn,
  gridSize,
  toggleLeftColumn,
  toggleRightColumn,
})
</script>

<style lang="scss">
// Existing styles...

// Add new toolbar styles
.toolbar {
  // height: 80px;
  padding: 12px 24px;
  background: #f8fafc;
  backdrop-filter: blur(10px);

  .search-input {
    .q-field__control {
      @apply tw-h-10 tw-rounded-lg;
      background: linear-gradient(135deg, rgba(26, 35, 126, 0.03), rgba(26, 35, 126, 0.05));
      min-height: unset;
      border: 1px solid rgba(26, 35, 126, 0.1);
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(26, 35, 126, 0.2);
        background: linear-gradient(135deg, rgba(26, 35, 126, 0.05), rgba(26, 35, 126, 0.08));
      }

      .tw-w-6 {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        color: #64748b;
        background: transparent;
        border: none;
        box-shadow: none;
        transition: color 0.3s ease;
      }
    }

    &:hover .tw-w-6 {
      color: var(--primary);
    }

    .q-field__marginal {
      height: 36px;
    }

    &.q-field--outlined .q-field__control:before {
      border: none;
    }
  }

  .q-btn {
    @apply tw-w-10 tw-h-10 tw-rounded-xl;
    background: transparent;
    border: none;
    transition: all 0.3s ease;

    &:hover {
      background: transparent;
      border: none;
      transform: translateY(-1px);

      .tw-w-6 {
        color: var(--primary);
      }
    }

    &:active {
      transform: translateY(0);
    }

    .tw-w-6 {
      width: 1.5rem;
      height: 1.5rem;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
      color: #64748b;
      transition: all 0.3s ease;
    }
  }

  // Toggle button styles for CCTV controls
  .toggle-btn {
    @apply tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1.5 tw-rounded-full
           tw-bg-white/90 tw-backdrop-blur-sm tw-shadow-sm tw-border tw-border-gray-100
           tw-text-gray-500 tw-transition-all tw-duration-300;

    &:hover {
      @apply tw-shadow-md tw-bg-white;
    }

    &.is-active {
      @apply tw-bg-blue-50 tw-border-blue-200 tw-text-blue-600;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    }
  }
}

// Update drawer styles
.app-drawer {
  background: #f8fafc;
  backdrop-filter: blur(10px);

  // Logo section enhancement
  .logo-section {
    @apply tw-px-6 tw-py-5 tw-mb-2;
    // background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9));
    position: relative;

    // Add divider
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        to right,
        rgba(26, 35, 126, 0),
        rgba(26, 35, 126, 0.1),
        rgba(26, 35, 126, 0)
      );
    }
  }

  // Remove the &::after pseudo-element that creates the border
  &::after {
    display: none; // This will remove the subtle divider
  }

  // Section headers with primary accent
  .section-header {
    @apply tw-px-6 tw-py-3 tw-mt-6;

    .header-text {
      @apply tw-text-xs tw-font-medium tw-text-primary/70 tw-uppercase;
      letter-spacing: 0.05em;
    }
  }

  // Enhanced drawer items with luxury styling
  .drawer-item {
    @apply tw-mx-4 tw-px-4 tw-rounded-xl tw-mb-1 tw-h-11;
    @apply tw-text-gray-600 tw-bg-transparent;
    font-size: 14px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(26, 35, 126, 0.03);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    // Avatar section styling
    .q-item__section--avatar {
      min-width: 36px;
      padding-right: 12px;

      .tw-w-6 {
        width: 1.75rem;
        height: 1.75rem;
        padding: 0.25rem;
        background: white;
        border-radius: 0.75rem;
        border: 1px solid rgba(26, 35, 126, 0.06);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
      }
    }

    // Hover effects
    &:hover {
      @apply tw-bg-transparent;
      transform: translateX(4px);

      &::before {
        opacity: 1;
        background: rgba(26, 35, 126, 0.04);
      }

      .q-item__section--avatar .tw-w-6 {
        color: #1a237e;
        background: white;
        border-color: rgba(26, 35, 126, 0.2);
        transform: scale(1.05) translateY(-1px);
      }
    }

    // Active state
    &.drawer-item-active {
      @apply tw-bg-white tw-text-primary tw-font-semibold;
      box-shadow: 0 4px 20px rgba(26, 35, 126, 0.08);

      &::before {
        background: rgba(26, 35, 126, 0.04);
        // opacity: 1;
      }

      .q-item__section--avatar .tw-w-6 {
        color: white;
        background: #1a237e;
        border-color: #1a237e;
        transform: scale(1.05);
      }

      &:hover {
        transform: translateX(4px);

        .q-item__section--avatar .tw-w-6 {
          transform: scale(1.08);
          background: #151b60;
        }
      }
    }
  }

  // Smooth transitions
  .drawer-item,
  .drawer-item .tw-w-6,
  .drawer-item::before {
    @apply tw-transition-all tw-duration-300;
  }
}
</style>
