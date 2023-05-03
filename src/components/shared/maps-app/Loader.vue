<template>
  <div
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen text-white bg-black loading bg-opacity-80" >
    <div class="text-center">
      <h1 class="text-4xl">Please Wait</h1>
      <span>Locating...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingComponent',
});
</script>
