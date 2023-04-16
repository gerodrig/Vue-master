import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'
import ProjectsIndex from '@projects/index.vue';

import './style.css';

const routes = [
    { path: '/', component: ProjectsIndex },
    { path: '/indecision', component: () => import('@projects/indecision/index.vue') },
    { path: '/pokemon', component: () => import('@projects/pokemon-game/index.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
