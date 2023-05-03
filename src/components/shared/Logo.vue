<template>
  <div class="mx-auto mb-20">
    <img draggable="false" alt="Vue logo" :src="img" :width="width" :height="height" :class='{ "animate": animate, "mx-auto": true }'  />
  </div>
</template>


<script lang="ts">
import logo from '@/assets/vue.svg';
import { ref } from 'vue';

export default {
  name: 'Logo',
  props: {
    height: {
      type: String,
      default: '256'
    },
    width: {
      type: String,
      default: '256'
    },
    img: {
      type: String,
      default: logo
    },
    animate: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    return {
      img: ref(props.img),
      height: ref(Number.parseInt(props.height) || 256),
      width: ref(Number.parseInt(props.width) || 256),
      animate: ref(props.animate)
    };
  },
};
</script>

<style scoped>

.animate {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>