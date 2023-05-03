<template>
    <button v-if="isBtnReady" class="fixed p-2 m-2 text-white bg-green-700 rounded-md hover:outline-green-300 hover:outline-2 outline top-20 right-8 hover:bg-green-800"
    @click="onMyLocationClicked"
    >
        Go to My Location
    </button>
</template>

<script lang='ts'>
import { useMapStore, usePlacesStore } from '@/composables/maps-app';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'MyLocationBtn',
    setup() {
        const {userLocation, isUserLocationReady} = usePlacesStore();
        const { map, isMapReady } = useMapStore();

        return {
            isBtnReady: computed<boolean>(() => isUserLocationReady.value && isMapReady.value ),

            onMyLocationClicked: () => {
                map.value?.flyTo({
                    center: userLocation.value,
                    zoom: 14,
                });
            },
        };
    },
});
</script>