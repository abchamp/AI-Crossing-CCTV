<template>
  <q-page class="tw-p-6">
    <div class="tw-space-y-6">
      <!-- Header Section -->
      <div class="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 class="tw-text-2xl tw-font-bold tw-text-primary-text">Users Table</h1>
          <p class="tw-text-gray-500/80 tw-mt-1">Manage users and their roles</p>
        </div>
        <q-btn
          color="primary"
          class="tw-px-4 tw-h-10 tw-rounded-xl tw-shadow-md hover:tw-shadow-lg tw-transition-all"
          icon="add"
          label="Add User"
        />
      </div>

      <!-- Users Table -->
      <div
        class="tw-rounded-2xl tw-overflow-hidden tw-border tw-border-primary/10 luxury-table tw-shadow-xl tw-shadow-primary/5"
      >
        <q-table
          :rows="users"
          :columns="columns"
          row-key="email"
          flat
          :pagination="{ rowsPerPage: 10 }"
          class="tw-bg-white"
        >
          <!-- Custom header slot for better styling -->
          <template #header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="tw-px-6 tw-py-6 tw-font-bold tw-tracking-wider tw-text-gray-600 tw-uppercase"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- Update body slot styling -->
          <template #body="props">
            <q-tr
              :props="props"
              class="tw-border-b tw-border-primary/5 hover:tw-bg-primary/5 tw-transition-all tw-duration-200"
            >
              <!-- User Column -->
              <q-td key="user" :props="props">
                <div class="tw-flex tw-items-center tw-gap-3 tw-py-2">
                  <div
                    class="tw-w-10 tw-h-10 tw-rounded-xl tw-shadow-sm tw-overflow-hidden tw-border tw-border-primary/10"
                  >
                    <img
                      :src="props.row.avatar"
                      :alt="props.row.name"
                      class="tw-w-full tw-h-full tw-object-cover"
                    />
                  </div>
                  <div>
                    <div class="tw-text-sm tw-font-medium tw-text-primary-text">
                      {{ props.row.name }}
                    </div>
                    <div class="tw-text-xs tw-text-gray-500">{{ props.row.email }}</div>
                  </div>
                </div>
              </q-td>

              <!-- Function Column -->
              <q-td key="function" :props="props">
                <div>
                  <div class="tw-text-sm tw-font-medium tw-text-primary-text">
                    {{ props.row.function }}
                  </div>
                  <div class="tw-text-xs tw-text-gray-500">{{ props.row.department }}</div>
                </div>
              </q-td>

              <!-- Status Column -->
              <q-td key="status" :props="props">
                <div
                  class="tw-inline-flex tw-items-center tw-justify-center tw-min-w-[80px] tw-h-8 tw-rounded-xl tw-text-xs tw-font-semibold"
                  :class="
                    props.row.status === 'Online'
                      ? 'tw-bg-green-500 tw-text-white'
                      : 'tw-bg-gray-500/10 tw-text-gray-400'
                  "
                >
                  {{ props.row.status }}
                </div>
              </q-td>

              <!-- Employed Column -->
              <q-td key="employed" :props="props">
                <span class="tw-text-sm tw-text-gray-600">{{ props.row.employed }}</span>
              </q-td>

              <!-- Action Column -->
              <q-td key="action" :props="props" class="tw-px-6 tw-py-4 tw-text-right">
                <q-btn
                  flat
                  dense
                  color="grey-7"
                  icon="more_vert"
                  class="tw-text-sm tw-rounded-lg hover:tw-bg-primary/5"
                >
                  <q-menu class="tw-rounded-xl">
                    <q-list class="tw-py-2" style="min-width: 120px">
                      <q-item clickable v-close-popup @click="editUser(props.row)" class="tw-px-4">
                        <q-item-section class="tw-text-sm">Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="deleteUser(props.row)"
                        class="tw-px-4"
                      >
                        <q-item-section class="tw-text-sm tw-text-negative">Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    name: 'user',
    label: 'STAFF',
    field: 'name',
    align: 'left',
  },
  {
    name: 'function',
    label: 'ROLE',
    field: 'function',
    align: 'left',
  },
  {
    name: 'status',
    label: 'STATUS',
    field: 'status',
    align: 'left',
  },
  {
    name: 'employed',
    label: 'JOINED DATE',
    field: 'employed',
    align: 'left',
  },
  {
    name: 'action',
    label: '',
    field: 'action',
    align: 'right',
  },
]

const users = ref([
  {
    name: 'John Thompson',
    email: 'john.t@railadmin.com',
    function: 'Station Master',
    department: 'Station Operations',
    status: 'Online',
    employed: '15/03/23',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Sarah Chen',
    email: 'sarah.c@railadmin.com',
    function: 'Train Controller',
    department: 'Traffic Control',
    status: 'Online',
    employed: '02/06/23',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Michael Rodriguez',
    email: 'michael.r@railadmin.com',
    function: 'Maintenance Supervisor',
    department: 'Technical Services',
    status: 'Offline',
    employed: '20/01/23',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Emily Parker',
    email: 'emily.p@railadmin.com',
    function: 'Safety Inspector',
    department: 'Safety & Compliance',
    status: 'Online',
    employed: '08/04/23',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'David Kim',
    email: 'david.k@railadmin.com',
    function: 'Schedule Coordinator',
    department: 'Operations Planning',
    status: 'Offline',
    employed: '12/05/23',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Lisa Wong',
    email: 'lisa.w@railadmin.com',
    function: 'Customer Service Head',
    department: 'Passenger Services',
    status: 'Online',
    employed: '30/03/23',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
])

const editUser = (user) => {
  // Implement edit functionality
  console.log('Edit user:', user)
}

const deleteUser = (user) => {
  // Implement delete functionality
  console.log('Delete user:', user)
}
</script>
