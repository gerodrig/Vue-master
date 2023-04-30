<template>
<button
    @click="$emit('on:click')"
    class="fixed w-20 h-20 px-4 py-2 font-bold text-white bg-green-500 rounded-full bottom-5 right-5 hover:bg-green-600">
    <i :class="icon" class = "fas fa-2x"></i>
  </button>
</template>

<script lang='ts'>
export default {
  name: 'ComponentName',
  props: {
    icon: {
      type: String,
      default: 'fa-plus'
    }
  },
};
</script>