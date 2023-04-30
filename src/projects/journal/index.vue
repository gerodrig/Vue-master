<template>
  <!-- <AuthPage /> -->
  <router-view />
  <!-- <div class="flex flex-col items-center justify-center h-screen text-3xl">
    <Logo />
    <h1 class="mb-4 text-5xl">Journal App</h1>
    <button
      class="px-4 py-2 mt-4 font-bold text-white bg-green-700 rounded hover:bg-green-800"
    >
      <RouterLink :to="{ name: 'no-entry' }">Click to launch App</RouterLink>
    </button>
  </div> -->
</template>

<script lang="ts">
import useAuth from '@/composables/auth/useAuth';
import { defineAsyncComponent, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Journal App',
  components: {
    Logo: defineAsyncComponent(() => import('@/components/shared/Logo.vue')),
    AuthPage: defineAsyncComponent(
      () => import('@/auth/journal/layouts/AuthLayout.vue')
    ),
  },
  setup() {
    const { checkAuthStatus, authStatus } = useAuth();
    const router = useRouter();

    watch(authStatus, () => {
      if(authStatus.value !== 'authenticated') {
        router.push({ name: 'login' });
      }
    });

    checkAuthStatus();
    return {
      authStatus,
    };
  },
};
</script>
