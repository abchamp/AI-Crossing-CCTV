const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'cctv', component: () => import('pages/CCTVPage.vue') },
      { path: 'set-up-cctv', component: () => import('pages/SetUpCCTVPage.vue') },
      {
        path: '/train-driver',
        name: 'TrainDriver',
        component: () => import('pages/TrainDriverPage.vue'),
      },
    ],
  },
]

export default routes
