<script setup lang="ts">
//define props with defaults
const props = withDefaults(defineProps<{ isLoading: boolean }>(), {
  isLoading: false,
});
</script>

<template>
  <div v-if="props.isLoading" class="flex items-center justify-center">
    <div
      class="w-32 h-32 border-t-2 border-b-2 border-green-300 rounded-full animate-spin"
    ></div>
  </div>
</template>
