<script lang="ts" src="./SearchResults.ts" />

<template>
  <div v-if="isLoadingPlaces">
    <!-- //loader -->
    <div class="flex items-center justify-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  </div>

  <ul v-else-if="places.length > 0" class="mt-3 divide-y divide-gray-300">
    <li
      v-for="place in places"
      class="p-4 hover:bg-green-200 hover:cursor-pointer"
      :class="(activePlace === place.id) && 'bg-green-400 text-green-900'"
      :key="place.id"
      @click="onPlaceClicked(place)"
      >
      <h5 class="text-lg font-bold">{{ place.text }}</h5>
      <p>L{{ place.place_name }}</p>
      <div class="mt-4 text-right">
        <button
          class="p-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          :class="(activePlace === place.id) &&'bg-green-400 outline' "
          @click.self="getRouteDirections(place)"
        >
          Directions
        </button>
      </div>
    </li>
  </ul>
</template>
