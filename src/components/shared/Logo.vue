<template>
  <div class="mx-auto mb-20">
    <img alt="Vue logo" :src="img" :width="width" :height="height" class="mx-auto" />
  </div>
</template>


<script lang="ts">
import logo from '@/assets/vue.svg';

export default {
  name: 'Logo',
  props: {
    height: {
      type: Number,
      default: 256
    },
    width: {
      type: Number,
      default: 256
    },
    img: {
      type: String,
      default: logo
    }
  },
};
</script>