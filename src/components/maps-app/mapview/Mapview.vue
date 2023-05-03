<script lang="ts" src="./MapView.ts" />

<template>
    <Loader v-if="!isUserLocationReady"/>

    <div v-show="isUserLocationReady" class="fixed w-screen h-screen bg-green-500 bg-opacity-80"
        ref="mapElement"
    >
    
    </div>

</template>
