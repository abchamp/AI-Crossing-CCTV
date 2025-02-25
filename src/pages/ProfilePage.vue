<template>
  <q-page>
    <!-- Header with gradient background -->
    <div class="header-gradient tw-relative tw-overflow-hidden tw-h-[280px]">
      <div class="wave-pattern"></div>
    </div>

    <!-- Main Content -->
    <div class="tw-px-6 tw-relative tw--mt-48">
      <div class="tw-space-y-6 tw-max-w-7xl tw-mx-auto">
        <!-- Profile Header -->
        <ProfileHeader
          v-model="profile"
          :active-tab="activeTab"
          :tabs="tabs"
          @update:active-tab="handleTabChange"
        />

        <!-- Three Column Layout -->
        <div class="tw-grid tw-grid-cols-12 tw-gap-6">
          <!-- Platform Settings -->
          <div class="tw-col-span-12 md:tw-col-span-3">
            <PlatformSettings
              :account-settings="accountSettings"
              :app-settings="appSettings"
              @setting-change="handleSettingChange"
            />
          </div>

          <!-- Profile Information -->
          <div class="tw-col-span-12 md:tw-col-span-5">
            <ProfileInformation :profile="profile" />
          </div>

          <!-- ConversationsSection -->
          <div class="tw-col-span-12 md:tw-col-span-4">
            <ConversationsSection :messages="conversations" @reply="handleReply" />
          </div>
        </div>

        <!-- Projects Section -->
        <ProjectGallery :projects="projects" @create-project="handleCreateProject" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import ProfileHeader from 'components/profile/ProfileHeader.vue'
import PlatformSettings from 'components/profile/PlatformSettings.vue'
import ProfileInformation from 'components/profile/ProfileInformation.vue'
import ConversationsSection from 'components/profile/ConversationsSection.vue'
import ProjectGallery from 'components/profile/ProjectGallery.vue'

const $q = useQuasar()

const activeTab = ref('overview')
const tabs = [
  { label: 'OVERVIEW', value: 'overview' },
  { label: 'TEAMS', value: 'teams' },
  { label: 'PROJECTS', value: 'projects' },
]

const profile = ref({
  name: 'Esthera Jackson',
  email: 'esthera@simmmple.com',
  avatar: 'https://i.pravatar.cc/300?img=1',
  fullName: 'Alec M. Thompson',
  mobile: '(+44) 123 1234 123',
  location: 'United States',
  bio: "Hi, I'm Alec Thompson. Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
})

const accountSettings = ref([
  { label: 'Email me when someone follows me', value: true },
  { label: 'Email me when someone answers on my post', value: true },
  { label: 'Email me when someone mentions me', value: false },
])

const appSettings = ref([
  { label: 'New launches and projects', value: false },
  { label: 'Monthly product updates', value: true },
  { label: 'Subscribe to newsletter', value: false },
])

const conversations = ref([
  {
    id: 1,
    name: 'Esthera Jackson',
    message: 'Hi! I need more informations...',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Esthera Jackson',
    message: 'Awesome work, can you change...',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Esthera Jackson',
    message: 'Have a great afternoon...',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Esthera Jackson',
    message: 'About files I can...',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
])

const projects = ref([
  {
    id: 1,
    title: 'Modern',
    description: 'As Uber works through a huge amount of internal management turmoil.',
    image: '/src/assets/modern.jpg',
    team: [
      { id: 1, avatar: 'https://i.pravatar.cc/150?img=1', name: 'Team Member 1' },
      { id: 2, avatar: 'https://i.pravatar.cc/150?img=2', name: 'Team Member 2' },
      { id: 3, avatar: 'https://i.pravatar.cc/150?img=3', name: 'Team Member 3' },
    ],
  },
  {
    id: 2,
    title: 'Scandinavian',
    description: 'Music is something that every person has his or her own specific opinion about.',
    image: '/src/assets/scandinavian.jpg',
    team: [
      { id: 1, avatar: 'https://i.pravatar.cc/150?img=4', name: 'Team Member 4' },
      { id: 2, avatar: 'https://i.pravatar.cc/150?img=5', name: 'Team Member 5' },
    ],
  },
  {
    id: 3,
    title: 'Minimalist',
    description: 'Different people have different taste, and various types of music.',
    image: '/src/assets/minimalist.jpg',
    team: [
      { id: 1, avatar: 'https://i.pravatar.cc/150?img=6', name: 'Team Member 6' },
      { id: 2, avatar: 'https://i.pravatar.cc/150?img=7', name: 'Team Member 7' },
      { id: 3, avatar: 'https://i.pravatar.cc/150?img=8', name: 'Team Member 8' },
    ],
  },
])

const handleTabChange = (tab) => {
  activeTab.value = tab
}

const handleSettingChange = () => {
  $q.notify({
    message: 'Settings updated successfully',
    color: 'positive',
    position: 'top',
    timeout: 2000,
  })
}

const handleReply = (message) => {
  $q.notify({
    message: `Replying to ${message.name}`,
    color: 'primary',
    position: 'top',
    timeout: 2000,
  })
}

const handleCreateProject = () => {
  $q.notify({
    message: 'Creating new project...',
    color: 'primary',
    position: 'top',
    timeout: 2000,
  })
}
</script>

<style lang="scss" scoped>
.header-gradient {
  background: linear-gradient(135deg, #1a237e 0%, #303f9f 100%);
}

.wave-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0.1'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0.05'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.luxury-card {
  @apply tw-bg-white;
  border: 1px solid rgba(26, 35, 126, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}
</style>
