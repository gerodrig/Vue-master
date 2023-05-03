<script lang="ts" src="./SearchBar.ts"/>

<template>
    <div class="fixed z-50 flex flex-col w-64 p-1 overflow-hidden bg-white shadow-xl top-20 left-8 rounded-xl">
        <input
          type="text"
          placeholder="Search places..." 
          class="p-2 border-green-300 rounded-md shadow-sm focus:ring-2 focus-ring-green-600 focus:border-transparent"
          v-model="debouncedValue"
          />

        <SearchResults />
      
    </div>
</template>