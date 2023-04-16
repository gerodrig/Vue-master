
<template>
  <div class="m-6 p-8 flex-col justify-center">
    <h1 class="text-4xl font-bold text-blue-600">Hello Vue 3 + Tailwind CSS!</h1>
    <p class="text-xl text-gray-600 my-4">{{ msg }}</p>
  
    <button v-on:click="changeMessage()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Change message
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      msg: 'Welcome to Your Vue.js + TypeScript App',
      quote: 'I am Benito'
    }
  },
  methods: {
    changeMessage() {
      this.msg = this.quote
    }
  }
}
</script>


