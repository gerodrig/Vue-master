<script setup lang="ts">
import CardList from '@/components/breakingbad/CardList.vue';
import Loader from '@/components/shared/Loader.vue';
import useCharacters from '@/composables/breakingbad/useCharacters';

const props = defineProps<{ title: string; visible: boolean }>();

const { isLoading, hasError, errorMessage, characters, count } = useCharacters();

</script>

<template>
  <h1 class="text-gray-400">Character List - {{ count }}</h1>

  <!-- //circular loader -->
  <Loader :isLoading="isLoading" />
  <div v-if="hasError">
    <h1 class="text-3xl text-center text-red-500">Error Loading</h1>
    <p class="text-3xl text-center text-red-500">
      {{ errorMessage }}
    </p>
  </div>
  <template v-else-if="!isLoading">
    <CardList :characters="characters" />
  </template>
</template>
