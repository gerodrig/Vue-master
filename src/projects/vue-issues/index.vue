<script setup lang="ts">
import { Header, Logo } from '@/components/shared';
</script>

<template>
  <Header title="Vue Issues App" />
  <div class="flex flex-col justify-center h-screen">
    <Logo />
    <!-- //route to external page -->

    <a
      href="https://vue-issues.vercel.app/#/"
      class="self-center w-1/4 p-2 text-3xl text-center text-white bg-green-600 rounded-lg hover:bg-green-700"
      target="_blank"
      >Launch App</a
    >
  </div>
</template>

<style scoped></style>
