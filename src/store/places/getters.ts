
import { GetterTree } from 'vuex';
import { PlacesState } from './state';
import { Rootstate } from '../../interfaces/journal/index';

const getters: GetterTree<PlacesState, Rootstate> = {
    isUSerLocationReady(state) {
        return !!state.userLocation;
    }
};

export default getters;