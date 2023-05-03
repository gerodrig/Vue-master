
import { ActionTree } from 'vuex';
import { MapState } from './state';
import { MAP_MUTATION_TYPES } from './mutations';
import { directionsApi } from '@/api/mapsApp';
import { Rootstate } from '@interfaces/journal/index';
import { DirectionsResponse } from '@interfaces/places/directions';


export type LngLat = [number, number];

const actions: ActionTree<MapState, Rootstate> = {
    async getRouteBetweenPoints({commit}, {start, end}: {start: LngLat, end: LngLat}) { 
        
        const { data } = await directionsApi.get<DirectionsResponse>(`/${start[0]},${start[1]};${end[0]},${end[1]}`);

        // State distance
        commit(MAP_MUTATION_TYPES.SET_ROUTE_DISTANCE_DURATION, {
            distance: data.routes[0].distance,
            duration: data.routes[0].duration
        });
        // commit poly line
        commit(MAP_MUTATION_TYPES.SET_ROUTE_POLYLINE, data.routes[0].geometry.coordinates);
    }
};

export default actions;