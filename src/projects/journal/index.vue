<template>
  <Header :title="title" />
  <router-view />

</template>

<script lang="ts">
import useAuth from '@/composables/auth/useAuth';
import { computed, defineAsyncComponent, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Journal App',
  components: {
    Header: defineAsyncComponent(() => import('@/components/shared/Header.vue')),
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
      title: computed(() => 'Journal App')
    };
  },
};
</script>
