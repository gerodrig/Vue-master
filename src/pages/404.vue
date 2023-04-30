<template>
   <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <Logo animate />
    <h1 class="mb-4 text-4xl font-bold text-green-600">404</h1>
    <p class="mb-8 text-lg text-gray-700">Oops! The page you're looking for does not exist.</p>
    <router-link to="/" class="px-4 py-2 text-white transition duration-300 ease-in-out bg-green-600 rounded hover:bg-green-700">Go Home</router-link>
  </div>
</template>

<script lang='ts'>
import Logo from '@/components/shared/Logo.vue';

export default {

  name: 'NotFound',
  components: {
    Logo,
  },
  setup() {
    return {};
  },
};
</script>

