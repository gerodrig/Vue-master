<script setup lang="ts">
import { RouterView } from 'vue-router';
import {breakingBadRouteLinks} from '@/router/breakingbad/link-routes';

import '@store/breakingbad/characters.store';

import { Header } from '@/components/shared';
import NavBar from '@/components/breakingbad/NavBar.vue';


</script>

<template>
  <Header title="Breaking Bad"  />
  <div class="flex flex-col p-8 text-green-600">
    <header>
      <NavBar 
        title="BreakingBad"
        :links="breakingBadRouteLinks"
      />
    </header>

    <main>
      <RouterView />
    </main>

  </div>

</template>

<style>

html{
  height: 100%;
  background-color: black;
}

.router-link-active {
  color: grey !important;
  text-decoration: underline;
}

.router-link-exact-active {
  text-decoration: none;
}

</style>