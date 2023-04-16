<template>
  <header class="bg-green-500 text-white py-4">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Vue Projects'
    }
  },
};
</script>
