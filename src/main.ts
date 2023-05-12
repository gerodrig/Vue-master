import { createApp } from 'vue';
import App from './App.vue';

import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

import router from './router/router';
import store from './store';

import './style.css';

const queryConfig: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 120, // 2 minutes
        refetchOnReconnect: 'always',
      },
    },
  },
};

createApp(App)
    .use(store)
    .use(VueQueryPlugin, queryConfig)
    .use(router)
    .mount('#app');
