import { createRouter, createWebHistory } from 'vue-router';
import ProjectsIndex from '@projects/index.vue';

import authRouter from '@/router/auth';
import daybookRouter from './journal';
import isAuthenticatedGuard from '@/auth/guards';

const routes = [
  { path: '/', component: ProjectsIndex },
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
            ...authRouter,        },
    ],
  },
//   { path: '/auth', ...authRouter },
  { path: '/journal/daybook', beforeEnter: [isAuthenticatedGuard], ...daybookRouter },
  { path: '/:pathMatch(.*)*', component: () => import('@pages/404.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
