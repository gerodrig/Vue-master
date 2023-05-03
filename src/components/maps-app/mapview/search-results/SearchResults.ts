import { useMapStore, usePlacesStore } from '@/composables/maps-app';
import { defineComponent, ref, watch } from 'vue';
import { Feature } from '../../../../interfaces/places/index';

export default defineComponent({
    name: 'SearchResults',
    setup() {
   
        const { places, isLoadingPlaces, userLocation} = usePlacesStore();
        const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();
        const activePlace = ref('');

        watch(places, (newPlaces) => {
            if (map.value && newPlaces.length) {
                activePlace.value = '';
                setPlaceMarkers(newPlaces);
            }
        });
        
   
        return {
            isLoadingPlaces,
            places,
            activePlace,

            onPlaceClicked({center, id}: Feature){
                activePlace.value = id;
                const [lng, lat] = center;

                map.value?.flyTo({
                    center: [lng, lat],
                    zoom: 14,
                });
            },

            getRouteDirections({center}: Feature){
                if(!userLocation.value) return;

                const [lng, lat] = center;

                const [startLng, startLat ] = userLocation.value;

                const start: [number, number] = [startLng, startLat];
                const end : [number, number]= [lng, lat];

                getRouteBetweenPoints({start, end});
            }
            
        };
    }
});