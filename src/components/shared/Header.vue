<template>
  <header class="py-4 text-white bg-green-500">
    <div class="container flex mx-auto">
      <!-- Left arrow indicating to go back  -->
      <button v-if="!isHome" @click="goBack" class="flex items-center mr-10 space-x-2 text-white hover:text-gray-600 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M6.293 9H16a1 1 0 010 2H6.293l2.147 2.146a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414L6.293 9z" clip-rule="evenodd" />
      </svg>

      <span class="font-medium">Back</span>
    </button>

      <h1 class="text-2xl font-bold">{{ title }}</h1>
    </div>
  </header>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Vue Projects'
    }
  },
  setup(props) {
    const { title } = props;
    const router = useRouter();

    const isHome = router.currentRoute.value.path === '/';

  
    const goBack = () => {
        router.go(-1)
      }
      return { title, goBack, isHome };
    },
  }
</script>
