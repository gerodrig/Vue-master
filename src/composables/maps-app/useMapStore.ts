import { computed } from 'vue';
import { useStore } from 'vuex';
import Mapboxgl from 'mapbox-gl';

import { MAP_MUTATION_TYPES as MUTATIONS } from '@/store/map/mutations';
import { Rootstate } from '@/interfaces/journal/';



export const useMapStore = () => {

    const store = useStore<Rootstate>();
    return {
        map: computed(() => store.state.map?.map ),
        distance: computed(() => store.state.map?.distance ),
        duration: computed(() => store.state.map?.duration ),

        //Getters
        isMapReady: computed<boolean>(() => store.getters['map/isMapReady']),

        //Mutations
        setMap: (map: Mapboxgl.Map) => store.commit('map/' + MUTATIONS.SET_MAP, map),
        setPlaceMarkers: (places: any) => store.commit('map/' + MUTATIONS.SET_PLACE_MARKERS, places),

        //Actions
        getRouteBetweenPoints: ({start, end}: {start: [number, number], end: [number, number]}) => store.dispatch('map/getRouteBetweenPoints', {start, end}),
    };
};