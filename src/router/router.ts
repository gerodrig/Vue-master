import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import ProjectsIndex from '@projects/index.vue';

import authRouter from '@/router/auth';
import characterRoute from '@/router/breakingbad';
import daybookRouter from './journal';
import isAuthenticatedGuard from '@/auth/guards';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: ProjectsIndex },
  {
    path: '/indecision',
    name: 'Decision Maker App',
    component: () => import('@projects/indecision/index.vue'),
  },
  {
    path: '/pokemon',
    name: 'Pokemon Game App',
    component: () => import('@projects/pokemon-game/index.vue'),
  },
  {
    path: '/journal',
    name: 'Journal App',
    component: () => import('@projects/journal/index.vue'),
    children: [
        {
          path: 'auth',
          ...authRouter,        
        },
    ],
  },
//   { path: '/auth', ...authRouter },
  { path: '/journal/daybook', beforeEnter: [isAuthenticatedGuard], ...daybookRouter },
  {
    path: '/maps-app',
    name: 'Maps App',
    component: () => import('@projects/mapsApp/index.vue'),
  },
  {
    path: '/breakingbad',
    name: 'breakingbad',
    component: () => import('@projects/breakingbad/index.vue'),
    children: [
      {
        ...characterRoute,
        path: 'characters',
      },
      {
        path: '/breakingbad/home',
        name: 'breakingbadHome',
        component: () => import('@/pages/breakingbad/HomePage.vue'),
      },
    {
      path: '/breakingbad/about',
      name: 'breakingbadAbout',
      component: () => import('@/pages/breakingbad/AboutPage.vue'),
    },
    ],
  },
  {
    path: '/vue-issues',
    name: 'vueIssues',
    // beforeEnter: () => { location.href = 'https://vue-issues.vercel.app/#/'; },
    component: () => import('@/projects/vue-issues/index.vue'),
  },

  { path: '/:pathMatch(.*)*', component: () => import('@pages/404.vue') },
];

const router = createRouter({
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes,
});

export default router;
