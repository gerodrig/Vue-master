<template>
  <Header title="Maps App" />
  <MapView />
  <SearchBar />
  <LocationBtn />
  <Logo class="logo" height="100" width="100" />
  <TripDetails />
    <!-- <router-view /> -->
    <!-- <div class="flex flex-col items-center justify-center h-screen text-3xl">
      <Logo />
      <h1 class="mb-4 text-5xl">Maps App</h1>
      <button
        class="px-4 py-2 mt-4 font-bold text-white bg-green-700 rounded hover:bg-green-800"
      >
      Clik to launch App
        <RouterLink :to="{ name: 'mapsApp' }">Click to launch App</RouterLink>
      </button>
    </div> -->
</template>
  
<script lang="ts">
import { defineAsyncComponent } from 'vue';
import Mapboxgl from 'mapbox-gl';

import { usePlacesStore } from '@/composables/maps-app/';

export default {
  name: 'Maps App',
  components: {
    Logo: defineAsyncComponent(() => import('@/components/shared/Logo.vue')),
    Header: defineAsyncComponent(() => import('@/components/shared/Header.vue')),
    MapView: defineAsyncComponent(() => import('@/components/maps-app/mapview/Mapview.vue')),
    SearchBar: defineAsyncComponent(() => import('@/components/maps-app/mapview/searchbar/SearchBar.vue')),
    LocationBtn: defineAsyncComponent(() => import('@/components/shared/maps-app/MyLocationBtn.vue')),
    TripDetails: defineAsyncComponent(() => import('@/components/maps-app/mapview/trip-details/TripDetails.vue')),
  },
  setup() {
    Mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;
    usePlacesStore();

    return {
      //
    };
  },
};
</script>

<style scoped>

.logo {
  position: fixed;
  right: 30px;
  bottom: 0px;
}
</style>
