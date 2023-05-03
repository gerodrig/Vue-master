
import { GetterTree } from 'vuex';
import { MapState } from './state';
import { Rootstate } from '../../interfaces/journal/index';

const getters: GetterTree<MapState, Rootstate> = {
    isMapReady(state: MapState): boolean {
        // If map is not null, it is ready
        return !!state.map;
    }
};

export default getters;