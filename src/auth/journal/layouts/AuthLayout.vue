<template>
  <div class="w-full mx-auto my-0">
    <div
      class="w-full min-h-screen flex flex-wrap justify-center items-center bg-no-repeat bg-center bg-cover relative z-[1] p-[15px] before:content-[''] before:block before:absolute before:z-[-1] before:w-full before:h-full before:bg-[rgba(0,0,0,0.65)] before:left-0 before:top-0"
      style="background-image: url('/src/assets/journal/bg-01.jpeg')"
    >
      <div
        class="pt-8 pb-12 overflow-hidden bg-transparent rounded-lg w-96"
      >
	  
	  	<router-view />

	  </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AuthLayout',
};
</script>
