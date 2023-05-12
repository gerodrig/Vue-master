<template>
  <footer class="py-4 text-white bg-gray-800">
    <div class="container mx-auto">
      <p class="text-center">&copy; {{ currentYear }} - {{ title }}</p>
    </div>
  </footer>
</template>


<script lang="ts">
export default {
  name: 'Footer',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>